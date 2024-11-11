// Importing required modules
const bcrypt = require('bcrypt');
const db = require('../model');
const jwt = require('jsonwebtoken');

// Assigning the User model to a constant
const User = db.users;

// Signing a user up
// Hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const data = {
            name,
            email,
            password: await bcrypt.hash(password, 10),
        };
        // Saving the user to the database
        const user = await User.create(data);

        // If user details is captured
        // Generate JWT token with user's id and the secret key in the env file
        // Set cookie with the token generated
        if (user) {
            let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            console.log(token);

            // Send the user details in the response
            return res.status(201).send(user);
        } else {
            // If user details not captured
            return res.status(409).send("Details are not correct");
        }
    } catch (error) {
        console.log(error);
    }
};

// Logging in a user
const login = async (req, res) => {
     try {
        const { email, password } = req.body;

        //Find a user by thier email
        const user = await User.findOne({ where: { email: email } });

        if (user) {
            const isSame = await bcrypt.compare(password, user.password);

            // If password is the same
            // Generate JWT token with user's id and the secret key in the env file
            if (isSame) {
                let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });

                // If password matches with the one in the database
                // Go ahead and generate a token for the user
                res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                console.log("user", JSON.stringify(user, null, 2));
                console.log(token);
                // Send user data in the response
                return res.status(201).send(user);
            } else {
                // If password does not match
                return res.status(401).send("Password is incorrect");
            }
        } else {
            // If user does not exist
            return res.status(404).send("User does not exist");
        }
     } catch (error) {
        console.log(error);
     }
};

module.exports = { signup, login, getUsers };
