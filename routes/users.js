const { Router } = require("express");
const router = Router();

const {
  userDelete,
  userGet,
  userPatch,
  userPost,
  userPut,
} = require("../controllers/users");

router.get("/", userGet);

router.post("/", userPost);

router.put("/:id", userPut);

router.patch("/", userPatch);

router.delete("/", userDelete);

module.exports = router;
