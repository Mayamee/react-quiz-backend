export const catchErrorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ data: "Something broke!" });
};
