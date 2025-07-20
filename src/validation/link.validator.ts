import { z } from 'zod';

export const linkValidator = z.object({
  url: z.string().url(),
  title: z.string().min(1, 'Title is required'),
  active: z.boolean().optional().default(true),
  description: z.string().optional(),
  slug: z.string().min(1, 'Slug is required').max(50, 'Slug must be at most 50 characters long').optional(),
});

export type LinkInput = z.infer<typeof linkValidator>;