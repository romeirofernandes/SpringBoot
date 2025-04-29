import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { FaArrowLeft } from "react-icons/fa";
import { racesApi } from "../services/api";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";

const RaceDetailPage = () => {
  const { id } = useParams();

  const {
    data: race,
    isLoading,
    error,
  } = useQuery(["race", id], () => racesApi.getById(id), {
    enabled: !!id,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="text-center py-8 text-red-500">
        Error loading race details
      </div>
    );
  if (!race)
    return <div className="text-center py-8 text-white">Race not found</div>;

  // Format the race date
  const formattedRaceDate = new Date(race.raceDate).toLocaleDateString();

  return (
    <div>
      <Link
        to="/races"
        className="inline-flex items-center gap-2 text-[#0090d0] mb-6 hover:underline"
      >
        <FaArrowLeft /> Back to Races
      </Link>

      <Card>
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{race.name}</h1>
          <p className="text-lg text-gray-600">
            Season {race.season} - Round {race.round}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Race Information</h2>
            <p className="text-lg mb-2">
              <span className="font-semibold">Date:</span> {formattedRaceDate}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Circuit:</span> {race.circuitName}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RaceDetailPage;
