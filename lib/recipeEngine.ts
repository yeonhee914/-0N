import { daysBetweenToday } from "./dateUtils";
import type { Food, Recipe, RecipeMatch } from "./types";

export const recipes: Recipe[] = [
  { id: "omelet", name: "양파 오믈렛", ingredients: ["계란", "양파"], category: "브런치", minutes: 12, tip: "우유가 있으면 한 숟갈 넣어 부드럽게 만들어요." },
  { id: "fried-rice", name: "계란볶음밥", ingredients: ["계란", "양파", "당근"], category: "밥", minutes: 15, tip: "남은 채소를 잘게 썰어 함께 볶아요." },
  { id: "tofu", name: "두부조림", ingredients: ["두부", "양파"], category: "반찬", minutes: 18, tip: "간장 양념을 졸이면 도시락 반찬으로 좋아요." },
  { id: "potato", name: "감자볶음", ingredients: ["감자", "양파"], category: "반찬", minutes: 20, tip: "얇게 채 썰면 빨리 익어요." },
  { id: "kimchi", name: "김치찌개", ingredients: ["김치", "돼지고기", "두부"], category: "국물", minutes: 25, tip: "두부를 마지막에 넣으면 모양이 살아있어요." },
  { id: "cabbage", name: "양배추 계란전", ingredients: ["양배추", "계란"], category: "간단요리", minutes: 14, tip: "케첩이나 간장 소스와 잘 어울려요." },
  { id: "milk-egg", name: "프렌치토스트", ingredients: ["우유", "계란"], category: "간식", minutes: 10, tip: "식빵이 있으면 바로 만들 수 있어요." },
  { id: "doenjang", name: "두부 된장찌개", ingredients: ["두부", "양파", "감자"], category: "국물", minutes: 22, tip: "보유 채소를 추가해도 좋아요." }
];

export function recommendRecipes(foods: Food[]): RecipeMatch[] {
  const owned = foods.map((food) => food.name);
  const urgentNames = foods.filter((food) => daysBetweenToday(food.expireDate) <= 3).map((food) => food.name);

  return recipes
    .map((recipe) => {
      const ownedIngredients = recipe.ingredients.filter((ingredient) =>
        owned.some((name) => name.includes(ingredient) || ingredient.includes(name))
      );
      const missingIngredients = recipe.ingredients.filter((ingredient) => !ownedIngredients.includes(ingredient));
      const urgentIngredientCount = recipe.ingredients.filter((ingredient) =>
        urgentNames.some((name) => name.includes(ingredient) || ingredient.includes(name))
      ).length;
      return {
        ...recipe,
        matchRate: Math.round((ownedIngredients.length / recipe.ingredients.length) * 100),
        ownedIngredients,
        missingIngredients,
        urgentIngredientCount
      };
    })
    .filter((recipe) => recipe.matchRate > 0)
    .sort((a, b) => b.urgentIngredientCount - a.urgentIngredientCount || b.matchRate - a.matchRate);
}
