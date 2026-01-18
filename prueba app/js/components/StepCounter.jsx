const StepCounter = () => {
    const [steps, setSteps] = React.useState(5432);
    const goal = 10000;
    const progress = Math.min((steps / goal) * 100, 100);

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 text-white shadow-lg mb-6 relative overflow-hidden">
            <div className="flex items-center justify-between z-10 relative">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                        <i data-lucide="footprints" className="w-6 h-6 text-primary-300"></i>
                    </div>
                    <div>
                        <p className="text-xs text-gray-300 font-medium uppercase tracking-wide">Pasos</p>
                        <h3 className="text-2xl font-bold">{steps.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="relative w-12 h-12 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-700" />
                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-primary-500" strokeDasharray={`${progress * 1.25} 100`} />
                    </svg>
                    <span className="absolute text-[10px] font-bold">{Math.round(progress)}%</span>
                </div>
            </div>

            <button
                onClick={() => setSteps(prev => prev + 100)}
                className="w-full mt-4 py-2 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-lg text-sm font-medium transition-colors border border-white/5"
            >
                + Añadir pasos (Simular)
            </button>
        </div>
    );
};

window.StepCounter = StepCounter;
