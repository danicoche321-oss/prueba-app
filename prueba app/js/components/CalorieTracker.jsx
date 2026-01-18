const CalorieTracker = () => {
    const [calories, setCalories] = React.useState(1250);
    const target = 2200;
    const percentage = Math.min((calories / target) * 100, 100);

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100 mb-6 relative overflow-hidden">
            <div className="flex justify-between items-center z-10 relative">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Resumen Diario</h2>
                    <p className="text-sm text-gray-500">Hoy, {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' })}</p>
                </div>
                <div className="text-right">
                    <span className="text-3xl font-extrabold text-primary-600">{calories}</span>
                    <span className="text-xs text-gray-400 block">/ {target} kcal</span>
                </div>
            </div>

            {/* Progress Bar Container */}
            <div className="mt-6">
                <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-400 font-medium">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                </div>
            </div>

            {/* Visual Decor */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary-50 rounded-full opacity-50 z-0"></div>
        </div>
    );
};

window.CalorieTracker = CalorieTracker;
