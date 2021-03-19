const userValidationMiddleware = (schema) => async (req, res, next) => {
    try {
        const validate = schema.validate(req.body);
        if (validate.error) {
            throw validate.error
          }
          next();
    } catch(e) {
        e.status = 400;
        next(e);
    }
}
  module.exports = userValidationMiddleware;