const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => new Date(createdAt).toLocaleString()
    },
    username: {
      type: String,
      required: true
    },
    reactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reaction'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// Virtual to get the length of the thought's reactions array
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
