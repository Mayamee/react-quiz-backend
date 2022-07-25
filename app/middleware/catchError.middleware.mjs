export const catchErrorMiddleware = (err, req, res, next) => {
  if (err) {
    res.status(500).json({ data: "Internal server error" });
  }
};
