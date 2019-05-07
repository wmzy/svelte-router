/* @flow */

import Router from './router'
import { HashHistory } from './history/hash'

export default class HashRouter extends Router {
  init () {
    this.mode = 'hash'
    const history = this.history = new HashHistory(this, this.options.base, !!this.options.fallback)
    const setupHashListener = () => {
      history.setupListeners()
    }
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    )
  }
}
