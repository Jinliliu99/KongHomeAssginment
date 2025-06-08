//cypress.config.js
const { defineConfig } = require("cypress");

const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transport = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});


module.exports = defineConfig({

  reporter: 'cypress-mochawesome-reporter',

  video: false,

  reporterOptions: {

    charts: true,

    reportPageTitle: 'Cypress Inline Reporter',

    embeddedScreenshots: true, 

    inlineAssets: true, //Adds the asserts inline

  },



  e2e: {

    setupNodeEvents(on, config) {

      require('cypress-mochawesome-reporter/plugin')(on);
      require('cypress-email-results')(on, config, {
        email: ['526194578@qq.com'],
        dry: true,
        transport,
      })

    },
    baseUrl: 'http://localhost:8002'
  },

});