const db = require("../database/db-config.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  fetchRoles,
  fetchAllPunchcards,
  fetchPunchcard,
  punchcardAdd,
};

function find() {
  return db("users as u")
    .join("roles as r", "r.id", "u.role_id")
    .select("u.id", "u.username", "u.email", "r.role_name as role")
    .orderBy("u.id");
}

function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
  return db("users").where({ id }).first();
}

function fetchRoles() {
  return db("roles");
}

function fetchAllPunchcards(user_id) {
  return db("punchcard").where({ user_id });
}

function fetchPunchcard(user_id, type_id) {
  return db("punchcard").where({ user_id, type_id }).first();
}

async function punchcardAdd(user_id, type_id) {
  const newPunch = await fetchPunchcard(user_id, type_id);
  if (!newPunch) {
    console.log("making a new card");
    return db("punchcard")
      .insert({ user_id, type_id, classes_attended: 1 })
      .then(() => fetchPunchcard(user_id, type_id));
  } else {
    console.log("updating an old card");
    return db("punchcard")
      .where({ user_id, type_id })
      .update({
        ...newPunch,
        classes_attended: newPunch.classes_attended + 1,
      })
      .then(() => fetchPunchcard(user_id, type_id));
  }
}
