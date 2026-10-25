
import { getCollection, type CollectionEntry } from 'astro:content';

export interface WriteupLink {
  title: string;
  href: string;
}

export function getWriteupUrl(
  writeup: CollectionEntry<'writeups'>
): string {
  const { category, subcategory, slug } = writeup.data;

  if (category === 'cybersecurity') {
    if (!subcategory) {
      throw new Error(
        `Cybersecurity write-up "${slug}" is missing a subcategory.`
      );
    }

    return `/writeups/cybersecurity/${subcategory}/${slug}/`;
  }

  return `/writeups/perspectives/${slug}/`;
}

const toLink = (
  writeup: CollectionEntry<'writeups'>
): WriteupLink => ({
  title: writeup.data.title,
  href: getWriteupUrl(writeup),
});

export async function getWriteupNeighbors(
  slug: string
): Promise<{ prev?: WriteupLink; next?: WriteupLink }> {
  const writeups = (await getCollection('writeups'))
    .filter((writeup) => !writeup.data.draft)
    .sort((a, b) => {
      const dateDiff =
        a.data.pubDate.getTime() - b.data.pubDate.getTime();

      return dateDiff !== 0
        ? dateDiff
        : a.data.slug.localeCompare(b.data.slug);
    });

  const index = writeups.findIndex(
    (writeup) => writeup.data.slug === slug
  );

  return {
    prev: index > 0 ? toLink(writeups[index - 1]) : undefined,
    next:
      index >= 0 && index < writeups.length - 1
        ? toLink(writeups[index + 1])
        : undefined,
  };
}
