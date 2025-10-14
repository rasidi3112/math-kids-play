import { useState, useEffect } from "react";

const STUDENT_NAME_KEY = "math_fun_student_name";
const DEFAULT_STUDENT = "Student";

export function useStudent() {
  const [studentName, setStudentNameState] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(STUDENT_NAME_KEY) || DEFAULT_STUDENT;
    }
    return DEFAULT_STUDENT;
  });

  useEffect(() => {
    localStorage.setItem(STUDENT_NAME_KEY, studentName);
  }, [studentName]);

  return {
    studentName,
    setStudentName: setStudentNameState,
  };
}
