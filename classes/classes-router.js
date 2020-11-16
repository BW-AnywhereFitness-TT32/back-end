const router = require("express").Router();

const Classes = require("./classes-model.js");
const roleChecker = require("../auth/roleChecker");
const e = require("express");

router.get("/", (req, res) => {
  if (!req.query) {
    Classes.find()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => res.send(err));
  } else {
    Classes.filterBy(req.query)
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => res.send(err));
  }
});

router.post("/", roleChecker(2), (req, res) => {
  const newClass = {
    ...req.body,
    instructor_id: req.decodedJwt.id,
  };
  Classes.add(newClass)
    .then((cl) => {
      res.status(200).json(cl);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/types", (req, res) => {
  Classes.fetchTypes()
    .then((types) => {
      res.status(201).json(types);
    })
    .catch((err) => res.send(err));
});

router.get("/:id", (req, res) => {
  console.log(req.params);
  Classes.getAttending(req.params.id)
    .then((attendance) => {
      Classes.findById(req.params.id)
        .then((users) => {
          res.status(200).json({ ...users, attending: attendance });
        })
        .catch((err) => res.send(err));
    })
    .catch((err) => res.send(err));
});

router.put("/:id", roleChecker(2), (req, res) => {
  Classes.update(req.params.id, req.body)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.send(err));
});

router.delete("/:id", (req, res) => {
  Classes.remove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: `successfully deleted post with id: ${req.params.id}`,
      });
    })
    .catch((err) => res.send(err));
});

router.get("/:id/attending", (req, res) => {
  Classes.getAttending(req.params.id)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.send(err));
});

router.post("/:id/joinleave", (req, res) => {
  Classes.getAttending(req.params.id)
    .then((users) => {
      const arr = users.map((user) => user.user_id);
      if (arr.includes(req.decodedJwt.id)) {
        Classes.leaveClass(req.decodedJwt.id, req.params.id)
          .then(() => {
            res.status(200).json({ message: "successfully left the class" });
          })
          .catch((err) => res.send(err));
      } else {
        Classes.joinClass(req.decodedJwt.id, req.params.id)
          .then(() => {
            res.status(200).json({ message: "successfully joined the class" });
          })
          .catch((err) => res.send(err));
      }
    })
    .catch((err) => res.send(err));
});

module.exports = router;
