// Importamos JSON Web Token, bcryptjs y promisefy
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const promisify = require("util");

// Llamamos al modulo de conexion de la base de datos
const connection = require("../database/db");


// Creamos sistema de registro de usuario
exports.register = async (req, res) => {
    try {
        const user = req.body.user;
        const email = req.body.email;
        const pass = req.body.pass;
        const passHash = await bcryptjs.hash(pass, 8);

        if (!user || !email || !pass) {
            res.render("sign-up", {
                alert: true,
                alertTitle: "Attention",
                alertText: "¡All fields must be completed!",
                alertIcon: "error",
                alertShowConfirmButton: true,
                alertTimer: false,
                alertRuta: "sign-up"
            })
        } else {
            connection.query("INSERT INTO users SET ?", { user: user, email: email, pass: passHash }, (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    res.render("sign-up", {
                        alert: true,
                        alertTitle: "Success",
                        alertText: "¡User successfully registered!",
                        alertIcon: "success",
                        alertShowConfirmButton: true,
                        alertTimer: 1500,
                        alertRuta: "login"
                    });
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
};

// Creamos sistema de Login de usuario
exports.login = async (req, res) => {
    try {
        const user = req.body.user;
        const pass = req.body.pass;
        const passHash = await bcryptjs.hash(pass, 8);

        if (!user || !pass) {
            res.render("login", {
                alert: true,
                alertTitle: "Attention",
                alertText: "The User and Password fields cannot be empty.",
                alertIcon: "info",
                alertShowConfirmButton: true,
                alertTimer: false,
                alertRuta: "login"
            });
        } else {
            connection.query("SELECT * FROM users WHERE user = ?", [user], async (error, results) => {
                if (results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))) {
                    res.render("login", {
                        alert: true,
                        alertTitle: "Error",
                        alertText: "The username or password is incorrect",
                        alertIcon: "error",
                        alertShowConfirmButton: true,
                        alertTimer: false,
                        alertRuta: "login"
                    });
                } else {
                    const id = results[0].id;
                    const token = jwt.sign({ id: id }, process.env.JWT_SECRET);
                    const cookiesOptions = {
                        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }

                    res.cookie("jwt", token, cookiesOptions);
                    res.render("login", {
                        alert: true,
                        alertTitle: "Success",
                        alertText: "¡Welcome to NotesLab!",
                        alertIcon: "success",
                        alertShowConfirmButton: false,
                        alertTimer: 1500,
                        alertRuta: ""
                    })
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
};

// Creamos sistema de autenticacion del usuario
exports.userAuthenticated = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
            connection.query("SELECT * FROM users WHERE id = ?", [decoded.id], (error, results) => {
                if(!results){return next()}
                req.user = results[0]
                return next()
            })
        } catch (error) {
            console.log(error);
        }
    } else {
        res.redirect("/login")
    }
};