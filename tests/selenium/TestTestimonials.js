const BASE_URL = process.env.CI ? 'http://localhost:8080' : 'http://localhost:8080';
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

// Debugging function to save screenshots
async function takeScreenshot(driver, name) {
  const screenshot = await driver.takeScreenshot();
  fs.writeFileSync(`${name}.png`, screenshot, 'base64');
  console.log(`📸 Screenshot saved: ${name}.png`);
}
describe('Testimonials Tests', function() {
    this.timeout(30000);
    let driver;

    it('should display correct testimonial text', async function() {
        driver = await new Builder().forBrowser('chrome').build();
        try {
            await driver.get('http://localhost:8080/index.html'); // Replace with your local URL

            const testimonial = await driver.findElement(By.css('.card-panel p'));
            const text = await testimonial.getText();
            console.log('Testimonial text:', text);

            if (text.includes('Their pastries are as amazing as their coffee')) {
                console.log('Testimonial content is correct.');
            } else {
                console.log('Testimonial content is incorrect.');
            }
        } finally {
            await driver.quit();
        }
    });
});