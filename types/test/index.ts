import { SvelteComponent } from "svelte/internal";

import {HistoryRouter} from "../index";
import { Route, RouteRecord, RedirectOption } from "../index";

const Home = { template: "<div>home</div>" };
const Foo = { template: "<div>foo</div>" };
const Bar = { template: "<div>bar</div>" };
const Async = () => Promise.resolve({ template: "<div>async</div>" })

const router = new HistoryRouter({
  mode: "history",
  base: "/",
  fallback: false,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  scrollBehavior: (to, from, savedPosition) => {
    if (from.path === "/") {
      return { selector: "#app" };
    }

    if (from.path === "/offset") {
      return { selector: '#foo', offset: { x: 0, y: 100 }}
    }

    if (to.path === "/child") {
      return;
    }

    if (savedPosition) {
      return savedPosition;
    }

    return Promise.resolve({
      x: 0,
      y: 0
    })
  },
  routes: [
    { path: "/", name: "home", component: Home, children: [
      {
        path: "child",
        components: {
          default: Foo,
          bar: Bar,
          asyncComponent: Async,
        },
        meta: { auth: true },
        beforeEnter (to, from, next) {
          to.params;
          from.params;
          next({ name: "home" });
          next();
        }
      },
      {
        path: "children",
        redirect: to => {
          to.params;
          return "/child";
        }
      }
    ]},
    { path: "/home", alias: "/" },
    { path: "/foo", props: true },
    { path: "/bar", props: { id: 123 }},
    { path: "/baz", props: (route: Route) => route.params },
    { path: "*", redirect: "/" }
  ]
});

const mode: string = router.mode;

const route: Route = router.currentRoute;
const path: string = route.path;
const name: string | undefined = route.name;
const hash: string = route.hash;
const query: string | (string | null)[] | null = route.query["foo"];
const params: string = route.params["bar"];
const fullPath: string = route.fullPath;
const redirectedFrom: string | undefined = route.redirectedFrom;
const meta: any = route.meta;
const matched: RouteRecord[] = route.matched;

matched.forEach(m => {
  const path: string = m.path;
  const components: {
    [key: string]: SvelteComponent
  } = m.components;
  const instances: { [key: string]: SvelteComponent } = m.instances;
  const name: string | undefined = m.name;
  const parant: RouteRecord | undefined = m.parent;
  const redirect: RedirectOption | undefined = m.redirect;
});

const unregister = router.beforeEach((to, from, next) => {
  to.params;
  next("/");
  next();
});

unregister();

router.beforeResolve((to, from, next) => {
  to.params;
  from.params;
  next()
});

router.afterEach((to, from) => {
  to.params;
  from.params;
});

router.push({
  path: "/",
  params: {
    foo: "foo"
  },
  query: {
    bar: "bar",
    empty: null,
    removed: undefined,
    withEmpty: ["1", null],
    foo: ["foo1", "foo2"]
  },
  hash: "hash"
});
router.replace({ name: "home" });

router.push('/', () => {}, () => {})
router.replace('/foo', () => {}, () => {});

router.onReady(() => {});

router.addRoutes([
  { path: '/more' }
]);

router.go(-1);
router.back();
router.forward();

const Components: (SvelteComponent)[] = router.getMatchedComponents();
