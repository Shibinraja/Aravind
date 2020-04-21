const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
  longUrl: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String
  },
  count: {
    type: Number,
    default: 0
  },
  urlcode :{
    type : String,
  }
})

const urlModel = mongoose.model('urlShort', urlSchema);

module.exports = {
  urlModel
};
