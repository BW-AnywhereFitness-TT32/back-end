const router = require("express").Router();

const Users = require("./users-model.js");
const roleChecker = require("../auth/roleChecker");

router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.send(err));
});

router.get("/roles", (req, res) => {
  Users.fetchRoles()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.send(err));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Users.findBy({ id })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.send(err));
});

router.get("/:userId/punchcards", (req, res) => {
  Users.fetchAllPunchcards(req.params.userId)
    .then((cards) => {
      res.status(200).json(cards);
    })
    .catch((err) => res.send(err));
});

router.get("/:userId/punchcards/:type_id", (req, res) => {
  Users.fetchPunchcard(req.params.userId, req.params.type_id)
    .then((card) => {
      res.status(200).json(card);
    })
    .catch((err) => res.send(err));
});

router.put("/:userId/punchcards/:type_id/add", roleChecker(2), (req, res) => {
  Users.punchcardAdd(req.params.userId, req.params.type_id)
    .then((card) => {
      res.status(200).json(card);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
