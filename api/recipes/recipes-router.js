const router = require("express").Router();
const RECIPE = require("./recipes-model");

router.get("/:recipe_id", (req, res, next) => {
  RECIPE.getRecipeById(req.params.recipe_id)
    .then((recipe) => {
      if (!recipe) return res.status(404);
      return res.status(200).json(recipe);
    })
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(500).json({
    message: "err in recipes router",

    stack: err.stack,
  });
});
module.exports = router;
