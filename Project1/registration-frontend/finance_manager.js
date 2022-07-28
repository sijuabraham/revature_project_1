var username = sessionStorage.getItem("username");
let actionType = document.getElementsByName('status-action');
let tBody = document.getElementById('data-output');
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
  let res = await fetch(`http://127.0.0.1:8080/reimbursements?status=${tempo}`, {
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
document.addEventListener('DOMContentLoaded', finance_manager_window_load);

async function finance_manager_window_load(){
    username = sessionStorage.getItem("username");
    console.log(username);
    
    let res = await fetch(`http://127.0.0.1:8080/reimbursements`, {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (res.status == 200){
        let data = await res.json(); // res.json() returns a promise
        console.log(data["reimbursements"]);
        reimbursements_details_array = data["reimbursements"]
        for (let reimbursements of reimbursements_details_array){
            console.log(reimbursements);
            user_reimbursement(reimbursements);
            // test(reimbursements)
        }    
      }

          
}
 var siju;
 var reimbursementId;
 var status1;

function user_reimbursement(reimbursements){
  let userBodyElement = document.querySelector('#data-output');
  let row = document.createElement('tr');

  var idCell = document.createElement('td');
  idCell.innerHTML = reimbursements.reimb_id;
  // var idCellValue = idCell.innerText;
  siju = idCell.innerHTML

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

  var label1 = document.createElement('label'); //******************* */
  label1.htmlFor = 'Approved';
  label1.innerHTML = 'Approve ';

  var radioInput1 = document.createElement('input');
  radioInput1.setAttribute('type', 'radio');
  radioInput1.setAttribute('name', "status_radio");
  radioInput1.setAttribute('id', reimbursements.reimb_id);
  radioInput1.setAttribute('value', 'Approved');
  label1.appendChild(radioInput1);

  // edit by Bipul from here

  radioInput1.addEventListener("click", ()=>{
     reimbursementId = reimbursements.reimb_id
     status1 = "approved"
     //status1 = radioInput1.checked.value
  })

  radioInput1.addEventListener("click", sush)

  //************************************************* */

  var newline1 = document.createElement('br');
  label1.appendChild(newline1);

  var label2 = document.createElement('label')
  label2.htmlFor = 'Denied';
  label2.innerHTML = 'Deny ';

  var radioInput2 = document.createElement('input');
  radioInput2.setAttribute('type', 'radio');
  radioInput2.setAttribute('name',  reimbursements.reimb_id);
  radioInput2.setAttribute('value', 'Denied');

  radioInput2.addEventListener("click", ()=>{
    reimbursementId = reimbursements.reimb_id
    status1 = "denied"
    //status1 = radioInput1.checked.value
 })
 radioInput2.addEventListener("click", sush)

  label2.appendChild(radioInput2);  

  // radioInput2.addEventListener("click", sushi) //******************* */

  // var button = document.createElement('button');
  // button.type = 'button';
  // button.innerHTML = 'Submit';
  // button.id = 'status-btn';


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
  row.appendChild(label1);
  row.appendChild(label2);
  // row.appendChild(button);
  // row.appendChild(container1);

  userBodyElement.appendChild(row);
}





// function sush(idCellValue){

//   for(i = 0; i < actionType.length; i++) {
//     if(actionType[i].checked){
//     // document.getElementById('reimb-type').innerHTML
//         var statusChange = reimbType[i].value;
//     }
//   }
 
  
//   console.log("Approve radio button is working");
//   change_status(idCell);
// }

// function sushi(idCell){
//   for(i = 0; i < actionType.length; i++) {
//     if(actionType[i].checked){
//     // document.getElementById('reimb-type').innerHTML
//         var statusChange = reimbType[i].value;
//     }
//   }
//   console.log(statusChange);
//   console.log(username);
//   console.log(idCell.innerText);
//   // has the fetch here
//   console.log("Deny radio button is working");
//   change_status(idCell);

// }

async function sush(){
  let res = await fetch(`http://127.0.0.1:8080/users/${username}/reimbursements/${reimbursementId}`, {
        'credentials': 'include',
        'method': 'PUT',
        'headers': {'Content-Type': 'application/json'},
        'body': JSON.stringify({
            "status": status1,
            "username":username,
            "reimb_id": reimbursementId
        })
      }) 

      if (res.status == 200)
      {
          window.location.href = '/finance_manager.html'

      }
}