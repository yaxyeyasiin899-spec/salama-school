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

// 3. Add natiijada tab content right before activeTab === 'profile' (since profile doesn't exist yet, I'll add it before <div className="md:hidden bg-white)
// Actually I can add it right after the `activeTab === 'macalimiinta'` block.
// Let's replace `{activeTab === 'macalimiinta' && (` with a marker, but it's easier to find the end of the `macalimiinta` block, which is somewhat complex.
// How about inserting before `{editingUser && (`?
// Let's check if `{editingUser && (` exists.

