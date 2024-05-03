
import z from "zod";

export const customErrorMap = (error: z.ZodError) => {
  const customErrors: Record<string, string> = {};

  error.errors.forEach((err) => {
    switch (err.path[0]) {
      case "name":
        customErrors.name = "every field is required and must be between 3 and 50 characters long.";
        break;
      case "email":
        customErrors.email = "Invalid email format.";
        break;
      case "username":
        customErrors.username =
          "Username must be between 3 and 50 characters long.";
        break;
      case "password":
        customErrors.password = "Password must be at least 6 characters long.";
        break;
      default:
        break;
    }
  });

  return customErrors;
};

