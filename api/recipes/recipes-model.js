const db = require("../../data/db-config");

async function getRecipeById(recipe_id) {
  // - Should resolve a representation of the recipe similar to the one shown in the **Data Model** above.
  // - The function will pull information from several tables using Knex and then create a response object using loops, objects, array methods etc.
  // - There are many ways to solve this, but from a performance standpoint the fewer trips to the database the better!
  const recipeRows = await db("recipes as r").where("recipe_id", recipe_id);

  return recipeRows;
}

module.exports = {
  getRecipeById,
};
