export type RichTextBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

/**
 * Wix/Printful product descriptions often arrive as one run of plain text:
 * bullet points separated only by a "•" character and no real line breaks,
 * so boilerplate sentences (e.g. "...the US" + "Disclaimer: ...") end up
 * glued together with no space. This normalizes real HTML (<p>/<li>/<br>)
 * and that glued plain-text shape into the same block structure.
 */
export function parseRichTextBlocks(raw: string): RichTextBlock[] {
  const normalized = raw
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|li|div)>/gi, "\n")
    .replace(/<li[^>]*>/gi, "\n• ")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s*•\s*/g, "\n• ")
    .replace(/\.(?=[A-Z])/g, ".\n\n")
    .replace(/(?<!\n)Disclaimer:/g, "\n\nDisclaimer:")
    .trim();

  const lines = normalized
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const blocks: RichTextBlock[] = [];
  for (const line of lines) {
    if (line.startsWith("•")) {
      const item = line.replace(/^•\s*/, "").trim();
      if (!item) continue;
      const last = blocks[blocks.length - 1];
      if (last?.type === "ul") {
        last.items.push(item);
      } else {
        blocks.push({ type: "ul", items: [item] });
      }
    } else {
      blocks.push({ type: "p", text: line });
    }
  }
  return blocks;
}
