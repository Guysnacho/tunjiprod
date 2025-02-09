import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "**/blog/*.md",
      schema: z.object({
        excerpt: z.object({
          type: z.string(),
          children: z.any(),
        }),
      }),
    }),
  },
});
