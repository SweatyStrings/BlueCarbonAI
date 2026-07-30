import { Download } from "lucide-react";

export default function DownloadButton() {
  return (
    <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg transition">
      <Download size={18} />
      Download Report
    </button>
  );
}