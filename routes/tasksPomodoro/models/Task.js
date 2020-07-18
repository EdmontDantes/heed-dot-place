const mongoose = require('mongoose');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const Schema = mongoose.Schema;

const TaskSchema = new mongoose.Schema({
  taskName: { type: String, required: true, default: 'Pomodoro Rocks'},
  taskDescription: { type: String, default: ''},
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  taskProjectBelongsTo: { type: Schema.Types.ObjectId, ref: 'Project' },
  image: { type: String, default: ''},
  pomodorosDone: { type: Number, default: 0},
  pomodoroShortBreakDone: { type: Number, default: 0},
  pomodoroLongBreakDone: { type: Number, default: 0},
  notes: { type: String, default: ''},
  project: { type: Schema.Types.ObjectId, ref: 'Project'},
  timestamp: {
    type: String,
    default: () => moment().format('MMMM Do YYYY, h:mm:ss a'),
  },
});

module.exports = mongoose.model('Task', TaskSchema);
