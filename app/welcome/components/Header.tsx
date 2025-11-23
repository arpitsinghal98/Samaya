import { Button } from '~/components/ui/button';

export function Header() {
    return (
        <header className="absolute top-0 left-0 right-0 z-20 backdrop-blur-md bg-gradient-to-r from-white/95 via-slate-50/95 to-white/95 border-b border-slate-200/50">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center gap-3">
                    <img
                        src="/logo.svg"
                        alt="Samaya"
                        className="h-12 w-auto"
                        style={{
                            filter: 'drop-shadow(0 0 8px rgba(217, 119, 6, 0.2))',
                        }}
                    />
                    <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 bg-clip-text text-transparent">
                        Samaya
                    </span>
                </div>
            </div>
        </header>
    );
}