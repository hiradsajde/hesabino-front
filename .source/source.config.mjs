// source.config.ts
import { defineCollections, defineDocs, frontmatterSchema } from "fumadocs-mdx/config";
import { z } from "zod";
var docs = defineDocs({
  dir: "content/docs"
});
var blogPosts = defineCollections({
  type: "doc",
  dir: "content/blog",
  // add required frontmatter properties
  schema: frontmatterSchema.extend({
    author: z.string(),
    date: z.string().date().or(z.date()),
    image: z.optional(z.string()),
    duration: z.optional(z.number())
  })
});
export {
  blogPosts,
  docs
};
