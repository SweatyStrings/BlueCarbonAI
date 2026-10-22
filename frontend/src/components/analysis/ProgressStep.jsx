import { CheckCircle2, Circle, Loader2 } from "lucide-react";

export default function ProgressStep({
  title,
  status,
}) {
  const icon = () => {
    switch (status) {
      case "completed":
        return (
          <CheckCircle2 className="w-6 h-6 text-green-600" />
        );

      case "active":
        return (
          <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
        );

      default:
        return (
          <Circle className="w-6 h-6 text-gray-400" />
        );
    }
  };

  const textColor =
    status === "completed"
      ? "text-green-700"
      : status === "active"
      ? "text-blue-700"
      : "text-gray-500";

  return (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-white border shadow-sm">
      {icon()}

      <span className={`font-medium ${textColor}`}>
        {title}
      </span>
    </div>
  );
}