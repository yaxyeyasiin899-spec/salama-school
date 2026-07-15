const fs = require('fs');
let code = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

// 1. Add states
const stateCode = `
  const [searchNatiijadaName, setSearchNatiijadaName] = useState('');
  const [searchedNatiijadaStudent, setSearchedNatiijadaStudent] = useState<Student | null>(null);

  const handleSearchNatiijada = (e: React.FormEvent) => {
    e.preventDefault();
    const found = students.find(s => s.name.toLowerCase().trim() === searchNatiijadaName.toLowerCase().trim());
    setSearchedNatiijadaStudent(found || null);
    if (!found) {
      alert("Lama helin arday magacaas leh. Fadlan hubi magaca (oo saddexan).");
    }
  };
`;
code = code.replace(/const \[selectedStudentForDetails, setSelectedStudentForDetails\] = useState<Student \| null>\(null\);/, 
  'const [selectedStudentForDetails, setSelectedStudentForDetails] = useState<Student | null>(null);\n' + stateCode);

// 2. Add natiijada ActionCard onClick
code = code.replace(/<ActionCard icon={<FileText \/>} label="Natiijooyinka" color="text-green-500" \/>/, 
  '<ActionCard icon={<FileText />} label="Natiijooyinka" color="text-green-500" onClick={() => setActiveTab(\'natiijada\')} />');

// 3. Add Natiijada tab
const natiijadaTab = `
            {activeTab === 'natiijada' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Raadi Natiijada Ardayga</h2>
                
                <form onSubmit={handleSearchNatiijada} className="flex gap-3 mb-8">
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Geli magaca ardayga oo saddexan..."
                      value={searchNatiijadaName}
                      onChange={(e) => setSearchNatiijadaName(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                    Raadi
                  </button>
                </form>

                {searchedNatiijadaStudent && (
                  <div className="mt-6 border-t border-gray-100 pt-6">
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-blue-600/80 mb-1">Magaca Buuxa</p>
                          <p className="font-bold text-blue-900 text-lg">{searchedNatiijadaStudent.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-600/80 mb-1">Fasalka</p>
                          <p className="font-bold text-blue-900 text-lg">{searchedNatiijadaStudent.className}</p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-600/80 mb-1">Telefoonka</p>
                          <p className="font-bold text-blue-900 text-lg">{searchedNatiijadaStudent.phone || '-'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-600/80 mb-1">Username (ID)</p>
                          <p className="font-bold text-blue-900 text-lg">{searchedNatiijadaStudent.username}</p>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-800 mb-4">Maqnaashaha (Xaadirinta Maanta)</h3>
                    <div className="bg-white border border-gray-100 rounded-xl p-4 mb-6">
                      {attendance[searchedNatiijadaStudent.id] === 'xaadir' && <span className="text-green-600 bg-green-50 px-4 py-2 rounded-full font-bold text-sm">Xaadir</span>}
                      {attendance[searchedNatiijadaStudent.id] === 'maqan' && <span className="text-red-600 bg-red-50 px-4 py-2 rounded-full font-bold text-sm">Waa Maqan</span>}
                      {attendance[searchedNatiijadaStudent.id] === 'fasax' && <span className="text-yellow-600 bg-yellow-50 px-4 py-2 rounded-full font-bold text-sm">Fasax</span>}
                      {!attendance[searchedNatiijadaStudent.id] && <span className="text-gray-500 font-medium text-sm">Wali lama xaadirin maanta</span>}
                    </div>

                    <h3 className="text-lg font-bold text-gray-800 mb-4">Natiijada Buundooyinka</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="py-3 px-4 text-sm font-medium text-gray-500">Maadada</th>
                            <th className="py-3 px-4 text-sm font-medium text-gray-500 text-right">Buundada</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subjects.map((subject, index) => {
                            const score = grades[searchedNatiijadaStudent.id]?.[subject] || 0;
                            return (
                              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 font-bold text-gray-800">{subject}</td>
                                <td className="py-3 px-4 font-bold text-blue-600 text-right">{score}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                        <tfoot className="bg-gray-50">
                          <tr>
                            <td className="py-4 px-4 font-bold text-gray-800">Wadarta Guud</td>
                            <td className="py-4 px-4 font-bold text-green-600 text-right text-lg">
                              {Object.values(grades[searchedNatiijadaStudent.id] || {}).reduce((a, b) => a + b, 0)} / {subjects.length * 100}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
`;
code = code.replace('{editingUser && (', natiijadaTab + '\n        {editingUser && (');

fs.writeFileSync('src/components/AdminDashboard.tsx', code);
