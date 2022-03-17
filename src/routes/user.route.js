const router = require("express").Router();

const User = require("../controllers/user.controller");

/**
 * @api {POSt} /User/addUser
 * @desc  Add User API
 * @access public
 * **/
router.post("/addUser", User.addUser);
/**
 * @api {POST} /User/loginUser
 * @desc  Login User API
 * @access public
 * **/
router.post("/loginUser", User.loginUser);
/**
 * @api {GET} /User/getUser
 * @desc  Get User API
 * @access public
 * **/
router.get("/getUser", User.getUser);
/**
* @api {GET} /User/getOneUser
* @desc  Get One User API
* @access public
* **/
router.get("/getOneUser/:_id", User.getOneUser);
/**
 * @api {PUT} /User/editUser
 * @desc  Edit User API
 * @access public
 * **/
router.put("/editUser/:_id", User.editUser);
/**
 * @api {DELETE} /User/deleteUser
 * @desc  Delete User API
 * @access public
 * **/
router.delete("/deleteUser/:_id", User.deleteUser);

module.exports = router;