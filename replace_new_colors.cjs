const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace old oranges with new orange #FF7112
  content = content.replace(/#FF5500/ig, '#FF7112');
  content = content.replace(/#F48020/ig, '#FF7112');
  
  // Replace dark variants if any (like #CC4400 or #D36C18) with a darker shade of #FF7112, let's say #E05A00
  content = content.replace(/#CC4400/ig, '#E05A00');
  content = content.replace(/#D36C18/ig, '#E05A00');
  content = content.replace(/#A04500/ig, '#B34700'); // Even darker

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated colors in: ' + filePath);
  }
}

function walkDirs(dirInfo) {
  const files = fs.readdirSync(dirInfo);
  for (const file of files) {
    const fullPath = path.join(dirInfo, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDirs(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css') || fullPath.endsWith('.js') || fullPath.endsWith('.cjs')) {
      replaceInFile(fullPath);
    }
  }
}

walkDirs('src');
