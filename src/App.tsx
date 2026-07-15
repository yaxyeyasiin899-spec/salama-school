/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import StudentDashboard from "./components/StudentDashboard";
import { User, Student, Teacher } from "./types";

export default function App() {
  const [currentView, setCurrentView] = useState<"login" | "dashboard">(() => {
    return (localStorage.getItem('school_currentView') as any) || "login";
  });
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('school_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('school_students');
    return saved ? JSON.parse(saved) : [];
  });

  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem('school_teachers');
    return saved ? JSON.parse(saved) : [];
  });

  const [subjects, setSubjects] = useState<string[]>(() => {
    const saved = localStorage.getItem('school_subjects');
    return saved ? JSON.parse(saved) : [
      "Tarbiya",
      "Carabi",
      "Soomaali",
      "Xisaab",
      "English",
      "Cilmi Bulsho",
      "Saynis",
    ];
  });

  const [attendance, setAttendance] = useState<Record<number, string>>(() => {
    const saved = localStorage.getItem('school_attendance');
    return saved ? JSON.parse(saved) : {};
  });
  const [grades, setGrades] = useState<Record<number, Record<string, number>>>(() => {
    const saved = localStorage.getItem('school_grades');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('school_currentView', currentView);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem('school_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('school_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('school_teachers', JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem('school_subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('school_attendance', JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem('school_grades', JSON.stringify(grades));
  }, [grades]);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center font-sans text-gray-900">
      <div className="w-full bg-white min-h-screen shadow-2xl relative overflow-hidden flex flex-col">
        {currentView === "login" && (
          <Login
            onLogin={(loggedInUser) => {
              setUser(loggedInUser);
              setCurrentView("dashboard");
            }}
            students={students}
            teachers={teachers}
          />
        )}
        {currentView === "dashboard" && user?.role === "Admin" && (
          <AdminDashboard
            user={user}
            onLogout={() => setCurrentView("login")}
            students={students}
            setStudents={setStudents}
            teachers={teachers}
            setTeachers={setTeachers}
            attendance={attendance}
            grades={grades}
            subjects={subjects}
            setSubjects={setSubjects}
          />
        )}
        {currentView === "dashboard" && user?.role === "Macalin" && (
          <TeacherDashboard
            user={user}
            onLogout={() => setCurrentView("login")}
            students={students}
            teachers={teachers}
            attendance={attendance}
            setAttendance={setAttendance}
            grades={grades}
            setGrades={setGrades}
            subjects={subjects}
          />
        )}
        {currentView === "dashboard" && user?.role === "Arday" && (
          <StudentDashboard
            user={user}
            onLogout={() => setCurrentView("login")}
            students={students}
            attendance={attendance}
            grades={grades}
            subjects={subjects}
          />
        )}
      </div>
    </div>
  );
}
