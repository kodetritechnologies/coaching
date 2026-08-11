import { Link } from "react-router-dom";
import { FaTools } from "react-icons/fa";

function ComingSoonPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <div className="bg-white shadow-lg rounded-2xl cp max-w-md w-full">
        <div className="flex justify-center mb-4">
          <FaTools className="w-16 h-16 text-yellow-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Page Under Construction
        </h1>
        <p className="text-gray-500 mb-6">
          We’re working hard to bring you this feature.  
          Please check back later!
        </p>
        <Link
          to="/"
          className="inline-block cp cmt bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
        >
          Go Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default ComingSoonPage;
