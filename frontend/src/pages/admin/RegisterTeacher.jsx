import React, { useState } from "react";
import { createTeacher } from "../../services/teacherService";

const RegisterTeacher = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    department: "",
    teacherType: "Permanent",
    salary: "",
    joiningDate: "",
    role: "Teacher",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await createTeacher(formData);

      setSuccess("Teacher registered successfully");

      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        department: "",
        teacherType: "Permanent",
        salary: "",
        joiningDate: "",
        role: "teacher",
      });
    } catch (err) {
      console.log(err);

      setError(err.response?.data?.message || "Failed to register teacher");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          type="text"
          name="name"
          placeholder="Teacher Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Teacher Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <select
          name="teacherType"
          value={formData.teacherType}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        >
          <option value="Permanent">Permanent</option>
          <option value="Contractual">Contractual</option>
        </select>

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <input
          type="date"
          name="joiningDate"
          value={formData.joiningDate}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        >
          <option value="Teacher">Teacher</option>
          <option value="Admin">Admin</option>
        </select>

        {success && <div className="text-green-500">{success}</div>}

        {error && <div className="text-red-500">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded"
        >
          {loading ? "Creating..." : "Register Teacher"}
        </button>
      </form>
    </div>
  );
};

export default RegisterTeacher;
