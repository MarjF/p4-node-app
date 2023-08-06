function Users() {
  this.validateEmail = (email) => {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validEmail.test(email);
  };

  this.validateUsername = (username, users) => {
    if (!Array.isArray(users)) {
      return true;
    }
    const isUsernameTaken = users.some((user) => user.username === username);
    return !isUsernameTaken;
  };

  this.validatePassword = (password) => {
    return (
      password.length >= 6 && /[A-Z]/.test(password) && /[a-z]/.test(password)
    );
  };
}

export default Users;
