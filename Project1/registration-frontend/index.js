
// for entering user details

let usernameInput = document.getElementById('username-input');
let passwordInput = document.getElementById('password-input');
let firstNameInput = document.getElementById('firstname-input');
let lastNameInput = document.getElementById('lastname-input');
let phoneInput = document.getElementById('phone-input');
let emailInput = document.getElementById('email-input');
let genderButtons = document.querySelectorAll('input[name="gender"]');
let roleButtons = document.querySelectorAll('input[name="role"]')
let registrationSubmitButton = document.getElementById('register-submit-btn');

// for entering login details

let usernameloginInput = document.querySelector("#username-login-input")
// let username1 = usernameloginInput.value

let passwordloginInput = document.querySelector('#password-login-input');

let loginButton = document.getElementById('login-btn');

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

loginButton.addEventListener('click', get_all_details)



async function get_all_details(){
    let res = await fetch('http://127.0.0.1:8080/login', {
        'credentials': 'include',
        'method': 'POST',
        'headers': {'Content-Type': 'application/json'},
        'body': JSON.stringify({
            "username": usernameloginInput.value,
            "password_1": passwordloginInput.value
        })
    }) 

    if (res.status == 200)
    {
        window.location.href = '/user_profile.html'
    }
    
}

// when submit button pressed

registrationSubmitButton.addEventListener('click', async() =>{

    let selectedRadioButton1;
    for (let radioBtn1 of genderButtons){
        if(radioBtn1.checked){
            selectedRadioButton1 = radioBtn1
            break;
        }
    }

    let selectedRadioButton2;
    for(let radioBtn2 of roleButtons){
        if(radioBtn2.checked){
            selectedRadioButton2 = radioBtn2
            break;
        }
    }

    let res = await fetch('http://127.0.0.1:8080/users', {
        'credentials': 'include', // very important to make sure that login and everything else works, because
        // 'credentials': 'include' is the option that will tell the browser to include cookies as part of the request
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            "username": usernameInput.value,
            "password_1": passwordInput.value,
            "first_name": firstNameInput.value,
            "last_name": lastNameInput.value,
            "gender": selectedRadioButton1.value,
            "phone_number": phoneInput.value,
            "email_address": emailInput.value,
            "role_1": selectedRadioButton2.value
        })
    })


    if (res.status == 201) {

        window.location.href = '/success.html'

    } else if (res.status == 400) {
        let data = await res.json();
        
        let registrationErrorMessagesDiv = document.getElementById('registration-error-messages')
        registrationErrorMessagesDiv.innerHTML = '';

        let errorMessages = data.messages;
        for(let errorMessage of errorMessages ){
            let errorElement = document.createElement('p');
            errorElement.innerHTML = errorMessage;
            errorElement.style.color = 'red';
            errorElement.style.fontWeight = 'bold';


            registrationErrorMessagesDiv.appendChild(errorElement);
        }
        
    }


});