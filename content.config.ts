import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "**/*.md",
      schema: z.object({
        excerpt: z.object({
          type: z.string(),
          children: z.any(),
        }),
      }),
    }),
  },
});
