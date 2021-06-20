const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
  },

  img: {
    type: String,
    default: '',
  },

  teacher: {
    type: String,
    required: true,
  },
  prerequisite: {
    type: [String],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },

  review: [
    {
      student: {
        type: String,
      },
      star: {
        type: Number,
        default: null,
      },
      comment: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      studentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    },
  ],
  assignment: [
    {
      endDate: {
        type: String,
      },
      startDate: {
        type: Date,
        default: Date.now,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  enrolledStudent: {
    id: String,
    type: [String],
  },
});

module.exports = Course = mongoose.model('course', CourseSchema);
