const cypress = require('cypress');
const cucumber = require('cypress-cucumber-preprocessor');
const browserify = require('@cypress/browserify-preprocessor');

module.exports = cypress.defineConfig({
    // numTestsKeptInMemory: 0,
    env: {
        uncaughtCypressException: false,
        hideXhr: true,
    },
    chromeWebSecurity: false,
    retries: {
        runMode: 1,
        openMode: 0,
    },
    // blockHosts: ['!*localhost*'],
    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
        specPattern: 'src/**/*.test.tsx',
        viewportWidth: 680,
        viewportHeight: 768,
    },
});
