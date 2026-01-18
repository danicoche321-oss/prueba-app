const WorkoutCalendar = () => {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const today = new Date().getDay();
    const [selectedDay, setSelectedDay] = React.useState(today);

    return (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 text-lg">Tu Semana</h3>
                <button className="text-primary-600 text-sm font-semibold">Ver todo</button>
            </div>
            <div className="flex justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-50 overflow-x-auto">
                {days.map((day, index) => {
                    const isSelected = selectedDay === index;
                    const isToday = today === index;
                    return (
                        <div
                            key={day}
                            onClick={() => setSelectedDay(index)}
                            className={`flex flex-col items-center justify-center w-10 h-16 rounded-full cursor-pointer transition-all duration-200 ${isSelected ? 'bg-primary-500 text-white shadow-lg shadow-primary-200 transform scale-110' : 'text-gray-400 hover:bg-gray-50'}`}
                        >
                            <span className="text-[10px] uppercase font-bold tracking-tighter mb-1">{day}</span>
                            <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-gray-800'}`}>{15 + index}</span>
                            {isToday && !isSelected && <div className="w-1 h-1 bg-primary-500 rounded-full mt-1"></div>}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

window.WorkoutCalendar = WorkoutCalendar;
