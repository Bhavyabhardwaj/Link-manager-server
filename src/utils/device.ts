import { UAParser } from 'ua-parser-js';
import { DeviceInfo } from '../types';

export const extractDeviceInfo = (userAgent?: string): DeviceInfo => {
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    return {
        userAgent,
        browser: result.browser.name ?? '',
        deviceType: result.device.type ?? 'desktop',
        os: result.os.name ?? '',
    };
}