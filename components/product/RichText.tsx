import { parseRichTextBlocks } from "@/lib/content/format-rich-text";

export function RichText({ html, className }: { html: string; className?: string }) {
  const blocks = parseRichTextBlocks(html);

  return (
    <div className={className}>
      {blocks.map((block, index) =>
        block.type === "ul" ? (
          <ul key={index} className="list-disc space-y-2 pl-5">
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p key={index} className="leading-relaxed">
            {block.text}
          </p>
        )
      )}
    </div>
  );
}
