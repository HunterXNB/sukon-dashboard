import { z } from "zod";
import validator from "validator";
export const createAdminFormSchema = z
  .object({
    name: z
      .string({
        required_error: "nameInvalidError",
      })
      .min(3, "nameInvalidError"),
    email: z
      .string({
        required_error: "emailInvalidError",
      })
      .email("emailInvalidError"),
    mobile: z
      .string({
        required_error: "mobileInvalidError",
      })
      .refine(validator.isMobilePhone, "mobileInvalidError"),
    avatar: z
      .array(
        z
          .instanceof(File, { message: "invalidAvatarError" })
          .refine(
            (value) => value.type.startsWith("image"),
            "invalidAvatarError"
          )
      )
      .max(1, "invalidAvatarError"),
    is_active: z
      .literal(1, { message: "invalidActiveError" })
      .or(z.literal(0, { message: "invalidActiveError" })),
    password: z
      .string({
        required_error: "passwordRequiredError",
      })
      .min(8, "passwordMinLengthError")
      .regex(/[a-z]/, "passwordInvalidError")
      .regex(/[A-Z]/, "passwordInvalidError")
      .regex(/[0-9]/, "passwordInvalidError")
      .regex(/[^a-zA-Z0-9]/, "passwordInvalidError"),
    passwordConfirm: z
      .string({
        required_error: "passwordConfirmRequiredError",
      })
      .min(1, "passwordConfirmRequiredError"),
    role_ids: z.array(
      z
        .object({
          value: z.coerce.number({
            required_error: "invalidRoleTypeError",
          }),
        })
        .transform((value) => value.value),
      {
        invalid_type_error: "invalidRoleTypeError",
        required_error: "invalidRoleTypeError",
        message: "invalidRoleTypeError",
      }
    ),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password != passwordConfirm)
      ctx.addIssue({
        path: ["passwordConfirm"],
        message: "passwordMismatchError",
        code: "custom",
      });
  });
