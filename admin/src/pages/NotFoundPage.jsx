import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 px-4">
      <div className="bg-white shadow-2xl rounded-3xl cp max-w-lg w-full text-center transform transition duration-300 hover:scale-[1.02]">
        <div className="flex justify-center mb-6">
          <FaExclamationTriangle className="w-20 h-30 text-red-500 animate-bounce" />
        </div>

        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mb-8 leading-relaxed">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block cp cmt bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition duration-300 button"
        >
          ⬅ Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
