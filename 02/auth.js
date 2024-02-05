// User authorization

const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
  { username: 'user3', password: 'password3' },
  { username: 'admin', password: 'admin123' },
];

const authenticateUser = (username, password) => {
  return new Promise((resolve, reject) => {
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      resolve({ username: user.username, password: user.password });
    } else {
      reject(new Error('Wrong user data'));
    }
  });
}

authenticateUser('user1', 'password1')
  .then(user => {
      console.log('user authenticated', user);
  })
  .catch(error => {
      console.error('Authentication failed:', error.message);
  });