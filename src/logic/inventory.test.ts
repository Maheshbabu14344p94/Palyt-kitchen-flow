import {describe,expect,it} from 'vitest';
import stock from '../data/stock.json'; import recipes from '../data/recipes.json';
import {canDeleteIngredient,deductDish,isDishAvailable,toBase} from './inventory';
import type {Ingredient,Recipe} from '../types';
const s=stock as Ingredient[]; const r=recipes as Recipe[];
describe('Palyt inventory rules',()=>{
 it('converts kg to grams',()=>expect(toBase(1.4,'kg')).toBe(1400));
 it('uses below-par rule',()=>{const dish=r.find(x=>x.dish==='Chicken Biryani')!;expect(isDishAvailable(dish,s)).toBe(false)});
 it('requires every ingredient to exist',()=>expect(isDishAvailable(r.find(x=>x.dish==='Butter Naan')!,s)).toBe(false));
 it('deducts across units while preserving stock units',()=>{const next=deductDish(s,r.find(x=>x.dish==='Paneer Butter Masala')!);expect(next.find(x=>x.name==='Paneer')!.qty).toBeCloseTo(1.22);expect(next.find(x=>x.name==='Tomatoes')!.qty).toBeCloseTo(5.85);expect(next.find(x=>x.name==='Onions')!.qty).toBeCloseTo(7.92)});
 it('blocks recipe ingredients but allows unused ones',()=>{expect(canDeleteIngredient(r,'Cashews')).toBe(false);expect(canDeleteIngredient(r,'Bay Leaves')).toBe(true)});
 it('reacts when par is raised',()=>{const paneer={...s.find(x=>x.name==='Paneer')!,par:2};const dish=r.find(x=>x.dish==='Paneer Butter Masala')!;expect(isDishAvailable(dish,s.map(x=>x.name==='Paneer'?paneer:x))).toBe(false)});
});
