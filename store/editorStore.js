import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const DEFAULT_CODE = {
  javascript: `// JavaScript\nconsole.log("Hello, World!");`,
  python:     `# Python\nprint("Hello, World!")`,
  java:       `// Java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
  cpp:        `// C++\n#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
  c:          `// C\n#include <stdio.h>\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
}

export const useEditorStore = create(
  persist(
    (set, get) => ({
      language: 'javascript',
      theme:    'vs-dark',
      fontSize: 14,
      tabSize:  2,
      code:     DEFAULT_CODE['javascript'],
      stdin:    '',

      setLanguage: (language) => set({ language, code: DEFAULT_CODE[language] ?? '' }),
      setTheme:    (theme)    => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),
      setTabSize:  (tabSize)  => set({ tabSize }),
      setCode:     (code)     => set({ code }),
      setStdin:    (stdin)    => set({ stdin }),
      resetCode:   ()         => set({ code: DEFAULT_CODE[get().language] ?? '' }),
    }),
    {
      name: 'codeeditor-editor',
      partialState: (state) => ({
        language: state.language,
        theme:    state.theme,
        fontSize: state.fontSize,
        tabSize:  state.tabSize,
      }),
    }
  )
)