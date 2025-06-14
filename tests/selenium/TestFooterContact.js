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

describe('Footer Tests', function() {
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

  it('should display correct contact information', async function() {
    try {
      console.log(`🌐 Navigating to ${BASE_URL}`);
      await driver.get(BASE_URL);
      
      // Wait for footer to load
      const footer = await driver.wait(
        until.elementLocated(By.css('footer')),
        10000
      );
      
      // Verify address
      const addressElement = await footer.findElement(By.css('.address p'));
      const addressText = await addressElement.getText();
      
      assert(
        addressText.includes('123 Coffee Street, Brewville'),
        `Expected address to contain "123 Coffee Street", got "${addressText}"`
      );
      
      await takeScreenshot(driver, 'footer-contact-success');
    } catch (err) {
      const screenshotPath = await takeScreenshot(driver, 'footer-contact-fail');
      console.error(`❌ Test failed. Check screenshot: ${screenshotPath}`);
      throw err;
    }
  });
});