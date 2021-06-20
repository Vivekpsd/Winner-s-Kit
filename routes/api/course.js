const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Course = require('../../models/Course');
const Profile = require('../../models/Profile');
const { request } = require('express');
const upload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
router.use(upload());

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
      check('teacher', 'Teacher Name is Required').not().isEmpty(),
      check('title', 'Course Title is Required').not().isEmpty(),
      check('description', 'Description name is Required').not().isEmpty(),
      check('content', 'Course Content is required').not().isEmpty(),
      check('startDate', 'Start date of course is Required').not().isEmpty(),
      check('endDate', 'Ending date of course is Required').not().isEmpty(),
      check('prerequisite', 'Prerequisite is Required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      teacher,
      title,
      description,
      content,
      startDate,
      endDate,
      prerequisite,
      courseID,
      img,
      price,
    } = req.body;

    //Build Course Object
    const courseFields = {};
    if (teacher) courseFields.teacher = teacher;
    if (title) courseFields.title = title;
    if (content) courseFields.content = content;
    if (description) courseFields.description = description;
    if (startDate) courseFields.startDate = startDate;
    if (endDate) courseFields.endDate = endDate;
    if (prerequisite) courseFields.prerequisite = prerequisite;

    if (price) courseFields.price = price.toString();

    try {
      let course = await Course.findById(courseID);

      if (course) {
        //update
        course = await Course.findOneAndUpdate(
          { _id: courseID },
          { $set: courseFields },
          { new: true }
        );
        return res.json(course);
      }
      //Create
      if (img) courseFields.img = img;
      course = new Course(courseFields);
      await course.save();
      res.json(course);
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
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/course/course/:course_id
// @desc     Get course by course ID
// @access   Public

router.get('/id/:course_id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.course_id);

    if (!course)
      return res
        .status(400)
        .json({ msg: 'There is no course with this course ID' });
    res.json(course);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res
        .status(400)
        .json({ msg: 'There is no course with this course ID' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/course
// @desc     DELETE course
// @access   Private

router.delete('/:course_id', auth, async (req, res) => {
  try {
    //Remove Course
    await Course.findByIdAndRemove(req.params.course_id);
    res.json({ msg: 'Course Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/course/enroll
// @desc     Add enrolled student in Courses
// @access   Private
router.put('/enroll/:course_id', auth, async (req, res) => {
  const courseID = req.params.course_id;
  const user = req.user.id;

  try {
    let course = await Course.findById(courseID);
    if (course) {
      // const enrollCheck = course.enrolledStudent.forEach((student) => {
      //   student === user && true;
      // });

      // if (enrollCheck !== true) {
      course.enrolledStudent.unshift(user);
      await course.save();
      //}
    }

    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/course/review
// @desc     Add  message
// @access   Private
router.put('/course-review', auth, async (req, res) => {
  const { star, comment, date, courseID, studentID, student } = req.body;
  const userID = req.user.id;
  const newReview = {
    star,
    comment,
    date,
    studentID,
    student,
  };

  try {
    let course = await Course.findById(courseID);

    if (course) {
      course.review.unshift(newReview);
      await course.save();
    }

    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/delete/:course_id/:review_id', async (req, res) => {
  try {
    const courseID = req.params.course_id;
    const reviewID = req.params.review_id;

    let course = await Course.findById(courseID);
    course.review.map(async (review) => {
      if (review._id == reviewID) {
        await course.review.remove({ _id: reviewID });
        await course.save();
      }
    });

    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/course/upload-assignment
// @desc     Add  assignment
// @access   Private

router.post('/upload-assignment-info/:courseID', async (req, res) => {
  const { title, startDate, endDate, description } = req.body;
  const courseID = req.params.courseID;
  //console.log(courseID);
  //console.log(title);
  const newAssignment = {
    title,
    startDate,
    endDate,
    description,
  };

  try {
    let course = await Course.findById(courseID);

    if (course) {
      course.assignment.unshift(newAssignment);
      await course.save();
    } else {
      console.log('No Course');
    }

    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Uploading Image while creating course
router.post('/courseimg/:courseID', async (req, res) => {
  console.log('img uploading');
  if (req.files) {
    var file = req.files.file;
    var filename = file.name;
    var courseID = req.params.courseID;
    var paths = path.join(
      __dirname + '\\..' + '\\..',
      '/client',
      '/public',
      '/courses'
    );
    console.log(paths + '--');

    file.mv(`${paths}/` + filename, async function (err) {
      if (err) {
        res.send(err);
      } else {
        let course = await Course.findById(courseID);
        if (course) {
          //update
          course = await Course.findOneAndUpdate(
            { _id: courseID },
            { img: filename },
            { new: true }
          );
          course.save();
          res.send(course);
        }
      }
    });
  } else {
    console.log('No Image');
  }
});

module.exports = router;
