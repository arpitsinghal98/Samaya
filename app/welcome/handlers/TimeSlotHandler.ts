export class TimeSlotHandler {
    private static instance: TimeSlotHandler;

    private constructor() { }

    public static getInstance(): TimeSlotHandler {
        if (!TimeSlotHandler.instance) {
            TimeSlotHandler.instance = new TimeSlotHandler();
        }
        return TimeSlotHandler.instance;
    }

    public handleSlotClick(slotId: string): void {
        console.log(`Time slot ${slotId} clicked (demo mode - disabled)`);
    }

    public handleSlotHover(slotId: string): void {
        // Could show tooltip or preview
        console.log(`Hovering slot ${slotId}`);
    }
}