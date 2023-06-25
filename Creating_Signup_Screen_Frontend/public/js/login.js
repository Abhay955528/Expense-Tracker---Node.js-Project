const LoginForm = document.getElementById("login");
const LoginEmail = document.getElementById("email");
const LoginPass = document.getElementById("pass");

LoginForm.addEventListener("submit", newLogin);

async function newLogin(e) {
  e.preventDefault();
  let email = LoginEmail.value;
  let password = LoginPass.value;
  const newLoginUser = {
    email,
    password,
  };
  console.log(newLoginUser);
  await axios
    .post("http://localhost:3000/login/user", newLoginUser)
    .then((response) => {
      alert(response.data.message);
    })
    .catch((err) => {
      console.log(JSON.stringify(err))
      document.body.innerHTML += `<div style="color:red;">${err.message}`;
    });

  LoginEmail.value = "";
  LoginPass.value = "";
}
