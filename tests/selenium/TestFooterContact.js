const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');

// Add this screenshot function INSIDE the same test file
async function takeScreenshot(driver, name) {
  const screenshot = await driver.takeScreenshot();
  fs.writeFileSync(`${name}.png`, screenshot, 'base64');
  console.log(`📸 Screenshot saved: ${name}.png`);
}

describe('Footer Tests', function() {
    this.timeout(30000);
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });

    it('should display correct contact information', async function() {
        await driver.get('http://localhost:8080');
        const address = await driver.findElement(By.css('.address p')).getText();
        assert(address.includes('123 Coffee Street, Brewville'));
        
        // Now this will work since takeScreenshot is defined in this file
        await takeScreenshot(driver, 'footer-contact');
    });
});
