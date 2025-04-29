import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { FaArrowLeft } from "react-icons/fa";
import { driversApi } from "../services/api";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";

const DriverDetailPage = () => {
  const { id } = useParams();

  const {
    data: driver,
    isLoading,
    error,
  } = useQuery(["driver", id], () => driversApi.getById(id), {
    enabled: !!id,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="text-center py-8 text-red-500">
        Error loading driver details
      </div>
    );
  if (!driver)
    return <div className="text-center py-8 text-white">Driver not found</div>;

  // Format the date of birth
  const formattedDateOfBirth = new Date(
    driver.dateOfBirth
  ).toLocaleDateString();

  return (
    <div>
      <Link
        to="/drivers"
        className="inline-flex items-center gap-2 text-[#0090d0] mb-6 hover:underline"
      >
        <FaArrowLeft /> Back to Drivers
      </Link>

      <Card>
        <h1 className="text-3xl font-bold mb-6">
          {driver.firstName} {driver.lastName}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-lg mb-2">
              <span className="font-semibold">Number:</span> {driver.number}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Code:</span> {driver.code}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Nationality:</span>{" "}
              {driver.nationality}
            </p>
          </div>
          <div>
            <p className="text-lg mb-2">
              <span className="font-semibold">Date of Birth:</span>{" "}
              {formattedDateOfBirth}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Team:</span> {driver.teamName}
            </p>
            <Link
              to={`/teams/${driver.teamId}`}
              className="text-[#0090d0] hover:underline"
            >
              View team details
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DriverDetailPage;
