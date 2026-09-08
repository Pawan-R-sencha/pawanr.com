import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const writeups = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/writeups',
  }),

  schema: z.object({
    title: z.string(),
    description: z.string(),

    category: z.enum([
      'cybersecurity',
      'beyond-cybersecurity',
    ]),

    subcategory: z.string().optional(),

    protocol: z.string().optional(),

    tags: z.array(z.string()).default([]),

    status: z.enum([
      'planned',
      'in-progress',
      'complete',
    ]).default('complete'),

    pubDate: z.coerce.date(),

    draft: z.boolean().default(false),
  }),
});

export const collections = {
  writeups,
};