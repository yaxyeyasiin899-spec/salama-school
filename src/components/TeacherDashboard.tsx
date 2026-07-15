import React, { useState } from 'react';
import { Menu, Bell, BookOpen, Calendar, CheckSquare, Edit3, MessageSquare, Home, UserCircle, LogOut, Clock, FileText } from 'lucide-react';
import { User, Student, Teacher } from '../types';

export default function TeacherDashboard({ user, onLogout, students, teachers, attendance, setAttendance, grades, setGrades, subjects }: { user: User, onLogout: () => void, students: Student[], teachers: Teacher[], attendance: Record<number, string>, setAttendance: (a: Record<number, string>) => void, grades: Record<number, Record<string, number>>, setGrades: (g: Record<number, Record<string, number>>) => void, subjects: string[] }) {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedClass, setSelectedClass] = useState('Fasalka 2aad');
  const teacherData = teachers.find(t => t.username === user.username);

  return (
    <div className="flex flex-col md:flex-row h-full min-h-screen bg-gray-50">
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6 bg-green-600 text-white">
          <h1 className="text-xl font-bold">School Salama - Macalin</h1>
          <p className="text-sm text-green-100 mt-1">Ku soo dhawoow, {user.name}</p>
        </div>
        <div className="flex-1 py-6 px-4 space-y-2">
          <SidebarItem icon={<Home />} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} activeColor="bg-green-50 text-green-600" />
          <SidebarItem icon={<Calendar />} label="Jadwalka" active={activeTab === 'jadwalka'} onClick={() => setActiveTab('jadwalka')} activeColor="bg-green-50 text-green-600" />
          <SidebarItem icon={<Bell />} label="Ogeysiisyo" active={activeTab === 'ogeysiisyo'} onClick={() => setActiveTab('ogeysiisyo')} activeColor="bg-green-50 text-green-600" />
          <SidebarItem icon={<UserCircle />} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} activeColor="bg-green-50 text-green-600" />
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 text-red-600 cursor-pointer hover:bg-red-50 p-3 rounded-xl transition-colors" onClick={onLogout}>
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col h-full md:h-screen">
        <div className="bg-green-600 md:bg-white text-white md:text-gray-800 px-6 py-4 flex items-center justify-between shadow-md md:shadow-sm md:border-b md:border-gray-200 shrink-0">
          <div className="flex items-center gap-4">
            <Menu className="w-6 h-6 cursor-pointer md:hidden" />
            <div className="md:hidden">
              <h1 className="text-lg font-bold">School Salama</h1>
              <p className="text-xs text-green-100">Ku soo dhawoow, {user.name}</p>
            </div>
            <div className="hidden md:block">
              <h2 className="text-xl font-bold">Overview</h2>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer p-2 rounded-full hover:bg-green-700 md:hover:bg-gray-100 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <LogOut className="w-5 h-5 cursor-pointer md:hidden" onClick={onLogout} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'home' && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="bg-green-100 p-3 md:p-4 rounded-full text-green-600">
                      <BookOpen className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-bold text-gray-800">4</div>
                      <div className="text-xs md:text-sm text-gray-500">Fasallada</div>
                    </div>
                  </div>
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="bg-blue-100 p-3 md:p-4 rounded-full text-blue-600">
                      <FileText className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-bold text-gray-800">{subjects.length}</div>
                      <div className="text-xs md:text-sm text-gray-500">Maadooyinka</div>
                    </div>
                  </div>
                </div>

                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Shaqooyinka (Tasks)</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                  <ActionCard icon={<CheckSquare />} label="Xaadirinta" color="text-green-500" onClick={() => setActiveTab('xaadirinta')} />
                  <ActionCard icon={<Edit3 />} label="Buundooyinka" color="text-blue-500" onClick={() => setActiveTab('buundooyinka')} />
                  <ActionCard icon={<FileText />} label="Shaqo-guri" color="text-orange-500" />
                  <ActionCard icon={<Calendar />} label="Jadwalka" color="text-purple-500" />
                  <ActionCard icon={<MessageSquare />} label="Ogeysiisyo" color="text-pink-500" />
                </div>
                
                <div className="mt-8 md:mt-12">
                    <h3 className="text-md md:text-xl font-bold text-gray-800 mb-3 md:mb-5">Jadwalka Maanta</h3>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 space-y-4 md:space-y-6">
                        <div className="flex justify-between items-center border-b border-gray-50 pb-3 md:pb-5">
                            <div className="flex items-center gap-3 md:gap-5">
                                <Clock className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                                <div>
                                    <div className="font-semibold text-gray-800 md:text-lg">Mathematics</div>
                                    <div className="text-xs md:text-sm text-gray-500">Fasalka 1</div>
                                </div>
                            </div>
                            <span className="text-sm md:text-base font-medium text-gray-600">08:00 - 09:00</span>
                        </div>
                        <div className="flex justify-between items-center pb-1">
                            <div className="flex items-center gap-3 md:gap-5">
                                <Clock className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                                <div>
                                    <div className="font-semibold text-gray-800 md:text-lg">Mathematics</div>
                                    <div className="text-xs md:text-sm text-gray-500">Fasalka 2</div>
                                </div>
                            </div>
                            <span className="text-sm md:text-base font-medium text-gray-600">09:00 - 10:00</span>
                        </div>
                    </div>
                </div>
              </>
            )}

            {activeTab === 'xaadirinta' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">Xaadirinta Ardayda</h2>
                  <select 
                    value={selectedClass} 
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
                  >
                    <option value="Fasalka 1aad">Fasalka 1aad</option>
                    <option value="Fasalka 2aad">Fasalka 2aad</option>
                    <option value="Fasalka 3aad">Fasalka 3aad</option>
                    <option value="Fasalka 4aad">Fasalka 4aad</option>
                    <option value="Fasalka 5aad">Fasalka 5aad</option>
                    <option value="Fasalka 6aad">Fasalka 6aad</option>
                    <option value="Fasalka 7aad">Fasalka 7aad</option>
                    <option value="Fasalka 8aad">Fasalka 8aad</option>
                  </select>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-sm font-medium text-gray-500">Magaca Ardayga</th>
                        <th className="py-3 px-4 text-sm font-medium text-gray-500 text-center">Xaadir (Present)</th>
                        <th className="py-3 px-4 text-sm font-medium text-gray-500 text-center">Maqan (Absent)</th>
                        <th className="py-3 px-4 text-sm font-medium text-gray-500 text-center">Fasax (Leave)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.filter(s => s.className === selectedClass).map(student => (
                        <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 font-bold text-gray-800 whitespace-nowrap">{student.name}</td>
                          <td className="py-3 px-4 text-center">
                            <input 
                              type="radio" 
                              name={`attendance-${student.id}`} 
                              checked={attendance[student.id] === 'xaadir'} 
                              onChange={() => setAttendance({ ...attendance, [student.id]: 'xaadir' })}
                              className="w-5 h-5 text-green-600 focus:ring-green-500 cursor-pointer"
                            />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <input 
                              type="radio" 
                              name={`attendance-${student.id}`} 
                              checked={attendance[student.id] === 'maqan'} 
                              onChange={() => setAttendance({ ...attendance, [student.id]: 'maqan' })}
                              className="w-5 h-5 text-red-600 focus:ring-red-500 cursor-pointer"
                            />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <input 
                              type="radio" 
                              name={`attendance-${student.id}`} 
                              checked={attendance[student.id] === 'fasax'} 
                              onChange={() => setAttendance({ ...attendance, [student.id]: 'fasax' })}
                              className="w-5 h-5 text-yellow-600 focus:ring-yellow-500 cursor-pointer"
                            />
                          </td>
                        </tr>
                      ))}
                      {students.filter(s => s.className === selectedClass).length === 0 && (
                        <tr>
                          <td colSpan={4} className="py-6 text-center text-gray-500">Wax arday ah laguma helin fasalkan.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 flex justify-end">
                  <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-colors">
                    Kaydi Xaadirinta
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'buundooyinka' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">Gelinta Natiijada - {teacherData?.subject}</h2>
                  <select 
                    value={selectedClass} 
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    <option value="Fasalka 1aad">Fasalka 1aad</option>
                    <option value="Fasalka 2aad">Fasalka 2aad</option>
                    <option value="Fasalka 3aad">Fasalka 3aad</option>
                    <option value="Fasalka 4aad">Fasalka 4aad</option>
                    <option value="Fasalka 5aad">Fasalka 5aad</option>
                    <option value="Fasalka 6aad">Fasalka 6aad</option>
                    <option value="Fasalka 7aad">Fasalka 7aad</option>
                    <option value="Fasalka 8aad">Fasalka 8aad</option>
                  </select>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-sm font-medium text-gray-500">Magaca Ardayga</th>
                        <th className="py-3 px-4 text-sm font-medium text-gray-500 text-center">Natiijada (100)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.filter(s => s.className === selectedClass).map(student => (
                        <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 font-bold text-gray-800 whitespace-nowrap">{student.name}</td>
                          <td className="py-3 px-4 text-center">
                            <input 
                              type="number"
                              min="0"
                              max="100"
                              value={grades[student.id]?.[teacherData?.subject || ''] ?? ''}
                              onChange={(e) => {
                                const val = parseInt(e.target.value);
                                setGrades({
                                  ...grades,
                                  [student.id]: {
                                    ...(grades[student.id] || {}),
                                    [teacherData?.subject || '']: isNaN(val) ? 0 : val
                                  }
                                });
                              }}
                              className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="0"
                            />
                          </td>
                        </tr>
                      ))}
                      {students.filter(s => s.className === selectedClass).length === 0 && (
                        <tr>
                          <td colSpan={2} className="py-6 text-center text-gray-500">Wax arday ah laguma helin fasalkan.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden bg-white border-t border-gray-200 flex justify-around p-3 shrink-0">
          <NavItem icon={<Home />} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} activeColor="text-green-600" bgActive="bg-green-50" />
          <NavItem icon={<Calendar />} label="Jadwalka" active={activeTab === 'jadwalka'} onClick={() => setActiveTab('jadwalka')} activeColor="text-green-600" bgActive="bg-green-50" />
          <NavItem icon={<Bell />} label="Ogeysiisyo" active={activeTab === 'ogeysiisyo'} onClick={() => setActiveTab('ogeysiisyo')} activeColor="text-green-600" bgActive="bg-green-50" />
          <NavItem icon={<UserCircle />} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} activeColor="text-green-600" bgActive="bg-green-50" />
        </div>
      </div>
    </div>
  );
}

function ActionCard({ icon, label, color, onClick }: { icon: React.ReactNode, label: string, color: string, onClick?: () => void }) {
  return (
    <div onClick={onClick} className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-3 md:gap-4 cursor-pointer hover:bg-gray-50 hover:border-gray-200 hover:shadow-md transition-all">
      <div className={`${color} bg-gray-50 p-4 md:p-5 rounded-full`}>
        {icon}
      </div>
      <span className="text-xs md:text-sm font-medium text-gray-700 text-center">{label}</span>
    </div>
  );
}

function NavItem({ icon, label, active, onClick, activeColor = 'text-blue-600', bgActive = 'bg-blue-50' }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void, activeColor?: string, bgActive?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-1 cursor-pointer ${active ? activeColor : 'text-gray-400'}`} onClick={onClick}>
      <div className={active ? `${bgActive} p-1.5 rounded-lg` : 'p-1.5'}>
        {icon}
      </div>
      <span className="text-[10px] font-medium">{label}</span>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick, activeColor = 'bg-blue-50 text-blue-600' }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void, activeColor?: string }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${active ? activeColor : 'text-gray-600 hover:bg-gray-50'}`} onClick={onClick}>
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  );
}
