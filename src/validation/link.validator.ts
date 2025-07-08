import { z } from 'zod';

export const linkValidator = z.object({
  url: z.string().url(),
  title: z.string().min(1, 'Title is required'),
  active: z.boolean().optional().default(true),
  description: z.string().optional(),
});

export type LinkInput = z.infer<typeof linkValidator>;