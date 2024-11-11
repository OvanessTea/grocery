const db = require('../model');
const User = db.users;

const saveUser = async (req, res, next) => {
    try {
        console.log(req.body);
        const name = await User.findOne({ where: { name: req.body.name } });
        if (name) {
            return res.status(409).json({ message: 'Username already exists' });
        }
        const emailcheck = await User.findOne({ where: { email: req.body.email } });
        if (emailcheck) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = { saveUser };

