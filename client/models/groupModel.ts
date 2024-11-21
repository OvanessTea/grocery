import { z } from "zod";

const groupSchema = z.object({
  id: z.number(),
  name: z.string(),
  link: z.string(),
  admin_id: z.number(),
});

export type Group = z.infer<typeof groupSchema>;
