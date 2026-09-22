import type {Ingredient,Recipe,Unit} from '../types';
const MASS:{[K in Unit]?:number}={g:1,kg:1000};
const VOLUME:{[K in Unit]?:number}={ml:1,l:1000};
export function family(unit:Unit){return unit in MASS?'mass':unit in VOLUME?'volume':'unknown'}
export function toBase(qty:number,unit:Unit){const m=MASS[unit]; if(m)return qty*m; const v=VOLUME[unit]; if(v)return qty*v; throw new Error(`Unsupported unit: ${unit}`)}
export function fromBase(qty:number,unit:Unit){const m=MASS[unit]; if(m)return qty/m; const v=VOLUME[unit]; if(v)return qty/v; throw new Error(`Unsupported unit: ${unit}`)}
export function compatible(a:Unit,b:Unit){return family(a)!=='unknown'&&family(a)===family(b)}
export function findIngredient(stock:Ingredient,name:string){return stock.find(i=>i.name.trim().toLowerCase()===name.trim().toLowerCase())}
export function isDishAvailable(recipe:Recipe,stock:Ingredient[]){return recipe.ingredients.every(r=>{const i=findIngredient(stock,r.name); return !!i&&compatible(i.unit,r.unit)&&toBase(i.qty,i.unit)>=toBase(i.par,i.unit)})}
export function deductDish(stock:Ingredient[],recipe:Recipe){
 const next=stock.map(i=>({...i}));
 for(const r of recipe.ingredients){const idx=next.findIndex(i=>i.name.toLowerCase()===r.name.toLowerCase()); if(idx<0)throw new Error(`${r.name} is missing from stock.`); const i=next[idx]; if(!compatible(i.unit,r.unit))throw new Error(`Incompatible units for ${i.name}.`); const remain=toBase(i.qty,i.unit)-toBase(r.qty,r.unit); if(remain< -1e-9)throw new Error(`Not enough ${i.name} in stock.`); next[idx].qty=Math.max(0,fromBase(remain,i.unit));}
 return next;
}
export function canDeleteIngredient(recipes:Recipe[],name:string){return !recipes.some(r=>r.ingredients.some(i=>i.name.toLowerCase()===name.toLowerCase()))}
export function formatQty(qty:number,unit:Unit){return `${Math.round((qty+Number.EPSILON)*1000)/1000} ${unit}`}
