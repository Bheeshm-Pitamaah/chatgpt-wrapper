const fs = require('fs');
const path = require('path');

// Read the package.json file
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Update the icon paths in the electron-builder configuration
console.log('Updating electron-builder configuration...');

// Add the new icons as options
packageJson.build.win.icon = [
  'build/icon.ico',
  'build/image.ico',
  'build/image1.ico'
];

// Save the updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('Configuration updated successfully!');

console.log('\nTo use these icons in your application:');
console.log('1. For Windows: Use "npm run dist:win" to build with the new icons');
console.log('2. You can select which icon to use by modifying package.json');
console.log('   - Current options: build/icon.ico, build/image.ico, build/image1.ico');
console.log('   - Set your preferred icon in the build.win.icon property');