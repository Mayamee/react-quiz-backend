export default class QuizDTO {
  constructor(data) {
    this.id = data._id;
    this.title = data.title;
    this.body = data.body;
    this.ownerName = data.ownerInfo.name;
  }
}
