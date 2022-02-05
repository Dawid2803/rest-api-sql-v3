const express = require("express");
const User = require('./models').User;
const router = express.Router();

//async handler for requests
const asyncHandler = (cb) => {
    return async (req, res, next) => {
      try {
        await cb(req, res, next);
      } catch (error) {
        // Forward error to the global error handler
        next(error);
      }
    }
  };
  

// return all values for current authenticated user
// TODO create authentication middleware
//  change findAll to findOne once auth is implemented
router.get('/users', asyncHandler(async (req,res) => {

    const user = await User.findAll();
    res.json({ user })
}));

// create new user
router.post('/users', asyncHandler(async (req,res) => {
    const user = await User.create(req.body);

    res.status(201).json({ "message": "User successfully created" });
}))

//return a list of courses
router.get('/courses', asyncHandler(async (req, res) => {
    
    res.json({
        name: 'test courses',
    })
}));

//return a specific course
router.get('/courses/:id', asyncHandler(async (req, res) => {

    res.json({
        name: 'test specific course'
    })
}))

// create a new course
router.post('/courses', asyncHandler(async (req, res) => {

    res.json({
        name: 'test post course'
    })
}))

// update a course
router.post('/courses/:id', asyncHandler(async (req, res) => {

    res.json({
        name: 'test specific course update'
    })
}))

// delete a course
router.delete('/courses/:id', asyncHandler(async (req, res) => {

    res.json({
        name: ' test delete specific course'
    })
}))

module.exports = router;