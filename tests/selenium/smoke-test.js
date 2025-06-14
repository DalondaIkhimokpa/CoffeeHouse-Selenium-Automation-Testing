const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const http = require('http');

async function waitForServer(url, timeout = 10000) {
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const check = () => {
      http.get(url, (res) => {
        if (res.statusCode === 200) return resolve();
        retry();
      }).on('error', retry);
    };

    const retry = () => {
      if (Date.now() - start > timeout) return reject(new Error('Server not responding'));
      setTimeout(check, 1000);
    };

    check();
  });
}

describe('Smoke Test', function () {
  this.timeout(30000);

  it('should open the homepage', async function () {
    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--user-data-dir=/tmp/chrome-profile');

    const driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    try {
      console.log('Waiting for server...');
      await waitForServer('http://localhost:8080');
      console.log('Opening homepage...');
      await driver.get('http://localhost:8080');
    } finally {
      await driver.quit();
    }
  });
});


