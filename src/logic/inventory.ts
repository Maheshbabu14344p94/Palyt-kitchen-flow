import type { Ingredient, Recipe } from "../types";

export function toBase(qty: number, unit: string): number {
  const normalized = unit.trim().toLowerCase();

  if (normalized === "kg" || normalized === "l") {
    return qty * 1000;
  }

  return qty;
}

export function compatible(stockUnit: string, recipeUnit: string): boolean {
  const stock = stockUnit.trim().toLowerCase();
  const recipe = recipeUnit.trim().toLowerCase();

  if (stock === recipe) return true;

  return (
    (stock === "kg" && recipe === "g") ||
    (stock === "g" && recipe === "kg") ||
    (stock === "l" && recipe === "ml") ||
    (stock === "ml" && recipe === "l")
  );
}

export function findIngredient(
  stock: Ingredient[],
  name: string
): Ingredient | undefined {
  return stock.find(
    (i: Ingredient) =>
      i.name.trim().toLowerCase() === name.trim().toLowerCase()
  );
}

export function isDishAvailable(
  recipe: Recipe,
  stock: Ingredient[]
): boolean {
  return recipe.ingredients.every((r) => {
    const ingredient = findIngredient(stock, r.name);

    return (
      !!ingredient &&
      compatible(ingredient.unit, r.unit) &&
      toBase(ingredient.qty, ingredient.unit) >=
        toBase(ingredient.par, ingredient.unit)
    );
  });
}

/**
 * Deduct the recipe quantities from stock.
 * Signature intentionally remains (stock, recipe)
 * because App.tsx and the existing tests use this order.
 */
export function deductDish(
  stock: Ingredient[],
  recipe: Recipe
): Ingredient[] {
  return stock.map((ingredient) => {
    const recipeIngredient = recipe.ingredients.find(
      (r) =>
        r.name.trim().toLowerCase() ===
        ingredient.name.trim().toLowerCase()
    );

    if (!recipeIngredient) {
      return ingredient;
    }

    if (!compatible(ingredient.unit, recipeIngredient.unit)) {
      throw new Error(
        `Incompatible units for ${ingredient.name}: ${ingredient.unit} and ${recipeIngredient.unit}`
      );
    }

    const currentInBaseUnits = toBase(
      ingredient.qty,
      ingredient.unit
    );

    const deductionInBaseUnits = toBase(
      recipeIngredient.qty,
      recipeIngredient.unit
    );

    const remainingInBaseUnits =
      currentInBaseUnits - deductionInBaseUnits;

    if (remainingInBaseUnits < 0) {
      throw new Error(
        `Insufficient stock for ${ingredient.name}`
      );
    }

    const normalizedUnit = ingredient.unit.trim().toLowerCase();

    const remaining =
      normalizedUnit === "kg" || normalizedUnit === "l"
        ? remainingInBaseUnits / 1000
        : remainingInBaseUnits;

    return {
      ...ingredient,
      qty: remaining,
    };
  });
}

/**
 * Signature intentionally remains (recipes, name)
 * because App.tsx and the existing tests use this order.
 */
export function canDeleteIngredient(
  recipes: Recipe[],
  name: string
): boolean {
  return !recipes.some((recipe) =>
    recipe.ingredients.some(
      (ingredient) =>
        ingredient.name.trim().toLowerCase() ===
        name.trim().toLowerCase()
    )
  );
}