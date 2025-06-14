const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

const BASE_URL = process.env.CI ? 'http://localhost:8080' : 'http://localhost:8080';

// Debugging function to save screenshots
async function takeScreenshot(driver, name) {
  const screenshot = await driver.takeScreenshot();
  fs.writeFileSync(`${name}.png`, screenshot, 'base64');
  console.log(`📸 Screenshot saved: ${name}.png`);
}

describe('Coffee House Tests', function () {
  this.timeout(30000); // 30 second timeout
  let driver;

  before(async () => {
    console.log('⏳ Waiting for server to be ready...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('🚀 Launching Chrome browser...');
    const options = new chrome.Options()
      .addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage', '--user-data-dir=/tmp/chrome-profile');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  after(async () => {
    console.log('🛑 Closing browser...');
    if (driver) await driver.quit();
  });

  it('should load homepage', async () => {
    console.log(`🌐 Navigating to ${BASE_URL}...`);
    await driver.get(BASE_URL);

    const actualTitle = await driver.getTitle();
    console.log(`ℹ️ Actual page title: "${actualTitle}"`);

    if (!actualTitle.includes('Coffee House')) {
      await takeScreenshot(driver, 'wrong-title');
      throw new Error(`Expected title to contain "Coffee House", but got "${actualTitle}"`);
    }

    console.log('✅ Homepage loaded successfully');
  });

  it('should have menu section', async () => {
    console.log('🔍 Looking for menu section...');
    try {
      const menu = await driver.wait(until.elementLocated(By.id('menu')), 5000);
      console.log('✅ Menu section found');
      await takeScreenshot(driver, 'menu-found');
    } catch (err) {
      await takeScreenshot(driver, 'menu-missing');
      console.log('❌ Could not find menu section. Check screenshot: menu-missing.png');
      throw err;
    }
  });
});
