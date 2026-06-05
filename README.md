# CodeBlock CRBasic

An [Obsidian](https://obsidian.md) plugin that adds syntax highlighting for **CRBasic** — the programming language used by [Campbell Scientific](https://www.campbellsci.com) dataloggers (CR1000X, CR300, CR6, CR800, and others) — inside fenced markdown code blocks.

## Features

- ✅ Syntax highlighting in **Edit / Live Preview** mode (CodeMirror 6)
- ✅ Syntax highlighting in **Reading View** (PrismJS-compatible classes)
- ✅ Works with any Obsidian theme — uses the theme's built-in token colors
- ✅ Case-insensitive matching (CRBasic is case-insensitive)
- ✅ Highlights keywords, built-in functions, operators, constants, strings, comments, numbers, and preprocessor directives

### What Gets Highlighted

| Token | Examples |
|---|---|
| **Keywords** | `BeginProg`, `EndProg`, `Scan`, `NextScan`, `If`, `Else`, `Sub`, `Public`, `Dim`, `For`, `While` |
| **Built-in functions** | `VoltSE`, `PanelTemp`, `Average`, `Sample`, `DataTable`, `GPS`, `SerialOpen`, `HTTPGet` |
| **Logical operators** | `AND`, `OR`, `NOT`, `MOD`, `XOR` |
| **Constants** | `True`, `False`, `As`, `LoggerType` |
| **Preprocessor** | `#If`, `#ElseIf`, `#EndIf` |
| **Strings** | `"Hello World"` |
| **Comments** | `' this is a comment` |
| **Numbers** | `3.14`, `60`, `1000` |
| **Operators** | `=`, `<>`, `>=`, `+=`, `&` |

## Usage

Use the language identifier ` crbasic ` in a fenced code block:

````markdown
```crbasic
' CR1000X example program

Public BattV As Float

DataTable(OneMin, True, -1)
  DataInterval(0, 1, Min, 10)
  Minimum(1, BattV, FP2, False)
EndTable

BeginProg
  Scan(5, Sec, 1, 0)
    Battery(BattV)
    CallTable OneMin
  NextScan
EndProg
```
````

## Installation

### From Community Plugins (recommended)

1. Open Obsidian → **Settings** → **Community plugins**
2. Turn off **Restricted mode** if prompted
3. Click **Browse** and search for **CodeBlock CRBasic**
4. Click **Install**, then **Enable**

### Manual Installation

1. Download `main.js`, `manifest.json`, and `styles.css` from the [latest release](../../releases/latest)
2. Create the folder `.obsidian/plugins/codeblock-crbasic/` inside your vault
3. Copy the three files into that folder
4. Open Obsidian → **Settings** → **Community plugins** → enable **CodeBlock CRBasic**

## Building from Source

Requires [Node.js](https://nodejs.org) 18+.

```bash
git clone https://github.com/utleysam/codeblock-crbasic.git
cd codeblock-crbasic
npm install --legacy-peer-deps
npm run build
```

The `--legacy-peer-deps` flag is required because the `obsidian` npm package has a peer dependency conflict with `@codemirror/state` versions.

After building, copy `main.js`, `manifest.json`, and `styles.css` to your vault's `.obsidian/plugins/codeblock-crbasic/` folder.

## Compatibility

| Obsidian version | Status |
|---|---|
| 1.12.7+ | ✅ Tested and working |
| Older versions | Not tested |

The plugin uses:
- `Plugin.registerEditorExtension()` — available since Obsidian 0.13
- `Plugin.registerMarkdownCodeBlockProcessor()` — available since Obsidian 0.12

## Limitations

This plugin provides **syntax highlighting only**. It does not include:
- Autocomplete or IntelliSense
- Linting or error checking
- Code formatting
- Snippets
- File type associations for `.cr1x` / `.cr8` files

## License

[MIT](LICENSE)

## Acknowledgements

Token lists derived from the Campbell Scientific VSCode CRBasic extension (`daiwalkr.cr-basic-ms-vscode`). CRBasic is a product of [Campbell Scientific, Inc.](https://www.campbellsci.com)
