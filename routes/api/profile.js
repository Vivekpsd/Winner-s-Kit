const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private

//router.get('/test', auth, (req, res) => res.json({ msg: 'Profile Works' }));

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Auth-Token, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar', 'role', 'email']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private

router.post(
  '/',
  [auth, [check('skills', 'Skills are required').notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      skills,
      bio,
      githubusername,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body;

    // // build a profile
    const profileFields = {};
    profileFields.user = req.user.id;
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }

    // // Build socialFields object
    profileFields.social = {};

    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      //create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', [
      'name',
      'avatar',
      'role',
      'email',
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar', 'role', 'email']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    DELETE api/profile
// @desc     DELETE Profile, User
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    //Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove User
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/profile/msg
// @desc     Add  message
// @access   Private
router.put(
  '/message',
  [
    auth,
    [
      check('message', 'Write a Message').not().notEmpty(),
      check('sentBy', 'Write Sender name').not().notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message, sentBy, typeMsg } = req.body;
    const senderID = req.user.id;
    const newMsg = {
      message,
      sentBy,
      senderID,
    };

    if (typeMsg.length == 0) {
      try {
        Profile.find({}, (err, profile) => {
          if (err) {
            console.log('Error :(');
          }

          profile.map(async (profile) => {
            profile.messages.unshift(newMsg);
            await profile.save();
          });
        });

        res.json('Completed');
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    } else {
      try {
        let course = await Course.findById(typeMsg);
        course.enrolledStudent.map(async (enrolledStudent) => {
          const profile = await Profile.findOne({
            user: enrolledStudent,
          });
          profile.messages.unshift(newMsg);
          await profile.save();
        });

        res.json('Completed');
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  }
);

// @route    PUT api/profile/Enroll
// @desc     Add Enrolled Course to Profile
// @access   Private
router.put('/enroll/:id', auth, async (req, res) => {
  const user = req.body.userID;
  const courseID = req.body.courseID;
  console.log('user- ' + user + ' course ' + courseID);
  try {
    const profile = await Profile.findById(user);
    console.log(profile);
    // const enrollCheck = profile.enrolledCourse.forEach((course) => {
    //   course === courseID ? true : false;
    // });
    //if (enrollCheck) {
    profile.enrolledCourse.unshift(courseID);
    await profile.save();
    //}

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//--------------------------------------TODO------------------------------------
// @route    PUT api/profile/enrolled
// @desc     ADD Profile Enrolled Courses
// @access   Private
// router.put('/courses', auth, async (req, res) => {

//   const newCourse = {
//     title,
//     ...
//   }
//   try {
//     const profile = await Profile.findOne({ user: req.user.id });

//     profile.enrolledCourse(newCourse);
//     await profile.save();
//   } catch (error) {}
// });

module.exports = router;
