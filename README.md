# Coffee House Website


# Tech Stack

[![Selenium](https://img.shields.io/badge/Selenium-43B02A?style=for-the-badge&logo=Selenium&logoColor=white)](https://selenium.dev)
[![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.java.com)
[![Mocha](https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=Mocha&logoColor=white)](https://mochajs.org)
[![ChromeDriver](https://img.shields.io/badge/ChromeDriver-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white)](https://chromedriver.chromium.org)
```


## Project Overview

The Coffee Shop Website is a visually appealing and responsive web application designed to showcase the offerings of a coffee shop. It includes sections for navigation, testimonials, a parallax effect, and a footer with contact information. The project uses Materialize CSS, Tailwind CSS, and custom styles for a modern and professional look.

## Features

-**Responsive Design**: Optimized for desktop and mobile devices.

-**Navigation Bar**: Includes links to Home, About, Menu, and Testimonials sections.

-**Hero Section**: A visually engaging introduction to the coffee shop.

-**Testimonials**: Customer reviews displayed with star ratings.

-**Parallax Effect**: Adds depth and visual appeal to the website.

-**Footer**: Contains contact information and social media links.

## Technologies Used

-**HTML5**: Structure of the website.

-**CSS3**: Styling and layout.

-**Materialize CSS**: Pre-built components for faster development.

-**Tailwind CSS**: Utility-first CSS framework for custom designs.

-**Font Awesome**: Icons for navigation and contact details.

-**Selenium WebDriver**: Automated browser testing.

-**Mocha**: Test runner for JavaScript.

## Installation

1. Clone the repository:

   ```bash

   ```

git clone https://github.com/yourusername/coffeeshop-materialize-css.git

```

2. Navigate to the project directory:

   ```bash

cd coffeeshop-materialize-css

```

3. Install dependencies:

   ```bash

   ```

npm install

```


## Usage

1. Open `index.html` or `coffee.html` in your browser to view the website.

2. Run tests using Mocha and Selenium:

   ```bash

npm test

```

## Testing

The project uses Selenium WebDriver for browser automation testing and Mocha as the test runner. Tests are located in the `tests/` directory.

### Example Test Script

```javascript

// filepath: tests/selenium.test.js

const { Builder, By, until } = require('selenium-webdriver');

constassert = require('assert');


describe('Coffee Shop Website Tests', function () {

letdriver;


before(asyncfunction () {

driver = awaitnewBuilder().forBrowser('chrome').build();

  });


after(asyncfunction () {

awaitdriver.quit();

  });


it('should load the homepage', asyncfunction () {

awaitdriver.get('http://localhost:8000/index.html');

consttitle = awaitdriver.getTitle();

assert.strictEqual(title, 'Coffee House | Premium Coffee Experience');

  });


it('should navigate to the About section', asyncfunction () {

constaboutLink = awaitdriver.findElement(By.linkText('About'));

awaitaboutLink.click();

constaboutSection = awaitdriver.wait(until.elementLocated(By.id('about')), 5000);

assert.ok(aboutSection);

  });

});

```

```#


## Project Overview

The Coffee Shop Website is a visually appealing and responsive web application designed to showcase the offerings of a coffee shop. It includes sections for navigation, testimonials, a parallax effect, and a footer with contact information. The project uses Materialize CSS, Tailwind CSS, and custom styles for a modern and professional look.


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

- **Tailwind CSS**: Utility-first CSS framework for custom designs.

- **Font Awesome**: Icons for navigation and contact details.

- **Selenium WebDriver**: Automated browser testing.

- **Mocha**: Test runner for JavaScript.


## Installation

1. Clone the repository:

   ```bash

   git clone https://github.com/yourusername/coffeeshop-materialize-css.git

```

2. Navigate to the project directory:

   ```bash

   ```

cd coffeeshop-materialize-css

```

3. Install dependencies:

   ```bash

npm install

```

## Usage

1. Open `index.html` or `coffee.html` in your browser to view the website.
2. Run tests using Mocha and Selenium:

   ```bash

   ```

npm test

```


## Testing

The project uses Selenium WebDriver for browser automation testing and Mocha as the test runner. Tests are located in the `tests/` directory.


### Example Test Script

```javascript

// filepath: tests/selenium.test.js

const { Builder, By, until } = require('selenium-webdriver');

constassert = require('assert');


describe('Coffee Shop Website Tests', function () {

letdriver;


before(asyncfunction () {

driver = awaitnewBuilder().forBrowser('chrome').build();

  });


after(asyncfunction () {

awaitdriver.quit();

  });


it('should load the homepage', asyncfunction () {

awaitdriver.get('http://localhost:8000/index.html');

consttitle = awaitdriver.getTitle();

assert.strictEqual(title, 'Coffee House | Premium Coffee Experience');

  });


it('should navigate to the About section', asyncfunction () {

constaboutLink = awaitdriver.findElement(By.linkText('About'));

awaitaboutLink.click();

constaboutSection = awaitdriver.wait(until.elementLocated(By.id('about')), 5000);

assert.ok(aboutSection);

  });

});

```

## Acknowledgments

- Materialize CSS for pre-built components.
- Tailwind CSS for utility-first styling.
- Font Awesome for icons.
- Selenium WebDriver and Mocha for testing.

## License

This project is licensed under the ISC License. See the `LICENSE` file for details.

## Author

Dalonda Ikhimokpa

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
