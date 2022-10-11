export default class ApiError extends Error {
  constructor(status, message, errors = []) {
    super(message)
    this.status = status
    this.message = message
    this.errors = errors
  }
  static Unauthorized() {
    return new ApiError(401, 'Unauthorized')
  }
  static Forbidden() {
    return new ApiError(403, 'Forbidden')
  }
  static NotFound() {
    return new ApiError(404, 'Not Found')
  }
  static NoDataProvided() {
    return new ApiError(400, 'No data provided')
  }
  static ValidationError(message) {
    return new ApiError(400, message)
  }
  static InternalServerError() {
    return new ApiError(500, 'Internal Server Error')
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors)
  }
}
