export default function LoadingSpinner({ label = "불러오는 중" }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 text-sm font-medium text-leaf-700">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-leaf-100 border-t-leaf-600" />
      {label}
    </div>
  );
}
