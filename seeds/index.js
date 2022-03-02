const seedUsers = require("./users");
const seedPosts = require("./posts");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("--------------Starting to seed--------------");

  await seedUsers();
  console.log("--------------Users seeded--------------");

  await seedPosts();
  console.log("--------------Posts seeded--------------");

  process.exit(0);
};

seedAll();
