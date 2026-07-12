import React, { useState } from 'react';
import { Menu, Bell, UserPlus, Users, BookOpen, Calendar, FileText, DollarSign, Home, UserCircle, LogOut, ArrowLeft, Search } from 'lucide-react';
import { User, Student, Teacher } from '../types';

export default function AdminDashboard({ user, onLogout, students, setStudents, teachers, setTeachers, attendance, grades }: { user: User, onLogout: () => void, students: Student[], setStudents: (s: Student[]) => void, teachers: Teacher[], setTeachers: (t: Teacher[]) => void, attendance: Record<number, string>, grades: Record<number, Record<string, number>> }) {
  const [activeTab, setActiveTab] = useState('home');

  const [editingUser, setEditingUser] = useState<{ type: 'student' | 'teacher', id: number } | null>(null);
  
  const [searchStudentName, setSearchStudentName] = useState('');
  const [searchStudentClass, setSearchStudentClass] = useState('');
  const [selectedStudentForDetails, setSelectedStudentForDetails] = useState<Student | null>(null);

  const handleAddStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newStudent = {
      id: students.length + 1,
      name: formData.get('name') as string,
      className: formData.get('class') as string === '1' ? 'Fasalka 1aad' : formData.get('class') === '2' ? 'Fasalka 2aad' : 'Fasalka 3aad',
      phone: formData.get('phone') as string,
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    };
    setStudents([...students, newStudent]);
    setActiveTab('ardayda');
  };

  const handleAddTeacher = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newTeacher = {
      id: teachers.length + 1,
      name: formData.get('name') as string,
      subject: formData.get('subject') as string,
      phone: formData.get('phone') as string,
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    };
    setTeachers([...teachers, newTeacher]);
    setActiveTab('macalimiinta');
  };

  return (
    <div className="flex flex-col md:flex-row h-full min-h-screen bg-gray-50">
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6 bg-blue-600 text-white">
          <h1 className="text-xl font-bold">School Salama - Admin</h1>
          <p className="text-sm text-blue-100 mt-1">Ku soo dhawoow, {user.name}</p>
        </div>
        <div className="flex-1 py-6 px-4 space-y-2">
          <SidebarItem icon={<Home />} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <SidebarItem icon={<Users />} label="Ardayda" active={activeTab === 'ardayda' || activeTab === 'add_student'} onClick={() => setActiveTab('ardayda')} />
          <SidebarItem icon={<UserPlus />} label="Macalimiinta" active={activeTab === 'macalimiinta' || activeTab === 'add_teacher'} onClick={() => setActiveTab('macalimiinta')} />
          <SidebarItem icon={<UserCircle />} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 text-red-600 cursor-pointer hover:bg-red-50 p-3 rounded-xl transition-colors" onClick={onLogout}>
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col h-full md:h-screen">
        {/* Header (Mobile & Desktop) */}
        <div className="bg-blue-600 md:bg-white text-white md:text-gray-800 px-6 py-4 flex items-center justify-between shadow-md md:shadow-sm md:border-b md:border-gray-200 shrink-0">
          <div className="flex items-center gap-4">
            <Menu className="w-6 h-6 cursor-pointer md:hidden" />
            <div className="md:hidden">
              <h1 className="text-lg font-bold">School Salama</h1>
              <p className="text-xs text-blue-100">Ku soo dhawoow, {user.name}</p>
            </div>
            <div className="hidden md:block">
              <h2 className="text-xl font-bold">Overview</h2>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer p-2 rounded-full hover:bg-blue-700 md:hover:bg-gray-100 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <LogOut className="w-5 h-5 cursor-pointer md:hidden" onClick={onLogout} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'home' && (
              <>
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="bg-blue-100 p-3 md:p-4 rounded-full text-blue-600">
                      <Users className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-bold text-gray-800">120</div>
                      <div className="text-xs md:text-sm text-gray-500">Ardayda</div>
                    </div>
                  </div>
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="bg-orange-100 p-3 md:p-4 rounded-full text-orange-600">
                      <UserPlus className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-bold text-gray-800">15</div>
                      <div className="text-xs md:text-sm text-gray-500">Macalimiinta</div>
                    </div>
                  </div>
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="bg-purple-100 p-3 md:p-4 rounded-full text-purple-600">
                      <BookOpen className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-bold text-gray-800">8</div>
                      <div className="text-xs md:text-sm text-gray-500">Fasallada</div>
                    </div>
                  </div>
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="bg-green-100 p-3 md:p-4 rounded-full text-green-600">
                      <FileText className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-bold text-gray-800">28</div>
                      <div className="text-xs md:text-sm text-gray-500">Maadooyinka</div>
                    </div>
                  </div>
                </div>

                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
                  <ActionCard icon={<UserPlus />} label="Ku dar Arday" color="text-blue-500" onClick={() => setActiveTab('add_student')} />
                  <ActionCard icon={<Users />} label="Ku dar Macalin" color="text-indigo-500" onClick={() => setActiveTab('add_teacher')} />
                  <ActionCard icon={<BookOpen />} label="Fasallada" color="text-purple-500" />
                  <ActionCard icon={<Calendar />} label="Jadwalka" color="text-pink-500" />
                  <ActionCard icon={<FileText />} label="Natiijooyinka" color="text-green-500" />
                  <ActionCard icon={<DollarSign />} label="Lacagaha" color="text-yellow-500" />
                  <ActionCard icon={<Bell />} label="Xaadirinta" color="text-teal-500" onClick={() => setActiveTab('xaadirinta')} />
                </div>
              </>
            )}

            {activeTab === 'xaadirinta' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <ArrowLeft className="w-6 h-6 cursor-pointer text-gray-500 hover:text-blue-600" onClick={() => setActiveTab('home')} />
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">Warbixinta Xaadirinta</h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-sm font-medium text-gray-500">Magaca Ardayga</th>
                        <th className="py-3 px-4 text-sm font-medium text-gray-500">Fasalka</th>
                        <th className="py-3 px-4 text-sm font-medium text-gray-500 text-center">Xaaladda</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(student => (
                        <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 font-medium text-gray-800 whitespace-nowrap">{student.name}</td>
                          <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{student.className}</td>
                          <td className="py-3 px-4 text-center">
                            {attendance[student.id] === 'xaadir' && <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full font-bold text-xs">Xaadir</span>}
                            {attendance[student.id] === 'maqan' && <span className="text-red-600 bg-red-50 px-3 py-1 rounded-full font-bold text-xs">Maqan</span>}
                            {attendance[student.id] === 'fasax' && <span className="text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full font-bold text-xs">Fasax</span>}
                            {!attendance[student.id] && <span className="text-gray-400 font-medium text-xs">Wali lama xaadirin</span>}
                          </td>
                        </tr>
                      ))}
                      {students.length === 0 && (
                        <tr>
                          <td colSpan={3} className="py-6 text-center text-gray-500">Wax arday ah lama helin.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'add_student' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <ArrowLeft className="w-6 h-6 cursor-pointer text-gray-500 hover:text-blue-600" onClick={() => setActiveTab('home')} />
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">Ku dar Arday Cusub</h2>
                </div>
                <form className="space-y-4 max-w-2xl" onSubmit={handleAddStudent}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Magaca Ardayga</label>
                    <input name="name" type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Geli magaca ardayga" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fasalka</label>
                    <select name="class" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                      <option value="">Dooro Fasalka</option>
                      <option value="1">Fasalka 1aad</option>
                      <option value="2">Fasalka 2aad</option>
                      <option value="3">Fasalka 3aad</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefoonka Waalidka</label>
                    <input name="phone" type="tel" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Geli lambarka telefoonka" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ID-ga (Username - Magaca oo 3 ah)</label>
                    <input name="username" type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tusaale: Axmed Cali Faarax" required pattern="^\s*\S+(?:\s+\S+){2,}\s*$" title="Fadlan geli magaca oo saddexan (3 eray)" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password (Lambar Kaliya)</label>
                    <input name="password" type="text" inputMode="numeric" pattern="[0-9]+" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tusaale: 123456" required title="Fadlan geli lambar kaliya" />
                  </div>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors mt-6">
                    Kaydi Ardayga
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'add_teacher' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <ArrowLeft className="w-6 h-6 cursor-pointer text-gray-500 hover:text-indigo-600" onClick={() => setActiveTab('home')} />
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">Ku dar Macalin Cusub</h2>
                </div>
                <form className="space-y-4 max-w-2xl" onSubmit={handleAddTeacher}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Magaca Macalinka</label>
                    <input name="name" type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Geli magaca macalinka" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Maadada uu dhigayo</label>
                    <select name="subject" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                      <option value="">Dooro Maadada</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="English">English</option>
                      <option value="Somali">Somali</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefoonka Macalinka</label>
                    <input name="phone" type="tel" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Geli lambarka telefoonka" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ID-ga (Username)</label>
                    <input name="username" type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Geli ID-ga macalinka" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input name="password" type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Geli password-ka" required />
                  </div>
                  <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors mt-6">
                    Kaydi Macalinka
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'ardayda' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                {selectedStudentForDetails ? (
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <ArrowLeft className="w-6 h-6 cursor-pointer text-gray-500 hover:text-blue-600" onClick={() => setSelectedStudentForDetails(null)} />
                      <h2 className="text-xl md:text-2xl font-bold text-gray-800">Xogta Ardayga</h2>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Magaca Buuxa</p>
                          <p className="font-bold text-gray-800 text-lg">{selectedStudentForDetails.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Fasalka</p>
                          <p className="font-bold text-gray-800 text-lg">{selectedStudentForDetails.className}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Telefoonka</p>
                          <p className="font-bold text-gray-800 text-lg">{selectedStudentForDetails.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Username (ID)</p>
                          <p className="font-bold text-gray-800 text-lg">{selectedStudentForDetails.username}</p>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-800 mb-4">Maqnaashaha (Xaadirinta Maanta)</h3>
                    <div className="bg-white border border-gray-100 rounded-xl p-4 mb-6">
                      {attendance[selectedStudentForDetails.id] === 'xaadir' && <span className="text-green-600 bg-green-50 px-4 py-2 rounded-full font-bold text-sm">Xaadir</span>}
                      {attendance[selectedStudentForDetails.id] === 'maqan' && <span className="text-red-600 bg-red-50 px-4 py-2 rounded-full font-bold text-sm">Waa Maqan</span>}
                      {attendance[selectedStudentForDetails.id] === 'fasax' && <span className="text-yellow-600 bg-yellow-50 px-4 py-2 rounded-full font-bold text-sm">Fasax</span>}
                      {!attendance[selectedStudentForDetails.id] && <span className="text-gray-500 font-medium text-sm">Wali lama xaadirin maanta</span>}
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
                          {[
                            { name: 'Tarbiya' },
                            { name: 'Carabi' },
                            { name: 'Soomaali' },
                            { name: 'Xisaab' },
                            { name: 'English' },
                            { name: 'Cilmi Bulsho' },
                            { name: 'Saynis' }
                          ].map((maado, index) => {
                            const score = grades[selectedStudentForDetails.id]?.[maado.name] || 0;
                            return (
                              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 font-bold text-gray-800">{maado.name}</td>
                                <td className="py-3 px-4 font-bold text-blue-600 text-right">{score}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                        <tfoot className="bg-gray-50">
                          <tr>
                            <td className="py-4 px-4 font-bold text-gray-800">Wadarta Guud</td>
                            <td className="py-4 px-4 font-bold text-green-600 text-right text-lg">
                              {Object.values(grades[selectedStudentForDetails.id] || {}).reduce((a, b) => a + b, 0)} / 700
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl md:text-2xl font-bold text-gray-800">Liiska Ardayda</h2>
                      <button onClick={() => setActiveTab('add_student')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
                        <UserPlus className="w-4 h-4" /> Ku dar Arday
                      </button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Raadi magaca ardayga..."
                          value={searchStudentName}
                          onChange={(e) => setSearchStudentName(e.target.value)}
                        />
                      </div>
                      <select
                        className="block w-full md:w-48 pl-3 pr-10 py-2 text-base border-gray-300 border focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-xl"
                        value={searchStudentClass}
                        onChange={(e) => setSearchStudentClass(e.target.value)}
                      >
                        <option value="">Dhamaan fasalada</option>
                        <option value="Fasalka 1aad">Fasalka 1aad</option>
                        <option value="Fasalka 2aad">Fasalka 2aad</option>
                        <option value="Fasalka 3aad">Fasalka 3aad</option>
                      </select>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="py-3 px-4 text-sm font-medium text-gray-500">Magaca</th>
                            <th className="py-3 px-4 text-sm font-medium text-gray-500">Fasalka</th>
                            <th className="py-3 px-4 text-sm font-medium text-gray-500">Telefoonka</th>
                            <th className="py-3 px-4 text-sm font-medium text-gray-500 text-right">Ficil (Action)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {students.filter(s => s.name.toLowerCase().includes(searchStudentName.toLowerCase()) && (searchStudentClass === '' || s.className === searchStudentClass)).map(student => (
                            <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                              <td className="py-3 px-4 font-medium text-gray-800 whitespace-nowrap">{student.name}</td>
                              <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{student.className}</td>
                              <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{student.phone || '-'}</td>
                              <td className="py-3 px-4 text-right flex items-center justify-end gap-3">
                                <button onClick={() => setSelectedStudentForDetails(student)} className="text-green-600 hover:text-green-800 text-sm font-medium">Xogta</button>
                                <button onClick={() => setEditingUser({ type: 'student', id: student.id })} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Password</button>
                              </td>
                            </tr>
                          ))}
                          {students.filter(s => s.name.toLowerCase().includes(searchStudentName.toLowerCase()) && (searchStudentClass === '' || s.className === searchStudentClass)).length === 0 && (
                            <tr>
                              <td colSpan={4} className="py-6 text-center text-gray-500">Wax arday ah lama helin.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'macalimiinta' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">Liiska Macalimiinta</h2>
                  <button onClick={() => setActiveTab('add_teacher')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
                    <UserPlus className="w-4 h-4" /> Ku dar Macalin
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-sm font-medium text-gray-500">Magaca</th>
                        <th className="py-3 px-4 text-sm font-medium text-gray-500">Maadada</th>
                        <th className="py-3 px-4 text-sm font-medium text-gray-500">Telefoonka</th>
                        <th className="py-3 px-4 text-sm font-medium text-gray-500">ID / Username</th>
                        <th className="py-3 px-4 text-sm font-medium text-gray-500 text-right">Ficil (Action)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teachers.map(teacher => (
                        <tr key={teacher.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 font-medium text-gray-800 whitespace-nowrap">{teacher.name}</td>
                          <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{teacher.subject}</td>
                          <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{teacher.phone || '-'}</td>
                          <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{teacher.username}</td>
                          <td className="py-3 px-4 text-right">
                            <button onClick={() => setEditingUser({ type: 'teacher', id: teacher.id })} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Bedel Password</button>
                          </td>
                        </tr>
                      ))}
                      {teachers.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-6 text-center text-gray-500">Wax macalin ah lama helin.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {editingUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Bedel Xogta Gelitaanka</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const newUsername = formData.get('username') as string;
                const newPassword = formData.get('password') as string;
                
                if (editingUser.type === 'student') {
                  setStudents(students.map(s => s.id === editingUser.id ? { ...s, username: newUsername, password: newPassword } : s));
                } else {
                  setTeachers(teachers.map(t => t.id === editingUser.id ? { ...t, username: newUsername, password: newPassword } : t));
                }
                setEditingUser(null);
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID-ga (Username) Cusub</label>
                  <input name="username" type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required defaultValue={
                    editingUser.type === 'student' ? students.find(s => s.id === editingUser.id)?.username : teachers.find(t => t.id === editingUser.id)?.username
                  } />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password-ka Cusub</label>
                  <input name="password" type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required defaultValue={
                    editingUser.type === 'student' ? students.find(s => s.id === editingUser.id)?.password : teachers.find(t => t.id === editingUser.id)?.password
                  } />
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setEditingUser(null)} className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold py-3 px-4 rounded-xl transition-colors">
                    Jooji
                  </button>
                  <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors">
                    Kaydi
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Bottom Nav (Mobile Only) */}
        <div className="md:hidden bg-white border-t border-gray-200 flex justify-around p-3 shrink-0">
          <NavItem icon={<Home />} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavItem icon={<Users />} label="Ardayda" active={activeTab === 'ardayda' || activeTab === 'add_student'} onClick={() => setActiveTab('ardayda')} />
          <NavItem icon={<UserPlus />} label="Macalimiinta" active={activeTab === 'macalimiinta' || activeTab === 'add_teacher'} onClick={() => setActiveTab('macalimiinta')} />
          <NavItem icon={<UserCircle />} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </div>
      </div>
    </div>
  );
}

function ActionCard({ icon, label, color, onClick }: { icon: React.ReactNode, label: string, color: string, onClick?: () => void }) {
  return (
    <div onClick={onClick} className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 md:gap-4 cursor-pointer hover:bg-gray-50 hover:border-gray-200 hover:shadow-md transition-all">
      <div className={`${color} bg-gray-50 p-3 md:p-5 rounded-full`}>
        {icon}
      </div>
      <span className="text-[10px] md:text-sm font-medium text-gray-600 text-center">{label}</span>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-1 cursor-pointer ${active ? 'text-blue-600' : 'text-gray-400'}`} onClick={onClick}>
      <div className={active ? 'bg-blue-50 p-1.5 rounded-lg' : 'p-1.5'}>
        {icon}
      </div>
      <span className="text-[10px] font-medium">{label}</span>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`} onClick={onClick}>
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  );
}
