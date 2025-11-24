export function Logo() {
    return (
        <div className="flex justify-center mb-16">
            <div className="ds-animate-pulse">
                <img
                    src="/logo.svg"
                    alt="Samay Logo"
                    className="h-20 w-auto ds-gold-gradient"
                    style={{
                        filter: 'drop-shadow(0 0 20px rgba(198, 160, 96, 0.3))',
                    }}
                />
            </div>
        </div>
    );
}