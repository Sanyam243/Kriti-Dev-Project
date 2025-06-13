import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


// export const CreateUser = mutation({
//   args: {
//     name: v.string(),
//     email: v.string(),
//     image: v.string(),
//     uuid: v.string(),
//     phone: v.optional(v.string()),
//      // Make phone optional
//   },
//   handler: async (ctx, args) => {
//     // Check if user already exists
//     const user = await ctx.db
//       .query("users")
//       .filter((q) => q.eq(q.field("email"), args.email))
//       .collect();

//     if (user?.length === 0) {
//       // Create a new user if none exists
//       const result = await ctx.db.insert("users", {
//         name: args.name,
//         email: args.email,
//         image: args.image,
//         uuid: args.uuid,
//         phone: args.phone || null,  
//         token:5000// Store phone if provided, otherwise null
//       });
//       console.log(result);
//     }
//   },
// });

export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    image: v.string(),
    uuid: v.string(),
    phone: v.optional(v.string()), // optional field
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (user?.length === 0) {
      const newUser = {
        name: args.name,
        email: args.email,
        image: args.image,
        uuid: args.uuid,
        token: 5000,
      };
      
      if (args.phone !== undefined) {
        newUser.phone = args.phone;
      }

      const result = await ctx.db.insert("users", newUser);
      console.log(result);
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
export const UpdateUser = mutation({
  args: {
    userId: v.id("users"),
    name: v.optional(v.string()),   // Name is optional
    phone: v.optional(v.string()),  // Phone is optional
    image: v.optional(v.string()),  // Image is optional
  },
  handler: async (ctx, args) => {
    const updates = {};
    if (args.name) updates.name = args.name;     // Only update if name is provided
    if (args.phone) updates.phone = args.phone;  // Only update if phone is provided
    if (args.image) updates.image = args.image;  // Only update if image is provided

    await ctx.db.patch(args.userId, updates);    // Update the user document with the provided fields
  },
});


// export const UpdateToken = mutation({
// args:{
//   token: v.number(),
//   userId: v.id("users"),
// },
// handler:async (ctx, args) => {
//   const result=await ctx.db.patch(args.userId, {
//     token
//   });
//   return result;
// }

// })

export const UpdateToken = mutation({
  args: {
    token: v.number(),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.userId, {
      token: args.token,
    });
    return result;
  },
});
