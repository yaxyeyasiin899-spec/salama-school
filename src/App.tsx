/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import { User, Student, Teacher } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'login' | 'dashboard'>('login');
  const [user, setUser] = useState<User | null>(null);

  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'Axmed Cali Faarax', className: 'Fasalka 1aad', phone: '061XXXXXXX', username: 'Axmed Cali Faarax', password: '123' },
    { id: 2, name: 'Hodan Jaamac Muuse', className: 'Fasalka 2aad', phone: '061XXXXXXX', username: 'Hodan Jaamac Muuse', password: '123' },
  ]);

  const [teachers, setTeachers] = useState<Teacher[]>([
    { id: 1, name: 'Maxamed Faarax Cali', subject: 'Xisaab', phone: '061XXXXXXX', username: 'Maxamed Faarax Cali', password: '123' },
    { id: 2, name: 'Faadumo Xasan Nuur', subject: 'Saynis', phone: '061XXXXXXX', username: 'Faadumo Xasan Nuur', password: '123' },
  ]);

  const [attendance, setAttendance] = useState<Record<number, string>>({});
  const [grades, setGrades] = useState<Record<number, Record<string, number>>>({});

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center font-sans text-gray-900">
      <div className="w-full bg-white min-h-screen shadow-2xl relative overflow-hidden flex flex-col">
        {currentView === 'login' && <Login onLogin={(loggedInUser) => { setUser(loggedInUser); setCurrentView('dashboard'); }} students={students} teachers={teachers} />}
        {currentView === 'dashboard' && user?.role === 'Admin' && <AdminDashboard user={user} onLogout={() => setCurrentView('login')} students={students} setStudents={setStudents} teachers={teachers} setTeachers={setTeachers} attendance={attendance} grades={grades} />}
        {currentView === 'dashboard' && user?.role === 'Macalin' && <TeacherDashboard user={user} onLogout={() => setCurrentView('login')} students={students} teachers={teachers} attendance={attendance} setAttendance={setAttendance} grades={grades} setGrades={setGrades} />}
        {currentView === 'dashboard' && user?.role === 'Arday' && <StudentDashboard user={user} onLogout={() => setCurrentView('login')} students={students} attendance={attendance} grades={grades} />}
      </div>
    </div>
  );
}
