import React from "react";
import { Link } from "react-router-dom";
import { FaFlag, FaUsers, FaCar } from "react-icons/fa";
import Card from "../components/Card";

const Landing = () => {
  return (
    <div className="space-y-10">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#e10600] mb-4">
          Welcome to F1 Race Explorer
        </h1>
        <p className="text-xl text-white max-w-3xl mx-auto">
          Explore detailed information about Formula 1 teams, drivers, and
          races.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="text-center hover:shadow-lg transition-shadow">
          <div className="flex justify-center mb-4">
            <FaCar className="text-5xl text-[#e10600]" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Teams</h2>
          <p className="mb-4 text-gray-700">
            Explore all the Formula 1 teams and their details.
          </p>
          <Link
            to="/teams"
            className="bg-[#e10600] text-white hover:bg-[#c10600] px-4 py-2 rounded font-semibold inline-block"
          >
            View Teams
          </Link>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <div className="flex justify-center mb-4">
            <FaUsers className="text-5xl text-[#0090d0]" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Drivers</h2>
          <p className="mb-4 text-gray-700">
            Learn about your favorite F1 drivers.
          </p>
          <Link
            to="/drivers"
            className="bg-[#0090d0] text-white hover:bg-[#0070a0] px-4 py-2 rounded font-semibold inline-block"
          >
            View Drivers
          </Link>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <div className="flex justify-center mb-4">
            <FaFlag className="text-5xl text-[#e10600]" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Races</h2>
          <p className="mb-4 text-gray-700">
            Check out race details and results.
          </p>
          <Link
            to="/races"
            className="bg-[#e10600] text-white hover:bg-[#c10600] px-4 py-2 rounded font-semibold inline-block"
          >
            View Races
          </Link>
        </Card>
      </section>
      <Link
        to="/game"
        className="bg-[#0090d0] text-white hover:bg-[#0070a0] px-4 py-2 rounded font-semibold inline-block mt-6"
      >
        Play F1 Quiz
      </Link>
    </div>
  );
};

export default Landing;
