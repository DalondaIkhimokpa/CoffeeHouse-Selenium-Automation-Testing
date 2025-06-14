const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

// You'll need to add this to each test file that uses screenshots
async function takeScreenshot(driver, name) {
  const screenshot = await driver.takeScreenshot();
  fs.writeFileSync(`${name}.png`, screenshot, 'base64');
  console.log(`📸 Screenshot saved: ${name}.png`);
}

describe('Navigation Tests', function() {
    this.timeout(30000);
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });

    it('should navigate to About section', async function() {
        await driver.get('http://localhost:8080/index.html');
        const aboutLink = await driver.findElement(By.linkText('About'));
        await aboutLink.click();
        const aboutSection = await driver.wait(until.elementLocated(By.id('about')), 5000);
        console.log('Navigation to About section successful:', !!aboutSection);
        await takeScreenshot(driver, 'about-section');
    });
});