const form = document.getElementById("my-form");
const spendMoney = document.getElementById("Amount");
const spendOn = document.getElementById("kis-chiz-pe");
const spendWhat = document.getElementById("kahaPe");

form.addEventListener("submit", AddNewSpend);

function AddNewSpend(e) {
  e.preventDefault();
  const money = spendMoney.value;
  const description = spendOn.value;
  const category = spendWhat.value;

  const user = {
    money,
    description,
    category,
  };
  const token = localStorage.getItem("token");
  axios
    .post("http://localhost:3000/expense/add-expense", user, {
      headers: { Authorization: token },
    })
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

function showUsersOnScreen(myObj) {
  const parent = document.getElementById("user");
  const child = document.createElement("li");

  child.appendChild(
    document.createTextNode(
      `${myObj.amount} : ${myObj.description} : ${myObj.category}`
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
        spendOn.value = myObj.description;
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
  const token = localStorage.getItem("token");
  axios
    .get(`http://localhost:3000/expense/get-expense`, {
      headers: { Authorization: token },
    })
    .then((response) => {
      console.log(response);
      for (let i = 0; i < response.data.allExpense.length; i++) {
        showUsersOnScreen(response.data.allExpense[i]);
      }
    });
}

document.getElementById("rzp-button").onclick = async function (e) {
  const token = localStorage.getItem("token");
  console.log(token);
  const response = await axios.get(
    "http://localhost:3000/purchase/premiummembership",
    {
      headers: { Authorization: token },
    }
  );
  console.log(response);

  let opations = {
    Key: response.data.Key_id, //Enter the key ID generated from the Dashboard
    order_id: response.data.order.id, // For one time payment
    //This handle fucntion will handle the success payment
    handler: async function (result) {
      await axios
        .post("http://localhost:3000/purchase/updatetransactionstatus", {
          order_id: opations.order_id,
          payment_id: result.razorpay_payment_id,
          headers: { Authorization: token },
        })
        alert("You are a Preminum User Now")
    },
  };

  const rzp1 = Razorpay(opations);
  rzp1.open();
  e.preventDefault();
  rzp1.on("payment failed", function (response) {
    console.log(response);
    alert("Something went wrong");
  });
};
