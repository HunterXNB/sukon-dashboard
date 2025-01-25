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
    role_ids: z
      .array(
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
      )
      .min(1, "invalidRoleTypeError")
      .max(1, "invalidRoleTypeError"),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password != passwordConfirm)
      ctx.addIssue({
        path: ["passwordConfirm"],
        message: "passwordMismatchError",
        code: "custom",
      });
  });

export const editAdminFormSchema = z
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
    is_active: z
      .literal(1, { message: "invalidActiveError" })
      .or(z.literal(0, { message: "invalidActiveError" })),
    password: z.union([
      z
        .string()
        .min(8, "passwordMinLengthError")
        .regex(/[a-z]/, "passwordInvalidError")
        .regex(/[A-Z]/, "passwordInvalidError")
        .regex(/[0-9]/, "passwordInvalidError")
        .regex(/[^a-zA-Z0-9]/, "passwordInvalidError"),
      z.literal("").transform(() => undefined),
    ]),
    passwordConfirm: z.union([
      z.string().min(1, "passwordConfirmRequiredError"),
      z.literal("").transform(() => undefined),
    ]),
    role_ids: z
      .array(
        z.object({
          value: z.coerce.number({
            required_error: "invalidRoleTypeError",
          }),
          label: z.string({
            required_error: "invalidRoleTypeError",
          }),
        }),
        {
          invalid_type_error: "invalidRoleTypeError",
          required_error: "invalidRoleTypeError",
          message: "invalidRoleTypeError",
        }
      )
      .min(1, "invalidRoleTypeError")
      .max(1, "invalidRoleTypeError"),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    // Check if either password field is present
    if (password !== undefined || passwordConfirm !== undefined) {
      // Validate password if present
      if (password !== undefined) {
        if (password.length < 8) {
          ctx.addIssue({
            path: ["password"],
            message: "passwordMinLengthError",
            code: "custom",
          });
        }
        if (!/[a-z]/.test(password)) {
          ctx.addIssue({
            path: ["password"],
            message: "passwordInvalidError",
            code: "custom",
          });
        }
        if (!/[A-Z]/.test(password)) {
          ctx.addIssue({
            path: ["password"],
            message: "passwordInvalidError",
            code: "custom",
          });
        }
        if (!/[0-9]/.test(password)) {
          ctx.addIssue({
            path: ["password"],
            message: "passwordInvalidError",
            code: "custom",
          });
        }
        if (!/[^a-zA-Z0-9]/.test(password)) {
          ctx.addIssue({
            path: ["password"],
            message: "passwordInvalidError",
            code: "custom",
          });
        }
      }

      // Check if both fields are present and match
      if (password === undefined) {
        ctx.addIssue({
          path: ["password"],
          message: "passwordRequiredError",
          code: "custom",
        });
      }
      if (passwordConfirm === undefined) {
        ctx.addIssue({
          path: ["passwordConfirm"],
          message: "passwordConfirmRequiredError",
          code: "custom",
        });
      }
      if (
        password !== undefined &&
        passwordConfirm !== undefined &&
        password !== passwordConfirm
      ) {
        ctx.addIssue({
          path: ["passwordConfirm"],
          message: "passwordMismatchError",
          code: "custom",
        });
      }
    }
  });
