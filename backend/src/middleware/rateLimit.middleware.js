import rateLimit from "express-rate-limit";

const attemptLimit = rateLimit({
  windowMs: 5 * 60 * 60,
  max: 3,
  message:
    "You have exceeded the 3 login attempts in 5 minutes limit! Please try again after 5 minutes",
});

export { attemptLimit };
