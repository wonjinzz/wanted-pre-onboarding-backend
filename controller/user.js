const User = require("../model/user");

const userController = {};

// requset { data : { name: string } } 

userController.create = async (req, res, next) => {
    try {
        console.log(req.body);
        const { name } = req.body.data;
        const newUser = await User.create({ name });
        res.json({ success: true, message: "성공적으로 등록되었습니다.", data: newUser });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = userController;