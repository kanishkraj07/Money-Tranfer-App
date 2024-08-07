const { FUND_TRANSFER_BODY } = require("../schemas/account")

const validateFundtransferBody = (req, res, next) => {
    FUND_TRANSFER_BODY.safeParse(req.body).success ? next() : res.status(411).json({
        message: "Incorrect Details"
    });
}

module.exports = validateFundtransferBody;