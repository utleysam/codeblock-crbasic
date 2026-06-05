# Agent Handoff: Obsidian CRBasic Syntax Highlighting Plugin

## Objective

Create an Obsidian plugin ("CodeBlock CRBasic") that provides syntax highlighting for CRBasic code in markdown fenced code blocks (` ```crbasic `). CRBasic is the programming language for Campbell Scientific dataloggers.

## Reference Material

The token lists (keywords, built-in functions, operators, constants, preprocessor directives) were ported from the **VSCode CRBasic extension** by Campbell Scientific:

- Marketplace: https://marketplace.visualstudio.com/items?itemName=daiwalkr.cr-basic-ms-vscode
- The extension's VSIX can be downloaded and extracted to get `syntaxes/cr-basic.tmLanguage.json` — a TextMate grammar file containing all token patterns.
- The extension's repo is private GitLab: `https://gitlab.com/cs-global/research-and-development/product-testing-and-compliance/ptg-software/vscode-crbasic-plugin`

## Architecture

The plugin needs **two separate highlighting engines** because Obsidian uses different renderers for its two view modes:

| View Mode | Engine | Approach |
|---|---|---|
| **Edit / Live Preview** | CodeMirror 6 (via HyperMD) | CM6 `ViewPlugin` with `Decoration.mark()` |
| **Reading View** | PrismJS | `registerMarkdownCodeBlockProcessor()` |

### File Structure

```
markdown-codeblock-crbasic/
├── manifest.json              # Obsidian plugin manifest (id: "codeblock-crbasic")
├── package.json               # npm config + build scripts
├── tsconfig.json              # TypeScript config
├── esbuild.config.mjs         # Bundles src/ → main.js (CJS, externals for obsidian/CM6)
├── styles.css                 # Empty (uses Obsidian's built-in theme tokens)
├── src/
│   ├── main.ts                # Plugin entry — registers CM6 extension + code block processor
│   ├── crbasic-tokens.ts      # Shared keyword/function/operator/constant lists
│   ├── tokenizer.ts           # Line-level tokenizer shared by both engines
│   └── cm6-crbasic.ts         # CM6 ViewPlugin implementation
```

### Shared Tokenizer (`tokenizer.ts`)

A single line-level tokenizer is shared by both the CM6 ViewPlugin and the Reading View processor. It takes a line of text + an offset, and returns an array of `{from, to, type}` tokens. Token types: `keyword`, `builtin`, `operator`, `atom`, `number`, `string`, `comment`, `meta`.

CRBasic is **case-insensitive** — all keyword matching uses lowercased lookup sets.

### Token Lists (`crbasic-tokens.ts`)

All token lists are extracted from the TextMate grammar into a single module. Both engines import from here. Categories:

- **Keywords** (`keyword.control`): `BeginProg`, `EndProg`, `If`, `Else`, `Scan`, `Sub`, `Public`, `Dim`, `Const`, etc.
- **Preprocessor** (`keyword.control.preprocessor`): `#If`, `#Else`, `#EndIf`, etc. (matched WITH the `#` prefix)
- **Logical operators** (`keyword.operator.logical`): `AND`, `OR`, `NOT`, `MOD`, `XOR`, `IMP`, `INTDV`
- **Constants** (`constant.character` + `constant.language`): `True`, `False`, `As`, `LoggerType`, etc.
- **Built-in functions** (`entity.name.function.*`): ~300 functions across CDM, DataTable, Measurements, Math, FileIO, Internet, PakBus, SDM, Serial, String categories — deduplicated into a flat array.

## Critical Lessons Learned

### 1. Obsidian's CM6 uses HyperMD — NOT standard CM6 markdown nodes

**The problem**: Standard CM6 markdown uses syntax tree nodes named `FencedCode`, `CodeInfo`, `CodeText`. Obsidian's HyperMD fork uses completely different names: `HyperMD-codeblock-begin`, `HyperMD-codeblock-bg`, `hmd-codeblock`, `HyperMD-codeblock-end`, etc.

**The solution**: Don't use `syntaxTree()` to find code blocks. Instead, scan the document text line-by-line looking for ` ```crbasic ` opening fences and ` ``` ` closing fences. Collect the content lines between them and tokenize. This is robust regardless of Obsidian's internal CM6 node naming.

```typescript
// Correct approach — text scanning:
for (let i = 1; i <= doc.lines; i++) {
  const line = doc.line(i);
  if (/^```crbasic\s*$/i.test(line.text.trim())) {
    inCrbasicBlock = true; ...
  }
}
```

### 2. `StreamLanguage.define()` does NOT work for code block highlighting

**The problem**: `StreamLanguage.define()` creates a full CM6 language. Registering it via `registerEditorExtension(lang.extension)` would try to make it the **top-level** editor language, replacing markdown. There is no public Obsidian API to register a new nested code-block language with CM6's markdown parser.

**The solution**: Use a `ViewPlugin` that applies `Decoration.mark()` with `cm-*` CSS classes (e.g., `cm-keyword`, `cm-string`, `cm-builtin`). Obsidian themes already style these classes, so no custom CSS is needed.

### 3. `window.hljs` is NOT available at plugin load time

**The problem**: Obsidian does not expose `window.hljs` when plugins load. Attempting `window.hljs.registerLanguage()` in `onload()` silently fails.

**The solution**: Don't use hljs at all. Use `registerMarkdownCodeBlockProcessor("crbasic", callback)` instead. This takes over the rendering of ` ```crbasic ` blocks entirely — you create your own `<pre><code>` DOM structure with highlighted `<span>` elements.

### 4. Obsidian Reading View uses PrismJS, not highlight.js

**The problem**: Internet sources (and initial assumptions) suggested Obsidian uses highlight.js. It actually uses **PrismJS** for Reading View rendering.

**The solution**: Since we use `registerMarkdownCodeBlockProcessor` (which bypasses PrismJS entirely), we just need our `<span>` elements to use PrismJS-compatible CSS classes so Obsidian themes style them correctly:

```typescript
// PrismJS class format: TWO separate classes, "token" + type
// Obsidian's createEl cls parameter takes an ARRAY:
code.createEl("span", {
  cls: ["token", "keyword"],   // ✓ correct
  text: "BeginProg",
});

// NOT a single string (won't be split into two classes):
code.createEl("span", {
  cls: "token keyword",        // ✗ wrong — single class
  text: "BeginProg",
});
```

Token type mapping for PrismJS:
| Our type | PrismJS classes |
|---|---|
| `keyword` | `["token", "keyword"]` |
| `builtin` | `["token", "function"]` |
| `operator` | `["token", "operator"]` |
| `atom` | `["token", "boolean"]` |
| `number` | `["token", "number"]` |
| `string` | `["token", "string"]` |
| `comment` | `["token", "comment"]` |
| `meta` | `["token", "keyword"]` |

### 5. Reading View DOM structure matters

The `<pre>` and `<code>` elements need specific classes for Obsidian themes to style the code block background and font correctly:

```typescript
const pre = el.createEl("pre", { cls: ["language-crbasic"] });
const code = pre.createEl("code", { cls: ["language-crbasic", "is-loaded"] });
```

The `is-loaded` class on `<code>` is important — Obsidian uses it to determine that code highlighting has been applied.

### 6. CM6 token class names

For Edit mode, use standard CodeMirror CSS classes via `Decoration.mark({ class: "cm-keyword" })`. Obsidian themes already provide colors for: `cm-keyword`, `cm-builtin`, `cm-string`, `cm-comment`, `cm-number`, `cm-operator`, `cm-atom`, `cm-meta`.

### 7. Build configuration

All `@codemirror/*`, `@lezer/*`, `obsidian`, and `electron` packages must be listed as **externals** in esbuild. Obsidian provides these at runtime. Bundling them causes conflicts.

Use `--legacy-peer-deps` when running `npm install` because the `obsidian` npm package has peer dependency conflicts with `@codemirror/state` versions.

### 8. Debug technique

To debug CM6 syntax tree issues, add a command that dumps node names:

```typescript
this.addCommand({
  id: "dump-syntax-tree",
  name: "Dump CM6 syntax tree (debug)",
  callback: () => {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    const cm = (view.editor as any).cm;
    const tree = syntaxTree(cm.state);
    const names = new Set<string>();
    tree.iterate({ enter: (node) => { names.add(node.name); } });
    console.log("Node names:", [...names].sort());
  },
});
```

Open Obsidian DevTools with `Ctrl+Shift+I`, run the command from the command palette (`Ctrl+P`).

## Build & Deploy

```bash
cd markdown-codeblock-crbasic
npm install --legacy-peer-deps
npm run build
# Copy main.js, manifest.json, styles.css to:
# <vault>/.obsidian/plugins/codeblock-crbasic/
```

Reload Obsidian with `Ctrl+R` (with DevTools open) or restart the app.

## What's NOT In Scope

- Autocomplete, snippets, diagnostics, formatting (IDE features from the VSCode extension)
- Semantic highlighting (requires a full parser)
- File associations (Obsidian doesn't open `.cr1x` files directly)
- Only one language alias is registered: `crbasic`
