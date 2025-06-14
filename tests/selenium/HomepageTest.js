const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Homepage Test', function() {
    this.timeout(30000);
    let driver;

    before(async function() {
        driver = await new Builder()
            .forBrowser('chrome')
            .usingServer(process.env.SELENIUM_HOST || 'http://localhost:4444/wd/hub')
            .build();
    });

    after(async function() {
        if (driver) await driver.quit();
    });

    it('should verify homepage loads correctly', async function() {
        const testUrl = process.env.TEST_URL || 'http://localhost:8080 ';
        await driver.get(testUrl);
        
        // Wait for title with longer timeout
        await driver.wait(until.titleIs('Coffee House'), 5000);
        
        const actualTitle = await driver.getTitle();
        assert.strictEqual(
            actualTitle,
            'Coffee House',
            `Expected title "Coffee House" but got "${actualTitle}"`
        );
    });
});