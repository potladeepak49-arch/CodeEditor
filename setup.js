const fs = require('fs');

const folders = [
  'src/app/(auth)/login',
  'src/app/(auth)/register',
  'src/app/(main)/dashboard',
  'src/app/(main)/editor',
  'src/app/(main)/snippets/new',
  'src/app/(main)/snippets/[id]',
  'src/app/(main)/challenges/[id]',
  'src/app/(main)/profile',
  'src/app/s/[shareId]',
  'src/app/api/auth/[...nextauth]',
  'src/app/api/snippets/[id]/favorite',
  'src/app/api/execute',
  'src/app/api/challenges/[id]/submit',
  'src/app/api/users/[id]',
  'src/app/api/share',
  'src/components/ui',
  'src/components/editor',
  'src/components/layout',
  'src/components/dashboard',
  'src/components/snippets',
  'src/components/challenges',
  'src/components/auth',
  'src/lib/mock',
  'src/lib/validations',
  'src/models',
  'src/actions',
  'src/hooks',
  'src/store',
  'src/config'
];

folders.forEach(f => {
  fs.mkdirSync(f, { recursive: true });
  console.log('created:', f);
});

console.log('\nAll folders created successfully!');