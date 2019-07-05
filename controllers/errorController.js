const response = require('../libs/responseLib');
const logger = require('./../libs/loggerLib');

exports.get404 = (req, res, next) => {
    logger.error("Route not found", "ErrorController: get404()", "low");
    let apiResponse = response.generate(true, "Route not found", 404, null);
    res.status(apiResponse.status).send(apiResponse);
}