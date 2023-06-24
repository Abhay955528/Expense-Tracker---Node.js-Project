const myForm = document.getElementById("my-form");
const name = document.getElementById("user-name");
const email = document.getElementById("user-email");
const password = document.getElementById("user-pass");

myForm.addEventListener("submit", newUserLogin);

function newUserLogin(e) {
  e.preventDefault();
  if (name.value === "" || email.value === "" || password === "") {
    alert(required);
  } else {
    const Name = name.value;
    const Email = email.value;
    const Password = password.value;

    const signupUser = {
      Name,
      Email,
      Password,
    };

    // create new feild
    name.value = "";
    email.value = "";
    password.value = "";


    axios
      .post("http://localhost:3000/signPage",signupUser)
      .then((response) => {
        userOnScreen(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function userOnScreen(signupUser) {
    
}
