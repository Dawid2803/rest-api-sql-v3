const express = require("express");
const { authenticateUser } = require("./auth_user");
const User = require('./models').User;
const Course = require('./models').Course;
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
  
// Helper function for updating courses

async function updateCourse(newCourse){
    const courses = await Course.findAll();
    let course = courses.find(course => course.id == newCourse.id );


    await course.update({ 
        title: newCourse.title,
        description: newCourse.description,
        userId: newCourse.userId    
    });

}


// return all values for current authenticated user

router.get('/users',authenticateUser ,asyncHandler(async (req,res) => {
    const user = req.currentUser;

    res.json({ user })
}));

// create new user then redirect to home page
router.post('/users', asyncHandler(async (req,res) => {
    const user = await User.create(req.body);
    res.location("/").
    status(201);
}))

//return a list of courses
router.get('/courses', asyncHandler(async (req, res) => {

    const courses = await Course.findAll();
    res.json({ courses });
}));

//return a specific course
router.get('/courses/:id', asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);

    res.json({ course });
}))

// create a new course
router.post('/courses',authenticateUser ,asyncHandler(async (req, res) => {
    const course = await Course.create(req.body);
    res.location("/").
    status(201).end();
}))

// update a course TODO:
router.put('/courses/:id',authenticateUser, asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    if(course){
        course.title = req.body.title,
        course.description = req.body.description,
        course.userId = req.body.userId

        await updateCourse(course)
        //course.estimatedTime = req.body.estimatedTime,
        //course.materialsNeeded = req.body.materialsNeeded,
        res.status(204).end();
    }


   
}))

// delete a course
router.delete('/courses/:id',authenticateUser, asyncHandler(async (req, res) => {
    //const course = await Course.findByPk(req.params.id);
    await Course.destroy({where: {
        "id": req.params.id
    }});
    res.status(204).end();
}))



module.exports = router;