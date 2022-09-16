#!/usr/bin/env node
console.log('This is post init script')
/* import ora from 'ora';
import { inquire } from './generator';

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
  }); */