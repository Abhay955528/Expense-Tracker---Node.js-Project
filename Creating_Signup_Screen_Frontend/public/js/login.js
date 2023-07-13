const LoginForm = document.getElementById("login");
const LoginEmail = document.getElementById("email");
const LoginPass = document.getElementById("pass");

LoginForm.addEventListener("submit", newLogin);

async function newLogin(e) {
  try {
    e.preventDefault();
    let email = LoginEmail.value;
    let password = LoginPass.value;
    const newLoginUser = {
      email,
      password,
    };
    console.log(newLoginUser);
    const response = await axios.post(
      "http://localhost:3000/login/user",
      newLoginUser
    );
    alert(response.data.message);
    localStorage.setItem("token", response.data.token);
    window.location.href = "../views/expense.html";
  } catch (error) {
    console.log(JSON.stringify(error));
    document.body.innerHTML += `<div style="color:red;">${error.message}`;
  }

  LoginEmail.value = "";
  LoginPass.value = "";
}
