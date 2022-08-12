export default class UserDto {
  constructor(data) {
    this.id = data._id;
    this.email = data.email;
    this.activated = data.activated;
  }
}
