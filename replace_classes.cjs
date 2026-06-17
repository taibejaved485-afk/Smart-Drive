const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // text, bg, border, ring for red-600 -> #F48020
  content = content.replace(/text-red-600/g, 'text-[#F48020]');
  content = content.replace(/bg-red-600/g, 'bg-[#F48020]');
  content = content.replace(/border-red-600/g, 'border-[#F48020]');
  content = content.replace(/ring-red-600/g, 'ring-[#F48020]');
  
  // Hover & Active States
  content = content.replace(/hover:text-red-600/g, 'hover:text-[#F48020]');
  content = content.replace(/hover:bg-red-600/g, 'hover:bg-[#F48020]');
  content = content.replace(/hover:border-red-600/g, 'hover:border-[#F48020]');

  // red-650 & red-700 (darker shade -> #D36C18)
  content = content.replace(/text-red-650/g, 'text-[#D36C18]');
  content = content.replace(/bg-red-650/g, 'bg-[#D36C18]');
  content = content.replace(/text-red-700/g, 'text-[#D36C18]');
  content = content.replace(/bg-red-700/g, 'bg-[#D36C18]');
  content = content.replace(/hover:text-red-700/g, 'hover:text-[#D36C18]');
  content = content.replace(/hover:bg-red-700/g, 'hover:bg-[#D36C18]');
  
  // red-50 (light background -> #F48020/10)
  content = content.replace(/bg-red-50/g, 'bg-[#F48020]/10');
  content = content.replace(/hover:bg-red-50/g, 'hover:bg-[#F48020]/10');
  
  // red-100 (slightly darker light bg -> #F48020/20)
  content = content.replace(/bg-red-100/g, 'bg-[#F48020]/20');
  content = content.replace(/hover:bg-red-100/g, 'hover:bg-[#F48020]/20');
  
  // red-200 / 300 / 400 / 500 mapping
  content = content.replace(/border-red-500/g, 'border-[#F48020]');
  content = content.replace(/border-red-200/g, 'border-[#F48020]/30');
  content = content.replace(/border-red-100/g, 'border-[#F48020]/20');
  
  content = content.replace(/ring-red-500/g, 'ring-[#F48020]');
  content = content.replace(/text-red-500/g, 'text-[#F48020]/90');
  content = content.replace(/text-red-400/g, 'text-[#F48020]/70');
  content = content.replace(/text-red-800/g, 'text-[#A04500]');
  content = content.replace(/accent-red-650/g, 'accent-[#F48020]');
  
  content = content.replace(/decoration-red-600/g, 'decoration-[#F48020]');
  content = content.replace(/text-red-750/g, 'text-[#A04500]');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated classes in: ' + filePath);
  }
}

function walkDirs(dirInfo) {
  const files = fs.readdirSync(dirInfo);
  for (const file of files) {
    const fullPath = path.join(dirInfo, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDirs(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

walkDirs('src');
