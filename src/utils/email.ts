import nodemailer from 'nodemailer';

// Production transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendPasswordResetEmail = async (email: string, resetToken: string) => {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3001'}/reset-password?token=${resetToken}`;
    
    const transporter = createTransporter();
    
    const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@linkmanager.com',
        to: email,
        subject: 'Password Reset Request - Link Manager',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #4a90e2; color: white; padding: 20px; text-align: center; }
                    .content { background-color: #f9f9f9; padding: 20px; }
                    .button { display: inline-block; padding: 12px 30px; background-color: #4a90e2; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .footer { background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; }
                    .warning { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 10px; margin: 15px 0; border-radius: 4px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🔗 Link Manager</h1>
                        <h2>Password Reset Request</h2>
                    </div>
                    <div class="content">
                        <h3>Hello!</h3>
                        <p>We received a request to reset your password for your Link Manager account.</p>
                        <p>Click the button below to reset your password:</p>
                        <div style="text-align: center;">
                            <a href="${resetUrl}" class="button">Reset Password</a>
                        </div>
                        <p>Or copy and paste this link into your browser:</p>
                        <p style="word-break: break-all; background-color: #e9ecef; padding: 10px; border-radius: 4px;">
                            ${resetUrl}
                        </p>
                        <div class="warning">
                            <strong>⚠️ Security Notice:</strong>
                            <ul>
                                <li>This link will expire in 1 hour</li>
                                <li>If you didn't request this reset, please ignore this email</li>
                                <li>For security, this link can only be used once</li>
                            </ul>
                        </div>
                    </div>
                    <div class="footer">
                        <p>This email was sent automatically. Please do not reply to this email.</p>
                        <p>&copy; ${new Date().getFullYear()} Link Manager. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
        text: `
            Link Manager - Password Reset Request
            
            We received a request to reset your password for your Link Manager account.
            
            To reset your password, visit this link: ${resetUrl}
            
            This link will expire in 1 hour.
            
            If you didn't request this reset, please ignore this email.
            
            Thank you,
            Link Manager Team
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`📧 Password reset email sent to ${email}`);
    } catch (error) {
        console.error('❌ Error sending password reset email:', error);
        throw new Error('Failed to send password reset email');
    }
};
