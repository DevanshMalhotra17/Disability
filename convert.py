import re

with open(r'C:\Users\devan\Downloads\asl-speech\src\aslSigns.tsx', 'r') as f:
    content = f.read()

matches = re.finditer(r'export const ([A-Z]|Space):.*?=> \(\s*(<svg.*?</svg>)\s*\);', content, re.DOTALL)

out = 'const skin = "#F5C5A3";\nconst skinDark = "#E8A87C";\nconst skinDarker = "#C8824E";\n\n'
out += 'const ASL_SIGNS = {\n'

def fix_react_svg(svg_str):
    svg_str = svg_str.replace('{size}', '${size}')
    svg_str = svg_str.replace('{skin}', '${skin}')
    svg_str = svg_str.replace('{skinDark}', '${skinDark}')
    svg_str = svg_str.replace('{skinDarker}', '${skinDarker}')
    svg_str = svg_str.replace('<Wrist />', '<rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />')
    svg_str = svg_str.replace('<Palm />', '<ellipse cx="60" cy="75" rx="42" ry="48" fill="${skin}" />')
    svg_str = svg_str.replace('<Palm color={skin} />', '<ellipse cx="60" cy="75" rx="42" ry="48" fill="${skin}" />')
    svg_str = svg_str.replace('strokeWidth=', 'stroke-width=')
    svg_str = svg_str.replace('strokeLinecap=', 'stroke-linecap=')
    svg_str = svg_str.replace('strokeLinejoin=', 'stroke-linejoin=')
    svg_str = svg_str.replace('strokeDasharray=', 'stroke-dasharray=')
    svg_str = svg_str.replace('textAnchor=', 'text-anchor=')
    svg_str = svg_str.replace('fontWeight=', 'font-weight=')
    svg_str = svg_str.replace('fontSize=', 'font-size=')
    return svg_str

for m in matches:
    name = m.group(1)
    if name == 'Space':
        name = ' '
    svg = fix_react_svg(m.group(2))
    out += f'  "{name}": (size = 120) => `\\n{svg}\\n`,\n'

out += '};\n'

with open('asl.js', 'w') as f:
    f.write(out)
print('Done!')
