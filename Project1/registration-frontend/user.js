// let username = sessionStorage.getItem("username");
// let createReimbButton = document.getElementById('create-reimb-btn');
// createReimbButton.addEventListener('click', create_reimbursement)

// async function create_reimbursement(){
//     // http://127.0.0.1:8080/users/1/reimbursements
//     let res = await fetch(`http://127.0.0.1:8080/users/${usernameloginInput.value}/reimbursements`, {
//         'credentials': 'include',
//         'method': 'POST',
//         'headers': {'Content-Type': 'application/json'},
//         'body': JSON.stringify({
//             "username": usernameloginInput.value,
//             "password": passwordloginInput.value
//         })
//     }) 

//     if (res.status == 200)
//     {
//         window.location.href = '/create-reimbursement.html'

//     }   
// }
//================================================================================================================

document.addEventListener('DOMContentLoaded', user_window_load);


async function user_window_load(){
    let username = sessionStorage.getItem("username");
    console.log(username)
    let res = await fetch(`http://127.0.0.1:8080/users/${username}/reimbursements`, {
        headers: {
          'Accept': 'application/json'
        }
      });
    if (res == 200){
      let data = await res.json(); // res.json() returns a promise
      console.log(data["reimbursements"]); //accessing data using reimbursements as key
      reimbursements_details_array = data["reimbursements"] //saving variable as array
      for (let reimbursements of reimbursements_details_array){ //looping over array and each element is a dictionary
          console.log(reimbursements)
          user_reimbursement(reimbursements)
      }
    }
    
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
        