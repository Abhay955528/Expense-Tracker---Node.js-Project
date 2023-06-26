const myForm = document.getElementById("my-form");
let Name = document.getElementById("user-name");
let Email = document.getElementById("user-email");
let Password = document.getElementById("user-pass");

myForm.addEventListener("submit", newUserLogin);

async function newUserLogin(e) {
  e.preventDefault();
    let name = Name.value;
    let email = Email.value;
    let password = Password.value;

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
    Name.value = "";
    Email.value = "";
    Password.value = "";
  }

