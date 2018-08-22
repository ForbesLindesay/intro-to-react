const crypto = require('crypto');
const fs = require('fs');
const cp = require('child_process');
const lsr = require('lsr').lsrSync;
const rimraf = require('rimraf').sync;

const stepsDir = __dirname + '/../src/steps';

const steps = fs.readdirSync(stepsDir).filter(step => /^\d\d\-/.test(step));

const packageJSON = fs.readFileSync(stepsDir + '/00-base/package.json', 'utf8');
const packageJSONCheck = fs.readFileSync(__dirname + '/package.json-check', 'utf8');
if (packageJSONCheck !== packageJSON) {
  steps.forEach(step => {
    fs.writeFileSync(stepsDir + '/' + step + '/package.json', packageJSON);
  });

  fs.writeFileSync(stepsDir + '/base/package.json', packageJSON);

  rimraf(stepsDir + '/base/yarn.lock');
  rimraf(stepsDir + '/base/package-lock.json');
  rimraf(stepsDir + '/base/node_modules');
  const yarnResult = cp.spawnSync('yarn', {
    cwd: stepsDir + '/base',
    stdio: 'inherit'
  });
  if (yarnResult.status !== 0) {
    process.exit(yarnResult.status);
  }
  rimraf(stepsDir + '/base/node_modules');
  const npmResult = cp.spawnSync('npm', ['install'], {
    cwd: stepsDir + '/base',
    stdio: 'inherit'
  });
  if (npmResult.status !== 0) {
    process.exit(npmResult.status);
  }

  fs.unlinkSync(stepsDir + '/base/package.json');

  const packageLock = fs.readFileSync(stepsDir + '/base/package-lock.json', 'utf8');
  steps.forEach(step => {
    fs.writeFileSync(stepsDir + '/' + step + '/package-lock.json', packageLock);
  });
  const yarnLock = fs.readFileSync(stepsDir + '/base/yarn.lock', 'utf8');
  steps.forEach(step => {
    fs.writeFileSync(stepsDir + '/' + step + '/yarn.lock', yarnLock);
  });
  steps.forEach(step => {
    rimraf(stepsDir + '/' + step + '/node_modules');
  });
  fs.writeFileSync(__dirname + '/package.json-check', packageJSON);
} else {
  rimraf(stepsDir + '/base/node_modules');
  fs.writeFileSync(stepsDir + '/base/package.json', packageJSON);
  cp.execSync('yarn', {cwd: stepsDir + '/base', stdio: 'inherit'});
  fs.unlinkSync(stepsDir + '/base/package.json');
}
