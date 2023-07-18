const form = document.getElementById("my-form");
const spendMoney = document.getElementById("Amount");
const spendOn = document.getElementById("kis-chiz-pe");
const spendWhat = document.getElementById("kahaPe");

form.addEventListener("submit", AddNewSpend);

async function AddNewSpend(e) {
  try {
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
    const response = await axios.post(
      "http://localhost:3000/expense/add-expense",
      user,
      {
        headers: { Authorization: token },
      }
    );
    console.log(response);
    showUsersOnScreen(response.data.newExpense);
    spendMoney.value = "";
    spendOn.value = "";
    spendWhat.value = "";
  } catch (error) {
    document.body.innerHTML =
      document.body.innerHTML + "<h4>Something went wrong</h4>";
  }
}

function showUsersOnScreen(myObj) {
  try {
    const parent = document.getElementById("user");
    const child = document.createElement("li");

    child.appendChild(
      document.createTextNode(
        `${myObj.amount} -  ${myObj.description} - ${myObj.category}`
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
    // let editBtn = document.createElement("input");
    // editBtn.value = "Edit Expense";
    // editBtn.id = "btn";
    // editBtn.type = "button";

    // editBtn.onclick = (e) => {
    //   axios
    //     .delete(`http://localhost:3000/expense/delete-expense/${myObj.id}`)
    //     .then((response) => {
    //       spendMoney.value = myObj.amount;
    //       spendOn.value = myObj.description;
    //       spendWhat.value = myObj.category;
    //     })
    //     .catch((error) => {
    //       document.body.innerHTML =
    //         document.body.innerHTML + "<h4>Something went wrong</h4>";
    //       console.log(error);
    //     });

    //   parent.removeChild(child);
    // };
    // child.appendChild(editBtn);

    parent.appendChild(child);
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("DOMContentLoaded", onPageLoading);

async function onPageLoading(e) {
  try {
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    console.log(decodedToken);
    const ispremiumuser = decodedToken.ispremiumuser;
    if (ispremiumuser) {
      preminumUserShowMessage();
      ShowLeaderboard();
    }
    const response = await axios.get(
      `http://localhost:3000/expense/get-expense`,
      {
        headers: { Authorization: token },
      }
    );
    for (let i = 0; i < response.data.allExpense.length; i++) {
      showUsersOnScreen(response.data.allExpense[i]);
    }
  } catch (error) {
    console.log(error);
  }
}

async function download() {
  let token = localStorage.getItem("token");
  try {
    const response = await axios.get("http://localhost:3000/expense/download", {
      headers: { Authorization: token },
    });
    if (response.status === 200) {
      var a = document.createElement("a");
      a.href = response.data.fileURL;
      a.download = "myexpense.csv";
      a.click();
    }
  } catch (error) {
    throw new Error(error);
  }
}

function showPagination({
  currentPage,
  hasNextPage,
  nextPage,
  hasPreviousPage,
  previousPage,
}) {
  const dynamicpagination = document.getElementById("dynamicpagination");
  if (dynamicpagination) {
    dynamicpagination.addEventListener("change", () => {
      const pageSize = document.getElementById("dynamicpagination").value;
      // console.log(pageSize);
      localStorage.setItem("pagesize", pageSize);
      getProducts(currentPage);
    });
  }

  const pagination = document.getElementById("pagination");
  if (hasPreviousPage) {
    const prevBtn = document.createElement("button");
    prevBtn.innerHTML = previousPage;
    prevBtn.addEventListener("click", () => {
      getProducts(previousPage);
    });
    pagination.appendChild(prevBtn);
  }

  const crtBtn = document.createElement("button");
  crtBtn.innerHTML = currentPage;
  crtBtn.addEventListener("click", () => {
    getProducts(currentPage);
  });
  pagination.appendChild(crtBtn);
  if (hasNextPage) {
    const nextBtn = document.createElement("button");
    nextBtn.innerHTML = nextPage;
    nextBtn.addEventListener("click", () => {
      getProducts(nextPage);
    });
    pagination.appendChild(nextBtn);
  }
}

async function getProducts(page) {
  const token = localStorage.getItem("token");
  let response = await axios.get(
    `http://localhost:3000/expense/load-data?page=${page}`,
    { headers: { Authorization: token } }
  );
  //console.log(response);
  console.log(response.data.expenses);
  const ul = document.getElementById("details");
  console.log(ul);
  const listItems = document.querySelectorAll("#details li");

  // 👇️ NodeList(5) [li, li, li, li, li]
  console.log(listItems);

  listItems.forEach((listItem) => {
    listItem.parentNode.removeChild(listItem);
  });

  console.log(ul);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  for (let i = 0; i < response.data.expenses.length; i++) {
    showUsersOnScreen(response.data.expenses[i]);
  }
}

function preminumUserShowMessage() {
  document.getElementById("rzp-button").style.visibility = "hidden";
  document.getElementById("message").innerHTML = "You are a premium user :";
  document.getElementById("expense").innerHTML = "Expense";
  document.getElementById("downloadexpense").innerHTML =
    "<button>Download File</button>";
}

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

document.getElementById("rzp-button").onclick = async function (e) {
  try {
    const token = localStorage.getItem("token");
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
        const res = await axios.post(
          "http://localhost:3000/purchase/updatetransactionstatus",
          {
            order_id: opations.order_id,
            payment_id: result.razorpay_payment_id,
          },
          { headers: { Authorization: token } }
        );
        alert("You are a Preminum User Now");
        preminumUserShowMessage();
        localStorage.setItem("isadmin", true);
        ShowLeaderboard();
        localStorage.setItem("token", res.data.token);
      },
    };

    const rzp1 = Razorpay(opations);
    rzp1.open();
    e.preventDefault();
    rzp1.on("payment failed", function (response) {
      console.log(response);
      alert("Something went wrong");
    });
  } catch (error) {
    console.log(error);
  }
};

function ShowLeaderboard() {
  try {
    const showLeaderBoard = document.createElement("input");
    showLeaderBoard.type = "button";
    showLeaderBoard.value = "Show Leaderboard";

    const token = localStorage.getItem("token");
    showLeaderBoard.onclick = async () => {
      const userLeaderBoardArray = await axios.get(
        "http://localhost:3000/premium/showLeaderBoard",
        { headers: { Authorization: token } }
      );
      console.log(userLeaderBoardArray.data);

      const LeaderboardBtn = document.getElementById("leaderboard");
      LeaderboardBtn.innerHTML += "<h1>Leader Board </h1>";

      userLeaderBoardArray.data.forEach((userDetail) => {
        LeaderboardBtn.innerHTML += `<li>Name - ${userDetail.name} - Total Expense ${userDetail.total_cost}`;
      });
    };

    document.getElementById("message").appendChild(showLeaderBoard);
  } catch (error) {
    console.log(error);
  }
}
