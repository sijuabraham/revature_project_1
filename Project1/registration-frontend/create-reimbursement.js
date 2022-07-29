let username = sessionStorage.getItem("username");
let submitReimbButton = document.getElementById('submit-reimb-btn');
submitReimbButton.addEventListener('click', submit_reimbursement)
let reimbursementAmount = document.getElementById('reimb-amount');
let reimbType = document.getElementsByName('reimb-type');
let reimbursementDescription = document.getElementById('reimb-description');


async function submit_reimbursement(){
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

