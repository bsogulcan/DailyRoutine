class User {
  Id;
  UserName;
  Name;
  Surname;
  EmailAddress;
  PhoneNumber;
  Password;
  constructor(data) {
    if (data) {
      this.Id = data.id;
      this.UserName = data.emailAddress;
      this.Name = data.name;
      this.Surname = data.surname;
      this.EmailAddress = data.emailAddress;
      this.PhoneNumber = data.v;
      this.Password = data.password;
    }
  }
}
export default User;
