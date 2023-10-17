const Company = require("../model/company");

const companyController = {};

// requset { data : { name: string, nation: string, area: string } } 

companyController.create = async (req, res, next) => {
    try {
        console.log(req.body);
        const { name, nation, area } = req.body.data;
        const newCompany = await Company.create({ name, nation, area });
        res.json({ success: true, message: "성공적으로 등록되었습니다.", data: newCompany });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = companyController;