const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./recipient");

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "user" },
  dateSent: Date,
  lastResponded: Date
});

mongoose.model("surveys", surveySchema);

// _user is refrence field very similar to foriegn key function