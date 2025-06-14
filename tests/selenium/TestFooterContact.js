const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const fs = require('fs');

const BASE_URL = process.env.CI ? 'http://localhost:8080' : 'http://localhost:8080';

async function takeScreenshot(driver, name) {
  const screenshot = await driver.takeScreenshot();
  fs.writeFileSync(`${name}.png`, screenshot, 'base64');
  console.log(`📸 Screenshot saved: ${name}.png`);
}

describe('Footer Tests', function () {
  this.timeout(30000);
  let driver;

  before(async function () {
    const options = new chrome.Options()
      .addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage', '--user-data-dir=/tmp/chrome-profile');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    // Wait for server in CI
    await new Promise(resolve => setTimeout(resolve, 5000));
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  it('should display correct contact information', async function () {
    await driver.get(BASE_URL);
    const address = await driver.findElement(By.css('.address p')).getText();
    assert(address.includes('123 Coffee Street, Brewville'));
    await takeScreenshot(driver, 'footer-contact');
  });
});

