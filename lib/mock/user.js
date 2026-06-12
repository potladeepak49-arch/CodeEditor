export const mockUser = {
  id: 'user_01',
  name: 'Alex Chen',
  username: 'alexchen',
  email: 'alex@codeeditor.dev',
  avatar: null,
  bio: 'Full-stack developer. Building things.',
  role: 'user',
  preferences: {
    theme: 'vs-dark',
    fontSize: 14,
    language: 'javascript',
    tabSize: 2,
  },
  stats: {
    snippetsCount: 12,
    executionsCount: 47,
    challengesSolved: 5,
    lastActiveAt: new Date().toISOString(),
  },
  createdAt: '2024-11-01T00:00:00Z',
}