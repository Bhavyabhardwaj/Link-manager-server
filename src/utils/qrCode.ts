import QRCode from 'qrcode';

export interface QRCodeOptions {
    size?: number;
    format?: 'png' | 'svg';
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
    color?: {
        dark?: string;
        light?: string;
    };
}

export class QRCodeGenerator {
    static async generateQRCode(data: string, options?: QRCodeOptions): Promise<string> {
        const defaultOptions = {
            width: options?.size || 200,
            errorCorrectionLevel: options?.errorCorrectionLevel || 'M',
            color: {
                dark: options?.color?.dark || '#000000',
                light: options?.color?.light || '#ffffff',
            },
        };
        try {
            if (options?.format === 'svg') {
                return await QRCode.toString(data, {
                    type: 'svg',
                    ...defaultOptions,
                });
            }
            // Default to PNG format
            return await QRCode.toDataURL(data, defaultOptions,);
        } catch (error) {
            throw new Error(`Failed to generate QR code: ${error}`);
        }
    }
    static async generateForLink(linkUrl: string, customization?: QRCodeOptions): Promise<string> {
        return this.generateQRCode(linkUrl, customization);
    }

    static async generateBulk(urls: string[], options?: QRCodeOptions): Promise<Map<string, string>> {
        const results = new Map<string, string>();

        await Promise.all(
            urls.map(async (url) => {
                try {
                    const qrCode = await this.generateQRCode(url, options);
                    results.set(url, qrCode);
                } catch (error) {
                    console.error(`Failed to generate QR code for ${url}: ${error}`);
                }
            })
        );
        return results;
    }
}
