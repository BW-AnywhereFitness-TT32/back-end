exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "Justin",
          email: "justin@gym.com",
          password:
            "$2a$08$PDobdDFfdcJMByfhLRwDWu0lHLbhEcqZv9HsnaoHNJ0Hgh.XDAZHu",
          role_id: 1,
        },
        {
          username: "Victoria-a",
          email: "vic1@gym.com",
          password:
            "$2a$08$PDobdDFfdcJMByfhLRwDWu0lHLbhEcqZv9HsnaoHNJ0Hgh.XDAZHu",
          role_id: 1,
        },
        {
          username: "Victoria-i",
          email: "vic2@gym.com",
          password:
            "$2a$08$PDobdDFfdcJMByfhLRwDWu0lHLbhEcqZv9HsnaoHNJ0Hgh.XDAZHu",
          role_id: 2,
        },
        {
          username: "Victoria-c",
          email: "vic3@gym.com",
          password:
            "$2a$08$PDobdDFfdcJMByfhLRwDWu0lHLbhEcqZv9HsnaoHNJ0Hgh.XDAZHu",
          role_id: 3,
        },
      ]);
    });
};
