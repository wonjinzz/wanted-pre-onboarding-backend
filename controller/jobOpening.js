const Company = require("../model/company");
const Application = require("../model/application");
const JobOpening = require("../model/jobOpening");

const jobOpeningController = {};

// 1. request 정의하기
// 2. controller 작성하기

// requset { data : { company_id, job_position, job_reward, tech_stack } } <== front에서 넘겨주는 data
jobOpeningController.create = async (req, res, next) => {
    try {
        console.log(req.body);

        const { company_id, job_position, job_reward, tech_stack } = req.body.data;

        // 채용 공고 등록

        // 어떤 회사가 등록하는지? ==> company 모델에 존재함 
        // 공고에 대한 정보 ==> jobOpening 

        const isExistedCompany = await Company.findOne({ where: { id: company_id }});
        if (!isExistedCompany) {
          const newJobOpening = await JobOpening.create({ companyId: company_id, jobPosition: job_position, jobReward: job_reward, techStack: tech_stack });
          return res.status(201).json({ success: true, message: "성공적으로 등록되었습니다.", data: newJobOpening });
        }

        res.status(400).json({ success: false, message: "등록 불가."});
    } catch (error) {
        console.error(error);
        next(error);
    }
}

jobOpeningController.update = async (req, res, next) => {
    // company_id가 존재하는지 확인 후, 존재한다면 jobPosition, jobReward, techStack를 변경할 수 있음
    try {
        // 요청 데이터에서 필요한 정보 추출
        const { company_id, job_position, job_reward, tech_stack } = req.body.data;

        // 회사가 존재하는지 확인
        const readCompany = await Company.findOne({ where: { id: company_id } });
        if (readCompany) {
            // 회사가 존재하는 경우, 채용 공고 등록
            const newJobOpening = await JobOpening.update({
                jobPosition: job_position,
                jobReward: job_reward,
                techStack: tech_stack
            }, { where: { id: company_id }});

            res.status(201).json({ success: true, message: "성공적으로 변경되었습니다." });
        } else {
            res.status(400).json({ success: false, message: "회사가 존재하지 않습니다." });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}

jobOpeningController.delete = async (req, res, next) => {
    try {
        const { company_id, jobOpening_id } = req.params; // 요청 URL에서 파라미터로 받음

        // 회사가 존재하는지 확인
        const readCompany = await Company.findOne({ where: { id: company_id } });

        if (readCompany) {
            // 회사가 존재하는 경우, 채용 공고 삭제
            const deletedJobOpening = await JobOpening.destroy({ where: { id: jobOpening_id, companyId: company_id } });

            if (deletedJobOpening === 1) {
                res.json({ success: true, message: "성공적으로 삭제되었습니다." });
            } else {
                res.status(404).json({ success: false, message: "삭제할 채용 공고가 없습니다." });
            }
        } else {
            res.status(400).json({ success: false, message: "회사가 존재하지 않습니다." });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};

jobOpeningController.get = async (req, res, next) => {
    try {
        const { company_id } = req.params; // 요청 URL에서 파라미터로 받음

        // 회사가 존재하는지 확인
        const readCompany = await Company.findOne({ where: { id: company_id } });
        
        if (readCompany) {
            // 회사가 존재하는 경우, 해당 회사의 모든 채용 공고를 조회
            const jobOpenings = await JobOpening.findAll({ where: { companyId: company_id } });

            if (jobOpenings.length > 0) {
                res.json({ success: true, message: "채용 공고 조회 성공", data: jobOpenings });
            } else {
                res.status(404).json({ success: false, message: "해당 회사의 채용 공고가 없습니다." });
            }
        } else {
            res.status(400).json({ success: false, message: "회사가 존재하지 않습니다." });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports = jobOpeningController;