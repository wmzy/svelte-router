/* @flow */

import Router from './router'
import { HashHistory } from './history/hash'

export default class HashRouter extends Router {
  constructor (options) {
    super(options)

    this.mode = 'hash'
    this.history = new HashHistory(this, this.options.base, !!this.options.fallback)
  }
}
