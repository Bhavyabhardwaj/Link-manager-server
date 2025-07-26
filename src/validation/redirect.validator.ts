import z from "zod";

export const slugValidator = z.object({
    slug: z.string()
        .min(1, "Slug is required")
        .max(100, "Slug must be at most 100 characters long")
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and can only contain letters, numbers, and hyphens")
});

export const redirectTrackingValidator = z.object({
    userAgent: z.string().optional(),
    ip: z.string().optional(),
    referrer: z.string().url().optional(),
})

export const analyticsQueryValidator = z.object({
    timeframe: z.enum(['1h', '24h', '7d', '30d']).optional().default('24h'),
    limit: z.coerce.number().min(1).max(100).optional().default(10),
    offset: z.coerce.number().min(0).optional().default(0),
})

export const bulkAnalyticsValidator = z.object({
    slugs: z.array(z.string().min(1, "Slug is required").max(100, "Slug must be at most 100 characters long")),
    includeDetails: z.boolean().optional().default(false)
});

export const linkLookupValidator = z.object({
    includeInactive: z.boolean().optional().default(false),
    includeAnalytics: z.boolean().optional().default(false),
})

// Export types
export type SlugInput = z.infer<typeof slugValidator>;
export type RedirectTrackingInput = z.infer<typeof redirectTrackingValidator>;
export type AnalyticsQueryInput = z.infer<typeof analyticsQueryValidator>;
export type BulkAnalyticsInput = z.infer<typeof bulkAnalyticsValidator>;
export type LinkLookupInput = z.infer<typeof linkLookupValidator>;