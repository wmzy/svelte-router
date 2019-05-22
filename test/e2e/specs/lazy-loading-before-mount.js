module.exports = {
  'lazy loading before mount': function (browser) {
    browser
      .url('http://localhost:8080/lazy-loading-before-mount/')
      // wait for the Foo component to be resolved
      .click('#load-button')
      .waitForElementPresent('.foo', 1000)
      .assert.containsText('.view', 'foo')
      .end()
  }
}
