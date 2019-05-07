/* @flow */

import Router from './router'
import { AbstractHistory } from './history/abstract'

export default class AbstractRouter extends Router {
  init () {
    this.mode = 'abstract'
    this.history = new AbstractHistory(this, this.options.base)
  }
}
