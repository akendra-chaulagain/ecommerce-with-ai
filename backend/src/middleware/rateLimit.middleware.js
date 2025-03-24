import rateLimit from "express-rate-limit";

const attemptLimit = rateLimit({
  windowMs: 4 * 60 * 60,
  max: 3,
  message: "You have exceeded the 3 login attempts ! Please try again later.",
});




const verifyCodeRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 1,
  message: "You have exceeded the  attempts ! Please try again later.",
});

export { attemptLimit, verifyCodeRateLimit };
