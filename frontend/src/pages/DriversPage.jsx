import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { driversApi, teamsApi } from "../services/api";
import Card from "../components/Card";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";

const DriversPage = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    code: "",
    number: "",
    nationality: "",
    dateOfBirth: "",
    teamId: "",
  });

  const {
    data: drivers = [],
    isLoading,
    error,
  } = useQuery(["drivers"], driversApi.getAll);
  const { data: teams = [] } = useQuery(["teams"], teamsApi.getAll);

  const createMutation = useMutation(driversApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(["drivers"]);
      resetForm();
      setIsModalOpen(false);
    },
  });

  const updateMutation = useMutation(
    ({ id, driver }) => driversApi.update(id, driver),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["drivers"]);
        resetForm();
        setIsModalOpen(false);
      },
    }
  );

  const deleteMutation = useMutation(driversApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(["drivers"]);
    },
  });

  const handleOpenModal = (driver) => {
    if (driver) {
      setEditingDriver(driver);
      setFormData({
        firstName: driver.firstName,
        lastName: driver.lastName,
        code: driver.code,
        number: driver.number,
        nationality: driver.nationality,
        dateOfBirth: driver.dateOfBirth ? driver.dateOfBirth.split("T")[0] : "",
        teamId: driver.teamId || "",
      });
    } else {
      setEditingDriver(null);
      resetForm();
    }
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      code: "",
      number: "",
      nationality: "",
      dateOfBirth: "",
      teamId: "",
    });
    setEditingDriver(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const driverData = {
      ...formData,
      number: parseInt(formData.number),
    };

    if (editingDriver) {
      updateMutation.mutate({ id: editingDriver.id, driver: driverData });
    } else {
      createMutation.mutate(driverData);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="text-center py-8 text-red-500">Error loading drivers</div>
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Formula 1 Drivers</h1>
        <Button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2"
        >
          <FaPlus /> Add Driver
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.map((driver) => (
          <Card key={driver.id} className="hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-1">
              {driver.firstName} {driver.lastName}
            </h2>
            <div className="flex items-center mb-2">
              <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2">
                #{driver.number}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
                {driver.code}
              </span>
            </div>
            <p className="text-gray-600 mb-1">Team: {driver.teamName}</p>
            <p className="text-gray-600 mb-4">
              Nationality: {driver.nationality}
            </p>
            <div className="flex justify-between">
              <Link
                to={`/drivers/${driver.id}`}
                className="text-[#0090d0] hover:underline"
              >
                View details
              </Link>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(driver)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(driver.id)}
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
              {editingDriver ? "Edit Driver" : "Add New Driver"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Code</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        code: e.target.value.toUpperCase(),
                      })
                    }
                    required
                    maxLength={3}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Number</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={formData.number}
                    onChange={(e) =>
                      setFormData({ ...formData, number: e.target.value })
                    }
                    required
                    min={1}
                    max={99}
                  />
                </div>
              </div>
              <div className="mb-4">
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
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full p-2 border rounded"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfBirth: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Team</label>
                <select
                  className="w-full p-2 border rounded"
                  value={formData.teamId}
                  onChange={(e) =>
                    setFormData({ ...formData, teamId: e.target.value })
                  }
                  required
                >
                  <option value="">Select a team</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
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
                    : editingDriver
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

export default DriversPage;
