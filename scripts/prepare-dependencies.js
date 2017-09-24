const crypto = require('crypto');
const fs = require('fs');
const cp = require('child_process');
const lsr = require('lsr').lsrSync;
const rimraf = require('rimraf').sync;

const stepsDir = __dirname + '/../src/steps';

const steps = fs.readdirSync(stepsDir).filter(step => /^\d\d\-/.test(step));

const packageJSON = fs.readFileSync(stepsDir + '/01-init/package.json', 'utf8');
const packageJSONCheck = fs.readFileSync(__dirname + '/package.json-check', 'utf8');
if (packageJSONCheck !== packageJSON) {
  steps.forEach(step => {
    fs.writeFileSync(stepsDir + '/' + step + '/package.json', packageJSON);
  });

  fs.writeFileSync(stepsDir + '/base/package.json', packageJSON);

  fs.unlinkSync(stepsDir + '/base/yarn.lock');
  fs.unlinkSync(stepsDir + '/base/package-lock.json');
  rimraf(stepsDir + '/base/node_modules');
  cp.execSync('yarn', {cwd: stepsDir + '/base', stdio: 'inherit'});
  rimraf(stepsDir + '/base/node_modules');
  cp.execSync('npm install', {cwd: stepsDir + '/base', stdio: 'inherit'});

  fs.unlinkSync(stepsDir + '/base/package.json');

  const packageLock = fs.readFileSync(stepsDir + '/base/package-lock.json', 'utf8');
  steps.forEach(step => {
    fs.writeFileSync(stepsDir + '/' + step + '/package-lock.json', packageLock);
  });
  const yarnLock = fs.readFileSync(stepsDir + '/base/yarn.lock', 'utf8');
  steps.forEach(step => {
    fs.writeFileSync(stepsDir + '/' + step + '/yarn.lock', yarnLock);
  });
  const nodeModules = lsr(stepsDir + '/base/node_modules');
  steps.forEach(step => {
    rimraf(stepsDir + '/' + step + '/node_modules');
    fs.mkdirSync(stepsDir + '/' + step + '/node_modules');
    nodeModules.forEach(entry => {
      if (entry.isDirectory()) {
        fs.mkdirSync(stepsDir + '/' + step + '/node_modules/' + entry.path.substr(2));
      }
      if (entry.isFile()) {
        fs.copyFileSync(
          entry.fullPath,
          stepsDir + '/' + step + '/node_modules/' + entry.path.substr(2)
        );
      }
    });
  });
  fs.writeFileSync(__dirname + '/package.json-check', packageJSON);
}
