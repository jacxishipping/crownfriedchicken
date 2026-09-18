#!/bin/bash
# Generate cinematic, brand-matching food photography for Crown Fried Chicken.
# Style brief: black background, dramatic lighting, ultra-crispy golden crust,
# steam, high detail, professional food photography, shallow depth of field.

set -e
OUT=/home/z/my-project/public/food
mkdir -p "$OUT"

gen() {
  local prompt="$1"
  local size="$2"
  local out="$3"
  if [ -s "$out" ]; then
    echo "skip $out"
    return 0
  fi
  echo "Generating $out ..."
  z-ai image -p "$prompt" -s "$size" -o "$out" 2>&1 | tail -2
}

# Hero — huge crispy fried chicken pieces stacked, dramatic dark studio
gen "Ultra detailed professional food photography of golden crispy fried chicken pieces stacked dramatically on a dark surface, dramatic studio lighting, deep black background, glistening crunchy crust with golden breadcrumb texture, subtle steam rising, shallow depth of field, hyperrealistic, mouthwatering, editorial fast food advertising shot, warm rim lighting on the chicken, food photography masterpiece" \
  "768x1344" \
  "$OUT/hero-chicken.png"

# Fried chicken close-up macro — extreme crunch texture
gen "Extreme close-up macro photography of crispy fried chicken crust, golden brown crunchy battered texture, hyper-detailed flaky crust, warm highlights, black background, professional food photography, appetizing, glistening oil droplets, super detailed texture, editorial food magazine quality" \
  "1344x768" \
  "$OUT/crispy-closeup.png"

# Buffalo wings
gen "Professional food photography of buffalo chicken wings glazed with red hot sauce, piled on a black plate, deep black background, glossy sauce coating, sesame seeds, fresh herbs garnish, dramatic lighting, editorial advertising, ultra detailed, mouthwatering, restaurant quality" \
  "1024x1024" \
  "$OUT/buffalo-wings.png"

# Hot wings
gen "Professional food photography of hot spicy chicken wings piled high, glossy red pepper glaze, steam rising, scattered chili flakes, dark slate background, dramatic moody lighting, ultra detailed, editorial food advertising, mouthwatering" \
  "1024x1024" \
  "$OUT/hot-wings.png"

# Regular wings
gen "Professional food photography of classic fried chicken wings golden brown, perfectly crispy, arranged on a black surface, deep black background, dramatic lighting, ultra detailed texture, editorial restaurant advertising, mouthwatering crunch" \
  "1024x1024" \
  "$OUT/regular-wings.png"

# Chicken nuggets
gen "Professional food photography of golden crispy chicken nuggets stacked on a dark surface, perfectly breaded, crunchy texture, served with dipping sauce, black background, dramatic studio lighting, editorial advertising, ultra detailed, mouthwatering" \
  "1024x1024" \
  "$OUT/nuggets.png"

# Chicken only pieces
gen "Professional food photography of assorted fried chicken pieces — breasts, thighs, drumsticks, wings — arranged dramatically on a dark surface, golden crispy crust, deep black background, dramatic moody lighting, glistening texture, editorial advertising, hyperrealistic" \
  "1024x1024" \
  "$OUT/chicken-only.png"

# Seafood platter
gen "Professional food photography of crispy golden fried shrimp basket with jumbo breaded shrimp, lemon wedge, parsley, on a black plate against deep black background, dramatic lighting, ultra detailed crispy batter, editorial restaurant advertising, mouthwatering" \
  "1024x1024" \
  "$OUT/seafood.png"

# Tilapia
gen "Professional food photography of crispy whole fried tilapia fish golden brown, served with fries and lemon, on a black plate against deep black background, dramatic lighting, ultra detailed crispy skin, editorial restaurant advertising, mouthwatering" \
  "1024x1024" \
  "$OUT/tilapia.png"

# Sides
gen "Professional food photography of golden crispy french fries piled high in a black bowl, sea salt, dark background, dramatic lighting, ultra detailed, editorial restaurant advertising, mouthwatering, steam rising" \
  "1024x1024" \
  "$OUT/fries.png"

# Pile of chicken + fries billboard
gen "Dramatic professional food photography of a massive pile of golden crispy fried chicken pieces and french fries overflowing on a dark surface, deep black background, dramatic spotlight lighting, editorial fast food advertising, hyperrealistic, mouthwatering, abundant, generous portions, restaurant hero shot" \
  "1440x720" \
  "$OUT/billboard.png"

# Drinks
gen "Professional beverage photography of ice cold soft drink bottles and cans with condensation droplets, deep black background, dramatic lighting, ultra detailed, editorial advertising, refreshing" \
  "1024x1024" \
  "$OUT/drinks.png"

# Mozzarella sticks
gen "Professional food photography of golden crispy mozzarella sticks stacked, marinara dipping sauce, on a black plate, deep black background, dramatic lighting, ultra detailed crispy batter, editorial restaurant advertising, mouthwatering, melted cheese pull" \
  "1024x1024" \
  "$OUT/mozz-sticks.png"

# Onion rings
gen "Professional food photography of golden crispy onion rings stacked, on a black plate, deep black background, dramatic lighting, ultra detailed crispy beer batter, editorial restaurant advertising, mouthwatering" \
  "1024x1024" \
  "$OUT/onion-rings.png"

# Beef patty
gen "Professional food photography of golden baked Jamaican beef patty flaky pastry, on a black plate, deep black background, dramatic lighting, ultra detailed flaky crust, editorial restaurant advertising, mouthwatering" \
  "1024x1024" \
  "$OUT/beef-patty.png"

echo "DONE"
