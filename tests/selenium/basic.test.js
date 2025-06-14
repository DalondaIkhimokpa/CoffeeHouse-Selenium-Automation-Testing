const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

// Enhanced debugging function
async function takeScreenshot(driver, name) {
  try {
    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync(`${name}.png`, screenshot, 'base64');
    console.log(`📸 Screenshot saved: ${name}.png`);
  } catch (err) {
    console.error('⚠️ Failed to take screenshot:', err.message);
  }
}

describe('Coffee House Tests', function() {
  // Increased timeout for CI environment
  this.timeout(60000); // 60 seconds for GitHub Actions
  let driver;

  before(async () => {
    console.log('\n🚀 Launching Chrome browser...');
    
    // Configure Chrome options for both local and CI environments
    const options = new chrome.Options();
    
    // Essential settings for GitHub Actions
    options.addArguments(
      '--headless=new',         // New headless mode
      '--no-sandbox',          // Needed for CI environments
      '--disable-dev-shm-usage', // Prevent /dev/shm issues
      '--window-size=1280,1024'  // Set consistent window size
    );
    
    // Additional settings for CI
    if (process.env.CI || process.env.GITHUB_ACTIONS) {
      options.addArguments('--disable-gpu'); // Disable GPU in CI
      console.log('ℹ️ Running in CI mode');
    }

    try {
      driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
      console.log('✅ Browser launched successfully');
    } catch (err) {
      console.error('❌ Failed to launch browser:', err);
      throw err;
    }
  });

  it('should load homepage', async () => {
    const url = process.env.TEST_URL || 'http://localhost:8080';
    console.log(`\n🌐 Navigating to ${url}...`);
    
    try {
      await driver.get(url);
      
      // Debug: Print actual title
      const actualTitle = await driver.getTitle();
      console.log(`ℹ️ Actual page title: "${actualTitle}"`);
      
      if (!actualTitle.includes('Coffee House')) {
        await takeScreenshot(driver, 'wrong-title');
        throw new Error(`Expected title to contain "Coffee House", but got "${actualTitle}"`);
      }
      
      console.log('✅ Homepage loaded successfully');
      await takeScreenshot(driver, 'homepage-loaded');
    } catch (err) {
      await takeScreenshot(driver, 'page-load-failed');
      throw err;
    }
  });

  it('should have menu section', async () => {
    console.log('\n🔍 Looking for menu section...');
    try {
      const menu = await driver.wait(until.elementLocated(By.id('menu')), 10000); // Increased timeout
      console.log('✅ Menu section found');
      await takeScreenshot(driver, 'menu-found');
    } catch (err) {
      await takeScreenshot(driver, 'menu-missing');
      console.log('❌ Could not find menu section');
      throw err;
    }
  });

  after(async () => {
    if (driver) {
      console.log('\n🛑 Closing browser...');
      try {
        await driver.quit();
      } catch (err) {
        console.error('⚠️ Error while closing browser:', err.message);
      }
    }
  });
});