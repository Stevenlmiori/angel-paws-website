/** Build minimal Portable Text blocks for repo-backed local stories. */

export function storyParagraphs(texts: string[]): unknown[] {
  return texts.map((text, index) => ({
    _type: "block",
    _key: `block-${index}`,
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `span-${index}`,
        text,
        marks: [],
      },
    ],
  }));
}

export function storyHeading(text: string, index: number): unknown {
  return {
    _type: "block",
    _key: `heading-${index}`,
    style: "h2",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `hspan-${index}`,
        text,
        marks: [],
      },
    ],
  };
}
