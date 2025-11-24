import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { Card, CardContent } from '~/components/ui/card';

export default function Verify() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
    const [message, setMessage] = useState('Verifying your email...');

    useEffect(() => {
        const token = searchParams.get('token');

        if (!token) {
            setStatus('error');
            setMessage('Verification token is missing');
            return;
        }

        // Call verification API
        fetch(`/api/auth/verify-email?token=${token}`)
            .then(async (response) => {
                if (response.redirected) {
                    // Successful verification, redirecting to dashboard
                    window.location.href = response.url;
                    return;
                }

                const data = await response.json();
                if (data.error) {
                    setStatus('error');
                    setMessage(data.error);
                }
            })
            .catch((error) => {
                setStatus('error');
                setMessage('An error occurred during verification');
                console.error('Verification error:', error);
            });
    }, [searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-amber-50/30 px-6">
            <Card className="w-full max-w-md">
                <CardContent className="p-8 text-center space-y-4">
                    {status === 'verifying' && (
                        <>
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto" />
                            <h2 className="text-2xl font-bold text-slate-900">Verifying your email...</h2>
                            <p className="text-slate-600">Please wait while we verify your account</p>
                        </>
                    )}

                    {status === 'success' && (
                        <>
                            <div className="text-green-500 text-5xl">✓</div>
                            <h2 className="text-2xl font-bold text-slate-900">Email Verified!</h2>
                            <p className="text-slate-600">{message}</p>
                            <p className="text-sm text-slate-500">Redirecting to dashboard...</p>
                        </>
                    )}

                    {status === 'error' && (
                        <>
                            <div className="text-red-500 text-5xl">✗</div>
                            <h2 className="text-2xl font-bold text-slate-900">Verification Failed</h2>
                            <p className="text-slate-600">{message}</p>
                            <button
                                onClick={() => navigate('/')}
                                className="mt-4 text-amber-600 hover:text-amber-700 font-medium"
                            >
                                Return to home
                            </button>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
