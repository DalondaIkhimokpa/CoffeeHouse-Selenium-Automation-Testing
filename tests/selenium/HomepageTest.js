const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Homepage Test', function() {
    this.timeout(30000);
    let driver;

    it('should load http://localhost:8080', async function() {
        driver = await new Builder().forBrowser('chrome').build();
        setChromeOptions(new chrome.Options().headless()) // <== Important
        try {
            await driver.get('http://localhost:8080');
            await driver.wait(until.titleIs('Coffee House'), 1000);
            console.log('✅ Test passed!');
        } finally {
            await driver.quit();
        }
    });
});