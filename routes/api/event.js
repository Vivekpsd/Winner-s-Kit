const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Event = require('../../models/Event');

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Auth-Token, Content-Type,Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
//All course

//CourseDetails

// @route    POST api/course
// @desc     Create or update Course
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Course Title is Required').not().isEmpty(),
      check('description', 'Description name is Required').not().isEmpty(),
      check('startDate', 'Start date of course is Required').not().isEmpty(),
      check('endDate', 'Ending date of course is Required').not().isEmpty(),
      check('link', 'Event link is Required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, startDate, endDate, link } = req.body;

    //Build Course Object
    const eventFields = {};

    if (title) eventFields.title = title;
    if (description) eventFields.description = description;
    if (startDate) eventFields.startDate = startDate;
    if (endDate) eventFields.endDate = endDate;
    if (link) eventFields.link = link;

    try {
      // //   let event = await Event.findById();

      //   if (course) {
      //     //update
      //     course = await Course.findOneAndUpdate(
      //       { _id: courseID },
      //       { $set: courseFields },
      //       { new: true }
      //     );
      //     return res.json(course);
      //   }
      //Create
      let event = new Event(eventFields);
      await event.save();
      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(400).send('Server Error');
    }
  }
);

// @route    GET api/course
// @desc     Get all Course
// @access   Public

router.get('/', async (req, res) => {
  try {
    const event = await Event.find();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// // @route    GET api/course/course/:course_id
// // @desc     Get course by course ID
// // @access   Public

router.get('/id/:event_id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.event_id);

    if (!event)
      return res
        .status(400)
        .json({ msg: 'There is no event with this course ID' });
    res.json(event);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res
        .status(400)
        .json({ msg: 'There is no course with this event ID' });
    }
    res.status(500).send('Server Error');
  }
});

// // @route    DELETE api/course
// // @desc     DELETE course
// // @access   Private

router.delete('/:event_id', auth, async (req, res) => {
  try {
    //Remove Event
    await Event.findByIdAndRemove(req.params.event_id);
    res.json({ msg: 'Event Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// // @route    PUT api/course/enroll
// // @desc     Add enrolled student in Courses
// // @access   Private
// router.put('/enroll/:course_id', auth, async (req, res) => {
//   const courseID = req.params.course_id;
//   const user = req.user.id;

//   try {
//     let course = await Course.findById(courseID);
//     if (course) {
//       // const enrollCheck = course.enrolledStudent.forEach((student) => {
//       //   student === user && true;
//       // });

//       // if (enrollCheck !== true) {
//       course.enrolledStudent.unshift(user);
//       await course.save();
//       //}
//     }

//     res.json(course);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // @route    PUT api/course/review
// // @desc     Add  message
// // @access   Private
// router.put('/course-review', auth, async (req, res) => {
//   const { star, comment, date, courseID, studentID, student } = req.body;
//   const userID = req.user.id;
//   const newReview = {
//     star,
//     comment,
//     date,
//     studentID,
//     student,
//   };

//   try {
//     let course = await Course.findById(courseID);

//     if (course) {
//       course.review.unshift(newReview);
//       await course.save();
//     }

//     res.json(course);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// router.delete('/delete/:course_id/:review_id', async (req, res) => {
//   try {
//     const courseID = req.params.course_id;
//     const reviewID = req.params.review_id;

//     let course = await Course.findById(courseID);
//     course.review.map(async (review) => {
//       if (review._id == reviewID) {
//         await course.review.remove({ _id: reviewID });
//         await course.save();
//       }
//     });

//     res.json({ msg: 'Course Review Deleted' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

module.exports = router;
