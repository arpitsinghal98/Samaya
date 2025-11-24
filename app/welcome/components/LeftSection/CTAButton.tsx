import { Button } from '~/components/ui/button';
import { useAuth } from '../../context/AuthContext';

export function CTAButton() {
    const { showLogin, showSignup } = useAuth();

    return (
        <div className="flex gap-4 ds-animate-fade-in" style={{ animationDelay: '200ms' }}>
            <Button
                size="lg"
                variant="outline"
                className="flex-1 border-slate-300 hover:bg-slate-50"
                onClick={showLogin}
            >
                Login
            </Button>
            <Button
                size="lg"
                className="flex-1 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={showSignup}
            >
                Sign Up
            </Button>
        </div>
    );
}