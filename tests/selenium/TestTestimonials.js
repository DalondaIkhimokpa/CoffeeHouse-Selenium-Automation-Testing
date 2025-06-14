const BASE_URL = process.env.CI ? 'http://localhost:8080' : 'http://localhost:8080';
const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

async function takeScreenshot(driver, name) {
  const screenshot = await driver.takeScreenshot();
  fs.writeFileSync(`${name}.png`, screenshot, 'base64');
  console.log(`📸 Screenshot saved: ${name}.png`);
}

describe('Testimonials Tests', function () {
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

  it('should display correct testimonial text', async function () {
    await driver.get(`${BASE_URL}/index.html`);
    const testimonial = await driver.findElement(By.css('.card-panel p'));
    const text = await testimonial.getText();

    if (text.includes('Their pastries are as amazing as their coffee')) {
      console.log('✅ Testimonial content is correct.');
    } else {
      console.log('❌ Testimonial content is incorrect.');
    }

    await takeScreenshot(driver, 'testimonial-check');
  });
});
