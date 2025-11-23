import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/components/ui/card';
import { TimeSlotList } from './TimeSlotList';
import { MiniCalendar } from './MiniCalendar';
import { CalendarHandler } from '../../handlers/CalendarHandler';

export function MacOSWindow() {
    const calendarHandler = CalendarHandler.getInstance();

    return (
        <Card
            className="w-full max-w-2xl ds-animate-fade-in transition-all duration-300 overflow-hidden"
            style={{
                animationDelay: '300ms',
            }}
        >
            <CardHeader className="bg-slate-50/50 border-b py-2 px-4 space-y-1">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex items-baseline justify-center gap-2">
                    <CardTitle className="text-sm font-semibold">{calendarHandler.getEventTitle()}</CardTitle>
                    <CardDescription className="text-xs">· {calendarHandler.getEventDuration()}</CardDescription>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                {/* Calendar and Time Slots Side by Side */}
                <div className="flex">
                    {/* Left: Mini Calendar - 60% width */}
                    <div className="w-[60%] border-r">
                        <MiniCalendar />
                    </div>

                    {/* Right: Time Slots - 40% width */}
                    <div className="w-[40%]">
                        <TimeSlotList />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}