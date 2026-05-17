import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTeacher, updateTeacher } from "../../services/teacherService";

const EditTeacher = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    teacherType: "Permanent",
    salary: "",
    joiningDate: "",
    role: "Teacher",
  });

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const data = await getTeacher(id);

        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          department: data.department || "",
          teacherType: data.teacherType || "Permanent",
          salary: data.salary || "",
          joiningDate: data.joiningDate ? data.joiningDate.split("T")[0] : "",
          role: data.role || "Teacher",
        });
      } catch (err) {
        console.log(err);
        setError("Failed to fetch teacher details");
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);
      setError("");
      setSuccess("");

      await updateTeacher(id, formData);

      setSuccess("Teacher updated successfully");

      setTimeout(() => {
        navigate("/admin/teachers");
      }, 1500);
    } catch (err) {
      console.log(err);

      setError(err.response?.data?.message || "Failed to update teacher");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-slate-500">
        Loading teacher details...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow rounded-2xl p-8 border border-slate-200">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Edit Teacher</h1>

        {success && (
          <div className="mb-4 p-3 rounded bg-green-100 text-green-700">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Department
            </label>

            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Teacher Type
            </label>

            <select
              name="teacherType"
              value={formData.teacherType}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-slate-400"
            >
              <option value="Permanent">Permanent</option>
              <option value="Contractual">Contractual</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Salary
            </label>

            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Joining Date
            </label>

            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-slate-400"
            >
              <option value="Teacher">Teacher</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={updating}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg font-medium transition"
          >
            {updating ? "Updating..." : "Update Teacher"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTeacher;
