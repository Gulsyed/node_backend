const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    db: "mongodb://localhost:27017/assignment-development",
  }
};

module.exports = config[env];
