const { Builder } = require('selenium-webdriver');

describe('Smoke Test', function () {
  this.timeout(10000); // 10 seconds max

  it('should open the homepage', async function () {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get('http://localhost:8080');
    } finally {
      await driver.quit();
    }
  });
});
