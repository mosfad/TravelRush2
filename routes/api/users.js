const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const passport = require("passport");
// const jwt = require("jsonwebtoken");
// const keys = require("../config/keys");

// @route  GET api/users
// @desc   Tests users route
// @access Public
// router.route("/") Matches with "/api/users"
//  router.route("/signup") would match "/api/users/signup"
router.route("/").get(usersController.testAll);

// @route  POST api/users/register
// @desc   Register users route
// @access Public"
router.route("/register").post(usersController.createUser);

//@route  POST api/users/login
//@desc   Login User / Return JWT token
//@access Public
router.route("/login").post(usersController.findUser);

//@route  GET api/users/current
//@desc   Return current user(access to a protected route for the user)
//@access Private
router
  .route("/current")
  .get(
    passport.authenticate("jwt", { session: false }),
    usersController.getUserInfo
  );

//@route POST api/users/:id/addfavorite
//@desc Bookmark favorite search results to authd user's account
//@access...
router.route("/:id/addfavorite").post(usersController.updateFavorites);

//@route GET api/users/:id/getfavorite
//@desc Return authd user's favorite search results
//@acess...
router.route("/:id/getfavorite").get(usersController.getFavorites);

//@route PUT api/users/:id/removefavorite
//@desc Updates cached favorites by removing a favorite from user's account
//@access...
router.route("/:id/removefavorite").put(usersController.removeFavorite);

// router.get("/", (req, res) => {
//   res.json({ msg: "user router works, but the controller doesn't!" });
// });
//.post(usersController.createUser);

// Matches with "/api/users/:id"
// router
//   .route("/:id")
//   .get(usersController.findById)
//   .put(usersController.updateUser)
//   .delete(usersController.deleteUser);

module.exports = router;
