const router = require("express").Router();

router.use("*", (req, res) => {
  res.json({ api: "is working" });
});
router.use((err, req, res, next) => {
  res.status(500).json({
    message: "err in recipes router",

    stack: err.stack,
  });
});
module.exports = router;
