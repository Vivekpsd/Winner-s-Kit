const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  enrolledCourse: {
    type: [String],
  },
  assignment: {
    type: [String],
  },
  notification: {
    type: [String],
  },
  skills: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  githubusername: {
    type: String,
  },
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
    },
  ],
  messages: [
    {
      message: {
        type: String,
        required: true,
      },
      sentBy: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      senderID: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
