import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = '{/* Normal sets (warmup / approach / working only) */}'
end_marker = '{/* Drop Set Blocks — agrupados por secuencias consecutivas */}'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

new_sets_table = '''{/* Normal sets (warmup / approach / working only) */}
                            <div className="space-y-1">
                                {exercise.sets
                                    .map((set, index) => ({ set, index }))
                                    .filter(({ set }) => set.type !== 'drop')
                                    .map(({ set, index }) => {
                                        const prevSet = previousSets[index];
                                        const isProgression = prevSet && set.weight && set.reps && (
                                            (parseFloat(set.weight) > prevSet.weight) ||
                                            (parseFloat(set.weight) == prevSet.weight && parseInt(set.reps) > prevSet.reps)
                                        );

                                        return (
                                            <div key={set.id} className={`flex items-center gap-2 py-1 ${set.isCompleted ? 'opacity-60' : ''}`}>
                                                <div className="w-8 flex-shrink-0 text-center text-[10px] font-bold text-[var(--text-3)] bg-[var(--surface-2)] rounded-md py-1.5 relative">
                                                    {index + 1}
                                                    {isProgression && (
                                                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#32D74B] rounded-full border-2 border-[var(--surface-1)]"></div>
                                                    )}
                                                </div>
                                                <div className="w-20 flex-shrink-0">
                                                    <select
                                                        value={set.type || 'working'}
                                                        onChange={(e) => onUpdateSet(exercise.id, set.id, 'type', e.target.value)}
                                                        className="w-full hevy-input py-1.5 px-0.5 text-[10px] cursor-pointer">
                                                        <option value="warmup">Calentam.</option>
                                                        <option value="approach">Aproxim.</option>
                                                        <option value="working">Normal</option>
                                                        <option value="drop">Drop Set</option>
                                                    </select>
                                                </div>
                                                <div className="flex-1 flex items-center justify-center min-w-0">
                                                    {prevSet ? (
                                                        <div className="text-center leading-none overflow-hidden">
                                                            <div className="text-xs font-bold text-[var(--text-2)]">{prevSet.weight}kg</div>
                                                            <div className="text-[9px] text-[var(--text-3)]">{prevSet.reps} reps</div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-[var(--text-3)] text-lg font-light">-</span>
                                                    )}
                                                </div>
                                                <div className="w-16 flex-shrink-0 relative">
                                                    <input
                                                        type="number" min="0" max="600" step="0.5"
                                                        value={set.weight}
                                                        onChange={(e) => onUpdateSet(exercise.id, set.id, 'weight', e.target.value)}
                                                        className={`hevy-input w-full ${isProgression ? 'text-[#32D74B]' : ''}`}
                                                    />
                                                </div>
                                                <div className="w-16 flex-shrink-0">
                                                    <input
                                                        type="number" min="0" max="100"
                                                        value={set.reps}
                                                        onChange={(e) => onUpdateSet(exercise.id, set.id, 'reps', e.target.value)}
                                                        className={`hevy-input w-full ${isProgression ? 'text-[#32D74B]' : ''}`}
                                                    />
                                                </div>
                                                <div className="w-12 flex-shrink-0">
                                                    <button
                                                        onClick={() => onUpdateSet(exercise.id, set.id, 'isCompleted', !set.isCompleted)}
                                                        className={`hevy-check-btn ${set.isCompleted ? 'completed' : ''}`}
                                                    >
                                                        <Icon name="check" className="w-5 h-5 stroke-[3px]" />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>

                            '''

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_sets_table + content[end_idx:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Added progression logic successfully')
