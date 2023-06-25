const myForm = document.getElementById("my-form");
const name = document.getElementById("user-name");
const email = document.getElementById("user-email");
const password = document.getElementById("user-pass");

myForm.addEventListener("submit", newUserLogin);

async function newUserLogin(e) {
  e.preventDefault();
    const name = name.value;
    const email = email.value;
    const password = password.value;

    const signupUser = {
      name,
      email,
      password,
    };
    console.log(signupUser);
    await axios
      .post("http://localhost:3000/signPage/user-add", signupUser)
      .then((response) => {
      })
      .catch((error) => {
        console.log(error);
      });

    // create new feild
    name.value = "";
    email.value = "";
    password.value = "";
  }

