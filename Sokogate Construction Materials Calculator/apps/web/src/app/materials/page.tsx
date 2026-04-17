import { useQuery } from '@tanstack/react-query';
import { getMaterials } from '../../utils/database';

export default function MaterialsPage() {
  const { data: materials, isLoading, error } = useQuery({
    queryKey: ['materials'],
    queryFn: getMaterials,
  });

  if (isLoading) return <div>Loading materials...</div>;
  if (error) return <div>Error loading materials</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Materials</h1>
      <div className="grid gap-4">
        {materials?.map((material) => (
          <div key={material.id} className="border p-4 rounded">
            <h2 className="text-lg font-semibold">{material.name}</h2>
            <p className="text-gray-600">${material.cost} per {material.unit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}