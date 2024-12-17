export type ActionStateResult<Fields extends string | number | symbol> =
  | {
      error:
        | {
            type: "global";
            message: string;
          }
        | {
            type: "validation";
            fields: Partial<Record<Fields, string[]>>;
            message: string;
          };
      locale: "ar" | "en";
    }
  | {
      success: {
        message: string;
      };
      locale: "ar" | "en";
    };
