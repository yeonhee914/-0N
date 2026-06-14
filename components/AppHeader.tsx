export default function AppHeader({ title, description }: { title: string; description?: string }) {
  return (
    <header className="mb-5">
      <p className="text-sm font-semibold text-leaf-600">냉장고ON</p>
      <h1 className="text-2xl font-bold tracking-normal text-gray-950">{title}</h1>
      {description ? <p className="mt-1 text-sm text-gray-500">{description}</p> : null}
    </header>
  );
}
