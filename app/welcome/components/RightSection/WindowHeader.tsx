interface WindowHeaderProps {
    title: string;
    subtitle?: string;
}

export function WindowHeader({ title, subtitle }: WindowHeaderProps) {
    return (
        <div className="ds-macos-header">
            <div className="flex gap-2">
                <div className="ds-macos-dot ds-macos-dot-red" />
                <div className="ds-macos-dot ds-macos-dot-yellow" />
                <div className="ds-macos-dot ds-macos-dot-green" />
            </div>
            <div className="flex-1 text-center">
                <div className="ds-text-sm font-medium">{title}</div>
                {subtitle && <div className="ds-text-xs ds-text-muted">{subtitle}</div>}
            </div>
            <div className="w-14" /> {/* Spacer for centering */}
        </div>
    );
}