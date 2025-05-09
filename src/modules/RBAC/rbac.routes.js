const router = require("express").Router();
const {createRoleHandler, createPermissionHandler} = require("./rbac.service");
const Authorization = require("../../guard/auhtorization.guard");

router.post("/role", Authorization, createRoleHandler);
router.post("/permission", AuthGuard, createPermissionHandler);
module.exports = {
    rbacRoutes: router
};