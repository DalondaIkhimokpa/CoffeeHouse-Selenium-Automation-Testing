const BASE_URL = process.env.CI ? 'http://localhost:8080' : 'http://localhost:8080';
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

async function takeScreenshot(driver, name) {
  const screenshot = await driver.takeScreenshot();
  fs.writeFileSync(`${name}.png`, screenshot, 'base64');
  console.log(`📸 Screenshot saved: ${name}.png`);
}

describe('Navigation Tests', function () {
  this.timeout(30000);
  let driver;

  before(async function () {
    const options = new chrome.Options()
      .addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage', '--user-data-dir=/tmp/chrome-profile');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for server
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  it('should navigate to About section', async function () {
    await driver.get(`${BASE_URL}/index.html`);
    const aboutLink = await driver.findElement(By.linkText('About'));
    await aboutLink.click();
    const aboutSection = await driver.wait(until.elementLocated(By.id('about')), 5000);
    console.log('✅ Navigation to About section successful');
    await takeScreenshot(driver, 'about-section');
  });
});
