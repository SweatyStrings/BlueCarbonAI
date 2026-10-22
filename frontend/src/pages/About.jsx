import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function About() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-24 px-8">
        <h1 className="text-4xl font-bold">About BlueCarbonAI</h1>

        <p className="mt-4 text-gray-600">
          BlueCarbonAI is an AI-powered platform for estimating blue carbon
          storage using satellite imagery and computer vision.
        </p>
      </main>

      <Footer />
    </>
  );
}