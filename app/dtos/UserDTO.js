export default class UserDto {
  constructor(data) {
    this.id = data._id;
    this.email = data.email;
    this.username = data.username;
    this.activated = data.activated;
  }
}
