/* @flow */

import Router from './router'
import { HTML5History } from './history/html5'

export default class HistoryRouter extends Router {
  init () {
    this.mode = 'history'
    this.history = new HTML5History(this, this.options.base)
    this.history.transitionTo(this.history.getCurrentLocation())
  }
}
