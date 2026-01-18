const ExerciseCard = () => {
    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4 items-center">
            <div className="w-20 h-20 bg-primary-50 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                {/* Use the local asset if available, fallback to a placeholder if not */}
                <img src="./assets/bench_press.png" alt="Bench Press" className="w-full h-full object-cover mix-blend-multiply" />
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-1">Press de Banca</h4>
                <p className="text-xs text-gray-500 mb-3">Pecho, Tríceps</p>

                <div className="flex gap-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">Series</span>
                        <span className="font-bold text-gray-800">4</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">Reps</span>
                        <span className="font-bold text-gray-800">10-12</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">Peso</span>
                        <span className="font-bold text-gray-800">60kg</span>
                    </div>
                </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary-50 hover:text-primary-500 transition-colors">
                <i data-lucide="check" className="w-5 h-5"></i>
            </button>
        </div>
    );
};

window.ExerciseCard = ExerciseCard;
