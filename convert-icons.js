const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Install sharp if not already installed
try {
  require.resolve('sharp');
  console.log('Sharp is already installed');
} catch (e) {
  console.log('Installing sharp...');
  execSync('npm install --save-dev sharp');
}

const sharp = require('sharp');

async function convertToIco(inputFile, outputFile) {
  try {
    console.log(`Processing ${inputFile}...`);
    
    // Create temp directory if it doesn't exist
    const tempDir = path.join(__dirname, 'temp_icons');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    
    // Resize to standard icon sizes
    const sizes = [16, 32, 48, 64, 128, 256];
    const tempFiles = [];
    
    for (const size of sizes) {
      console.log(`Creating ${size}x${size} version...`);
      const tempFile = path.join(tempDir, `temp_${path.basename(inputFile, '.png')}_${size}.png`);
      await sharp(inputFile)
        .resize(size, size)
        .toFile(tempFile);
      tempFiles.push(tempFile);
    }
    
    console.log(`Saving to ${outputFile}...`);
    
    // Install png-to-ico if not already installed
    try {
      require.resolve('png-to-ico');
      console.log('png-to-ico is already installed');
    } catch (e) {
      console.log('Installing png-to-ico...');
      execSync('npm install --save-dev png-to-ico');
    }
    
    const pngToIco = require('png-to-ico');
    const buffer = await pngToIco(tempFiles);
    fs.writeFileSync(outputFile, buffer);
    
    // Clean up temp files
    for (const tempFile of tempFiles) {
      fs.unlinkSync(tempFile);
    }
    fs.rmdirSync(tempDir);
    
    console.log(`Successfully created ${outputFile}`);
  } catch (error) {
    console.error(`Error converting ${inputFile}:`, error);
  }
}

// Convert image.png to image.ico
(async () => {
  try {
    await convertToIco(
      path.join(__dirname, 'build', 'image.png'),
      path.join(__dirname, 'build', 'image.ico')
    );
    
    await convertToIco(
      path.join(__dirname, 'build', 'image1.png'),
      path.join(__dirname, 'build', 'image1.ico')
    );
  } catch (error) {
    console.error('Conversion failed:', error);
  }
})();