module.exports = {

    validateBody(schema) {
        return(request, response, next) => {
            try {
                const validation = schema.validate(request.body);
                if (validation.error) {
                    console.log(validation.error.details)
                    response.status(400).json({
                        error: validation.error
                    })
                }
                next();
                
            } catch (error) {
                next(error);
            }
        }
    }
};