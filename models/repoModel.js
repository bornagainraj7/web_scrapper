const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RepoModel = new Schema({
  title: {
    type: String,
    required: true
  },
  username: String,
  programmingLanguage: String,
  url: String,
  tags: [String],
  lastUpdate: Date
});

module.exports = mongoose.model("Repo", RepoModel);
