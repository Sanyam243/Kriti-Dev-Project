import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    image: v.optional(v.string()),  // Optional field for image
    name: v.optional(v.string()),   // Optional field for name
    uuid: v.string(),
    phone: v.optional(v.string()),  
    token:v.optional(v.number())// Optional field for phone
  }),

  workspace: defineTable({
    messages: v.any(),
    fileData: v.optional(v.any()),
    user: v.id("users"),
  }),
});

