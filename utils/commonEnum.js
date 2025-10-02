module.exports.RoleEnum = function () {
    const RoleEnum = {
        Admin: "ADMIN",
        Student: "STUDENT",
        Organisations: "ORGANISATION"
    }
    Object.freeze(RoleEnum)
    return RoleEnum
}