/**
 * Standalone CRBasic tokenizer — shared by both CM6 and Reading View.
 * Returns token ranges with CSS class names for decoration.
 */

import {
  KEYWORDS,
  LOGICAL_OPERATORS,
  CONSTANTS,
  FUNCTIONS,
  PREPROCESSOR,
  wordSet,
} from "./crbasic-tokens";

// ── Lookup sets (lower-cased) ───────────────────────────────────────
const kwSet = wordSet(KEYWORDS);
const opsSet = wordSet(LOGICAL_OPERATORS);
const constsSet = wordSet(CONSTANTS);
const fnsSet = wordSet(FUNCTIONS);
const preprocSet = new Set(PREPROCESSOR.map((p) => p.toLowerCase()));

// ── Token types → CSS class mapping ────────────────────────────────
export type TokenType =
  | "keyword"
  | "builtin"
  | "operator"
  | "atom"
  | "number"
  | "string"
  | "comment"
  | "meta";

export interface Token {
  from: number;
  to: number;
  type: TokenType;
}

/**
 * Tokenize a single line of CRBasic source.
 * `offset` is the absolute position of the line start (for CM6 decorations).
 */
export function tokenizeLine(line: string, offset: number): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const len = line.length;

  while (i < len) {
    // Skip whitespace
    if (/\s/.test(line[i])) {
      i++;
      continue;
    }

    // Comment: ' to end of line
    if (line[i] === "'") {
      tokens.push({ from: offset + i, to: offset + len, type: "comment" });
      break;
    }

    // String: "..."
    if (line[i] === '"') {
      const start = i;
      i++;
      while (i < len && line[i] !== '"') i++;
      if (i < len) i++; // consume closing quote
      tokens.push({ from: offset + start, to: offset + i, type: "string" });
      continue;
    }

    // Preprocessor: #word
    if (line[i] === "#") {
      const m = line.slice(i).match(/^#\w+/i);
      if (m && preprocSet.has(m[0].toLowerCase())) {
        tokens.push({ from: offset + i, to: offset + i + m[0].length, type: "meta" });
        i += m[0].length;
        continue;
      }
      i++;
      continue;
    }

    // Numbers
    if (/\d/.test(line[i])) {
      const m = line.slice(i).match(/^\d+(\.\d+)?/);
      if (m) {
        tokens.push({ from: offset + i, to: offset + i + m[0].length, type: "number" });
        i += m[0].length;
        continue;
      }
    }

    // Multi-char operators
    const opMatch = line.slice(i).match(/^(<>|>>|<<|>=|<=|\*=|\+=|-=|\/=|\\=|\^=|&=)/);
    if (opMatch) {
      tokens.push({ from: offset + i, to: offset + i + opMatch[0].length, type: "operator" });
      i += opMatch[0].length;
      continue;
    }

    // Single-char operators
    if (/[+\-*/\\^<>=&@!]/.test(line[i])) {
      tokens.push({ from: offset + i, to: offset + i + 1, type: "operator" });
      i++;
      continue;
    }

    // Identifiers / keywords / functions
    if (/[A-Za-z_]/.test(line[i])) {
      const m = line.slice(i).match(/^[A-Za-z_]\w*/);
      if (m) {
        const word = m[0].toLowerCase();
        let type: TokenType | null = null;
        if (kwSet.has(word)) type = "keyword";
        else if (opsSet.has(word)) type = "operator";
        else if (constsSet.has(word)) type = "atom";
        else if (fnsSet.has(word)) type = "builtin";
        if (type) {
          tokens.push({ from: offset + i, to: offset + i + m[0].length, type });
        }
        i += m[0].length;
        continue;
      }
    }

    // Anything else — skip
    i++;
  }

  return tokens;
}

/** CSS class for CM6 decorations */
export function cmClass(type: TokenType): string {
  return `cm-${type}`;
}
