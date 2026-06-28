const authService = require("../services/auth.service");

// for register
const register = async (req, res) => {
    try {
        const result = await authService.register(req.body);

        res.status(200).json(result);

    } catch (err) {

        res.status(400).json({
            message: err.message
        });
    }
};

 // for login

 const login = async(req,res) => {

     try {
        const result = await authService.login(req.body);

        res.status(200).json(result);

    } catch (err) {

        res.status(400).json({
            message: err.message
        });
    }

 };

module.exports = {
    register,
    login
};