/**
 * CodeMirror 6 ViewPlugin for CRBasic syntax highlighting in code blocks.
 *
 * Obsidian uses HyperMD which has different syntax tree node names than
 * standard CM6 markdown. Instead of depending on those names, this plugin
 * scans the document text for ```crbasic fences and tokenizes the content.
 */

import {
  ViewPlugin,
  ViewUpdate,
  Decoration,
  DecorationSet,
  EditorView,
} from "@codemirror/view";
import { RangeSetBuilder } from "@codemirror/state";
import { tokenizeLine, cmClass, TokenType } from "./tokenizer";

// ── Pre-built decoration cache ──────────────────────────────────────
const decoCache: Record<string, Decoration> = {};
function getDeco(type: TokenType): Decoration {
  const cls = cmClass(type);
  if (!decoCache[cls]) {
    decoCache[cls] = Decoration.mark({ class: cls });
  }
  return decoCache[cls];
}

// ── ViewPlugin ──────────────────────────────────────────────────────

class CRBasicHighlighter {
  decorations: DecorationSet;

  constructor(view: EditorView) {
    this.decorations = this.buildDecorations(view);
  }

  update(update: ViewUpdate) {
    if (update.docChanged || update.viewportChanged) {
      this.decorations = this.buildDecorations(update.view);
    }
  }

  buildDecorations(view: EditorView): DecorationSet {
    const builder = new RangeSetBuilder<Decoration>();
    const doc = view.state.doc;

    // Scan document lines for ```crbasic blocks
    let inCrbasicBlock = false;
    const contentLines: { from: number; text: string }[] = [];

    for (let i = 1; i <= doc.lines; i++) {
      const line = doc.line(i);
      const trimmed = line.text.trim();

      if (!inCrbasicBlock) {
        // Check for opening fence: ```crbasic (with optional trailing whitespace)
        if (/^```crbasic\s*$/i.test(trimmed)) {
          inCrbasicBlock = true;
          contentLines.length = 0;
          continue;
        }
      } else {
        // Check for closing fence
        if (/^```\s*$/.test(trimmed)) {
          // Tokenize all collected content lines and add decorations
          for (const cl of contentLines) {
            const tokens = tokenizeLine(cl.text, cl.from);
            for (const tok of tokens) {
              if (tok.from < tok.to) {
                builder.add(tok.from, tok.to, getDeco(tok.type));
              }
            }
          }
          inCrbasicBlock = false;
          continue;
        }

        // Collect content line
        contentLines.push({ from: line.from, text: line.text });
      }
    }

    return builder.finish();
  }
}

export const crbasicHighlighter = ViewPlugin.fromClass(CRBasicHighlighter, {
  decorations: (v) => v.decorations,
});
