import bcrypt from "bcryptjs";
import { createAccesToken } from "../../libs/jwt.js";
import User from "../../models/user.model.js";

const registerMethod = async (req, res) => {
    const { email, password, username } = req.body;

    const passwordHashed = await bcrypt.hashSync(password, 10);

    try {
        const newUser = new User({
            username,
            email,
            password: passwordHashed
        })

        const userSaved = await newUser.save()

        const payload = {
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email
        }
        const token = await createAccesToken(payload)
        res.cookie('token', token);
        res.json({
            id: userSaved._id,
            email: userSaved.email,
            username: userSaved.username,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};


const loginMethod = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });

        if (!userFound) {
            return res.status(400).json({ message: "User not found" });
        }

        const isCorrectPassword = await bcrypt.compare(password, userFound.password);

        if (!isCorrectPassword) {
            return res.status(400).json({ message: "Incorrect credentials" });
        }

        const payload = {
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        }
        const token = await createAccesToken(payload)
        res.cookie('token', token);
        res.json({
            id: userFound._id,
            email: userFound.email,
            username: userFound.username,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

const logoutMethod = (req, res) => {
    res.cookie('token', "", {expires: new Date(0)});
    return res.sendStatus(200);
};

const profile = async (req, res) =>{
    const userFound = await User.findById(req.user.id);

    if(!userFound){
        return res.status(400).json({message: "User not found"});
    }
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    });

};

export {
    registerMethod,
    loginMethod,
    logoutMethod,
    profile
}