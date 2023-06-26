let form = document.getElementById("my-form");
let spendMoney = document.getElementById("Amount");
let spendOn = document.getElementById("kis-chiz-pe");
let spendWhat = document.getElementById("kahaPe");

form.addEventListener("submit", AddNewSpend);

function AddNewSpend(e) {
  e.preventDefault();
  if (
    spendMoney.value === "" ||
    spendOn.value === "" ||
    spendWhat.value === ""
  ) {
    alert("Fill the deatils");
  } else {
    let Fmoney = spendMoney.value;
    let Fdescription = spendOn.value;
    let Fcategory = spendWhat.value;

    let user = {
      Fmoney,
      Fdescription,
      Fcategory,
    };
    console.log(user);
    axios
      .post("http://localhost:3000/expense/add-expense", user)
      .then((response) => {
        console.log(response);
        showUsersOnScreen(response.data.newExpense);
      })
      .catch((error) => {
        document.body.innerHTML =
          document.body.innerHTML + "<h4>Something went wrong</h4>";
        console.log(error);
      });

    spendMoney.value = "";
    spendOn.value = "";
    spendWhat.value = "";
  }
}
function showUsersOnScreen(myObj) {
  let parent = document.getElementById("user");
  let child = document.createElement("li");

  child.appendChild(
    document.createTextNode(
      `${myObj.amount} : ${myObj.descripiton} : ${myObj.category}`
    )
  );

  // create delete button
  let deletebtn = document.createElement("input");
  deletebtn.value = "Delete Expense";
  deletebtn.id = "btn";
  deletebtn.type = "button";

  deletebtn.onclick = (e) => {
    // if (confirm("Are You Sure ..?")) {
    console.log(myObj.id);
    var li = e.target.parentElement;
    axios
      .delete(`http://localhost:3000/expense/delete-expense/${myObj.id}`)
      .then((response) => {
        console.log(response.data);
        parent.removeChild(child);
      })
      .catch((error) => {
        document.body.innerHTML =
          document.body.innerHTML + "<h4>Something went wrong</h4>";
        console.log(error);
      });
    // }
  };
  child.appendChild(deletebtn);

  // create edit button
  let editBtn = document.createElement("input");
  editBtn.value = "Edit Expense";
  editBtn.id = "btn";
  editBtn.type = "button";

  editBtn.onclick = (e) => {
    axios
      .delete(`http://localhost:3000/expense/delete-expense/${myObj.id}`)
      .then((response) => {
        spendMoney.value = myObj.amount;
        spendOn.value = myObj.descripiton;
        spendWhat.value = myObj.category;
      })
      .catch((error) => {
        document.body.innerHTML =
          document.body.innerHTML + "<h4>Something went wrong</h4>";
        console.log(error);
      });

    parent.removeChild(child);
  };
  child.appendChild(editBtn);

  parent.appendChild(child);
}

window.addEventListener("DOMContentLoaded", onPageLoading);
function onPageLoading(e) {
  axios
  .get(`http://localhost:3000/expense/get-expense`)
  .then((response) => {
    for (let i = 0; i < response.data.allExpense.length; i++) {
      console.log(response);
      showUsersOnScreen(response.data.allExpense[i]);
    }
  });
}
