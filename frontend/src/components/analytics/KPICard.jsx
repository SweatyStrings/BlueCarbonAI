export default function KPICard({
  title,
  value,
  unit = "",
  icon,
  color = "blue",
}) {
  const colors = {
    green: "bg-green-50 border-green-200 text-green-700",
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-700",
    amber: "bg-amber-50 border-amber-200 text-amber-700",
    purple: "bg-purple-50 border-purple-200 text-purple-700",
  };

  return (
    <div
      className={`rounded-2xl border shadow-sm p-5 transition hover:shadow-lg ${colors[color]}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-70">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
            <span className="ml-1 text-lg">
              {unit}
            </span>
          </h2>
        </div>

        <div className="text-4xl">
          {icon}
        </div>
      </div>
    </div>
  );
}