import axios from "axios";
import { useEffect, useState } from "react";

function StudentCRUD() {
  const [students, setStudents] = useState([]);
  const [data, setData] = useState({ name: "", email: "", course: "" });

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const res = await axios.get("http://localhost:5000/students");
    setStudents(res.data);
  };

  const addStudent = async () => {
    await axios.post("http://localhost:5000/students", data);
    loadStudents();
  };

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/students/${id}`);
    loadStudents();
  };

  return (
    <div>
      <h2>Student Management</h2>

      <input placeholder="Name" onChange={e => setData({...data, name:e.target.value})}/>
      <input placeholder="Email" onChange={e => setData({...data, email:e.target.value})}/>
      <input placeholder="Course" onChange={e => setData({...data, course:e.target.value})}/>
      <button onClick={addStudent}>Add Student</button>

      <ul>
        {students.map(s => (
          <li key={s._id}>
            {s.name} - {s.course}
            <button onClick={() => deleteStudent(s._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentCRUD;
