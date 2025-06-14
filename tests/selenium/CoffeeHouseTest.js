const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

// Debugging function (unchanged)
async function takeScreenshot(driver, name) {
  try {
    const screenshot = await driver.takeScreenshot();
    const screenshotPath = `tests/selenium/screenshots/${name}.png`;
    fs.mkdirSync('tests/selenium/screenshots', { recursive: true });
    fs.writeFileSync(screenshotPath, screenshot, 'base64');
    console.log(`📸 Screenshot saved: ${screenshotPath}`);
  } catch (err) {
    console.error('⚠️ Failed to take screenshot:', err.message);
  }
}

describe('Coffee House Tests', function() {
  this.timeout(60000);
  let driver;

  before(async () => {
    console.log('\n🚀 Launching browser...');
    
    try {
      driver = await new Builder()
        .forBrowser('chrome')
        .usingServer(process.env.SELENIUM_REMOTE_URL || 'http://localhost:4444/wd/hub')
        .build();
        
      console.log('✅ Browser session started');
    } catch (err) {
      console.error('❌ Browser initialization failed:', err);
      throw err;
    }
  });

  it('should load homepage', async () => {
    const testUrl = process.env.TEST_URL || 'http://localhost:8080';
    console.log(`\n🌐 Navigating to ${testUrl}...`);
    
    try {
      await driver.get(testUrl);
      const actualTitle = await driver.getTitle();
      console.log(`ℹ️ Page title: "${actualTitle}"`);
      
      if (!actualTitle.includes('Coffee House')) {
        await takeScreenshot(driver, 'homepage-title-fail');
        throw new Error(`Title missing "Coffee House" (actual: "${actualTitle}")`);
      }
      
      await takeScreenshot(driver, 'homepage-success');
    } catch (err) {
      await takeScreenshot(driver, 'homepage-load-fail');
      throw err;
    }
  });

  it('should have visible menu section', async () => {
    console.log('\n🔍 Checking menu section...');
    
    try {
      // More flexible element location
      const menu = await driver.wait(
        until.elementLocated(By.css('#menu, [data-testid="menu"], [class*="menu"]')),
        15000
      );
      
      if (!(await menu.isDisplayed())) {
        await takeScreenshot(driver, 'menu-not-visible');
        throw new Error('Menu exists but is not visible');
      }
      
      await takeScreenshot(driver, 'menu-visible');
    } catch (err) {
      await takeScreenshot(driver, 'menu-missing');
      throw err;
    }
  });

  after(async () => {
    if (driver) {
      try {
        await driver.quit();
        console.log('\n🛑 Browser closed');
      } catch (err) {
        console.error('⚠️ Error closing browser:', err.message);
      }
    }
  });
});