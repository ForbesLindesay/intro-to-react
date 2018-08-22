const nodeVersion = process.version;
const match = /^v(\d+)\.(\d+)\.(\d+)$/.exec(nodeVersion);
if (!match) {
  printNodeAdvice();
}
const major = parseInt(match[1], 10);
const minor = parseInt(match[1], 10);
const patch = parseInt(match[1], 10);
if (major !== 8 && major !== 10) {
  printNodeAdvice();
}
if (major === 8 && minor < 11) {
  printNodeAdvice();
}
if (major === 10 && minor < 9) {
  printNodeAdvice();
}

function printNodeAdvice() {
  console.log(nodeVersion + ' is not a supported node version.');
  console.log('Expected version to match ^8.11.4 or ^10.9.0');
  console.log('');
  console.log('Please install either the LTS or Current version.');
  console.log('You can download the latest versions from https://nodejs.org/');
  if (process.platform === 'darwin') {
    console.log('');
    console.log(
      'On OSX, you may wish to use a tool like https://github.com/creationix/nvm to manage your node version'
    );
  }
  console.log('');
  process.exit(1);
}

const pkg = require('./package.json');
const dependencies = Object.keys(pkg.dependencies || {}).concat(
  Object.keys(pkg.devDependencies || {})
);
dependencies.forEach(dependency => {
  try {
    require(dependency + '/package.json');
  } catch (ex) {
    console.log('Missing dependency ' + dependency);
    console.log('Please run `yarn install`');
    process.exit(1);
  }
});

console.log("It looks like you're all set!");
