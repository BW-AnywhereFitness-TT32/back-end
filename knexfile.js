module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true, // needed for sqlite
    connection: {
      filename: "./database/anywhere_fitness.db3",
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
    // needed when using foreign keys
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
      },
    },
  },
};
