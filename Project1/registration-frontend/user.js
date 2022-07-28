let username = sessionStorage.getItem("username");
let tBody = document.getElementById('data-output'); //============================================
let logoutBtn = document.getElementById('logout');

logoutBtn.addEventListener('click', logOut);

async function logOut(){
  console.log("in logout");
  let res = await fetch('http://127.0.0.1:8080/logout', {
        'credentials': 'include',
        'method': 'POST',
        'headers': {'Content-Type': 'application/json'},
        // 'body': JSON.stringify({
        //     "username": username
        //     // "password": passwordloginInput.value
        // })
    })
    
    if (res.status == 200){
      let data = await res.json();
      console.log(data);
      window.location.href="./index.html"
  }
}

//===========================================================================================
var tempo;
const dropDown = document.getElementById('status-filter') 
dropDown.addEventListener('change', async function(event) { 
  tempo = event.target.value;
  // let res = await fetch(`http://127.0.0.1:8080/reimbursements?status=${tempo}`, {
  let res = await fetch(`http://127.0.0.1:8080/users/${username}/reimbursements?status=${tempo}`, { //===========================
    headers: {
      'Accept': 'application/json'
    }
  });
    if (res.status == 200){
      let data = await res.json(); // res.json() returns a promise
      console.log(data["reimbursements"]);
      reimbursements_details_array = data["reimbursements"]
      tBody.innerHTML = ""; //deleting previus table content
      for (let reimbursements of reimbursements_details_array){
          console.log(reimbursements);
          user_reimbursement(reimbursements);
      }
    }
}) 


// async function selectedStatusFilter(tempo){

//   let res = await fetch(`http://127.0.0.1:8080/reimbursements?status=${tempo}`, {
//         headers: {
//           'Accept': 'application/json'
//         }
//       });
//       console.log("This is inside fetch: " + tempo);
//       let data = await res.json(); // res.json() returns a promise
//       console.log(data["reimbursements"]);
//       reimbursements_details_array = data["reimbursements"]
//       for (let reimbursements of reimbursements_details_array){
//           console.log(reimbursements);
//           user_reimbursement(reimbursements);
//           // test(reimbursements)
//       }
// }

//===============================================================================================

window.addEventListener('load', user_window_load);


async function user_window_load(){
    let username = sessionStorage.getItem("username");
    console.log(username)
    let res = await fetch(`http://127.0.0.1:8080/users/${username}/reimbursements`, {
        headers: {
          'Accept': 'application/json'
        }
      });
    // if (res == 200){
      let data = await res.json(); // res.json() returns a promise
      console.log(data["reimbursements"]); //accessing data using reimbursements as key
      reimbursements_details_array = data["reimbursements"] //saving variable as array
      for (let reimbursements of reimbursements_details_array){ //looping over array and each element is a dictionary
          console.log(reimbursements)
          user_reimbursement(reimbursements)
      }
    // }
    
}

function user_reimbursement(reimbursements){
    let userBodyElement = document.querySelector('#data-output');
    let row = document.createElement('tr');

    let idCell = document.createElement('td');
    idCell.innerHTML = reimbursements.reimb_id;

    let authorCell = document.createElement('td');
    authorCell.innerHTML = reimbursements.reimb_author;

    let resolverCell = document.createElement('td');
    resolverCell.innerHTML = reimbursements.reimb_resolver;

    let amountCell = document.createElement('td');
    amountCell.innerHTML = reimbursements.reimbursement_amount;

    let submittedCell = document.createElement('td');
    submittedCell.innerHTML = reimbursements.submitted;

    let resolvedCell = document.createElement('td');
    resolvedCell.innerHTML = reimbursements.resolved;

    let statusCell = document.createElement('td');
    statusCell.innerHTML = reimbursements.status;

    let typeCell = document.createElement('td');
    typeCell.innerHTML = reimbursements.reimb_type;

    let descriptionCell = document.createElement('td');
    descriptionCell.innerHTML = reimbursements.description;

    let receiptCell = document.createElement('td');
    receiptCell.innerHTML = reimbursements.receipt;

    row.appendChild(idCell);
    row.appendChild(authorCell);
    row.appendChild(resolverCell);
    row.appendChild(amountCell);
    row.appendChild(submittedCell);
    row.appendChild(resolvedCell);
    row.appendChild(statusCell);
    row.appendChild(typeCell);
    row.appendChild(descriptionCell);
    row.appendChild(receiptCell);

    userBodyElement.appendChild(row);
}
        