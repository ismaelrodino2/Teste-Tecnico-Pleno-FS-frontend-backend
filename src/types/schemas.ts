import * as z from "zod";

// export const userSchemaPost = z.object({
//   username: z.string().min(1, "Name is required").max(100),
//   id: z.string().optional(),
//   headline: z.string().min(1, "headline is required").max(30),
//   mainField: z.string().min(1, "mainField is required").max(15),
//   email: z.string().min(1, "Email is required").email("Invalid email"),
//   password: z
//     .string()
//     .min(1, "Password is required")
//     .min(8, "Password must have than 8 characters"),
// });

// export const educationSchema = z.object({
//   id: z.string().optional(),
//   degree: z.string().optional(),
//   field: z.string().optional(),
//   school: z.string().optional(),
//   country: z.string().optional(),
//   startDate: z.date().optional(),
//   endDate: z.date().optional(),
//   authorId: z.string().optional(),
// });

// export const userSchemaPut = z.object({
//   username: z.string().min(1).max(100).optional(),
//   id: z.string().optional(),
//   email: z.string().min(1).email().optional(),
//   password: z.string().min(1).min(8).optional(),
//   image: z.string().optional(),
//   imageKey: z.string().optional(),
//   name: z.string().optional(),
//   headline: z.string().optional(),
//   linkedinUrl: z.string().optional(),
//   mainField: z.string().optional(),
//   description: z.string().optional(),
//   bgImageKey: z.string().optional(),
//   bgImage: z.string().optional(),
//   goals: z.string().optional(),
//   websites: z.string().array().optional(),
//   languages: z.string().array().optional()
// });

// export const signInFormSchema = z.object({
//   email: z.string().min(1, "Email is required").email("Invalid email"),
//   password: z
//     .string()
//     .min(1, "Password is required")
//     .min(8, "Password must have than 8 characters"),
// });

// export const signUpFormSchema = z
//   .object({
//     username: z.string().min(1, "Username is required").max(100),
//     email: z.string().min(1, "Email is required").email("Invalid email"),
//     password: z
//       .string()
//       .min(1, "Password is required")
//       .min(8, "Password must have than 8 characters"),
//     confirmPassword: z.string().min(1, "Password confirmation is required"),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     path: ["confirmPassword"],
//     message: "Password do not match",
//   });

// export const changePasswordFormSchema = z
//   .object({
//     password: z
//       .string()
//       .min(1, "Password is required")
//       .min(8, "Password must have than 8 characters"),
//     confirmPassword: z.string().min(1, "Password confirmation is required"),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     path: ["confirmPassword"],
//     message: "Password do not match",
//   });

// export const messageSchema = z.object({
//   id: z.string(),
//   senderId: z.string(),
//   receiverId: z.string(),
//   text: z.string(),
//   timestamp:  z.date(),
// })

// export const messageArrayValidator = z.array(messageSchema)

// export type Message = z.infer<typeof messageSchema>

// export type UserSchemaPost = z.infer<typeof userSchemaPost>;
// export type EducationSchema = z.infer<typeof educationSchema>;
// export type UserSchemaPut = z.infer<typeof userSchemaPut>;
// export type SignInFormSchema = z.infer<typeof signInFormSchema>;
// export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
// export type ChangePasswordFormSchema = z.infer<typeof changePasswordFormSchema>;
// export type MessageSchema = z.infer<typeof messageSchema>;

export const signInFormSchema = z.object({
  accountType: z
    .string()
    .min(1, "accountType is required")
    .email("Invalid accountType"),
  name: z.string().min(1, "name is required").email("Invalid name"),
  email: z.string().min(1, "email is username"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must have than 6 characters"),
});
export const signUpFormSchemaSubmit = signInFormSchema.merge(
  z.object({
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
);

export const registerOrderFormSchemaSubmit = signInFormSchema.merge(
  z.object({
    clientName: z.string().min(1, "client name"),
    address: z.string().min(1, "address"),
    items: z.array(z.string()).refine((arr) => arr.length > 0, {
      message: "items should contain at least one item",
    }),
  })
);

export const notificationFormSchema = z.object({
  workerId: z.string().min(1, "accountType is required"),
  admId: z.string().min(1, "name is required"),
  confirmation: z.boolean(),
});

export type SignInFormSchema = z.infer<typeof signInFormSchema>;
export type SignUpFormSchemaSubmit = z.infer<typeof signUpFormSchemaSubmit>;
export type NotificationFormSchema = z.infer<typeof notificationFormSchema>;
export type RegisterOrderFormSchemaSubmit = z.infer<
  typeof registerOrderFormSchemaSubmit
>;
