const fs = require('fs');
let code = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

// Update line 34
code = code.replace(
  "className: formData.get('class') as string === '1' ? 'Fasalka 1aad' : formData.get('class') === '2' ? 'Fasalka 2aad' : 'Fasalka 3aad',",
  "className: `Fasalka ${formData.get('class')}aad`,"
);

// Update select dropdown for adding students
code = code.replace(
  `<option value="1">Fasalka 1aad</option>
                      <option value="2">Fasalka 2aad</option>
                      <option value="3">Fasalka 3aad</option>`,
  `<option value="1">Fasalka 1aad</option>
                      <option value="2">Fasalka 2aad</option>
                      <option value="3">Fasalka 3aad</option>
                      <option value="4">Fasalka 4aad</option>
                      <option value="5">Fasalka 5aad</option>
                      <option value="6">Fasalka 6aad</option>
                      <option value="7">Fasalka 7aad</option>
                      <option value="8">Fasalka 8aad</option>`
);

// Update select dropdown for searching students
code = code.replace(
  `<option value="Fasalka 1aad">Fasalka 1aad</option>
                        <option value="Fasalka 2aad">Fasalka 2aad</option>
                        <option value="Fasalka 3aad">Fasalka 3aad</option>`,
  `<option value="Fasalka 1aad">Fasalka 1aad</option>
                        <option value="Fasalka 2aad">Fasalka 2aad</option>
                        <option value="Fasalka 3aad">Fasalka 3aad</option>
                        <option value="Fasalka 4aad">Fasalka 4aad</option>
                        <option value="Fasalka 5aad">Fasalka 5aad</option>
                        <option value="Fasalka 6aad">Fasalka 6aad</option>
                        <option value="Fasalka 7aad">Fasalka 7aad</option>
                        <option value="Fasalka 8aad">Fasalka 8aad</option>`
);

fs.writeFileSync('src/components/AdminDashboard.tsx', code);
