const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

describe('Homepage Test', function () {
  this.timeout(30000);
  let driver;

  before(async () => {
    const options = new chrome.Options()
      .addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage', '--user-data-dir=/tmp/chrome-profile');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    // Wait for server in CI
    await new Promise(resolve => setTimeout(resolve, 5000));
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('should load http://localhost:8080', async function () {
    await driver.get('http://localhost:8080');
    await driver.wait(until.titleContains('Coffee House'), 5000);
    console.log('✅ Test passed!');
  });
});
