export interface RedirectResult {
    success: boolean;
    message: string;
    error?: string;
    redirectUrl?: string;
}

export interface LinkInfoResult {
    success: boolean;
    message?: string;
    error?: string;
    data?: linkInfoData;
}

export interface linkInfoData {
    id: string;
    url: string;
    slug: string;
    title: string;
    description?: string;
    createdAt: Date;
    shortUrl: string;
    qrCode?: string;
    clickCount: number;
}

export interface LinkStatsResult {
    link: {
        id: string;
        url: string;
        title: string;
        slug: string;
    };
    stats: {
        totalClicks: number;
        uniqueClicks: number;
        recentClicks: RecentClickData[];
    };
}

export interface RecentClickData {
    country: string | null;
    device: string | null;
    os: string | null;
    createdAt: Date;
}

export interface LinkLookupParams {
    slug: string;
    includeInactive?: boolean;
}

export interface RedirectTrackingParams {
    linkId: string;
    userAgent?: string;
    ip: string;
    referrer?: string;
}