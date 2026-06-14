import { Clock, Sparkles } from "lucide-react";
import { recommendRecipes } from "@/lib/recipeEngine";
import type { Food } from "@/lib/types";

export default function RecipeList({ foods, limit }: { foods: Food[]; limit?: number }) {
  const matches = recommendRecipes(foods).slice(0, limit);
  if (!matches.length) {
    return <p className="rounded-lg bg-white p-5 text-center text-sm text-gray-500 shadow-soft">추천할 수 있는 레시피가 아직 없어요.</p>;
  }
  return (
    <div className="grid gap-3">
      {matches.map((recipe) => (
        <article key={recipe.id} className="rounded-lg bg-white p-4 shadow-soft">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-leaf-600">{recipe.category}</p>
              <h3 className="mt-1 text-lg font-bold">{recipe.name}</h3>
            </div>
            <span className="rounded-full bg-leaf-100 px-3 py-1 text-xs font-bold text-leaf-700">{recipe.matchRate}%</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {recipe.ownedIngredients.map((item) => <span key={item} className="rounded-full bg-leaf-50 px-2 py-1 font-semibold text-leaf-700">{item}</span>)}
            {recipe.missingIngredients.map((item) => <span key={item} className="rounded-full bg-gray-100 px-2 py-1 text-gray-500">{item} 없음</span>)}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{recipe.minutes}분</span>
            {recipe.urgentIngredientCount > 0 ? <span className="inline-flex items-center gap-1 font-bold text-red-600"><Sparkles className="h-3.5 w-3.5" />임박 재료 우선</span> : null}
          </div>
          <p className="mt-3 text-sm text-gray-600">{recipe.tip}</p>
        </article>
      ))}
    </div>
  );
}
