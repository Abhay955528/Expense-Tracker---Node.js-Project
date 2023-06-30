const myForm = document.getElementById("my-form");
let Name = document.getElementById("user-name");
let Email = document.getElementById("user-email");
let Password = document.getElementById("user-pass");

myForm.addEventListener("submit", newUserLogin);

async function newUserLogin(e) {
  e.preventDefault();
  const name = Name.value;
  const email = Email.value;
  const password = Password.value;
  console.log(password);

  const signupUser = {
    name,
    email,
    password,
    
  };
  console.log(signupUser);
  await axios
    .post("http://localhost:3000/signPage/user-add", signupUser)
    .then((response) => {
      console.log(response.data.message);
      window.location = "../views/login.html"
    })
    .catch((error) => {
      console.log(JSON.stringify(err));
      document.body.innerHTML += `<div style="color:red;">${err.message}`;
    });

  // create new feild
  Name.value = "";
  Email.value = "";
  Password.value = "";
}
