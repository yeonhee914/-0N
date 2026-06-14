export default function StatsCard({ label, value, tone = "green" }: { label: string; value: string | number; tone?: "green" | "red" | "yellow" | "plain" }) {
  const toneClass = {
    green: "bg-leaf-50 text-leaf-700",
    red: "bg-red-50 text-red-700",
    yellow: "bg-amber-50 text-amber-700",
    plain: "bg-white text-gray-800"
  }[tone];
  return (
    <div className={`rounded-lg border border-black/5 p-4 shadow-soft ${toneClass}`}>
      <p className="text-xs font-medium opacity-75">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
