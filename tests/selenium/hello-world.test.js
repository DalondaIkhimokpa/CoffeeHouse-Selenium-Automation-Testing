const BASE_URL = process.env.CI ? 'http://localhost:8080' : 'http://localhost:8080';
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Hello World Selenium Test', function() {
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        setChromeOptions(new chrome.Options().headless()) // <== Important
    });

    after(async function() {
        await driver.quit();
    });

    it('should open the website and check the title', async function() {
        await driver.get('http://example.com');
        const title = await driver.getTitle();
        assert.strictEqual(title, 'Example Domain');
    });
});