import axios from 'axios';
import { IpInfo } from '../types';
import { IP_INFO_TOKEN } from '../config/ipInfoConfig';

export async function getIpInfo(ipAddress:string): Promise<IpInfo> {
    try {
        const { data } = await axios.get(
            `https://ipinfo.io/${ipAddress}/json?token=${IP_INFO_TOKEN}`,
            { timeout: 3000 }
        ) as { data: IpInfo };
        return {
            ip: data.ip ?? '',
            country: data.country ?? '',
            city: data.city ?? '',
        }
    } catch (error) {
    return { ip: ipAddress ?? '', country: '', city: '' };
    };
};