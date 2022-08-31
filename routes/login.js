const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
//const {displayErr} = require('../public/scripts/error');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

/*****************************
 * ERROR VARIABLES FOR RENDERING THE ERROR ON SCREEN
*****************************/
const renderErr = false;

/*****************************
 * FOR RENDERING LOGIN PAGE
*****************************/
router.get('/', (req, res) => {
  const user_id = req.session.user_id;

  const templateVars = {
    user: user_id
  }
  res.render('login',templateVars);
});

/*****************************
 * /LOGIN ROUTE (for logining in)
*****************************/
router.post('/', (req,res) => {
  console.log('req',req.body);
  const uName = req.body.uname;
  const password = req.body.password;
  // const password = req.body.password;

  userQueries.findUserName(uName).then((result) => {

    const dbUser = result[0];

    if(!dbUser) {
      // use jquery to ourput error
      //res.status(403).send('not correct');
      res.status(403).send(' Wrong user name or password');
      return;
    }else {
      if(bcrypt.compareSync(password,dbUser.password)) {
        req.session.user_id = dbUser.username;
        res.status(201).send('SUCCESS');
      }else {
        res.status(403).send(' Wrong password');
        return;
      }
    }
  });

  //need function find email

  //need to compare password and email in data base
  //if it is in database then create the cookie and redirect to home page
});

module.exports = router;
