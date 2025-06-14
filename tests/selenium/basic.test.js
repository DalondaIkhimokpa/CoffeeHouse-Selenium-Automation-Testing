const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

// Debugging function to save screenshots
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
  this.timeout(60000); // Increased timeout for CI
  let driver;

  before(async () => {
    console.log('\n🚀 Launching browser...');
    
    // Configure for both local Docker and GitHub Actions
    const seleniumUrl = process.env.SELENIUM_REMOTE_URL || 'http://localhost:4444/wd/hub';
    
    try {
      driver = await new Builder()
        .forBrowser('chrome')
        .usingServer(seleniumUrl) // Connect to Dockerized Selenium
        .build();
        
      console.log(`✅ Connected to Selenium at ${seleniumUrl}`);
    } catch (err) {
      console.error('❌ Failed to initialize driver:', err);
      throw err;
    }
  });

  it('should load homepage', async () => {
    const testUrl = process.env.TEST_URL || 'http://localhost:8080';
    console.log(`\n🌐 Navigating to ${testUrl}...`);
    
    try {
      await driver.get(testUrl);
      const actualTitle = await driver.getTitle();
      console.log(`ℹ️ Actual page title: "${actualTitle}"`);
      
      if (!actualTitle.includes('Coffee House')) {
        await takeScreenshot(driver, 'homepage-wrong-title');
        throw new Error(`Expected title to contain "Coffee House", got "${actualTitle}"`);
      }
      
      console.log('✅ Homepage loaded successfully');
      await takeScreenshot(driver, 'homepage-success');
    } catch (err) {
      await takeScreenshot(driver, 'homepage-failure');
      throw err;
    }
  });

  it('should have menu section', async () => {
    console.log('\n🔍 Looking for menu section...');
    
    try {
      const menu = await driver.wait(
        until.elementLocated(By.id('menu')),
        10000 // Increased wait time
      );
      
      console.log('✅ Menu section found');
      await takeScreenshot(driver, 'menu-found');
      
      // Additional verification
      const isVisible = await menu.isDisplayed();
      if (!isVisible) {
        throw new Error('Menu exists but is not visible');
      }
    } catch (err) {
      await takeScreenshot(driver, 'menu-missing');
      console.error('❌ Menu test failed:', err.message);
      throw err;
    }
  });

  after(async () => {
    if (driver) {
      try {
        console.log('\n🛑 Closing browser...');
        await driver.quit();
      } catch (err) {
        console.error('⚠️ Error while closing browser:', err.message);
      }
    }
  });
});