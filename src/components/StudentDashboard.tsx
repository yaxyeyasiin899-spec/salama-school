import React, { useState } from 'react';
import { Menu, Bell, Calendar, FileText, CheckSquare, Edit3, MessageSquare, Home, UserCircle, LogOut, Clock, Activity, BookOpen } from 'lucide-react';
import { User, Student } from '../types';

export default function StudentDashboard({ user, onLogout, students, attendance, grades, subjects }: { user: User, onLogout: () => void, students: Student[], attendance?: Record<number, string>, grades?: Record<number, Record<string, number>>, subjects: string[] }) {
  const [activeTab, setActiveTab] = useState('home');
  const studentData = students.find(s => s.username === user.username);
  const className = studentData?.className || 'Fasalka';
  const myAttendance = studentData && attendance ? attendance[studentData.id] : null;
  const myGrades = studentData && grades ? grades[studentData.id] || {} : {};
  const totalScore = Object.values(myGrades).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col md:flex-row h-full min-h-screen bg-gray-50">
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6 bg-purple-700 text-white">
          <h1 className="text-xl font-bold">School Salama - Arday</h1>
          <p className="text-sm text-purple-200 mt-1">Ku soo dhawoow, {user.name}</p>
        </div>
        <div className="flex-1 py-6 px-4 space-y-2">
          <SidebarItem icon={<Home />} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} activeColor="bg-purple-50 text-purple-700" />
          <SidebarItem icon={<Calendar />} label="Jadwalka" active={activeTab === 'jadwalka'} onClick={() => setActiveTab('jadwalka')} activeColor="bg-purple-50 text-purple-700" />
          <SidebarItem icon={<BookOpen />} label="Maadooyinka" active={activeTab === 'maadooyinka'} onClick={() => setActiveTab('maadooyinka')} activeColor="bg-purple-50 text-purple-700" />
          <SidebarItem icon={<UserCircle />} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} activeColor="bg-purple-50 text-purple-700" />
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 text-red-600 cursor-pointer hover:bg-red-50 p-3 rounded-xl transition-colors" onClick={onLogout}>
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col h-full md:h-screen">
        <div className="bg-purple-700 md:bg-white text-white md:text-gray-800 px-6 py-4 flex items-center justify-between shadow-md md:shadow-sm md:border-b md:border-gray-200 shrink-0">
          <div className="flex items-center gap-4">
            <Menu className="w-6 h-6 cursor-pointer md:hidden" />
            <div className="md:hidden">
              <h1 className="text-lg font-bold">School Salama</h1>
              <p className="text-xs text-purple-200">Ku soo dhawoow, {user.name}</p>
            </div>
            <div className="hidden md:block">
              <h2 className="text-xl font-bold">Overview</h2>
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="relative cursor-pointer p-2 rounded-full hover:bg-purple-600 md:hover:bg-gray-100 transition-colors">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                  <div className="md:col-span-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl md:rounded-3xl p-6 md:p-10 text-white shadow-lg">
                    <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">{className}</h2>
                    <p className="text-sm md:text-base text-purple-200 mb-4 md:mb-8">Sannad Dugsiyeedka 2026/2027</p>
                    <div className="flex justify-between items-end">
                        <div>
                            <div className="text-xs md:text-sm text-purple-200 uppercase tracking-wider mb-1">Xaadirinta</div>
                            <div className="text-2xl md:text-5xl font-bold">90%</div>
                        </div>
                        <Activity className="w-8 h-8 md:w-16 md:h-16 opacity-50" />
                    </div>
                  </div>
                </div>

                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 mt-8">Adeegyada</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                  <ActionCard icon={<Calendar />} label="Jadwalka" color="text-purple-500" onClick={() => setActiveTab('jadwalka')} />
                  <ActionCard icon={<Edit3 />} label="Buundooyinka" color="text-blue-500" onClick={() => setActiveTab('buundooyinka')} />
                  <ActionCard icon={<CheckSquare />} label="Xaadirinta" color="text-green-500" onClick={() => setActiveTab('xaadirinta')} />
                  <ActionCard icon={<BookOpen />} label="Maadooyinka" color="text-orange-500" onClick={() => setActiveTab('maadooyinka')} />
                  <ActionCard icon={<MessageSquare />} label="Ogeysiisyo" color="text-pink-500" />
                </div>
                
                <div className="mt-8 md:mt-12">
                    <h3 className="text-md md:text-xl font-bold text-gray-800 mb-3 md:mb-5">Maadooyinkayga</h3>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 space-y-4 md:space-y-6">
                        <div className="flex justify-between items-center border-b border-gray-50 pb-3 md:pb-5">
                            <div className="flex items-center gap-3 md:gap-5">
                                <div className="bg-orange-50 p-2 md:p-4 rounded-lg md:rounded-xl">
                                    <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-800 md:text-lg">Tarbiya</div>
                                    <div className="text-xs md:text-sm text-gray-500">Macalin: Maxamed</div>
                                </div>
                            </div>
                            <span className="text-xs md:text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">Duruus</span>
                        </div>
                        <div className="flex justify-between items-center pb-1">
                            <div className="flex items-center gap-3 md:gap-5">
                                <div className="bg-blue-50 p-2 md:p-4 rounded-lg md:rounded-xl">
                                    <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-800 md:text-lg">Xisaab</div>
                                    <div className="text-xs md:text-sm text-gray-500">Macalin: Faadumo</div>
                                </div>
                            </div>
                            <span className="text-xs md:text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">Duruus</span>
                        </div>
                    </div>
                </div>
              </>
            )}

            {activeTab === 'xaadirinta' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Xaadirintayda</h2>
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center justify-center min-h-[200px]">
                  {myAttendance ? (
                    <>
                      <div className="text-lg font-medium text-gray-700 mb-4">Xaaladdaada maanta:</div>
                      {myAttendance === 'xaadir' && <div className="text-2xl font-bold text-green-600 bg-green-100 px-6 py-3 rounded-full flex items-center gap-3"><CheckSquare className="w-8 h-8" /> Xaadir Ayaad Tahay</div>}
                      {myAttendance === 'maqan' && <div className="text-2xl font-bold text-red-600 bg-red-100 px-6 py-3 rounded-full flex items-center gap-3"><CheckSquare className="w-8 h-8" /> Waa Kaa Maqan Tahay</div>}
                      {myAttendance === 'fasax' && <div className="text-2xl font-bold text-yellow-600 bg-yellow-100 px-6 py-3 rounded-full flex items-center gap-3"><CheckSquare className="w-8 h-8" /> Fasax Ayaad Tahay</div>}
                    </>
                  ) : (
                    <div className="text-center text-gray-500">
                      <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="text-lg font-medium">Wali lama xaadirin maanta.</p>
                      <p className="text-sm mt-1">Macalinkaaga ayaa soo gelin doona xaadirinta.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'jadwalka' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Jadwalka Duruusta</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-sm font-medium text-gray-500">Maalinta</th>
                        <th className="py-3 px-4 text-sm font-medium text-gray-500">Xilliga 1aad</th>
                        <th className="py-3 px-4 text-sm font-medium text-gray-500">Xilliga 2aad</th>
                        <th className="py-3 px-4 text-sm font-medium text-gray-500">Xilliga 3aad</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-gray-800 whitespace-nowrap">Sabti</td>
                        <td className="py-3 px-4 text-gray-600 whitespace-nowrap">Tarbiya</td>
                        <td className="py-3 px-4 text-gray-600 whitespace-nowrap">Carabi</td>
                        <td className="py-3 px-4 text-gray-600 whitespace-nowrap">Soomaali</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-gray-800 whitespace-nowrap">Axad</td>
                        <td className="py-3 px-4 text-gray-600 whitespace-nowrap">Xisaab</td>
                        <td className="py-3 px-4 text-gray-600 whitespace-nowrap">English</td>
                        <td className="py-3 px-4 text-gray-600 whitespace-nowrap">Cilmi Bulsho</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-gray-800 whitespace-nowrap">Isniin</td>
                        <td className="py-3 px-4 text-gray-600 whitespace-nowrap">Saynis</td>
                        <td className="py-3 px-4 text-gray-600 whitespace-nowrap">Tarbiya</td>
                        <td className="py-3 px-4 text-gray-600 whitespace-nowrap">Xisaab</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-gray-800 whitespace-nowrap">Talaado</td>
                        <td className="py-3 px-4 text-gray-600 whitespace-nowrap">Carabi</td>
                        <td className="py-3 px-4 text-gray-600 whitespace-nowrap">English</td>
                        <td className="py-3 px-4 text-gray-600 whitespace-nowrap">Soomaali</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-gray-800 whitespace-nowrap">Arbaco</td>
                        <td className="py-3 px-4 text-gray-600 whitespace-nowrap">Saynis</td>
                        <td className="py-3 px-4 text-gray-600 whitespace-nowrap">Cilmi Bulsho</td>
                        <td className="py-3 px-4 text-gray-600 whitespace-nowrap">Xisaab</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'maadooyinka' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">{subjects.length}-da Maado Ee Lagu Barto</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subjects.map((subject, index) => (
                    <div key={index} className="flex justify-between items-center border border-gray-100 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-50 p-3 rounded-xl text-blue-500">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">{subject}</div>
                          <div className="text-sm text-gray-500">Maado Asasi Ah</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'buundooyinka' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Natiijada Imtixaanka</h2>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-left border-collapse min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-sm font-medium text-gray-500">Maadada</th>
                        <th className="py-3 px-4 text-sm font-medium text-gray-500 text-right">Buundada (100)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjects.map((subject, index) => {
                        const score = myGrades[subject] || 0;
                        return (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-4 font-bold text-gray-800 whitespace-nowrap">{subject}</td>
                            <td className="py-3 px-4 font-bold text-blue-600 text-right whitespace-nowrap">{score}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td className="py-4 px-4 font-bold text-gray-800">Wadarta Guud</td>
                        <td className="py-4 px-4 font-bold text-green-600 text-right text-lg">
                           {totalScore} / {subjects.length * 100}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden bg-white border-t border-gray-200 flex justify-around p-3 shrink-0">
          <NavItem icon={<Home />} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} activeColor="text-purple-600" bgActive="bg-purple-50" />
          <NavItem icon={<Calendar />} label="Jadwalka" active={activeTab === 'jadwalka'} onClick={() => setActiveTab('jadwalka')} activeColor="text-purple-600" bgActive="bg-purple-50" />
          <NavItem icon={<BookOpen />} label="Maadooyinka" active={activeTab === 'maadooyinka'} onClick={() => setActiveTab('maadooyinka')} activeColor="text-purple-600" bgActive="bg-purple-50" />
          <NavItem icon={<UserCircle />} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} activeColor="text-purple-600" bgActive="bg-purple-50" />
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
