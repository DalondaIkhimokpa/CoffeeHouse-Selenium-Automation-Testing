const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');

// Ensure screenshot directory exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function takeScreenshot(driver, name) {
  try {
    const screenshot = await driver.takeScreenshot();
    const filePath = path.join(SCREENSHOT_DIR, `${name}-${Date.now()}.png`);
    fs.writeFileSync(filePath, screenshot, 'base64');
    console.log(`📸 Screenshot saved: ${filePath}`);
    return filePath;
  } catch (err) {
    console.error('⚠️ Failed to take screenshot:', err.message);
    return null;
  }
}

describe('Navigation Tests', function() {
  this.timeout(30000);
  let driver;

  before(async function() {
    try {
      driver = await new Builder()
        .forBrowser('chrome')
        .usingServer(process.env.SELENIUM_HOST || 'http://localhost:4444/wd/hub')
        .build();
      console.log('✅ WebDriver initialized');
    } catch (err) {
      console.error('❌ WebDriver initialization failed:', err);
      throw err;
    }
  });

  after(async function() {
    if (driver) {
      try {
        await driver.quit();
        console.log('🛑 WebDriver closed');
      } catch (err) {
        console.error('⚠️ Error closing WebDriver:', err);
      }
    }
  });

  it('should navigate to About section', async function() {
    let screenshotPath;
    try {
      // Load initial page
      const pageUrl = `${BASE_URL}/index.html`;
      console.log(`🌐 Navigating to ${pageUrl}`);
      await driver.get(pageUrl);
      
      // Wait for navigation to be interactive
      await driver.wait(until.elementLocated(By.css('body')), 5000);
      
      // Find and click About link
      const aboutLink = await driver.wait(
        until.elementLocated(By.linkText('About')),
        10000
      );
      await aboutLink.click();
      
      // Verify navigation
      const aboutSection = await driver.wait(
        until.elementLocated(By.id('about')),
        10000
      );
      
      // Check visibility
      const isDisplayed = await aboutSection.isDisplayed();
      assert(
        isDisplayed,
        'About section should be visible after navigation'
      );
      
      screenshotPath = await takeScreenshot(driver, 'navigation-success');
      console.log('✅ Successfully navigated to About section');
      
    } catch (err) {
      screenshotPath = await takeScreenshot(driver, 'navigation-fail');
      console.error(`❌ Navigation test failed. Check screenshot: ${screenshotPath}`);
      throw new Error(`Navigation test failed: ${err.message}`);
    }
  });
});