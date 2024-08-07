const zod = require("zod");

const FUND_TRANSFER_BODY = zod.object({
    to: zod.string(),
    amount: zod.number()
})

module.exports = {
    FUND_TRANSFER_BODY
}