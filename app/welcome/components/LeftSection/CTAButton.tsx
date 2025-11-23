import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { CTAHandler } from '../../handlers/CTAHandler';
import { ArrowRight } from 'lucide-react';

export function CTAButton() {
    const [isHovered, setIsHovered] = useState(false);
    const ctaHandler = CTAHandler.getInstance();

    const handleClick = () => {
        ctaHandler.trackCTAClick();
        ctaHandler.handleCTAClick();
    };

    return (
        <Button
            size="lg"
            className="ds-animate-fade-in group bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 shadow-lg hover:shadow-xl transition-all duration-300"
            style={{ animationDelay: '200ms' }}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            Get Started
            <ArrowRight className={`ml-2 h-4 w-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
        </Button>
    );
}