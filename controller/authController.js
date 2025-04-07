//REGISTER
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken')

const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone, address, answer } = req.body
        //validation
        if (!userName || !email || !password || !address || !phone || !answer) {
            console.log("Missing fields");
            return res.status(500).send({
                success: false,
                message: 'Please Provide All Fields'
            })
        }
        //check user
        const existing = await userModel.findOne({ email })
        if (existing) {
            console.log("Email already exists");
            return res.status(500).send({
                success: false,
                message: 'Email Already Registered Please Login'
            });
        }
        //hashing password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // const hash = bcrypt.hashSync(myPlaintextPassword, salt);

        //create new user
        const user = await userModel.create({
            userName,
            email,
            password: hashedPassword,
            address,
            phone,
            answer,
        });
        console.log("User created:", user);
        const users = await userModel.find();


        return res.status(201).send({
            success: true,
            message: 'Successfully Registered!',
            user,
        })

    } catch (error) {
        console.error("Error In Register API:", error);
        res.status(500).send({
            success: false,
            message: 'Error In Register API',
            error
        })
    }
};

//LOGIN
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: 'Please provide Email or Password'
            })
        }
        //check user
        const user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }


        //check user password | compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid credentials",
            })
        }
        //token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        user.password = undefined;
        return res.status(200).send({
            success: true,
            message: 'login successfully',
            token,
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in Login API',
            error
        })

    }

};

module.exports = { registerController, loginController };