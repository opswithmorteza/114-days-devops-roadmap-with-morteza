const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dirs = fs.readdirSync(root, { withFileTypes: true })
  .filter(d => d.isDirectory() && /^Day-\d{3}_/.test(d.name))
  .sort((a, b) => a.name.localeCompare(b.name));
const errors = [];

if (dirs.length !== 114) errors.push(`Expected 114 day folders, found ${dirs.length}`);

dirs.forEach((d, i) => {
  const expected = String(i + 1).padStart(3, '0');
  if (d.name.slice(4, 7) !== expected) errors.push(`Day sequence error at ${d.name}`);
  const base = path.join(root, d.name);
  for (const rel of ['notes.md', 'project/README.md', 'project/PROJECT-1.md', 'project/PROJECT-2.md', 'project/lab.sh']) {
    const file = path.join(base, rel);
    if (!fs.existsSync(file)) errors.push(`Missing ${d.name}/${rel}`);
    else {
      const minimum = rel === 'project/README.md' ? 200 : 500;
      if (fs.statSync(file).size < minimum) errors.push(`Too small ${d.name}/${rel}`);
    }
  }
  const notes = fs.readFileSync(path.join(base, 'notes.md'), 'utf8');
  for (const heading of ['## In plain English', '## Learning outcomes', '## Core ideas', '## Worked example', '## Project 1', '## Project 2', '## Completion checklist']) {
    if (!notes.includes(heading)) errors.push(`${d.name}/notes.md missing ${heading}`);
  }
});

for (const rel of ['README.md', 'PROGRESS.md', 'COMPLETE_114_DAY_GUIDE.md', 'LINKEDIN_PUBLISHING_GUIDE.md', 'UPLOAD_INSTRUCTIONS.md']) {
  if (!fs.existsSync(path.join(root, rel))) errors.push(`Missing root file ${rel}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`PASS: ${dirs.length} lessons, ${dirs.length * 2} projects, required sections and root guides verified.`);
