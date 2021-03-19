const accessMiddleWareFactory = (...allowedRoleIds) => async (req, res, next) => {
    try {
        if(allowedRoleIds.includes(req.roleId)) {
            next();
        } else {
            const error =  new Error('you does not have permision');
            error.status = 401;
            throw error;
        }
    } catch(e) {
        next(e);
    }
}
module.exports = accessMiddleWareFactory;