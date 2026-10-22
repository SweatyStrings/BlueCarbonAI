export default function Statistics() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-xl font-semibold mb-4">
        Statistics
      </h2>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-slate-50 rounded-xl p-4 text-center">
          <h3 className="text-lg font-bold">0</h3>
          <p className="text-gray-500">Area</p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 text-center">
          <h3 className="text-lg font-bold">0</h3>
          <p className="text-gray-500">Biomass</p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 text-center">
          <h3 className="text-lg font-bold">0</h3>
          <p className="text-gray-500">Carbon</p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 text-center">
          <h3 className="text-lg font-bold">0</h3>
          <p className="text-gray-500">Credits</p>
        </div>

      </div>

    </div>
  );
}