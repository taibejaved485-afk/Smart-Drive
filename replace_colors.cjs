const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace #FF5500 with #F48020
  content = content.replace(/#FF5500/g, '#F48020');
  
  // Replace #CC4400 with a darker shade like #D36C18
  content = content.replace(/#CC4400/g, '#D36C18');
  
  // Also we might want to check for any red-600 still present if the user wants to migrate the whole site
  // content = content.replace(/text-red-600/g, 'text-[#F48020]');
  // content = content.replace(/bg-red-600/g, 'bg-[#F48020]');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated: ' + filePath);
  }
}

function walkDirs(dirInfo) {
  const files = fs.readdirSync(dirInfo);
  for (const file of files) {
    const fullPath = path.join(dirInfo, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDirs(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      replaceInFile(fullPath);
    }
  }
}

walkDirs('src');
