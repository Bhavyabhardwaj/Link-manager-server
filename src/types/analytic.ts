export interface ClickLogInput {
    linkId: string;
    userId?: string;
    ipAddress?: string;
    userAgent?: string;
    referrer?: string;
    country?: string;
    city?: string;
    agent?: string;
    device?: string;
    os?: string;
    browser?: string;
    timestamp?: Date;
}

export interface AggregatedAnalytics {
    total: number;
    byCountry: Record<string, number>;
    byDevice: Record<string, number>;
    byDay: Record<string, number>;
    lastClick?: ClickLogInput;
}

export interface DeviceInfo {
    deviceType?: string;
    os?: string;
    browser?: string;
    userAgent?: string;
}

export interface IpInfo {
    ip?: string;
    country?: string;
    city?: string;
}