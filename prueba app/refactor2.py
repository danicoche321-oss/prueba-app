import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the table header grid with a flex container that matches the SetRow widths
old_header = '''<div className="grid grid-cols-12 gap-1 sm:gap-3 mb-3 text-[10px] items-center text-stone-400 font-bold uppercase tracking-wider text-center">
                                <span className="col-span-1">#</span>
                                <span className="col-span-2 text-left pl-2">Tipo</span>
                                <span className="col-span-3 text-stone-400/80">Prev</span>
                                <span className="col-span-2">Kg</span>
                                <span className="col-span-2">Reps</span>
                                <span className="col-span-2">✓</span>
                            </div>'''

new_header = '''<div className="flex items-center gap-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-3)] text-center px-1">
                                <span className="w-8 flex-shrink-0">#</span>
                                <span className="w-20 flex-shrink-0 text-left pl-1">Tipo</span>
                                <span className="flex-1 min-w-0">Prev</span>
                                <span className="w-16 flex-shrink-0">Kg</span>
                                <span className="w-16 flex-shrink-0">Reps</span>
                                <span className="w-12 flex-shrink-0">✓</span>
                            </div>'''

content = content.replace(old_header, new_header)

# Also fix the ExerciseCard header background (remove stone-900 and subtle border, make it flat)
old_img_box = '''<div className="w-16 h-16 bg-stone-900 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300 border" style={{ borderColor: 'var(--border-subtle)' }}>'''
new_img_box = '''<div className="w-16 h-16 bg-[var(--surface-0)] rounded-lg flex items-center justify-center overflow-hidden shrink-0">'''
content = content.replace(old_img_box, new_img_box)

old_card_head = '''<h4 className="font-bold text-gray-900 text-lg mb-1 leading-tight group-hover:text-primary-600 transition-colors">{exercise.name}</h4>'''
new_card_head = '''<h4 className="font-bold text-[var(--text-1)] text-lg mb-0.5 leading-tight">{exercise.name}</h4>'''
content = content.replace(old_card_head, new_card_head)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Replaced table header successfully')
