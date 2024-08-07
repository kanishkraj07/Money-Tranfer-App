const zod = require("zod");

const USERNAME_SCHEMA = zod.string().min(5).max(10);
const PASSWORD_SCHEMA = zod.string().min(5).max(15);
const FIRSTNAME_SCHEMA = zod.string().max(15);
const LASTNAME_SCHEMA = zod.string().max(15);

const USER_SIGN_UP_SCHEMA = zod.object({
    userName: USERNAME_SCHEMA,
    firstName: FIRSTNAME_SCHEMA,
    lastName: LASTNAME_SCHEMA,
    password: PASSWORD_SCHEMA
});

const USER_SIGN_IN_SCHEMA = zod.object({
    userName: USERNAME_SCHEMA,
    password: PASSWORD_SCHEMA
});

const UPDATE_USER_INFO_SCHEMA = zod.object({
    password: PASSWORD_SCHEMA.optional(),
    firstName: FIRSTNAME_SCHEMA.optional(),
    lastName: LASTNAME_SCHEMA.optional()
});

module.exports = {
    USER_SIGN_UP_SCHEMA,
    USER_SIGN_IN_SCHEMA,
    UPDATE_USER_INFO_SCHEMA
}