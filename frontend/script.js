const form = document.getElementById("input-form");
const API_BASE_URL = "http://localhost:8080";

document.addEventListener("DOMContentLoaded", function initialContent() {
  fetch(API_BASE_URL)
    .then((res) => res.json())
    .then((res) => {
      res.forEach((ele) => {
        clickHandler(null, ele.name, ele.mobileNumber, ele.emailId, ele.id);
      });
    });
});

function addUserAPI(name, mobileNumber, emailId) {
  return fetch(`${API_BASE_URL}/addUser`, {
    method: "POST",
    body: JSON.stringify({
      name,
      mobileNumber,
      emailId,
    }),
    headers: {
      "Content-Type": "application/JSON",
    },
  }).then((res) => res.json());
}

function deleteUserAPI(id) {
  fetch(`${API_BASE_URL}/deleteUser/${id}`, {
    method: "DELETE",
  });
}

function validateEmail(email) {
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  return reg.test(email);
}

function createTableHeadNode(tableHeader, value) {
  const header = document.createElement("th");
  const headerTextNode = document.createTextNode(value);
  header.appendChild(headerTextNode);
  tableHeader.appendChild(header);
}

function createTableCellNode(tableRow, value) {
  const cell = document.createElement("td");
  const cellTextNode = document.createTextNode(value);
  cell.appendChild(cellTextNode);
  tableRow.appendChild(cell);
}

function deleteRow(row, id) {
  const i = row.parentNode.rowIndex;
  document.getElementsByTagName("table")[0].deleteRow(i);

  //   If row index is zero, remove the header
  const rows = document.getElementsByTagName("tr");
  if (i === 0 && rows.length === 0) {
    const elements = document.getElementsByTagName("table");
    while (elements[0]) elements[0].parentNode.removeChild(elements[0]);
  }
  deleteUserAPI(id);
}

function createDeleteRowBtn(tableRow, id) {
  const btn = document.createElement("button");
  const btnTextNode = document.createTextNode("Delete");
  btn.appendChild(btnTextNode);
  btn.setAttribute("onclick", `deleteRow(this, ${id})`);
  tableRow.appendChild(btn);
}

form.addEventListener("submit", (e) => clickHandler(e));

function clickHandler(e, nameParam, mobileParam, emailParam, id) {
  if (e) e.preventDefault();
  const name = document.getElementById("name").value || nameParam;
  const mobile = document.getElementById("mobile").value || mobileParam;
  const email = document.getElementById("email").value || emailParam;

  if (name.length < 3) {
    alert("Name should be of minimum 3 characters long");
  } else if (mobile.length !== 10) {
    alert("Number should be of 10 characters long");
  } else if (!validateEmail(email)) {
    alert("Please enter a valid email");
  } else {
    const tables = document.getElementsByTagName("table");
    const resultContainer = document.getElementById("result");
    const table = document.createElement("table");
    const tableHead = document.createElement("thead");
    const tableBody = document.createElement("tbody");

    if (tables.length === 0) {
      // Setting header for table
      createTableHeadNode(tableHead, "Name");
      createTableHeadNode(tableHead, "Mob. No.");
      createTableHeadNode(tableHead, "Email ID");
      table.appendChild(tableHead);
      // Adding the row
      const row = document.createElement("tr");
      createTableCellNode(row, name);
      createTableCellNode(row, mobile);
      createTableCellNode(row, email);
      if (e) {
        addUserAPI(name, mobile, email).then((res) =>
          createDeleteRowBtn(row, res.id)
        );
      }

      tableBody.appendChild(row);

      table.appendChild(tableBody);
      resultContainer.appendChild(table);
    } else {
      const row = document.createElement("tr");
      createTableCellNode(row, name);
      createTableCellNode(row, mobile);
      createTableCellNode(row, email);
      if (e) {
        addUserAPI(name, mobile, email).then((res) =>
          createDeleteRowBtn(row, res.id)
        );
      }

      const prevTableBody = document.getElementsByTagName("tbody")[0];
      prevTableBody.appendChild(row);
    }
  }

  form.reset();
}
