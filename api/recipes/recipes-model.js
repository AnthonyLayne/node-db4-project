const db = require("../../data/db-config");

// const outputExample = {
//   recipe_id: 1,
//   recipe_name: "Spaghetti Bolognese",
//   created_at: "2021-01-01 08:23:19.120",
//   steps: [
//     {
//       step_id: 11,
//       step_number: 1,
//       step_instructions: "Put a large saucepan on a medium heat",
//       ingredients: [{ ingredient_id: 27, ingredient_name: "olive oil", quantity: 0.014 }],
//     },
//     {
//       step_id: 12,
//       step_number: 2,
//       step_instructions: "Add 1 tbsp olive oil",
//       ingredients: [
//         { ingredient_id: 27, ingredient_name: "olive oil", quantity: 0.014 },
//         { ingredient_id: 27, ingredient_name: "olive oil", quantity: 0.014 },
//       ],
//     },
//   ],
// };

async function getRecipeById(recipe_id) {
  // - There are many ways to solve this, but from a performance standpoint the fewer trips to the database the better!
  const data = await db("recipes as r")
    .where("r.recipe_id", recipe_id)
    .join("steps as s", "s.recipe_id", "r.recipe_id")
    .join("step_ingredients as si", "si.step_id", "s.step_id")
    .join("ingredients as i", "si.ingredient_id", "i.ingredient_id");

  const firstRow = data[0];
  if (!firstRow) return null;

  // - The function will pull information from several tables using Knex and then create a response object using loops, objects, array methods etc.
  const recipe = {
    recipe_id: firstRow.recipe_id,
    recipe_name: firstRow.recipe_name,
    created_at: firstRow.created_at,
    steps: [],
  };

  for (let i = 0; i < data.length; ++i) {
    const row = data[i];
    const targetIndex = row.step_number - 1;
    const existingIngredients = recipe.steps[targetIndex]?.ingredients || [];

    recipe.steps[targetIndex] = {
      step_id: row.step_id,
      step_number: row.step_number,
      step_instructions: row.step_text,
      ingredients: [
        ...existingIngredients,
        {
          ingredient_id: row.ingredient_id,
          ingredient_name: row.ingredient_name,
          quantity: row.quantity,
        },
      ],
    };
  }

  return recipe;
}

module.exports = {
  getRecipeById,
};
