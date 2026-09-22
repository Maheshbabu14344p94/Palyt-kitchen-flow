export type Unit='g'|'kg'|'ml'|'l';
export type Ingredient={name:string;qty:number;unit:Unit;par:number};
export type RecipeIngredient={name:string;qty:number;unit:Unit};
export type Recipe={dish:string;price:number;ingredients:RecipeIngredient[]};
