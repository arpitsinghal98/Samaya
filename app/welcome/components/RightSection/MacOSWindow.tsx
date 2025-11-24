import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/components/ui/card';
import { TimeSlotList } from './TimeSlotList';
import { MiniCalendar } from './MiniCalendar';
import { LoginCard } from '../Auth/LoginCard';
import { SignupCard } from '../Auth/SignupCard';
import { CalendarHandler } from '../../handlers/CalendarHandler';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export function MacOSWindow() {
    const calendarHandler = CalendarHandler.getInstance();
    const { currentView } = useAuth();

    const getTitle = () => {
        switch (currentView) {
            case 'login':
                return 'Sign In';
            case 'signup':
                return 'Create Account';
            default:
                return calendarHandler.getEventTitle();
        }
    };

    const getSubtitle = () => {
        if (currentView === 'calendar') {
            return calendarHandler.getEventDuration();
        }
        return undefined;
    };

    return (
        <Card
            className="w-full max-w-2xl ds-animate-fade-in overflow-hidden"
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
                    <CardTitle className="text-sm font-semibold">{getTitle()}</CardTitle>
                    {getSubtitle() && <CardDescription className="text-xs">· {getSubtitle()}</CardDescription>}
                </div>
            </CardHeader>

            <CardContent className="p-0 relative overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                    {currentView === 'calendar' && (
                        <motion.div
                            key="calendar"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <div className="flex">
                                <div className="w-[60%] border-r">
                                    <MiniCalendar />
                                </div>
                                <div className="w-[40%]">
                                    <TimeSlotList />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {currentView === 'login' && (
                        <motion.div
                            key="login"
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <LoginCard />
                        </motion.div>
                    )}

                    {currentView === 'signup' && (
                        <motion.div
                            key="signup"
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <SignupCard />
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    );
}