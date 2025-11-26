import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function DataTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    sensorId: "",
    type: "",
    parameter: "",
    value: "",
    unit: ""
  });
  const [editId, setEditId] = useState(null);

  const loadData = async () => {
    try {
      const res = await api.get("/");
      setData(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      await api.post("/", form);
      setForm({ sensorId: "", type: "", parameter: "", value: "", unit: "" });
      loadData();
    } catch (err) {
      alert("Ошибка при создании: " + err.message);
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/${editId}`, form);
      setEditId(null);
      setForm({ sensorId: "", type: "", parameter: "", value: "", unit: "" });
      loadData();
    } catch (err) {
      alert("Ошибка при обновлении: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Удалить запись?")) return;
    await api.delete(`/${id}`);
    loadData();
  };

  if (loading) return <p style={{ textAlign: "center" }}>Завантаження...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>Помилка: {error}</p>;

  return (
    <div style={{
      padding: "40px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f4f7f6",
      minHeight: "100vh"
    }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Екологічні показники</h2>

      {/* Форма */}
      <div style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
        justifyContent: "center",
        flexWrap: "wrap"
      }}>
        <input
          name="sensorId"
          placeholder="Sensor ID"
          value={form.sensorId}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="type"
          placeholder="Type"
          value={form.type}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="parameter"
          placeholder="Parameter"
          value={form.parameter}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="value"
          placeholder="Value"
          value={form.value}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="unit"
          placeholder="Unit"
          value={form.unit}
          onChange={handleChange}
          style={inputStyle}
        />

        {editId ? (
          <button onClick={handleUpdate} style={buttonStyle}>Оновити</button>
        ) : (
          <button onClick={handleCreate} style={buttonStyle}>Додати</button>
        )}
      </div>

      {/* Таблиця */}
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        backgroundColor: "#fff"
      }}>
        <thead>
          <tr style={{ backgroundColor: "#4CAF50", color: "#fff" }}>
            <th style={thStyle}>Sensor ID</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Parameter</th>
            <th style={thStyle}>Value</th>
            <th style={thStyle}>Unit</th>
            <th style={thStyle}>Created</th>
            <th style={thStyle}>Дії</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id} style={{
              backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
              transition: "background 0.3s"
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#e8f4f8"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#f9f9f9" : "#fff"}
            >
              <td style={tdStyle}>{item.sensorId}</td>
              <td style={tdStyle}>{item.type}</td>
              <td style={tdStyle}>{item.parameter}</td>
              <td style={tdStyle}>{item.value}</td>
              <td style={tdStyle}>{item.unit}</td>
              <td style={tdStyle}>{new Date(item.createdAt).toLocaleString()}</td>
              <td style={{ ...tdStyle, display: "flex", gap: "5px" }}>
                <button
                  onClick={() => {
                    setEditId(item._id);
                    setForm({
                      sensorId: item.sensorId,
                      type: item.type,
                      parameter: item.parameter,
                      value: item.value,
                      unit: item.unit
                    });
                  }}
                  style={editButtonStyle}
                >
                  Редагувати
                </button>

                <button onClick={() => handleDelete(item._id)} style={deleteButtonStyle}>
                  Видалити
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ====== Стилі ======
const inputStyle = {
  padding: "8px 12px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  outline: "none",
  width: "120px"
};

const buttonStyle = {
  padding: "8px 16px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold"
};

const thStyle = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "bold"
};

const tdStyle = {
  padding: "12px",
  textAlign: "left"
};

const editButtonStyle = {
  padding: "4px 8px",
  backgroundColor: "#2196F3",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

const deleteButtonStyle = {
  padding: "4px 8px",
  backgroundColor: "#f44336",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};
