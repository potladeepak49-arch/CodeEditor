export const LANGUAGES = [
  { id: 'javascript', label: 'JavaScript', judge0Id: 63,  monacoId: 'javascript', extension: 'js',   color: '#f7df1e' },
  { id: 'python',     label: 'Python',     judge0Id: 71,  monacoId: 'python',     extension: 'py',   color: '#3776ab' },
  { id: 'java',       label: 'Java',       judge0Id: 62,  monacoId: 'java',       extension: 'java', color: '#ed8b00' },
  { id: 'cpp',        label: 'C++',        judge0Id: 54,  monacoId: 'cpp',        extension: 'cpp',  color: '#00599c' },
  { id: 'c',          label: 'C',          judge0Id: 50,  monacoId: 'c',          extension: 'c',    color: '#a8b9cc' },
]

export const DEFAULT_CODE = {
  javascript: `// JavaScript\nconsole.log("Hello, World!");`,
  python:     `# Python\nprint("Hello, World!")`,
  java:       `// Java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
  cpp:        `// C++\n#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
  c:          `// C\n#include <stdio.h>\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
}

export function getLanguageById(id) {
  return LANGUAGES.find(l => l.id === id) ?? LANGUAGES[0]
}