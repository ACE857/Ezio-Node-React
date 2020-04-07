const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipentSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

module.exports = recipentSchema;
