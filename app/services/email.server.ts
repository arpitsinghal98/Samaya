import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendVerificationEmailParams {
  email: string;
  token: string;
  baseUrl: string;
}

export async function sendVerificationEmail({ email, token, baseUrl }: SendVerificationEmailParams) {
  const verificationUrl = `${baseUrl}/verify?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'no-reply@samaya.ink',
      to: email,
      template: {
        id: '4568ea10-2c04-4aab-9ba1-1eba2b41f0a9',
        variables: {
          verificationUrl,
        },
      },
    } as any);

    if (error) {
      console.error('Resend API error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send verification email:', error);
    return { success: false, error };
  }
}

export async function sendWelcomeEmail({ email, name }: { email: string; name?: string }) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'no-reply@samaya.ink',
      to: email,
      template: {
        id: '7e3999a1-bb8e-4069-b24a-239e016b335e',
        variables: {
          name: name || 'there',
          dashboardUrl: `${process.env.APP_URL}/dashboard`,
        },
      },
    } as any);

    if (error) {
      console.error('Resend API error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return { success: false, error };
  }
}
