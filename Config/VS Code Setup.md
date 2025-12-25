## Theme i like and Installed

- **Dracula Official**
- **One Dark Pro**
- **Atom One Dark Theme**
- **Monokai Pro**
- **SynthWave ’84**
- **Noctis**

## Font That Wanted

- FiraCode
- cascadia-code
- JetBrains Mono

```JSON
{
  // ABHISECK_CONFIG_START
  // "editor.fontFamily": "Fira Code",
  // "editor.fontFamily": "Cascadia Code",
  "editor.fontFamily": "JetBrains Mono",
  "terminal.integrated.fontFamily": "'iosevka Term','JetBrains Mono', monospace",
  "editor.fontSize": 15,
  "editor.fontLigatures": true,
  "editor.formatOnSave": true,
  "explorer.openEditors.visible": 1,
  "editor.tabSize": 2,
  "editor.guides.bracketPairs": "active",
  "editor.bracketPairColorization.independentColorPoolPerBracketType": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "breadcrumbs.enabled": true,
  "editor.cursorBlinking": "phase",
  "editor.cursorStyle": "line",
  "explorer.autoReveal": true,
  "files.trimTrailingWhitespace": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "javascript.suggest.autoImports": true,
  "typescript.suggest.autoImports": true,
  "search.quickOpen.includeSymbols": true,
  "workbench.statusBar.visible": true,
  "editor.semanticHighlighting.enabled": true,
  "git.enableSmartCommit": true,
  "editor.formatOnPaste": true,
  "explorer.confirmDelete": false,
  "workbench.iconTheme": "material-icon-theme",
  "terminal.integrated.allowMnemonics": true,
  "editor.inlineSuggest.enabled": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "explorer.confirmDragAndDrop": false,
  "git.autofetch": true,
  "react-native-tools.showUserTips": false,
  "editor.linkedEditing": true,
  "javascript.updateImportsOnFileMove.enabled": "always",
  "todo-tree.tree.autoRefresh": true,
  "todo-tree.highlights.customHighlight": {
    "FIXME": {
      "foreground": "\#FFFFFF",
      "background": "\#CC3A3A", // Muted red
      "iconColour": "\#E55353",
      "icon": "bug",
      "type": "whole-line"
    },
    "WARN": {
      "foreground": "\#FFFFFF",
      "background": "\#CC7A00", // Muted orange
      "iconColour": "\#E69500",
      "icon": "alert",
      "type": "text-and-comment"
    },
    "TODO": {
      "foreground": "#000000",
      "background": "\#28A745", // Muted green
      "iconColour": "\#34C759",
      "icon": "check",
      "type": "text-and-comment"
    },
    "REVIEW": {
      "foreground": "#000000",
      "background": "\#58BFD9", // Muted cyan-blue
      "iconColour": "\#5AC8FA",
      "icon": "eye",
      "type": "text-and-comment"
    },
    "NOTE": {
      "foreground": "#000000",
      "background": "\#9C88FF", // Muted purple
      "iconColour": "\#A390F2",
      "icon": "book",
      "type": "text-and-comment"
    },
    "REF": {
      "foreground": "\#FFFFFF",
      "background": "\#5A5A5A", // Muted steel grey
      "iconColour": "\#A0A0A0",
      "icon": "link",
      "type": "text-and-comment"
    }
  },
  "todo-tree.highlights.defaultHighlight": {
    "type": "text-and-comment"
  },
  "todo-tree.general.tags": ["TODO", "FIXME", "REVIEW", "WARN", "NOTE", "REF"],
  "git.confirmSync": false,
  "terminal.integrated.defaultProfile.windows": "Windows PowerShell",
  "terminal.integrated.cursorStyle": "line",
  "workbench.colorTheme": "Catppuccin Mocha",
  "cSpell.userWords": ["Abhiseck", "Bhattacharya", "supabase", "yopmail"],
  "cSpell.language": "en,lorem,en-US,en-GB",
  "[python]": {
    "editor.formatOnType": true,
    "editor.defaultFormatter": "ms-python.black-formatter"
  },
  "editor.formatOnSaveMode": "file",
  "update.showReleaseNotes": false,
  "[typescript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma"
  },
  "editor.minimap.enabled": false,
  "vsicons.dontShowNewVersionMessage": true,
  "workbench.startupEditor": "readme",
  "redhat.telemetry.enabled": false,
  "git.openRepositoryInParentFolders": "never",
  "explorer.fileNesting.patterns": {
    "*.ts": "${capture}.js",
    "*.js": "${capture}.js.map, ${capture}.min.js, ${capture}.d.ts",
    "*.jsx": "${capture}.js",
    "*.tsx": "${capture}.ts",
    "tsconfig.json": "tsconfig.*.json",
    "package.json": "package-lock.json, yarn.lock, pnpm-lock.yaml, bun.lockb",
    "pubspec.yaml": "pubspec.lock,pubspec_overrides.yaml,.packages,.flutter-plugins,.flutter-plugins-dependencies,.metadata",
    "*.dart": "${capture}.g.dart",
    "Cargo.toml": "Cargo.lock",
    "*.sqlite": "${capture}.${extname}-*",
    "*.db": "${capture}.${extname}-*",
    "*.sqlite3": "${capture}.${extname}-*",
    "*.db3": "${capture}.${extname}-*",
    "*.sdb": "${capture}.${extname}-*",
    "*.s3db": "${capture}.${extname}-*"
  },
  "editor.cursorWidth": 1,
  "peacock.affectActivityBar": false,
  "peacock.affectTitleBar": false,
  "github.copilot.enable": {
    "*": true
  },
  "terminal.integrated.profiles.windows": {
    "PowerShell": {
      "source": "PowerShell",
      "icon": "terminal-powershell"
    },
    "Command Prompt": {
      "path": [
        "${env:windir}\\Sysnative\\cmd.exe",
        "${env:windir}\\System32\\cmd.exe"
      ],
      "args": [],
      "icon": "terminal-cmd"
    },
    "Git Bash": {
      "source": "Git Bash"
    },
    "Windows PowerShell": {
      "path": "C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"
    }
  },
  "git.blame.editorDecoration.enabled": true,
  "git.blame.statusBarItem.enabled": true,
  "workbench.editor.empty.hint": "hidden",
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/dist/**": true,
    "**/.next/**": true
  },
  "editor.codeActionsOnSave": {
    "source.organizeImports": "always"
  },
  "workbench.colorCustomizations": {
    "sash.hoverBorder": "\#b38a8c",
    "statusBar.background": "\#9f6b6e",
    "statusBar.foreground": "\#e7e7e7",
    "statusBarItem.hoverBackground": "\#b38a8c",
    "statusBarItem.remoteBackground": "\#9f6b6e",
    "statusBarItem.remoteForeground": "\#e7e7e7"
  },
  "colorize.include": [
    "**/*.jsx",
    "**/*.tsx",
    "**/*.js",
    "**/*.ts",
    "**/*.css",
    "**/*.scss",
    "**/*.sass",
    "**/*.less",
    "**/*.styl"
  ],
  "workbench.productIconTheme": "material-product-icons",
  "window.commandCenter": false
  // ABHISECK_CONFIG_END
}
```