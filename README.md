# ☕️ Coffee House Website ☕️


# Tech Stack

[![Selenium](https://img.shields.io/badge/Selenium-43B02A?style=for-the-badge&logo=Selenium&logoColor=white)](https://selenium.dev)
[![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.java.com)
[![Mocha](https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=Mocha&logoColor=white)](https://mochajs.org)
[![ChromeDriver](https://img.shields.io/badge/ChromeDriver-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white)](https://chromedriver.chromium.org)
[![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net)
[![MaterializeCSS](https://img.shields.io/badge/Materialize-CSS-ee6e73?logo=material-design&logoColor=white)](https://materializecss.com)
[![PHPUnit Tests](https://github.com/DalondaIkhimokpa/CoffeeHouse-Selenium-Automation-Testing/actions/workflows/phpunit-tests.yml/badge.svg)](https://github.com/DalondaIkhimokpa/CoffeeHouse-Selenium-Automation-Testing/actions/workflows/phpunit-tests.yml)
[![Selenium Tests](https://github.com/DalondaIkhimokpa/CoffeeHouse-Selenium-Automation-Testing/actions/workflows/selenium-tests.yml/badge.svg)](https://github.com/DalondaIkhimokpa/CoffeeHouse-Selenium-Automation-Testing/actions/workflows/selenium-tests.yml)

## Project Overview

The Coffee Shop Website is a visually appealing and responsive web application designed to showcase the offerings of a coffee shop. It includes sections for navigation, testimonials, a parallax effect, and a footer with contact information. The project uses Materialize CSS, Tailwind CSS, and custom styles for a modern and professional look.

## View Site: https://coffee-house-selenium-automation-te.vercel.app/#!


## Features
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Navigation Bar**: Includes links to Home, About, Menu, and Testimonials sections.
- **Hero Section**: A visually engaging introduction to the coffee shop.
- **Testimonials**: Customer reviews displayed with star ratings.
- **Parallax Effect**: Adds depth and visual appeal to the website.
- **Footer**: Contains contact information and social media links.

## Technologies Used
- **HTML5**: Structure of the website.
- **CSS3**: Styling and layout.
- **Materialize CSS**: Pre-built components for faster development.
- **Selenium WebDriver**: Automated browser testing.
- **Mocha**: Test runner for JavaScript.

```
## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/DalondaIkhimokpa/coffeeshop-materialize-css.git
   ```
2. Navigate to the project directory:
   ```bash
   cd coffeeshop-materialize-css
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage
1. Start a local server to serve the website:
   ```bash
   npm run start-server
   ```
2. Open `http://localhost:8080` in your browser to view the website.
3. Run tests using Mocha and Selenium:
   ```bash
   npm test
   ```

## Testing
The project uses Selenium WebDriver for browser automation testing and Mocha as the test runner. Tests are located in the `tests/selenium/` directory.

### Example Test Script
```javascript
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Coffee Shop Website Tests', function () {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit();
    });

    it('should load the homepage', async function () {
        await driver.get('http://localhost:8080/index.html');
        const title = await driver.getTitle();
        assert.strictEqual(title, 'Coffee House | Premium Coffee Experience');
    });

    it('should navigate to the About section', async function () {
        const aboutLink = await driver.findElement(By.linkText('About'));
        await aboutLink.click();
        const aboutSection = await driver.wait(until.elementLocated(By.id('about')), 5000);
        assert.ok(aboutSection);
    });
});
```

## License
This project is licensed under the ISC License. See the `LICENSE` file for details.

## Author
D. Ikhimokpa

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Acknowledgments
- Materialize CSS for pre-built components.
- Selenium WebDriver and Mocha for testing.
