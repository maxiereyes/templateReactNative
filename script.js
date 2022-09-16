#!/usr/bin/env node

const ora = require ('ora')
const inquire = require('./scripts/generator')

const spinner = ora('Optional libraries setup');

new Promise((resolve) => {
  spinner.start();
  inquire(resolve);
})
  .then(() => {
    spinner.succeed();
  })
  .catch((error) => {
    spinner.fail(error);
    throw new Error(
      'Something went wrong during the post init script execution',
    );
  });
