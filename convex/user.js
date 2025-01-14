import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    image: v.string(),
    uuid: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (user?.length === 0) {
      // Create a new user if none exists
      const result =await ctx.db.insert("users", {
        name: args.name,
        email: args.email,
        image: args.image,
        uuid: args.uuid,
      });
      console.log(result)
    }
  },
});

export const GetUser = query({
  args:{email:v.string()},
  handler: async (ctx,args)=>{
    const user = await ctx.db
    .query("users")
    .filter((q) => q.eq(q.field("email"), args.email))
    .collect();

    return user[0];
  }

})
