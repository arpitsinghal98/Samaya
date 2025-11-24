export interface TimeSlot {
    id: string;
    time: string;
    available: boolean;
}

export class CalendarHandler {
    private static instance: CalendarHandler;
    private timeSlots: TimeSlot[];

    private constructor() {
        this.timeSlots = this.generateDemoSlots();
    }

    public static getInstance(): CalendarHandler {
        if (!CalendarHandler.instance) {
            CalendarHandler.instance = new CalendarHandler();
        }
        return CalendarHandler.instance;
    }

    private generateDemoSlots(): TimeSlot[] {
        return [
            { id: '1', time: '9:00 AM', available: true },
            { id: '2', time: '10:00 AM', available: true },
            { id: '3', time: '11:00 AM', available: true },
            { id: '4', time: '2:00 PM', available: true },
            { id: '5', time: '3:00 PM', available: true },
        ];
    }

    public getTimeSlots(): TimeSlot[] {
        return this.timeSlots;
    }

    public getEventTitle(): string {
        return 'Call with Arpit';
    }

    public getEventDuration(): string {
        return '30 minutes';
    }
}