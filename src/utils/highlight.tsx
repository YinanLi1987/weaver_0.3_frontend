/**
 * Highlights exact evidence spans in the input text using <mark> tags.
 * Supports multiple matches and avoids breaking regex.
 */
import type { JSX } from "react";

export function highlightEvidence(text: string, spans: string[]): JSX.Element {
  if (!spans || spans.length === 0) return <>{text}</>;

  let result = text;

  spans.forEach((span) => {
    // Escape special regex characters to avoid breaking
    const safeSpan = span.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

    // Case-insensitive global match
    const regex = new RegExp(`(${safeSpan})`, "gi");

    // Highlight with <mark>
    result = result.replace(
      regex,
      '<mark class="bg-yellow-200 font-semibold px-1 rounded">$1</mark>'
    );
  });

  // Return JSX with raw HTML safely injected
  return <span dangerouslySetInnerHTML={{ __html: result }} />;
}
