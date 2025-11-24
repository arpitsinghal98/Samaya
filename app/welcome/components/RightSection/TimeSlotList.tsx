import { TimeSlot } from './TimeSlot';
import { CalendarHandler } from '../../handlers/CalendarHandler';

export function TimeSlotList() {
    const calendarHandler = CalendarHandler.getInstance();
    const slots = calendarHandler.getTimeSlots();

    return (
        <div className="px-6 pt-3 pb-6">
            <div className="mb-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Available Times
            </div>
            <div className="space-y-2">
                {slots.map((slot) => (
                    <TimeSlot
                        key={slot.id}
                        id={slot.id}
                        time={slot.time}
                        available={slot.available}
                    />
                ))}
            </div>
        </div>
    );
}