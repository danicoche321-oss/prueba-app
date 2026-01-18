// Import components (they are attached to window since we are using No-Build)
const { CalorieTracker, WorkoutCalendar, ExerciseCard, StepCounter } = window;

const App = () => {
    const [activeTab, setActiveTab] = React.useState('home');

    // Initialize Lucide icons after render
    React.useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    });

    return (
        <div className="min-h-screen pb-24 bg-gray-50 font-sans">
            {/* Header */}
            <div className="bg-white p-6 pb-4 sticky top-0 z-50 border-b border-gray-100/50 backdrop-blur-md bg-white/80">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Antigravity<span className="text-primary-500">.</span></h1>
                        <p className="text-xs text-gray-500 font-medium">Fitness Tracker</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                    </div>
                </div>
            </div>

            {/* Content Scroller */}
            <div className="p-6 space-y-2 animate-fade-in">
                {activeTab === 'home' && (
                    <>
                        <CalorieTracker />
                        <WorkoutCalendar />
                        <StepCounter />

                        <div className="mt-8">
                            <h3 className="font-bold text-gray-800 text-lg mb-4">Entreno de Hoy</h3>
                            <div className="space-y-4">
                                <ExerciseCard />
                                <ExerciseCard />
                                <ExerciseCard />
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 'calendar' && (
                    <div className="text-center py-20 text-gray-400">
                        <i data-lucide="calendar" className="w-12 h-12 mx-auto mb-4 opacity-50"></i>
                        <p>Vista completa del calendario</p>
                    </div>
                )}
                {activeTab === 'profile' && (
                    <div className="text-center py-20 text-gray-400">
                        <i data-lucide="user" className="w-12 h-12 mx-auto mb-4 opacity-50"></i>
                        <p>Perfil de usuario</p>
                    </div>
                )}
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center p-4 pb-8 z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
                <button
                    onClick={() => setActiveTab('home')}
                    className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-primary-500' : 'text-gray-400'}`}
                >
                    <i data-lucide="home" className={`w-6 h-6 ${activeTab === 'home' ? 'stroke-[2.5px]' : ''}`}></i>
                    <span className="text-[10px] font-bold">Inicio</span>
                </button>

                <div className="relative -top-8">
                    <button className="w-14 h-14 bg-primary-500 rounded-full text-white shadow-lg shadow-primary-500/40 flex items-center justify-center transform transition-transform active:scale-95 hover:scale-105">
                        <i data-lucide="plus" className="w-7 h-7 stroke-[3px]"></i>
                    </button>
                </div>

                <button
                    onClick={() => setActiveTab('calendar')}
                    className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'calendar' ? 'text-primary-500' : 'text-gray-400'}`}
                >
                    <i data-lucide="calendar-days" className={`w-6 h-6 ${activeTab === 'calendar' ? 'stroke-[2.5px]' : ''}`}></i>
                    <span className="text-[10px] font-bold">Agenda</span>
                </button>
            </div>
        </div>
    );
};

// Mount the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
