# Palyt Task — Short Write-up

## 1. Calls I made

The supplied recipes reference Cumin Seeds and Refined Flour, but those ingredients are not present in the supplied stock. I chose to make dishes depending on missing stock unavailable rather than inventing quantities. For deletion, I block ingredients used by recipes and allow deletion of unused ingredients such as Bay Leaves, because that keeps recipe references valid.

I kept the stated availability rule: every recipe ingredient must have stock at or above its par level. I convert compatible units to base units for calculations while preserving the kitchen's original purchase unit for display.

## 2. How I checked

The automated logic tests cover unit conversion, below-par availability, missing ingredients, multi-ingredient deduction, recipe-reference deletion, and a par-level change that removes a dish from the menu. I also manually calculated the Paneer Butter Masala order: 1.4 kg paneer minus 180 g = 1.22 kg; 6 kg tomatoes minus 150 g = 5.85 kg; 8 kg onions minus 80 g = 7.92 kg.

Tests can prove the pure logic while still missing a UI wiring problem, so the browser smoke test should order a dish and observe both stock and menu changes. This is why the application presents the stock and live menu in one continuous page.

## 3. Another day

I would persist inventory transactions, add transaction history, add focused keyboard/accessibility tests, and consider separating the current par-level availability rule from a future “enough stock for one more portion” rule.

### AI-assisted visual work
AI was used to generate the decorative biryani and fried-chicken cutout artwork used in the premium menu presentation. The generated artwork is presentation-only; the inventory, unit conversion, availability, CRUD, and deduction logic remain implemented and tested in the application.
