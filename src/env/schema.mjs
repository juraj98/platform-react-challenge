// @ts-check
import { z } from "zod";

export const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
});

export const serverEnv = {
  NODE_ENV: process.env.NODE_ENV,
};

export const clientSchema = z.object({
  NEXT_PUBLIC_CAT_API_KEY: z.string(),
});

export const clientEnv = {
  NEXT_PUBLIC_CAT_API_KEY:
    "live_D0hI4SfuzkB65V7jZtb8vmIrye5mZ8MChOLE16JFfsKHgpd3Qp4poXTVLkavrXgH",
};
