import { Link } from "react-router-dom";
import { circuitsApi } from "../services/api";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import { useQuery } from "react-query";

const CircuitsPage = () => {
  const { data, isLoading, error } = useQuery(["circuits"], circuitsApi.getAll);

  const circuits = Array.isArray(data) ? data : data?.circuits || [];

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="text-center py-8 text-[#0090d0]">
        Error loading circuits
      </div>
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Formula 1 Circuits</h1>
        <Link
          to="/circuits/new"
          className="bg-[#0090d0] text-white px-4 py-2 rounded font-semibold hover:bg-[#38bdf8] transition-colors"
        >
          Add Circuit
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {circuits.map((circuit) => (
          <Card key={circuit.id} className="hover:shadow-2xl transition-shadow">
            <h2 className="text-xl font-semibold mb-2 text-white">
              {circuit.name}
            </h2>
            <p className="text-blue-200 mb-1">
              Location: {circuit.location}, {circuit.country}
            </p>
            <Link
              to={`/circuits/${circuit.id}`}
              className="text-[#0090d0] hover:underline"
            >
              View details
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CircuitsPage;
