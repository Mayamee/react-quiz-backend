export default function testMiddleware(req, res, next) {
  console.log(req.body);
  next();
}
