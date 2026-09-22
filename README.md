# Palyt — Kitchen Flow

A single-page, premium React/TypeScript implementation of the Palyt SDE Intern Task. The visual language is inspired by the supplied calm, editorial reference: cream surfaces, dark cinematic sections, rounded cards, floating navigation, subtle motion, and scroll-driven feature cards. The application logic remains focused on the actual Palyt requirements.

## Stack
- React + Vite + TypeScript
- Tailwind CSS
- lucide-react
- Vitest
- No other UI libraries

## Run
```bash
npm install
npm run dev
```
Open the Vite URL shown in the terminal.

## Tests
```bash
npm test
```

## Production build
```bash
npm run build
```

## Workflow
1. Stock is loaded from the supplied JSON.
2. Search, add, edit, and delete are available from the stock view.
3. A dish is available only when every recipe ingredient exists, uses a compatible unit family, and current stock is at or above its par level.
4. Ordering a dish deducts every recipe ingredient using base-unit conversion (kg/g and l/ml).
5. React state changes immediately recalculate menu availability.
6. Restocking or changing a par level therefore changes the menu without a page reload.

## Decisions
- Recipe ingredients that are absent from the supplied stock (`Cumin Seeds` and `Refined Flour`) make the dependent dish unavailable. This avoids inventing inventory that the supplied data does not contain.
- Ingredients referenced by a recipe cannot be deleted. Unused ingredients such as Bay Leaves can be deleted. This prevents a recipe from silently becoming structurally invalid.
- The availability rule follows the task's current product rule: stock must be at or above par. This is intentionally different from checking whether one additional portion can be made.
- Form validation rejects blank/duplicate names and negative or non-finite quantity/par values. Supported units are g, kg, ml, and l.

## Manual verification
A useful smoke test is to order Paneer Butter Masala from the live menu. The supplied starting values should change as follows:
- Paneer: 1.4 kg → 1.22 kg
- Tomatoes: 6 kg → 5.85 kg
- Onions: 8 kg → 7.92 kg
- Cream: 900 ml → 860 ml
- Butter: 900 g → 870 g
- Cashews: 300 g → 285 g
- Garam Masala: 250 g → 245 g

The menu then recalculates availability from the new state.

## AI usage
AI assistance was used for scaffolding, UI implementation, and test drafting. The business decisions are explicitly documented above and the code should be reviewed and explained by the author.

## Visual assets
The premium food cutouts used in the menu experience (`public/assets/biryani.png` and `public/assets/fried-chicken.png`) were generated with an AI image tool and are used only as decorative UI assets. The application logic, inventory rules, deductions, and availability calculations remain implemented in the project code.

## Premium menu presentation
The menu section follows the supplied visual reference: a dark cinematic background, floating glass feature cards, a transparent biryani cutout aligned with the second feature, a fried-chicken bucket aligned with the third feature, and a stylized quote aligned with the live diner menu. The food cutouts are transparent PNG assets under `public/assets/`.
