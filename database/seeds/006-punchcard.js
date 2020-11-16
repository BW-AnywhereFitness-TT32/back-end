exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("punchcard")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("punchcard").insert([
        { user_id: 1, type_id: 1, classes_attended: 2 },
        { user_id: 2, type_id: 1, classes_attended: 4 },
        { user_id: 1, type_id: 2, classes_attended: 11 },
        { user_id: 2, type_id: 2, classes_attended: 2 },
        { user_id: 3, type_id: 2, classes_attended: 8 },
      ]);
    });
};
