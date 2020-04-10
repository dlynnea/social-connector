const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');
const normalize = require('normalize-url');

const multer = require('multer');
const mongoose = require('mongoose');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// multer img upload
const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg, and .jpeg format allowed'))
        }
    }
})
//

// get current user profile

router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            'user',
            ['name', 'avatar']);

        if(!profile) {
            return res.status(400).json({ msg: 'No profile for this user' })
        }
        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
});

// create/update users profile

//old code 
// router.post('/', [ auth, [
//     check('status', 'Status is required')
//     .not()
//     .isEmpty(),
//     check('skills', 'Skills are required')
//     .not()
//     .isEmpty()
//     ]
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if(!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const {
//         company,
//         website,
//         location,
//         bio,
//         status,
//         githubusername,
//         skills,
//         youtube,
//         linkedin,
//         twitter,
//         instagram,
//         facebook
//     } = req.body;

//     profileFields.user = req.user.id;

//     if(company) profileFields.company = company;
//     if(website) profileFields.website = website;
//     if(location) profileFields.location = location;
//     if(bio) profileFields.bio = bio;
//     if(status) profileFields.status = status;
//     if(githubusername) profileFields.githubusername = githubusername;
//     if(skills) {
//         profileFields.skills = skills.split(',').map(skill => skill.trim());
//     }

//     profileFields.social = {};
//     if(youtube) profileFields.social.youtube = youtube;
//     if(twitter) profileFields.social.twitter = twitter;
//     if(linkedin) profileFields.social.linkedin = linkedin;
//     if(instagram) profileFields.social.instagram = instagram;
//     if(facebook) profileFields.social.facebook = facebook;

//     try {
//         let profile = await Profile.findOne({ user: req.user.id });
//         if (profile) {
//             profile = await Profile.findOneAndUpdate(
//                 { user: req.user.id }, 
//                 { $set: profileFields },
//                 { new: true }
//             );
//             return res.json(profile);
//         }

//         profile = new Profile(profileFields);
//         await profile.save();
//         res.json(profile);
//     } catch(err) {
//         console.error(err.message)
//         res.status(500).send('Server error')
//     }
// })
// old^

//new create profile code:

router.post('/', [ auth, [
        check('status', 'Status is required')
          .not()
          .isEmpty(),
        check('skills', 'Skills is required')
          .not()
          .isEmpty()
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        company,
        location,
        website,
        bio,
        skills,
        status,
        githubusername,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook
      } = req.body;
  
      const profileFields = {
        user: req.user.id,
        company,
        location,
        website: website === '' ? '' : normalize(website, { forceHttps: true }),
        bio,
        skills: Array.isArray(skills)
          ? skills
          : skills.split(',').map(skill => ' ' + skill.trim()),
        status,
        githubusername
      };
  
      // Build social object and add to profileFields
      const socialfields = { youtube, twitter, instagram, linkedin, facebook };
  
      for (const [key, value] of Object.entries(socialfields)) {
        if (value.length > 0)
          socialfields[key] = normalize(value, { forceHttps: true });
      }
      profileFields.social = socialfields;
  
      try {
        // Using upsert option (creates new doc if no match is found):
        let profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true, upsert: true }
        );
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );



//get all profiles 

router.get('/', async(req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

//get one profile

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id}).populate('user', 
        ['name', 'avatar']);

        if (!profile) return res.status(400).json({ msg: 'Profile not found'});

        res.json(profile)
    } catch(err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found'});
        }
        res.status(500).send('Server Error')
    }
});

//delete user and profile

router.delete('/', auth, async (req, res) => {
    try {
        await Post.deleteMany({ user: req.user.id });

        await Profile.findOneAndRemove({ user: req.user.id});
        await User.findOneAndRemove({ _id: req.user.id});

        res.json({ msg: 'User has been deleted'})
    } catch(err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found'});
        }
        res.status(500).send('Server Error')
    }
});

// add profile experience

router.put('/experience', [ auth, 
    [
    check('title', 'Title is required')
    .not()
    .isEmpty(),
    check('company', 'Company is required')
    .not()
    .isEmpty(),
    check('from', 'From date is required')
    .not()
    .isEmpty(),
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile)
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// delete experience

router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
        const removeIndex = profile.experience.map(item => item.id)
        .indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);

        await profile.save();
        res.json(profile)
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// add education

router.put('/education', [ auth, 
    [
    check('school', 'School is required')
    .not()
    .isEmpty(),
    check('degree', 'Degree is required')
    .not()
    .isEmpty(),
    check('fieldofstudy', 'Field of study is required')
    .not()
    .isEmpty(),
    check('from', 'From date is required')
    .not()
    .isEmpty(),
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.education.unshift(newEdu);

        await profile.save();

        res.json(profile)
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// delete education

router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
        const removeIndex = profile.education.map(item => item.id)
        .indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);

        await profile.save();
        res.json(profile)
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// user repos from github

router.get('/github/:username', (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        };

        request(options, (error, response, body) => {
            if(error) console.error(error);

            if(response.statusCode !== 200) {
                return res.status(404).json({ msg: 'No Github Profile Found' })
            }
            res.json(JSON.parse(body));
        })
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router;