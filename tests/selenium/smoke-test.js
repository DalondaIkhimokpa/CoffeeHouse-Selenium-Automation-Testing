const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Smoke Test', function () {
  this.timeout(10000);

  it('should open the homepage', async function () {
    const options = new chrome.Options();
    options.addArguments('--headless'); // Headless for GitHub Actions
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--user-data-dir=/tmp/chrome-profile');

    const driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    try {
      await driver.get('http://localhost:8080');
    } finally {
      await driver.quit();
    }
  });
});

