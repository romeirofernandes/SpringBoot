import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { circuitsApi } from "../services/api";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaArrowLeft } from "react-icons/fa";

const CircuitDetailPage = () => {
  const { id } = useParams();
  const {
    data: circuit,
    isLoading,
    error,
  } = useQuery(["circuit", id], () => circuitsApi.getById(id), {
    enabled: !!id,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="text-center py-8 text-red-500">
        Error loading circuit details
      </div>
    );
  if (!circuit)
    return <div className="text-center py-8 text-white">Circuit not found</div>;

  return (
    <div>
      <Link
        to="/circuits"
        className="inline-flex items-center text-[#0090d0] hover:underline mb-4"
      >
        <FaArrowLeft className="mr-2" /> Back to Circuits
      </Link>
      <Card className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{circuit.name}</h1>
        <p className="mb-2 text-gray-700">
          <strong>Location:</strong> {circuit.location}, {circuit.country}
        </p>
        <p className="mb-2 text-gray-700">
          <strong>Length:</strong> {circuit.length} km
        </p>
        <p className="mb-2 text-gray-700">
          <strong>Turns:</strong> {circuit.turns}
        </p>
        <p className="mb-2 text-gray-700">
          <strong>First Grand Prix:</strong> {circuit.firstGrandPrix}
        </p>
      </Card>
    </div>
  );
};

export default CircuitDetailPage;
