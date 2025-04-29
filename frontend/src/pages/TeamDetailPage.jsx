import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { FaArrowLeft } from "react-icons/fa";
import { teamsApi, driversApi } from "../services/api";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";

const TeamDetailPage = () => {
  const { id } = useParams();

  const {
    data: team,
    isLoading: teamLoading,
    error: teamError,
  } = useQuery(["team", id], () => teamsApi.getById(id), {
    enabled: !!id,
  });

  const { data: drivers = [], isLoading: driversLoading } = useQuery(
    ["drivers", "team", id],
    () => driversApi.getByTeam(id),
    {
      enabled: !!id,
    }
  );

  if (teamLoading || driversLoading) return <LoadingSpinner />;
  if (teamError)
    return (
      <div className="text-center py-8 text-red-500">
        Error loading team details
      </div>
    );
  if (!team)
    return <div className="text-center py-8 text-white">Team not found</div>;

  return (
    <div>
      <Link
        to="/teams"
        className="inline-flex items-center gap-2 text-[#0090d0] mb-6 hover:underline"
      >
        <FaArrowLeft /> Back to Teams
      </Link>

      <Card className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{team.name}</h1>
        <p className="text-lg mb-2">
          <span className="font-semibold">Nationality:</span> {team.nationality}
        </p>
      </Card>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-white">Drivers</h2>
        {drivers.length === 0 ? (
          <p className="text-white">No drivers found for this team.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {drivers.map((driver) => (
              <Card
                key={driver.id}
                className="hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-1">
                  {driver.firstName} {driver.lastName}
                </h3>
                <p className="text-gray-600 mb-2">Number: {driver.number}</p>
                <p className="text-gray-600 mb-2">Code: {driver.code}</p>
                <p className="text-gray-600 mb-4">
                  Nationality: {driver.nationality}
                </p>
                <Link
                  to={`/drivers/${driver.id}`}
                  className="text-[#0090d0] hover:underline"
                >
                  View details
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamDetailPage;
