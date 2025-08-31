const fs = require('fs');
const path = require('path');
const dist = path.join(__dirname, '..', 'dist');
const index = path.join(dist, 'index.html');
const dest = path.join(dist, '404.html');
if (!fs.existsSync(index)) {
    console.error('index.html not found in dist. Make sure to run build first.');
    process.exit(1);
}
fs.copyFileSync(index, dest);
console.log('Copied index.html to 404.html');
