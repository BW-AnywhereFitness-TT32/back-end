const { where } = require("../database/db-config.js");
const db = require("../database/db-config.js");

module.exports = {
  find,
  findById,
  findByUserId,
  add,
  update,
  remove,
  fetchTypes,
  findBy,
  getAttending,
  joinClass,
  leaveClass,
  filterBy,
};

function find() {
  return db("classes as c")
    .join("class_types as ct", "ct.id", "c.type_id")
    .join("users as u", "u.id", "c.instructor_id")
    .select(
      "c.id",
      "c.class_name",
      "ct.class_type",
      "u.username as instructor",
      "c.date",
      "c.time",
      "c.duration",
      "c.intensity",
      "c.location",
      "c.capacity"
    );
}

function findById(id) {
  return db("classes as c")
    .join("class_types as ct", "ct.id", "c.type_id")
    .join("users as u", "u.id", "c.instructor_id")
    .select(
      "c.id",
      "c.class_name",
      "ct.class_type",
      "u.username as instructor",
      "c.date",
      "c.time",
      "c.duration",
      "c.intensity",
      "c.location",
      "c.capacity"
    )
    .where({ "c.id": id })
    .first();
}

function findByUserId(id) {
  return db("classes as c")
    .join("class_types as ct", "ct.id", "c.type_id")
    .join("users as u", "u.id", "c.instructor_id")
    .join("classes_to_users as ctu", "ctu.class_id", "c.id")
    .select(
      "c.id",
      "c.class_name",
      "ct.class_type",
      "u.username as instructor",
      "c.date",
      "c.time",
      "c.duration",
      "c.intensity",
      "c.location",
      "c.capacity"
    )
    .where({ "ctu.user_id": id });
}

async function add(classInfo) {
  await db("classes").insert(classInfo);
  return this.find();
}

async function update(id, classInfo) {
  await db("classes").where({ id }).update(classInfo);
  return this.findById(id);
}

async function remove(id) {
  return db("classes_to_users")
    .delete()
    .where({ class_id: id })
    .then(() => {
      return db("classes").delete().where({ id });
    })
    .catch(() => {
      return db("classes").delete().where({ id });
    });
}

function fetchTypes() {
  console.log("innit");
  return db("class_types");
}

function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}

function getAttending(classId) {
  return db("classes_to_users as ctu")
    .join("users as u", "ctu.user_id", "u.id")
    .select("ctu.user_id", "u.username")
    .where({ class_id: classId });
}

function joinClass(user_id, class_id) {
  return db("classes_to_users").insert({ user_id, class_id });
}

function leaveClass(user_id, class_id) {
  return db("classes_to_users").delete().where({ user_id, class_id });
}

function filterBy(filter) {
  return db("classes as c")
    .join("class_types as ct", "ct.id", "c.type_id")
    .join("users as u", "u.id", "c.instructor_id")
    .select(
      "c.id",
      "c.class_name",
      "ct.class_type",
      "u.username as instructor",
      "c.date",
      "c.time",
      "c.duration",
      "c.intensity",
      "c.location",
      "c.capacity"
    )
    .where(filter);
}
