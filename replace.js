const fs = require('fs');

const file = 'src/pages/AdminPage.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/'drivingCourses'/g, "'driving_courses_v2'");

fs.writeFileSync(file, content);
console.log('Replaced in AdminPage.tsx');
