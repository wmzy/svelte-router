import { getContext, setContext } from 'svelte'

export const router = Object.create(null)
export function getRouter () {
  return getContext(router)
}
export function setRouter (r) {
  return setContext(router, r)
}

export const route = Object.create(null)
export function getRoute () {
  return getContext(route)
}
export function setRoute (r) {
  return setContext(route, r)
}

export const matched = Object.create(null)
export function getMatched () {
  return getContext(matched)
}
export function setMatched (m) {
  return setContext(matched, m)
}
