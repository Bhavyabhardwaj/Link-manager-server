export interface QRCode {
  size?: number;
  format?: 'png' | 'svg';
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  color?: {
    dark?: string; 
    light?: string; 
  };
}