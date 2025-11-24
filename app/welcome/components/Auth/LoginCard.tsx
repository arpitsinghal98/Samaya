import { useState, useEffect } from 'react';
import { useFetcher } from 'react-router';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { OAuthButton } from './OAuthButton';
import { validateEmail } from '../../utils/validation';

export function LoginCard() {
    const fetcher = useFetcher();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

    const isSubmitting = fetcher.state === 'submitting';

    // Handle API response
    useEffect(() => {
        if (fetcher.data) {
            if (fetcher.data.errors) {
                setErrors(fetcher.data.errors);
            }
        }
    }, [fetcher.data]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { email?: string; password?: string } = {};

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            fetcher.submit(formData, {
                method: 'post',
                action: '/api/auth/login',
            });
        }
    };

    const handleOAuth = (provider: 'google' | 'microsoft') => {
        // TODO: Implement OAuth flow
        console.log(`OAuth login with ${provider}`);
    };

    return (
        <div className="p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                {errors.general && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-600">{errors.general}</p>
                    </div>
                )}

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={errors.email ? 'border-red-500' : ''}
                        disabled={isSubmitting}
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={errors.password ? 'border-red-500' : ''}
                            disabled={isSubmitting}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            disabled={isSubmitting}
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                    {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        'Sign In'
                    )}
                </Button>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-slate-500">Or continue with</span>
                </div>
            </div>

            <div className="space-y-2">
                <OAuthButton provider="google" onClick={() => handleOAuth('google')} />
                <OAuthButton provider="microsoft" onClick={() => handleOAuth('microsoft')} />
            </div>
        </div>
    );
}
