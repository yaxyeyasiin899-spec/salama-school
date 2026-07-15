const fs = require('fs');
let code = fs.readFileSync('src/components/TeacherDashboard.tsx', 'utf8');

code = code.replace(
  /<option value="Fasalka 1aad">Fasalka 1aad<\/option>\s*<option value="Fasalka 2aad">Fasalka 2aad<\/option>\s*<option value="Fasalka 3aad">Fasalka 3aad<\/option>/g,
  `<option value="Fasalka 1aad">Fasalka 1aad</option>
                    <option value="Fasalka 2aad">Fasalka 2aad</option>
                    <option value="Fasalka 3aad">Fasalka 3aad</option>
                    <option value="Fasalka 4aad">Fasalka 4aad</option>
                    <option value="Fasalka 5aad">Fasalka 5aad</option>
                    <option value="Fasalka 6aad">Fasalka 6aad</option>
                    <option value="Fasalka 7aad">Fasalka 7aad</option>
                    <option value="Fasalka 8aad">Fasalka 8aad</option>`
);

fs.writeFileSync('src/components/TeacherDashboard.tsx', code);
