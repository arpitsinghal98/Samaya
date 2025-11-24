import { useState } from 'react';
import { Calendar } from '~/components/ui/calendar';

export function MiniCalendar() {
    // Set default selected date to 15th of current month
    const today = new Date();
    const defaultDate = new Date(today.getFullYear(), today.getMonth(), 15);
    const [date, setDate] = useState<Date | undefined>(defaultDate);

    return (
        <div className="px-6 pb-6">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md w-full"
            />
        </div>
    );
}
