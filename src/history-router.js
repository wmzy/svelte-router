/* @flow */

import Router from './router'
import { HTML5History } from './history/html5'

export default class HistoryRouter extends Router {
  constructor (options) {
    super(options)

    this.mode = 'history'
    this.history = new HTML5History(this, this.options.base)
  }
}
