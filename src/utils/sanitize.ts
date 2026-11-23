/* eslint-disable no-control-regex */
/**
 * AeroWise AI - Input Sanitization & XSS Defense Utilities
 * Provides defense-in-depth against Cross-Site Scripting (XSS),
 * script injection, and malicious user-supplied payloads.
 */

const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&grave;',
};

/**
 * Escapes unsafe HTML characters to prevent XSS injection.
 */
export function escapeHtml(str: string): string {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/[&<>"'`/]/g, (match) => HTML_ESCAPE_MAP[match] || match);
}

/**
 * Sanitizes plain text inputs (removes control characters, trims whitespace).
 */
export function sanitizeInput(input: string, maxLength = 1000): string {
  if (!input || typeof input !== 'string') return '';
  /* eslint-disable-next-line no-control-regex */
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, '')
    .trim()
    .slice(0, maxLength);
}

export interface FormattedMessagePart {
  type: 'text' | 'bold' | 'code' | 'bullet';
  content: string;
}

/**
 * Safely parses basic assistant markdown formatting without raw dangerouslySetInnerHTML.
 * Produces structured tokens for React to render safely.
 */
export function parseSafeAssistantMarkdown(text: string): FormattedMessagePart[][] {
  const lines = text.split('\n');
  return lines.map((line) => {
    const parts: FormattedMessagePart[] = [];
    const trimmed = line.trim();

    if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
      const content = trimmed.slice(2);
      parseInlineStyles(content, parts, true);
    } else {
      parseInlineStyles(line, parts, false);
    }

    return parts;
  });
}

function parseInlineStyles(line: string, out: FormattedMessagePart[], isBullet = false) {
  // Regex to split by **bold** or `code`
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  if (isBullet) {
    out.push({ type: 'bullet', content: '• ' });
  }

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      out.push({
        type: 'text',
        content: line.slice(lastIndex, match.index),
      });
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      out.push({
        type: 'bold',
        content: token.slice(2, -2),
      });
    } else if (token.startsWith('`') && token.endsWith('`')) {
      out.push({
        type: 'code',
        content: token.slice(1, -1),
      });
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < line.length) {
    out.push({
      type: 'text',
      content: line.slice(lastIndex),
    });
  }
}
