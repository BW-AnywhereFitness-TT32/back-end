exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (roles) => {
      roles.increments();
      roles.string("role_name", 255).notNullable().unique();
    })
    .createTable("class_types", (types) => {
      types.increments();
      types.string("class_type", 255).notNullable().unique();
    })
    .createTable("users", (users) => {
      users.increments();
      users.string("username", 255).notNullable().unique();
      users.string("email", 255).notNullable().unique();
      users.string("password", 255).notNullable();
      users
        .integer("role_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("roles")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("classes", (classes) => {
      classes.increments();
      classes.string("class_name", 255).notNullable();
      classes
        .integer("type_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("class_types")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      classes
        .integer("instructor_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      classes.date("date").notNullable();
      classes.time("time").notNullable();
      classes.string("duration", 255).notNullable();
      classes.integer("intensity").notNullable().unsigned();
      classes.string("location", 1024).notNullable();
      classes.integer("capacity").notNullable().unsigned();
    })
    .createTable("classes_to_users", (ctu) => {
      ctu.increments();
      ctu
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      ctu
        .integer("class_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("classes")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("punchcard", (pc) => {
      pc.increments();
      pc.integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      pc.integer("type_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("class_types")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      pc.integer("classes_attended").notNullable().unsigned();
    });
};

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTableIfExists("punchcard")
    .dropTableIfExists("classes_to_users")
    .dropTableIfExists("classes")
    .dropTableIfExists("users")
    .dropTableIfExists("class_types")
    .dropTableIfExists("roles");
};
