import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { teamsApi } from "../services/api";
import Card from "../components/Card";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";

const TeamsPage = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    nationality: "",
  });

  const {
    data: teams = [],
    isLoading,
    error,
  } = useQuery(["teams"], teamsApi.getAll);

  const createMutation = useMutation(teamsApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(["teams"]);
      resetForm();
      setIsModalOpen(false);
    },
  });

  const updateMutation = useMutation(
    ({ id, team }) => teamsApi.update(id, team),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["teams"]);
        resetForm();
        setIsModalOpen(false);
      },
    }
  );

  const deleteMutation = useMutation(teamsApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(["teams"]);
    },
  });

  const handleOpenModal = (team) => {
    if (team) {
      setEditingTeam(team);
      setFormData({
        name: team.name,
        nationality: team.nationality,
      });
    } else {
      setEditingTeam(null);
      resetForm();
    }
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      nationality: "",
    });
    setEditingTeam(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingTeam) {
      updateMutation.mutate({ id: editingTeam.id, team: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="text-center py-8 text-red-500">Error loading teams</div>
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Formula 1 Teams</h1>
        <Button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2"
        >
          <FaPlus /> Add Team
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Card key={team.id} className="hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{team.name}</h2>
            <p className="text-gray-600 mb-4">
              Nationality: {team.nationality}
            </p>
            <div className="flex justify-between">
              <Link
                to={`/teams/${team.id}`}
                className="text-[#0090d0] hover:underline"
              >
                View details
              </Link>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(team)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(team.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {editingTeam ? "Edit Team" : "Add New Team"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Team Name</label>
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
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Nationality</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.nationality}
                  onChange={(e) =>
                    setFormData({ ...formData, nationality: e.target.value })
                  }
                  required
                />
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
                    : editingTeam
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

export default TeamsPage;
