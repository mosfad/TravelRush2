const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Defining methods for the booksController
module.exports = {
  testAll: function(req, res) {
    res.json({ msg: "The user controller works." });
  },

  //This method handles the login request.
  findUser: function(req, res) {
    const { email, password } = req.body;
    const { errors, isValid } = validateLoginInput(req.body);
    // Perform initial validation on user inputs for login
    if (!isValid) {
      return res.status(400).json({ errors, isValid });
    }

    db.User.findOne({ email })
      .then(dbUser => {
        if (!dbUser) {
          errors.email = "User not found";
          return res.json({ email: errors.email });
        }
        //Check Password.
        bcrypt.compare(password, dbUser.password).then(isMatch => {
          if (isMatch) {
            //User Matched(Set the info(use payload) the user can get from the jwt token)
            const payload = {
              id: dbUser._id,
              name: dbUser.name,
              email: dbUser.email
            };
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: "1h" },
              (err, token) => {
                res.json({ success: true, token: "Bearer " + token });
              }
            );
            //res.json({ msg: "Success" });
          } else {
            errors.password = "Password is incorrect";
            return res.json({ password: errors.password });
          }
        });
      })
      .catch(err => res.status(422).json(err));
  },

  //This method handles signing up/registering users.
  createUser: function(req, res) {
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check Validation on user inputs during registration
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { name, email, password, address } = req.body;

    //check whether email is in the database.
    db.User.findOne({ email: email })
      .then(dbUser => {
        if (dbUser) {
          //email already exist in the database, so send appropriate message.

          errors.email = "Email already exists";
          return res.json({ email: errors.email });
        }

        //save the new user
        const newUser = new db.User({
          name: name,
          email: email,
          password: password,
          address: address
        });
        // console.log("TEST");

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.log(err);
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                //create favorites model to hold user's favs.
                const newFav = new db.Favorite();
                newFav.owner = user._id;
                //save favorite model with user's id.
                newFav
                  .save()
                  .then(favorite => {})
                  .catch(err => console.log(err));
                res.json({
                  Success: true,
                  msg: "Account successfully created."
                });
              })
              .catch(err => console.log(err));
          });
        });
      })
      .catch(err =>
        res.status(422).send("mongoose error: Error in findOne() block")
      );
  },

  //Get auth user's info.
  getUserInfo: function(req, res) {
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    });
  },

  //update favorites for a specific user
  updateFavorites: function(req, res) {
    const { owner, category, name, url, price, distance, location } = req.body;

    db.Favorite.findOneAndUpdate(
      { owner: owner },
      {
        $addToSet: {
          [category]: {
            name: name,
            url: url,
            price: price,
            distance: distance,
            location: location
          }
        }
      },
      { new: true }
    )
      .then(favorites => {})
      .catch(err => console.log(err));
  },

  //populate user with corresponding favorites
  getFavorites: function(req, res) {
    db.Favorite.findOne({ owner: req.params.id })
      .then(dbFave => {
        res.json(dbFave);
      })
      .catch(err => console.log(err));
  },

  //delete favorites for a specific user
  removeFavorite: function(req, res) {
    const { owner, category, name, location } = req.body;
    db.Favorite.findOneAndUpdate(
      { owner: owner },
      {
        $pull: {
          [category]: {
            name: name,
            location: location
          }
        }
      },
      { new: true }
    )
      .then(fav => {
        res.status(200).send("Favorite was successfully removed...");
      })
      .catch(err => console.log(err));
  }
};
