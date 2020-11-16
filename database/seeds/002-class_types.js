exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("class_types")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("class_types").insert([
        { class_type: "hot yoga" },
        { class_type: "weight training" },
        { class_type: "RIPPED" },
        { class_type: "elite endurance" },
        { class_type: "booty blaster" },
        { class_type: "water polo" },
      ]);
    });
};
