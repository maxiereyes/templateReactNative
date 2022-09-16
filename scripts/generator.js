const inquirer = require('inquirer')
const fs = require('fs')
const os = require('os')
const {execSync} = require('child_process')

const PROJECT_PATH = process.cwd();
const PACKAGE_JSON_PATH = `${PROJECT_PATH}/package.json`;
const PROJECT_SRC_PATH = `${PROJECT_PATH}/src`

const OPTIONAL_LIBRARIES = {
  'react-native-async-storage': '^0.0.1',
  'react-native-device-info': '^8.7.0',
  'react-i18next': '^11.16.5',
  'react-hook-form': '^7.29.0',
  'yup': '^0.32.11',
  'axios': '^0.26.1',
  'react-query': '^3.34.19',
};

const QUESTIONS = [
  {
    name: "libraries",
    "type": "checkbox",
    default: ['axios'],
    "message": "Select libraries to install",
    "choices": Object.keys(OPTIONAL_LIBRARIES)
  }
];

const optionalFolders = [
  { name: "api", condition: (libs) => libs.includes("orval") || libs.includes("react-query") },
  { name: "i18n", condition: (libs) => libs.includes('react-i18next') }
];

const inquire = (callback) => inquirer.prompt(QUESTIONS)
  .then((answers) => {
    let newPackageJson;
    try {
      const projectPackageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, { encoding: 'utf8' }));
      newPackageJson = {
        ...projectPackageJson,
        dependencies: {
          ...projectPackageJson.dependencies,
          ...answers.libraries.reduce((acc, it) => ({ ...acc, [it]: OPTIONAL_LIBRARIES[it] }), {})
        }
      };
    } catch (error) {
      throw new Error(`Unable to parse package.json: ${PACKAGE_JSON_PATH}`);
    }

    // add folders in src for selected optional libs
    optionalFolders.forEach(({ name, condition }) => {
      if (condition(answers.libraries)) {
        const newDir = `${PROJECT_SRC_PATH}/${name}`
        fs.mkdirSync(newDir);
        fs.writeFileSync(`${newDir}/.gitkeep`, "");
      }
    })

    // add new libs to dependencies
    fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(newPackageJson, null, 2) + os.EOL);

    // init git repo to install hooks with husky
    execSync(`git init "${PROJECT_PATH}"`);

    callback(true);
  });

module.exports = inquire