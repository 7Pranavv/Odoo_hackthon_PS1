import {ApiResponse} from "../utils/api-response.js";

const healthcheck = async(req, res) => {
    try
    {
        const response = new ApiResponse(200, 'OK', 'Server is running smoothly');
        res.status(response.statusCode).json(response);
    } catch (error) {
        const response = new ApiResponse(500, 'Internal Server Error', 'Something went wrong');
        res.status(response.statusCode).json(response);
    }
}

export { healthcheck };
