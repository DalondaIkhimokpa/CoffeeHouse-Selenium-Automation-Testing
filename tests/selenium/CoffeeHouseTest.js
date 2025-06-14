const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

// Debugging function to save screenshots
async function takeScreenshot(driver, name) {
  const screenshot = await driver.takeScreenshot();
  fs.writeFileSync(`${name}.png`, screenshot, 'base64');
  console.log(`📸 Screenshot saved: ${name}.png`);
}

describe('Coffee House Tests', function() {
  this.timeout(30000); // 30 second timeout
  let driver;

  before(async () => {
    console.log('\n🚀 Launching Chrome browser...');
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(new chrome.Options().headless()) // <== Important
      .build();
  });

  it('should load homepage', async () => {
    console.log('\n🌐 Navigating to http://localhost:8080...');
    await driver.get('http://localhost:8080');
    
    // Debug: Print actual title
    const actualTitle = await driver.getTitle();
    console.log(`ℹ️ Actual page title: "${actualTitle}"`);
    
    // Now checking for "Coffee House"
    if (!actualTitle.includes('Coffee House')) {
      await takeScreenshot(driver, 'wrong-title');
      throw new Error(`Expected title to contain "Coffee House", but got "${actualTitle}"`);
    }
    
    console.log('✅ Homepage loaded successfully');
  });

  it('should have menu section', async () => {
    console.log('\n🔍 Looking for menu section...');
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

  after(async () => {
    if (driver) {
      console.log('\n🛑 Closing browser...');
      await driver.quit();
    }
  });
});