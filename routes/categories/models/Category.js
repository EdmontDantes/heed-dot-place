const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const CategorySchema = new mongoose.Schema({
  categoryName: { type: String, default: 'uncategorized' },
  categoryColor: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  timestamp: {
    type: String,
    default: () => moment().format('MMMM Do YYYY, h:mm:ss a'),
  },
});

module.exports = mongoose.model('Category', CategorySchema);