const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    //  ADD USER
    addUser(req, res) {
        if (
            !req.body.name ||
            !req.body.email ||
            !req.body.password
        ) {
            return res.status(400).send({
                message: "Please Provide Required Field",
            });
        }
        userModel.find({ email: req.body.email }).exec((err, result) => {
            if (err) {
                console.log("Error", err);
            } else {
                if (result.length > 0) {
                    return res.send({
                        message: "Already Use These Email"
                    });
                } else {
                    let user = new userModel(req.body);

                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) {
                            console.log("Error", err);
                        } else {
                            bcrypt.hash(user.password, salt, (err, hash) => {
                                if (err) {
                                    console.log("Error", err);
                                } else {
                                    user.password = hash;

                                    user.save((err, result) => {
                                        if (err) {
                                            console.log("Error", err);
                                        } else {
                                            console.log("User Data Added Successfully", result);

                                            return res.status(200).send({
                                                message: "Add User",
                                                status: true,
                                                data: result
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    },
    // LOGIN USER
    loginUser: async (req, res) => {
        try {
            userModel.findOne({ email: req.body.email }, (err, user) => {
                if (err) return res.status(400).send({
                    status: false,
                    message: 'Please try after some time'
                });
                if (!user) return res.status(400).send({
                    status: false,
                    message: 'You are not registered!',
                })
                bcrypt.compare(req.body.password, user.password, (err, data) => {
                    if (!data) return res.status(400).send({
                        status: false,
                        message: 'Wrong password!'
                    })
                    else return res.status(200).send({
                        status: true,
                        token: jwt.sign({ email: user.email, _id: user._id }, "secret", {}),
                        data: user,
                    });
                })
            })
        } catch (error) {
            return res.status(500).send({
                message: "Internal server error",
                status: false
            })
        }
    },
    // GET ALL USER
    getUser: (req, res) => {
        userModel.find({}).exec((err, result) => {
            if (err) {
                return res.status(400).json({ err });
            } else {
                return res.status(400).json({ result });
            }
        });
    },
    // GET ONE USER
    getOneUser: async (req, res) => {
        try {
            let getOneUser = await userModel.findOne({
                _id: req.params._id,
            });
            if (!getOneUser) {
                return res.status(400).send({
                    message: "No Record Found",
                });
            } else {
                return res.status(200).send({
                    message: "Sucess",
                    data: getOneUser,
                });
            }
        } catch (error) {
            return res.status(400).send({
                message: "Something Went Wrong",
                status: false,
            });
        }
    },
    // EDIT USER
    editUser: async (req, res) => {
        try {
            let updateUser = await userModel.findOneAndUpdate(
                { _id: req.params._id },
                {
                    $set: req.body,
                },
                { new: true }
            );

            if (!updateUser) {
                return res.status(400).send({
                    message: "No Record Found",
                    status: false,
                });
            }

            return res.status(200).send({
                message: "Record Edit Successfully",
                status: true,
                data: updateUser,
            });
        } catch (error) {
            return res.status(400).send({
                message: "Please Enter A Valid Details",
                status: false,
                error: error,
            });
        }
    },
    //  DELETE USER
    deleteUser: async (req, res) => {
        try {
            let deleteUser = await userModel.findOneAndDelete({
                _id: req.params._id,
            });

            if (!deleteUser) {
                return res.status(400).send({
                    message: "No Record Found",
                    status: false,
                });
            } else {
                return res.status(200).send({
                    message: "Record Deleted Successfully",
                    status: true,
                    data: deleteUser,
                });
            }
        } catch (error) {
            return res.status(400).send({
                message: "Please Enter A Valid Details",
                status: false,
            });
        }
    }
}