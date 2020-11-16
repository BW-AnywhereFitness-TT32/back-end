exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("classes_to_users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("classes_to_users").insert([
        { user_id: 3, class_id: 1 },
        { user_id: 2, class_id: 1 },
        { user_id: 1, class_id: 2 },
      ]);
    });
};
