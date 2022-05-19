const recipes = [
  { recipe_name: "Fried Chicken" }, //
  { recipe_name: "Mashed Potatoes" },
];

const ingredients = [
  { ingredient_name: "chicken", ingredient_unit: "lbs" },
  { ingredient_name: "flour", ingredient_unit: "lbs" },
  { ingredient_name: "potatoes", ingredient_unit: "lbs" },
];

const steps = [
  {
    step_text: "batter chicken",
    step_number: 1,
    recipe_id: 1,
  },
  {
    step_text: "fry chicken in pan",
    step_number: 2,
    recipe_id: 1,
  },
  {
    step_text: "boil potatoes",
    step_number: 1,
    recipe_id: 2,
  },
];

const step_ingredients = [
  {
    step_id: 1,
    ingredient_id: 1,
    quantity: 2,
  },
  {
    step_id: 2,
    ingredient_id: 1,
    quantity: 2,
  },
  {
    step_id: 3,
    ingredient_id: 2,
    quantity: 4,
  },
];

exports.seed = async function (knex) {
  await knex("recipes").insert(recipes);
  await knex("ingredients").insert(ingredients);
  await knex("steps").insert(steps);
  await knex("step_ingredients").insert(step_ingredients);
};
