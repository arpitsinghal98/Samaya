import { Badge } from '~/components/ui/badge';
import { Check } from 'lucide-react';

export function Subheading() {
    return (
        <div className="mb-10 ds-animate-fade-in" style={{ animationDelay: '100ms' }}>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Professional scheduling for modern teams.
                <br />
                Simple, elegant, and powerful.
            </p>

            {/* Feature highlights */}
            <div className="flex flex-wrap gap-3">
                {['Calendar Sync', 'Smart Reminders', 'Team Scheduling'].map((feature, index) => (
                    <Badge
                        key={feature}
                        variant="secondary"
                        className="ds-animate-fade-in"
                        style={{ animationDelay: `${200 + index * 50}ms` }}
                    >
                        <Check className="mr-1.5 h-3 w-3" />
                        {feature}
                    </Badge>
                ))}
            </div>
        </div>
    );
}