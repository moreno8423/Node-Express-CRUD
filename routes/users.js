const express = require('express');
const router = express.Router();
const  User  = require('../models/User');

// Route to  the adding a User Form
router.get('/add', (req, res)=>{
    res.render('users/add');

});

//Route to the List of users
// We use JavaScript promises for most users requests
router.get('/list', async (req, res)=>{
    let users = await User.find();
    res.render('users/list', {
        users: users
    });

});

//Creating a new User with a Post Request 
// We use the .save() function to save the user
router.post('/add', async (req, res)=>{
    
    
    let newUser = await User.create({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        age: req.body.age,
        gender: req.body.gender
    });

    newUser.save();
    res.redirect('/users/list');
})

//Get the Route to the Update Form

router.get('/edit/:id', async (req, res)=>{

    let user = await User.findById(req.params.id); 
    res.render('users/edit', {
        user: user
    });

});

//Updating user using a Post Request
//We can update a user using a put request. 
// It's eeasier with a Post request because 
//we do not have to modify the method of the form
 
router.post('/edit/:id', async (req, res)=>{
    let user = await User.findById(req.params.id); 
    await user.updateOne({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        gender: req.body.gender,
        age: req.body.age,
    });
    res.redirect('/users/list');
});

//Delete user using a Post Request
//We can delete a user using a delete request. 
// It's eeasier with a Post request because 
//we do not have to modify the method of the form

router.post('/delete/:id', async (req, res)=>{
    
    //let users = await User.findById(req.params.id).lean();
    await User.deleteOne({ _id: req.params.id });
 

    res.redirect('/users/list');

});


module.exports = router;
