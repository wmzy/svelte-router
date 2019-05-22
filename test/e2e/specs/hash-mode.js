module.exports = {
  'Hash mode': function (browser) {
    browser
      .url('http://localhost:8080/hash-mode/')
      .waitForElementPresent('#app', 1000)
      .assert.count('li a', 7)
      .assert.attributeContains('li:nth-child(1) a', 'href', '/hash-mode/#/')
      .assert.attributeContains('li:nth-child(2) a', 'href', '/hash-mode/#/foo')
      .assert.attributeContains('li:nth-child(3) a', 'href', '/hash-mode/#/bar')
      .assert.attributeContains('li:nth-child(4) a', 'href', '/hash-mode/#/%C3%A9')
      .assert.attributeContains('li:nth-child(5) a', 'href', '/hash-mode/#/%C3%A9/%C3%B1')
      .assert.attributeContains('li:nth-child(6) a', 'href', '/hash-mode/#/%C3%A9/%C3%B1?t=%25%C3%B1')
      .assert.containsText('.view', 'home')

      .click('li:nth-child(2) a')
      .assert.urlEquals('http://localhost:8080/hash-mode/#/foo')
      .assert.containsText('.view', 'foo')

      .click('li:nth-child(3) a')
      .assert.urlEquals('http://localhost:8080/hash-mode/#/bar')
      .assert.containsText('.view', 'bar')

      .click('li:nth-child(1) a')
      .assert.urlEquals('http://localhost:8080/hash-mode/#/')
      .assert.containsText('.view', 'home')

    // check initial visit
      .url('http://localhost:8080/hash-mode/#/foo')
      .waitForElementPresent('#app', 1000)
      .assert.containsText('.view', 'foo')
      // direct visit encoded unicode
      .url('http://localhost:8080/hash-mode/#/%C3%A9')
      .waitForElementPresent('#app', 1000)
      .assert.containsText('.view', 'unicode')
      // direct visit raw unicode
      .url('http://localhost:8080/hash-mode/#/%C3%A9/%C3%B1')
      .waitForElementPresent('#app', 1000)
      .assert.containsText('.view', 'unicode: ñ')
      // TODO: Doesn't seem to work on PhantomJS
      // .click('li:nth-child(7)')
      // .assert.urlEquals('http://localhost:8080/hash-mode/#/%C3%A9/%C3%B1?t=%25')
      // .assert.containsText('.view', 'unicode: ñ')
      // .assert.containsText('#query-t', '%')
      // direct visit
      .url('http://localhost:8080/hash-mode/#/%C3%A9/%C3%B1?t=%25')
      .waitForElementPresent('#app', 1000)
      .assert.containsText('.view', 'unicode: ñ')
      .assert.containsText('#query-t', '%')
      .end()
  }
}
