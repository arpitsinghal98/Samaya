import { Header } from './Header';
import { LeftSection } from './LeftSection';
import { RightSection } from './RightSection';

export function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-amber-50/30 relative overflow-hidden">
            {/* Enhanced background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-100/40 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-slate-100/50 via-transparent to-transparent" />

            {/* Animated gradient orbs */}
            <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-amber-200/30 via-amber-100/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-slate-200/40 via-slate-100/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-100/10 to-slate-100/10 rounded-full blur-3xl" />

            {/* Header */}
            <Header />

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center px-6 relative z-10">
                <div className="w-full max-w-7xl py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <LeftSection />
                        <RightSection />
                    </div>
                </div>
            </div>

            {/* Minimal Footer */}
            <footer className="relative z-10 pb-6 pt-8 border-t border-slate-200/50 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-slate-600">
                            © 2024 Samay. Scheduling made effortless.
                        </p>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-sm text-slate-500 hover:text-amber-600 transition-colors">Privacy</a>
                            <a href="#" className="text-sm text-slate-500 hover:text-amber-600 transition-colors">Terms</a>
                            <a href="#" className="text-sm text-slate-500 hover:text-amber-600 transition-colors">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}