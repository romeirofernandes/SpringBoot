import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { racesApi, circuitsApi } from "../services/api";
import Card from "../components/Card";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";

const RacesPage = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRace, setEditingRace] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    season: new Date().getFullYear(),
    round: "",
    raceDate: "",
    circuitId: "",
  });

  const [seasonFilter, setSeasonFilter] = useState(new Date().getFullYear());
  const seasons = Array.from(
    { length: 11 },
    (_, i) => new Date().getFullYear() - 5 + i
  );

  const {
    data: races = [],
    isLoading,
    error,
  } = useQuery(
    ["races", seasonFilter],
    () => racesApi.getBySeason(seasonFilter),
    {
      keepPreviousData: true,
    }
  );

  const { data: circuits = [] } = useQuery(["circuits"], circuitsApi.getAll);

  const createMutation = useMutation(racesApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(["races"]);
      resetForm();
      setIsModalOpen(false);
    },
  });

  const updateMutation = useMutation(
    ({ id, race }) => racesApi.update(id, race),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["races"]);
        resetForm();
        setIsModalOpen(false);
      },
    }
  );

  const deleteMutation = useMutation(racesApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(["races"]);
    },
  });

  const handleOpenModal = (race) => {
    if (race) {
      setEditingRace(race);
      setFormData({
        name: race.name,
        season: race.season,
        round: race.round,
        raceDate: race.raceDate ? race.raceDate.split("T")[0] : "",
        circuitId: race.circuitId || "",
      });
    } else {
      setEditingRace(null);
      resetForm();
    }
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      season: new Date().getFullYear(),
      round: "",
      raceDate: "",
      circuitId: "",
    });
    setEditingRace(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const raceData = {
      ...formData,
      season: parseInt(formData.season),
      round: parseInt(formData.round),
    };

    if (editingRace) {
      updateMutation.mutate({ id: editingRace.id, race: raceData });
    } else {
      createMutation.mutate(raceData);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this race?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="text-center py-8 text-red-500">Error loading races</div>
    );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-white">Formula 1 Races</h1>

        <div className="flex items-center gap-4">
          <div>
            <select
              value={seasonFilter}
              onChange={(e) => setSeasonFilter(parseInt(e.target.value))}
              className="p-2 border rounded"
            >
              {seasons.map((season) => (
                <option key={season} value={season}>
                  {season} Season
                </option>
              ))}
            </select>
          </div>

          <Button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2"
          >
            <FaPlus /> Add Race
          </Button>
        </div>
      </div>

      {races.length === 0 ? (
        <div className="text-center py-8 text-white">
          No races found for {seasonFilter} season.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {races.map((race) => (
            <Card key={race.id} className="hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-1">{race.name}</h2>
              <p className="text-gray-600 mb-1">Round: {race.round}</p>
              <p className="text-gray-600 mb-1">
                Date: {new Date(race.raceDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-4">Circuit: {race.circuitName}</p>
              <div className="flex justify-between">
                <Link
                  to={`/races/${race.id}`}
                  className="text-[#0090d0] hover:underline"
                >
                  View details
                </Link>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(race)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(race.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {editingRace ? "Edit Race" : "Add New Race"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Race Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Season</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={formData.season}
                    onChange={(e) =>
                      setFormData({ ...formData, season: e.target.value })
                    }
                    required
                  >
                    {seasons.map((season) => (
                      <option key={season} value={season}>
                        {season}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Round</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={formData.round}
                    onChange={(e) =>
                      setFormData({ ...formData, round: e.target.value })
                    }
                    required
                    min={1}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Race Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded"
                  value={formData.raceDate}
                  onChange={(e) =>
                    setFormData({ ...formData, raceDate: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Circuit</label>
                <select
                  className="w-full p-2 border rounded"
                  value={formData.circuitId}
                  onChange={(e) =>
                    setFormData({ ...formData, circuitId: e.target.value })
                  }
                  required
                >
                  <option value="">Select a circuit</option>
                  {circuits.map((circuit) => (
                    <option key={circuit.id} value={circuit.id}>
                      {circuit.name} - {circuit.location}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    createMutation.isLoading || updateMutation.isLoading
                  }
                >
                  {createMutation.isLoading || updateMutation.isLoading
                    ? "Saving..."
                    : editingRace
                    ? "Update"
                    : "Save"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RacesPage;
