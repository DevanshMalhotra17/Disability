import re
import os

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract head and scripts
head_match = re.search(r'(<!DOCTYPE html>.*?<body>)', content, re.DOTALL)
head = head_match.group(1) if head_match else '<!DOCTYPE html>\n<html lang="en">\n<head></head>\n<body>'

scripts_match = re.search(r'(<script src="asl.js".*?</html>)', content, re.DOTALL)
scripts = '\n' + scripts_match.group(1) if scripts_match else '\n</body>\n</html>'

# Extract sections
sections = re.findall(r'(<section id="screen-([^"]+)".*?</section>)', content, re.DOTALL)

for section_content, section_name in sections:
    filename = 'index.html' if section_name == 'setup' else f'{section_name}.html'
    
    # We want ALL sections to be active by default since they are on their own page now.
    cleaned_section = section_content.replace('class="screen"', 'class="screen active"')
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(head + '\n' + cleaned_section + scripts)

print("Split completed!")
