export default class ApiError extends Error {
  constructor(public status: number, public message: string, public errors?: any) {
    super(message)
  }
  public static Unauthorized() {
    return new ApiError(401, 'Unauthorized')
  }
  public static Forbidden() {
    return new ApiError(403, 'Forbidden')
  }
  public static NotFound() {
    return new ApiError(404, 'Not Found')
  }
  public static NoDataProvided() {
    return new ApiError(400, 'No data provided')
  }
  public static ValidationError(message: string) {
    return new ApiError(400, message)
  }
  public static InternalServerError() {
    return new ApiError(500, 'Internal Server Error')
  }

  public static BadRequest(message: string, errors?: any) {
    return new ApiError(400, message, errors)
  }
}
