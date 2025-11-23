import { createContext, useContext, useState, type ReactNode } from 'react';

type AuthView = 'calendar' | 'login' | 'signup';

interface AuthContextType {
    currentView: AuthView;
    showCalendar: () => void;
    showLogin: () => void;
    showSignup: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [currentView, setCurrentView] = useState<AuthView>('calendar');

    const showCalendar = () => setCurrentView('calendar');
    const showLogin = () => setCurrentView('login');
    const showSignup = () => setCurrentView('signup');

    return (
        <AuthContext.Provider value={{ currentView, showCalendar, showLogin, showSignup }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
