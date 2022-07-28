let username = sessionStorage.getItem("username");
let submitReimbButton = document.getElementById('submit-reimb-btn');
submitReimbButton.addEventListener('click', submit_reimbursement)
let reimbursementAmount = document.getElementById('reimb-amount');
// let reimbursementTypeOptions = document.querySelectorAll('.radio');
// let reimbursementChoice = '';
let reimbType = document.getElementsByName('reimb-type');
let reimbursementDescription = document.getElementById('reimb-description');


async function submit_reimbursement(){
    // http://127.0.0.1:8080/users/1/reimbursements
    // for (const choice of reimbursementTypeOptions){
    //     if (choice.hasAttribute('checked')){
    //         reimbursementChoice += choice.value;
    //     }
    // }

    for(i = 0; i < reimbType.length; i++) {
        if(reimbType[i].checked){
        // document.getElementById('reimb-type').innerHTML
            var reimbTypeChoice = reimbType[i].value;
            
        }
    }

    let res = await fetch(`http://127.0.0.1:8080/users/${username}/reimbursements`, {
        'credentials': 'include',
        'method': 'POST',
        'headers': {'Content-Type': 'application/json'},
        'body': JSON.stringify({
            "reimbursement_amount": reimbursementAmount.value,
            // "reimb_type": reimbursementChoice,
            "reimb_type" : reimbTypeChoice,
            "description": reimbursementDescription.value
        })
    }) 

    if (res.status == 201)
    {
        window.location.href = '/user.html'

    }   
}
 


// enterButton.addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       document.getElementById("login").click();
//     }
//   });

// JSON.stringify({
//     "reimbursement_amount": amount.value,
//     "type": selectedTypeButton.value,
//     "description": description.value,
//     "author": username,
//     "receipt": ("receipt", receipt.files[0])
