import { createLogger } from "../utils/logger.util.js";

export const requestLogger = (req, res, next) => {
  req.id = req.cookies.H_U_I_1 || "Not-yet";
  req.logger = createLogger(`[REQ ${req.id}]`);
  
  req.logger.info(`${req.method} ${req.url}`);
  
  res.on("finish", () => {
    req.logger.info(`Finished with ${res.statusCode}`);
  });
  
  next();
};