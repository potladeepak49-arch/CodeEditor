const fs = require('fs');

const pages = [
  'app/dashboard',
  'app/editor',
  'app/snippets',
  'app/snippets/new',
  'app/snippets/[id]',
  'app/challenges',
  'app/challenges/[id]',
  'app/profile',
];

pages.forEach(f => {
  fs.mkdirSync(f, {recursive: true});
  console.log('created:', f);
});

const placeholders = [
  ['app/dashboard/page.js',   'Dashboard'],
  ['app/editor/page.js',      'Editor'],
  ['app/snippets/page.js',    'Snippets'],
  ['app/challenges/page.js',  'Challenges'],
  ['app/profile/page.js',     'Profile'],
];

placeholders.forEach(([filePath, name]) => {
  const content = "export default function " + name + "Page() {\n  return <div className='p-8 text-foreground'>" + name + " — coming soon</div>\n}";
  fs.writeFileSync(filePath, content);
  console.log('wrote:', filePath);
});

fs.mkdirSync('components/layout', {recursive: true});
fs.mkdirSync('components/editor', {recursive: true});
fs.mkdirSync('components/dashboard', {recursive: true});
fs.mkdirSync('components/snippets', {recursive: true});
fs.mkdirSync('components/challenges', {recursive: true});
fs.mkdirSync('components/auth', {recursive: true});
fs.mkdirSync('lib/mock', {recursive: true});
fs.mkdirSync('config', {recursive: true});
fs.mkdirSync('store', {recursive: true});
fs.mkdirSync('hooks', {recursive: true});

console.log('All done!');