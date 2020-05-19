/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.email = null;
    this.username = null;
    this.token = null;
    this.status = null;
    this.leaderBoardScore = null;
    Object.assign(this, data);
  }
}
export default User;
