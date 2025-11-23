export function Heading() {
    return (
        <h1 className="mb-6 ds-animate-fade-in">
            <span className="block text-6xl font-bold tracking-tight leading-tight mb-2">
                Effortless
            </span>
            <span className="block text-6xl font-bold tracking-tight leading-tight"
                style={{
                    background: 'linear-gradient(135deg, #64748b 0%, #475569 50%, #64748b 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}>
                Scheduling
            </span>
        </h1>
    );
}