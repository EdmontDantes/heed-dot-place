const mongoose = require('mongoose');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

const TaskSchema = new mongoose.Schema({
  TaskName: { type: String, required: true, default: 'Pomodoro Rocks'},
  description: { type: String, default: ''},
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  image: { type: String, default: ''},
  pomodoro: [{ 
    id: { type: String, default: uuidv4()},
    pomodorosDone: { type: Number, default: 0},
    pomodoroShortBreakDone: { type: Number, default: 0},
    pomodooroLongBreakDone: { Type: Number, default: 0},
    timestamp: {
      type: String,
      default: () => moment().format('MMMM Do YYYY, h:mm:ss a'),
    }
  }],
  project: { type: Schema.Types.ObjectId, ref: 'Project'},
  timestamp: {
    type: String,
    default: () => moment().format('MMMM Do YYYY, h:mm:ss a'),
  },
});

module.exports = mongoose.model('Task', UserSchema);
