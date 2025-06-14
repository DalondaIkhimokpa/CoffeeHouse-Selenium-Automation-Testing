const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const fs = require('fs');

// Environment configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';
const SELENIUM_HOST = process.env.SELENIUM_HOST || 'http://localhost:4444/wd/hub';

// Screenshot function
async function takeScreenshot(driver, name) {
  const screenshot = await driver.takeScreenshot();
  fs.writeFileSync(`${name}.png`, screenshot, 'base64');
  console.log(`📸 Screenshot saved: ${name}.png`);
}

describe('Testimonials Tests', function() {
    this.timeout(30000);
    let driver;

    before(async function() {
        console.log('\n🚀 Launching Chrome browser...');
        driver = await new Builder()
            .forBrowser('chrome')
            .usingServer(SELENIUM_HOST)
            .setChromeOptions(new chrome.Options()
                .headless()
                .addArguments('--no-sandbox')
                .addArguments('--disable-dev-shm-usage')
            )
            .build();
    });

    after(async function() {
        if (driver) {
            console.log('\n🛑 Closing browser...');
            await driver.quit();
        }
    });

    it('should display correct testimonial text', async function() {
        console.log(`\n🌐 Navigating to ${BASE_URL}/index.html...`);
        await driver.get(`${BASE_URL}/index.html`);

        const testimonial = await driver.wait(
            until.elementLocated(By.css('.card-panel p')), 
            10000
        );
        const text = await testimonial.getText();
        console.log('Testimonial text:', text);

        assert(
            text.includes('Their pastries are as amazing as their coffee'),
            'Testimonial content is incorrect'
        );
        
        await takeScreenshot(driver, 'testimonial-text');
        console.log('✅ Testimonial content is correct');
    });
});