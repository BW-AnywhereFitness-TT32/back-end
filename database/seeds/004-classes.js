exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("classes")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("classes").insert([
        {
          class_name: "Socially Distanced Yoga in the Park with Coach J",
          type_id: 1,
          instructor_id: 1,
          date: "2020-11-28",
          time: "12:30",
          duration: "1 Hour",
          intensity: 2,
          location: "Central Park",
          capacity: 24,
        },
        {
          class_name: "Weights with Coach Victoria",
          type_id: 2,
          instructor_id: 3,
          date: "2020-11-16",
          time: "1:45",
          duration: "1.5 Hours",
          intensity: 1,
          location: "The Middle of Nowhere",
          capacity: 20,
        },
        {
          class_name: "Covid free Endurance Training with Coach Justin",
          type_id: 4,
          instructor_id: 1,
          date: "2020-11-16",
          time: "1:45",
          duration: "1.5 Hours",
          intensity: 3,
          location: "The Middle of Nowhere",
          capacity: 16,
        },
      ]);
    });
};
