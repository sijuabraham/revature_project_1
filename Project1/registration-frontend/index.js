
// for entering user details

// let usernameInput = document.getElementById('username-input');
// let passwordInput = document.getElementById('password-input');
// let firstNameInput = document.getElementById('firstname-input');
// let lastNameInput = document.getElementById('lastname-input');
// let phoneInput = document.getElementById('phone-input');
// let emailInput = document.getElementById('email-input');
// let genderButtons = document.querySelectorAll('input[name="gender"]');
// let roleButtons = document.querySelectorAll('input[name="role"]')
// let registrationSubmitButton = document.getElementById('register-submit-btn');

// for entering login details


// let username1 = usernameloginInput.value




// let asyncAwaitButton = document.querySelector('#async-await-btn');
// loginButton.addEventListener('click', asyncAwaitDemo);

// when login button pressed

// loginButton.addEventListener('click', async() =>{

//     let res = await fetch('http://127.0.0.1:8080/login', {
//         'credential': 'include',
//         'method': 'POST',
//         'headers': {'Content-Type': 'application/json'},
//         'body': JSON.stringify({
//             "username": usernameloginInput.value,
//             "password_1": passwordloginInput.value
//         })
//     })

//     if (res.status == 201)
//     {
//         window.location.href = '/user_profile.html'
//     }

// });
let usernameloginInput = document.querySelector("#username-login-input")
let passwordloginInput = document.querySelector('#password-login-input');
let loginButton = document.getElementById('login-btn');

if(loginButton){
    loginButton.addEventListener('click', get_all_details)
}
 

async function get_all_details(){
    let res = await fetch('http://127.0.0.1:8080/login', {
        'credentials': 'include',
        'method': 'POST',
        'headers': {'Content-Type': 'application/json'},
        'body': JSON.stringify({
            "username": usernameloginInput.value,
            "password": passwordloginInput.value
        })
    }) 

     if (res.status == 200)
    { 
        let data = await res.json();  //ERROR
        console.log("Logged in!")
        console.log(data);

        sessionStorage.setItem("user_role", data.user_role)
        let user_role = sessionStorage.getItem('user_role')
        console.log(user_role)

        sessionStorage.setItem("username", usernameloginInput.value)
        let username = sessionStorage.getItem("username");
        console.log(username)
        // window.location.href = '/finance_manager.html'

        // let res = await fetch(`http://127.0.0.1:8080/users/${username}/reimbursements`)

        if (user_role == 'employee') {
            window.location.href="./user.html"
            //http://127.0.0.1:8080/users/Shushmita97/reimbursements
            // let res = await fetch(`http://127.0.0.1:8080/users/${username}/reimbursements`, {
            //     'credentials': 'include',
            //     'method': 'GET',
            //     'headers': {'Content-Type': 'application/json'},
            //     'body': JSON.stringify({
            //         "username": usernameloginInput.value,
            //         "password": passwordloginInput.value
            //     })
            // })

            if (res == 200){
                let data = await res.json();
                console.log(data)
            }
        }
        else if (user_role == ('finance_manager')) {
            window.location.href="./finance_manager.html"
            //http://127.0.0.1:8080/reimbursements
        }
    }
};
  
//    if (res.status == 200) {
//         let data = await res.json();  //ERROR
//         console.log("Logged in!")
//         console.log(data);

//         sessionStorage.setItem("user_role", data.user_role)
//         let user_role = sessionStorage.getItem('user_role')
//         console.log(user_role)

//         sessionStorage.setItem("username", usernameloginInput.value)
//         let username = sessionStorage.getItem("username");

//         let res = await fetch(`http://127.0.0.1:8080/users/${username}/reimbursements`)

        // if (sessionStorage.getItem("user_role") == 'employee') {
                
        //         window.location.href="./user.html"
        //     }
        //     else if (sessionStorage.getItem("user_role") == ('finance_manager')) {
        //         window.location.href="./finance_manager.html"
        //     }
//         }
//     };



//------------------------------------------------------------------------------------------------------------------   


// when submit button pressed

// registrationSubmitButton.addEventListener('click', async() =>{

//     let selectedRadioButton1;
//     for (let radioBtn1 of genderButtons){
//         if(radioBtn1.checked){
//             selectedRadioButton1 = radioBtn1
//             break;
//         }
//     }

//     let selectedRadioButton2;
//     for(let radioBtn2 of roleButtons){
//         if(radioBtn2.checked){
//             selectedRadioButton2 = radioBtn2
//             break;
//         }
//     }

//     let res = await fetch('http://127.0.0.1:8080/users', {
//         'credentials': 'include', // very important to make sure that login and everything else works, because
//         // 'credentials': 'include' is the option that will tell the browser to include cookies as part of the request
//         'method': 'POST',
//         'headers': {
//             'Content-Type': 'application/json'
//         },
//         'body': JSON.stringify({
//             "username": usernameInput.value,
//             "password_1": passwordInput.value,
//             "first_name": firstNameInput.value,
//             "last_name": lastNameInput.value,
//             "gender": selectedRadioButton1.value,
//             "phone_number": phoneInput.value,
//             "email_address": emailInput.value,
//             "role_1": selectedRadioButton2.value
//         })
//     })


//     if (res.status == 201) {

//         window.location.href = '/success.html'

//     } else if (res.status == 400) {
//         let data = await res.json();
        
//         let registrationErrorMessagesDiv = document.getElementById('registration-error-messages')
//         registrationErrorMessagesDiv.innerHTML = '';

//         let errorMessages = data.messages;
//         for(let errorMessage of errorMessages ){
//             let errorElement = document.createElement('p');
//             errorElement.innerHTML = errorMessage;
//             errorElement.style.color = 'red';
//             errorElement.style.fontWeight = 'bold';


//             registrationErrorMessagesDiv.appendChild(errorElement);
//         }
        
//     }

//===========================================================================================

/**
 * let usernameInput = document.getElementById('username-input');
 * 
 * if (res.status == 200) {
        let data = await res.json();
        console.log("Logged in!")
        console.log(data);
        sessionStorage.setItem("role", data.role)
        let role = sessionStorage.getItem('role')
        console.log(role)
        sessionStorage.setItem("username", usernameInput.value)

    let res = await fetch(`http://127.0.0.1:8080/users/${username}/reimbursements`

    let username = sessionStorage.getItem('username');

    if (sessionStorage.getItem("role") == 'employee') {
            
            window.location.href="./user.html"
        }
        else if (sessionStorage.getItem("role") == ('finance_manager')) {
            window.location.href="./finance_manager.html"
        }

 */
