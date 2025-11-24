import { type LoaderFunctionArgs } from 'react-router';
import { useLoaderData, Form } from 'react-router';
import { requireUser } from '~/services/auth.server';
import { Button } from '~/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/components/ui/card';

export async function loader({ request }: LoaderFunctionArgs) {
    const user = await requireUser(request);
    return Response.json({ user });
}

export default function Dashboard() {
    const { user } = useLoaderData<typeof loader>();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
            <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/logo.svg" alt="Samaya" className="h-8 w-auto" />
                        <span className="text-xl font-bold bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 bg-clip-text text-transparent">
                            Samaya
                        </span>
                    </div>

                    <Form method="post" action="/api/auth/logout">
                        <Button variant="outline" type="submit">
                            Logout
                        </Button>
                    </Form>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900">Welcome to Samaya!</h1>
                        <p className="text-lg text-slate-600 mt-2">Your scheduling dashboard</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Account Information</CardTitle>
                            <CardDescription>Your profile details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Email</p>
                                <p className="text-base text-slate-900">{user.email}</p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-slate-500">Username</p>
                                <p className="text-base text-slate-900">{user.username}</p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-slate-500">Email Verified</p>
                                <p className="text-base text-slate-900">
                                    {user.emailVerified ? (
                                        <span className="text-green-600 font-medium">✓ Verified</span>
                                    ) : (
                                        <span className="text-amber-600 font-medium">⚠ Not Verified</span>
                                    )}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-slate-500">Member Since</p>
                                <p className="text-base text-slate-900">
                                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Coming Soon</CardTitle>
                            <CardDescription>Features we're working on</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-slate-600">
                                <li>• Create and manage event types</li>
                                <li>• Set your availability</li>
                                <li>• Share your booking link</li>
                                <li>• Calendar integrations</li>
                                <li>• Team scheduling</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
