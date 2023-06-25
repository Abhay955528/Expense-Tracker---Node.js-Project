const LoginForm = document.getElementById("login");
const LoginEmail = document.getElementById("email");
const LoginePass = document.getElementById("pass");

LoginForm.addEventListener("submit", newLogin);

async function newLogin(e) {
  e.preventDefault();
  let email = LoginEmail.value;
  let pass = LoginePass.value;
  const newLoginUser = {
    email,
    pass,
  };
  console.log(newLoginUser);
  await axios
    .post("http://localhost:3000/login/user",newLoginUser)
    .then(response=>{
        alert(response.data.message)
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
      document.body.innerHTML+=`<div style="color:red:">${error.message}`
    });
}
