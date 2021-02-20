class Routine {
    Id;
    UserId;
    User;
    Summary;
    Description;
    Hour;
    Minute;
    constructor(data) {
      if (data) {
        this.Id = data.id;
        this.UserId = data.userId;
        this.User = data.user;
        this.Summary = data.summary;
        this.Description = data.description;
        this.Hour = data.hour;
        this.Minute = data.minute;
      }
    }
  }
  export default Routine;
  