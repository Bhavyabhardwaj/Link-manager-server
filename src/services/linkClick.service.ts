import prisma from "../config/db";
import { AggregatedAnalytics, ClickLogInput } from "../types";

export async function logLinkClick(data: ClickLogInput): Promise<void> {
  await prisma.linkClick.create({
    data: {
      ...data,
      createdAt: data.timestamp || new Date(),
    }
  });
}

export async function getClicksByLink(linkId: string, limit = 100, offset = 0) {
  return await prisma.linkClick.findMany({
    where: { linkId },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: offset,
  });
}

export async function getAnalytics(linkId: string): Promise<AggregatedAnalytics> {
  const [total, byCountryRaw, byDeviceRaw, byDayRaw, lastClick] = await Promise.all([
    prisma.linkClick.count({ where: { linkId } }),
    prisma.linkClick.groupBy({
      by: ['country'],
      where: { linkId },
      _count: { country: true }
    }),
    prisma.linkClick.groupBy({
      by: ['device'],
      where: { linkId },
      _count: { device: true }
    }),
    prisma.linkClick.groupBy({
      by: ['clickDate'],  // Native grouping using the new schema field
      where: { linkId },
      _count: { _all: true },
    }),
    prisma.linkClick.findFirst({
      where: { linkId },
      orderBy: { createdAt: 'desc' }
    })
  ]);

  const byCountry = byCountryRaw.reduce((acc, c) => {
    acc[c.country || 'Unknown'] = c._count.country; return acc;
  }, {} as Record<string, number>);

  const byDevice = byDeviceRaw.reduce((acc, c) => {
    acc[c.device || 'Unknown'] = c._count.device; return acc;
  }, {} as Record<string, number>);

  const byDay = byDayRaw.reduce((acc, c) => {
    const dateKey = c.clickDate.toISOString().split('T')[0] ?? 'Unknown';  // Format date to 'YYYY-MM-DD'
    acc[dateKey] = c._count._all;
    return acc;
  }, {} as Record<string, number>);

  return {
    total,
    byCountry,
    byDevice,
    byDay,
    lastClick: lastClick?.createdAt ? ({ ...lastClick, userId: lastClick.userId ?? undefined } as ClickLogInput) : undefined
  };
}
