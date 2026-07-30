import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        <h1 className="text-3xl font-bold text-blue-700">
          BlueCarbonAI
        </h1>

        <div className="flex gap-8 text-lg">

          <Link to="/" className="hover:text-blue-700">
            Home
          </Link>

          <Link to="/analysis" className="hover:text-blue-700">
            Analysis
          </Link>

          <Link to="/about" className="hover:text-blue-700">
            About
          </Link>

        </div>
      </div>
    </nav>
  );
}