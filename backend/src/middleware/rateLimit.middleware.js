import rateLimit from "express-rate-limit";

const attemptLimit = rateLimit({
  windowMs: 4 * 60 * 60,
  max: 3,
  message:
    "You have exceeded the 3 login attempts in 4 minutes limit! Please try again after 4 minutes",
});

export { attemptLimit };
