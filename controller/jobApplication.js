const User = require("../model/user");
const Application = require("../model/application");

const jobApplicationController = {};

// requset { data : { userId: number, jobOpeningId: number } } 

jobApplicationController.create = async (req, res, next) => {
    try {
        console.log(req.body);
        const { userId, jobOpeningId } = req.body.data;
        const alreadyApplied = await Application.findOne({ where: { userId, jobOpeningId }});
        if (alreadyApplied) return res.status(400).json({ success: false, message: "공고당 지원은 1번만 가능합니다."})
        const newApplication = await Application.create({ userId, jobOpeningId });
        // res.json({ success: true, message: "성공적으로 등록되었습니다.", data: newApplication });
        res.json({ success: true, message: "성공적으로 등록되었습니다." });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = jobApplicationController;