/**
 * CodeBlock CRBasic — Obsidian plugin
 *
 * Adds CRBasic syntax highlighting to markdown fenced code blocks
 * in both Edit mode (CodeMirror 6 ViewPlugin) and Reading view
 * (registerMarkdownCodeBlockProcessor).
 */

import { Plugin } from "obsidian";
import { crbasicHighlighter } from "./cm6-crbasic";
import { tokenizeLine, TokenType } from "./tokenizer";

/** Map token types to PrismJS CSS class arrays for reading view.
 *  PrismJS tokens need both "token" and the type class. */
const PRISM_CLASSES: Record<TokenType, string[]> = {
  keyword:  ["token", "keyword"],
  builtin:  ["token", "function"],
  operator: ["token", "operator"],
  atom:     ["token", "boolean"],
  number:   ["token", "number"],
  string:   ["token", "string"],
  comment:  ["token", "comment"],
  meta:     ["token", "keyword"],
};

export default class CodeBlockCRBasicPlugin extends Plugin {
  async onload() {
    // ── Edit mode (Live Preview): CM6 ViewPlugin ────────────────
    this.registerEditorExtension(crbasicHighlighter);

    // ── Reading view: code block processor ──────────────────────
    this.registerMarkdownCodeBlockProcessor("crbasic", (source, el) => {
      // Match Obsidian's expected DOM structure for styled code blocks
      const pre = el.createEl("pre", { cls: ["language-crbasic"] });
      const code = pre.createEl("code", { cls: ["language-crbasic", "is-loaded"] });

      const lines = source.split("\n");
      for (let li = 0; li < lines.length; li++) {
        const lineText = lines[li];
        const tokens = tokenizeLine(lineText, 0);

        if (tokens.length === 0) {
          // No tokens — plain text line
          code.appendText(lineText);
        } else {
          // Build the line with highlighted spans
          let cursor = 0;
          for (const tok of tokens) {
            // Text before this token
            if (tok.from > cursor) {
              code.appendText(lineText.slice(cursor, tok.from));
            }
            // Token span with PrismJS-compatible classes
            code.createEl("span", {
              cls: PRISM_CLASSES[tok.type],
              text: lineText.slice(tok.from, tok.to),
            });
            cursor = tok.to;
          }
          // Remaining text after last token
          if (cursor < lineText.length) {
            code.appendText(lineText.slice(cursor));
          }
        }

        // Add newline between lines (not after the last line)
        if (li < lines.length - 1) {
          code.appendText("\n");
        }
      }
    });
  }

  onunload() {
    // CM6 extensions and markdown processors are automatically
    // cleaned up by Obsidian's plugin lifecycle.
  }
}
