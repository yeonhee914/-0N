import { Sprout } from "lucide-react";

export default function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-dashed border-leaf-100 bg-white p-8 text-center shadow-soft">
      <Sprout className="mx-auto mb-3 h-9 w-9 text-leaf-500" />
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
}
