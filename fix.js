const fs = require('fs')

fs.rmSync('app/api/auth', { recursive: true, force: true })
fs.mkdirSync('app/api/auth/[...nextauth]', { recursive: true })

const content = `import { handlers } from '@/auth'
export const { GET, POST } = handlers
`

fs.writeFileSync('app/api/auth/[...nextauth]/route.js', content)
console.log('created:', fs.readdirSync('app/api/auth'))
console.log('content:', fs.readFileSync('app/api/auth/[...nextauth]/route.js', 'utf8'))