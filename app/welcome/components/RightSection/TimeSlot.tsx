import { TimeSlotHandler } from '../../handlers/TimeSlotHandler';

interface TimeSlotProps {
    id: string;
    time: string;
    available: boolean;
}

export function TimeSlot({ id, time, available }: TimeSlotProps) {
    const handler = TimeSlotHandler.getInstance();

    return (
        <div
            className="ds-time-slot"
            onClick={() => handler.handleSlotClick(id)}
            onMouseEnter={() => handler.handleSlotHover(id)}
        >
            <div className="ds-time-slot-radio" />
            <span className="ds-text-sm">{time}</span>
        </div>
    );
}