const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const ProjectSchema = new mongoose.Schema({
  projectName: { type: String, required: true},
  projectIcon: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  tasks: [{
    task: { type: Schema.Types.ObjectId, ref: 'Task'}
  }],
  timestamp: {
    type: String,
    default: () => moment().format('MMMM Do YYYY, h:mm:ss a'),
  },
});

module.exports = mongoose.model('Project', ProjectSchema);
