import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  const points = location.state?.points ?? 0; // Fallback to 0 if points is not available

  //Redirect to home if points is not available
  React.useEffect(() => {
    if (location.state === null) {
      navigate("/");
    }
  }, [location.state, navigate]);

  return (
    <div className="container mx-auto p-8 bg-slate-600 min-h-screen flex justify-center items-center px-40">
      <div className="rounded-lg shadow-md p-6 bg-slate-400 w-full text-center my-8">
        <h2 className="text-4xl font-semibold mb-4 text-gray-800">Your Score</h2>
        <p className="text-2xl text-gray-700">Thank You, You scored {points} points!</p>
        <Link to="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg">
          Go to homepage
        </Link>
      </div>
    </div>
  );
};

export default Result;