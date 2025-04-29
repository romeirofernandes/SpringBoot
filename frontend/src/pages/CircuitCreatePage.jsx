import { useState } from "react";
import { circuitsApi } from "../services/api";
import { useNavigate } from "react-router-dom";

const CircuitCreatePage = () => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    country: "",
    length: "",
    numberOfLaps: "",
    turns: "",
    firstGrandPrix: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await circuitsApi.create({
        ...form,
        length: parseFloat(form.length),
        numberOfLaps: parseInt(form.numberOfLaps),
        turns: parseInt(form.turns),
        firstGrandPrix: parseInt(form.firstGrandPrix),
      });
      navigate("/circuits");
    } catch (err) {
      setError("Failed to create circuit.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add New Circuit</h1>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="length"
          placeholder="Length (km)"
          value={form.length}
          onChange={handleChange}
          required
          type="number"
          step="0.001"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="numberOfLaps"
          placeholder="Number of Laps"
          value={form.numberOfLaps}
          onChange={handleChange}
          required
          type="number"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="turns"
          placeholder="Turns"
          value={form.turns}
          onChange={handleChange}
          required
          type="number"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="firstGrandPrix"
          placeholder="First Grand Prix (year)"
          value={form.firstGrandPrix}
          onChange={handleChange}
          required
          type="number"
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-[#e10600] text-white px-6 py-2 rounded font-semibold"
        >
          Create Circuit
        </button>
      </form>
    </div>
  );
};

export default CircuitCreatePage;
