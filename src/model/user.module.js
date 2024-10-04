const users = [
  {
    id: 1728047503358,
    name: "xyz",
    email: "xyz@gmail.com",
    password: "1234",
  },
];

export const addUser = ({ name, email, password }) => {
  const newUser = {
    id: Date.now(),
    name: name,
    email: email,
    password: password,
  };
  users.push(newUser);
};

export const verify = ({ email, password }) => {
  const user = users.find((u) => u.email === email && u.password === password);
  return user;
};