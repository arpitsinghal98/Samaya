import { useState, useEffect } from 'react';
import { useFetcher } from 'react-router';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { Eye, EyeOff, Check, X, Loader2 } from 'lucide-react';
import { validateEmail, validatePassword } from '../../utils/validation';

export function SignupCard() {
    const fetcher = useFetcher();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [successMessage, setSuccessMessage] = useState('');

    const passwordValidation = validatePassword(password);
    const showPasswordHints = password.length > 0;
    const isSubmitting = fetcher.state === 'submitting';

    // Handle API response
    useEffect(() => {
        if (fetcher.data) {
            if (fetcher.data.errors) {
                setErrors(fetcher.data.errors);
                setSuccessMessage('');
            } else if (fetcher.data.success) {
                setSuccessMessage(fetcher.data.message);
                setErrors({});
                // Clear form
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            }
        }
    }, [fetcher.data]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (!passwordValidation.isValid) {
            newErrors.password = 'Password does not meet requirements';
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            fetcher.submit(formData, {
                method: 'post',
                action: '/api/auth/signup',
            });
        }
    };

    return (
        <div className="p-8 space-y-6">
            {successMessage && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-700 font-medium">{successMessage}</p>
                </div>
            )}

            {errors.general && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{errors.general}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    {showPasswordHints && (
                        <div className="space-y-1 text-xs">
                            <PasswordRequirement
                                met={password.length >= 8}
                                text="At least 8 characters"
                            />
                            <PasswordRequirement
                                met={/[a-z]/.test(password)}
                                text="One lowercase letter"
                            />
                            <PasswordRequirement
                                met={/[A-Z]/.test(password)}
                                text="One uppercase letter"
                            />
                            <PasswordRequirement
                                met={/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)}
                                text="One special character"
                            />
                        </div>
                    )}
                    {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={errors.confirmPassword ? 'border-red-500' : ''}
                            disabled={isSubmitting}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            disabled={isSubmitting}
                        >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                        </>
                    ) : (
                        'Create Account'
                    )}
                </Button>
            </form>
        </div>
    );
}

function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
    return (
        <div className="flex items-center gap-2">
            {met ? (
                <Check className="h-3 w-3 text-green-500" />
            ) : (
                <X className="h-3 w-3 text-slate-300" />
            )}
            <span className={met ? 'text-green-600' : 'text-slate-500'}>{text}</span>
        </div>
    );
}
