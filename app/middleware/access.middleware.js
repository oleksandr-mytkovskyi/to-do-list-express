exports.accessMiddleWare = async (req, res, next) => {
    try {
        if(req.roleId === 3 && req.method === 'GET') {
            next();
        } else if(req.roleId === 1 || req.roleId === 2){
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