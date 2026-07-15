import React, { useState } from "react";
import { User, Lock } from "lucide-react";
import { User as UserType, Student, Teacher } from "../types";

export default function Login({
  onLogin,
  students,
  teachers,
}: {
  onLogin: (user: UserType) => void;
  students: Student[];
  teachers: Teacher[];
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Hardcoded Admin
    if (username === "yaxye" && password === "123") {
      onLogin({
        id: "admin-1",
        username: "yaxye",
        role: "Admin",
        name: "Maamule Yaxye",
      });
      return;
    }

    // Check Students
    const student = students.find(
      (s) =>
        s.username.toLowerCase().trim() === username.toLowerCase().trim() &&
        s.password === password,
    );
    if (student) {
      onLogin({
        id: `student-${student.id}`,
        username: student.username,
        role: "Arday",
        name: student.name,
      });
      return;
    }

    // Check Teachers
    const teacher = teachers.find(
      (t) =>
        t.username.toLowerCase().trim() === username.toLowerCase().trim() &&
        t.password === password,
    );
    if (teacher) {
      onLogin({
        id: `teacher-${teacher.id}`,
        username: teacher.username,
        role: "Macalin",
        name: teacher.name,
      });
      return;
    }

    setError("ID ama Password khaldan. Fadlan hubi.");
  };

  return (
    <div className="flex flex-col md:flex-row h-full min-h-screen bg-blue-50">
      <div className="md:w-1/2 bg-blue-600 rounded-b-[3rem] md:rounded-b-none md:rounded-r-[3rem] p-8 flex flex-col items-center justify-center text-white shadow-lg h-64 md:h-auto shrink-0 relative overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-[-20px] left-[-20px] w-24 h-24 bg-white/10 rounded-full blur-lg"></div>

        <div className="bg-white/20 p-4 rounded-full mb-4 z-10 backdrop-blur-sm">
          <div className="bg-white text-blue-600 p-3 rounded-full shadow-inner">
            <svg
              className="w-10 h-10 md:w-16 md:h-16"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3L1 9L4 10.63V17C4 18.1 4.9 19 6 19H18C19.1 19 20 18.1 20 17V10.63L23 9L12 3ZM18 17H6V11.71L12 15L18 11.71V17ZM12 5.18L19.45 9L12 12.82L4.55 9L12 5.18Z" />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-wider z-10">
          SCHOOL SALAMA
        </h1>
        <p className="text-blue-100 mt-2 font-medium z-10 md:text-xl">
          Maamulka Dugsiga
        </p>
      </div>

      <div className="flex-1 px-8 md:px-24 pt-10 pb-6 flex flex-col justify-center bg-white">
        <div className="max-w-md w-full mx-auto flex flex-col h-full md:justify-center">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
              Soo Dhawoow!
            </h2>
            <p className="text-center text-gray-500 mt-2">
              Geli ID-gaaga iyo Password-ka
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium text-center border border-red-100">
                {error}
              </div>
            )}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-blue-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                placeholder="ID-ga (Username)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-blue-500" />
              </div>
              <input
                type="password"
                className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98]"
            >
              GAL (LOGIN)
            </button>
          </form>

          <div className="mt-auto md:mt-16 pt-8 text-center text-xs text-gray-400 font-medium">
            © 2026 School App. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
