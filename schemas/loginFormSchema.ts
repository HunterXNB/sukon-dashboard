import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string({
      required_error: "emailRequiredError",
    })
    .email("emailInvalidError"),
  password: z
    .string({
      required_error: "passwordRequiredError",
    })
    .min(8, "passwordMinLengthError")
    .regex(/[a-z]/, "passwordInvalidError")
    .regex(/[A-Z]/, "passwordInvalidError")
    .regex(/[0-9]/, "passwordInvalidError")
    .regex(/[^a-zA-Z0-9]/, "passwordInvalidError"),
  type: z.literal("admin"),
});
