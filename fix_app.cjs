const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /import { useState } from "react";/,
  `import { useState, useEffect } from "react";`
);

code = code.replace(
  /const \[currentView, setCurrentView\] = useState<"login" \| "dashboard">\(\s*"login",\s*\);/,
  `const [currentView, setCurrentView] = useState<"login" | "dashboard">(() => {
    return (localStorage.getItem('school_currentView') as any) || "login";
  });`
);

code = code.replace(
  /const \[user, setUser\] = useState<User \| null>\(null\);/,
  `const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('school_user');
    return saved ? JSON.parse(saved) : null;
  });`
);

code = code.replace(
  /const \[students, setStudents\] = useState<Student\[\]>\(\[\]\);/,
  `const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('school_students');
    return saved ? JSON.parse(saved) : [];
  });`
);

code = code.replace(
  /const \[teachers, setTeachers\] = useState<Teacher\[\]>\(\[\]\);/,
  `const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem('school_teachers');
    return saved ? JSON.parse(saved) : [];
  });`
);

code = code.replace(
  /const \[subjects, setSubjects\] = useState<string\[\]>\(\[\s*"Tarbiya",\s*"Carabi",\s*"Soomaali",\s*"Xisaab",\s*"English",\s*"Cilmi Bulsho",\s*"Saynis",\s*\]\);/,
  `const [subjects, setSubjects] = useState<string[]>(() => {
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
  });`
);

code = code.replace(
  /const \[attendance, setAttendance\] = useState<Record<number, string>>\({}\);/,
  `const [attendance, setAttendance] = useState<Record<number, string>>(() => {
    const saved = localStorage.getItem('school_attendance');
    return saved ? JSON.parse(saved) : {};
  });`
);

code = code.replace(
  /const \[grades, setGrades\] = useState<Record<number, Record<string, number>>>\(\s*{},\s*\);/,
  `const [grades, setGrades] = useState<Record<number, Record<string, number>>>(() => {
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
  }, [grades]);`
);

fs.writeFileSync('src/App.tsx', code);
