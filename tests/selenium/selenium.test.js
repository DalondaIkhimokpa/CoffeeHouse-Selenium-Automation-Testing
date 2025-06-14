const BASE_URL = process.env.CI ? 'http://localhost:8080' : 'http://localhost:8080';
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Selenium Test', function() {
    this.timeout(30000);
    let driver;

    it('should load example.com', async function() {
        driver = await new Builder().forBrowser('chrome').build();
        try {
            await driver.get('http://www.example.com');
            await driver.wait(until.titleIs('Example Domain'), 1000);
            console.log('✅ Test passed!');
        } finally {
            await driver.quit();
        }
    });
});