const fs = require('fs');
let code = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

// Update ActionCard
code = code.replace(
  /<ActionCard icon={<BookOpen \/>} label="Fasallada" color="text-purple-500" \/>/,
  '<ActionCard icon={<BookOpen />} label="Fasallada" color="text-purple-500" onClick={() => setActiveTab(\'fasallada\')} />'
);

// Add fasallada tab before `editingUser`
const fasalladaTab = `
            {activeTab === 'fasallada' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Fasallada & Tirada Ardayda</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {['Fasalka 1aad', 'Fasalka 2aad', 'Fasalka 3aad', 'Fasalka 4aad', 'Fasalka 5aad', 'Fasalka 6aad', 'Fasalka 7aad', 'Fasalka 8aad'].map(className => {
                    const studentCount = students.filter(s => s.className === className).length;
                    if (studentCount === 0 && !students.some(s => s.className.includes(className))) return null;
                    return (
                      <div key={className} className="bg-purple-50 border border-purple-100 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
                        <BookOpen className="w-10 h-10 text-purple-500 mb-3" />
                        <h3 className="text-lg font-bold text-gray-800 mb-1">{className}</h3>
                        <p className="text-purple-600 font-medium text-2xl">{studentCount} <span className="text-sm text-purple-500 font-normal">Arday</span></p>
                      </div>
                    );
                  })}
                  
                  {Array.from(new Set(students.map(s => s.className))).filter(c => !['Fasalka 1aad', 'Fasalka 2aad', 'Fasalka 3aad', 'Fasalka 4aad', 'Fasalka 5aad', 'Fasalka 6aad', 'Fasalka 7aad', 'Fasalka 8aad'].includes(c)).map(className => {
                    const studentCount = students.filter(s => s.className === className).length;
                    return (
                      <div key={className} className="bg-purple-50 border border-purple-100 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
                        <BookOpen className="w-10 h-10 text-purple-500 mb-3" />
                        <h3 className="text-lg font-bold text-gray-800 mb-1">{className}</h3>
                        <p className="text-purple-600 font-medium text-2xl">{studentCount} <span className="text-sm text-purple-500 font-normal">Arday</span></p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
`;

code = code.replace('{editingUser && (', fasalladaTab + '\n        {editingUser && (');

fs.writeFileSync('src/components/AdminDashboard.tsx', code);
