import axios from 'axios';
import { IpInfo } from '../types';

export async function getIpInfo(ipAddress:string): Promise<IpInfo> {
    try {
        const { data } = await axios.get(
            `https://ipinfo.io/${ipAddress}/json?token=${IP_INFO_TOKEN}`,
            { timeout: 3000 }
        );
        return {
            ip: data.ip ?? '',
            country: data.country ?? '',
            city: data.city ?? '',
        }
    } catch (error) {
    return { ip: ipAddress ?? '', country: '', city: '' };
    };
};