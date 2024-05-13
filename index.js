
//variables
let errObject = document.querySelectorAll('.form form input + p');
console.log(errObject);
errObject = Array.from(errObject);
errObject.push(document.querySelector('#pswError'));
errObject.push(document.querySelector('#cnfError'));
console.log(errObject);

let data = {
    Name:"",
    Email:"",
    PhoneNo:"",
    Gender:"",
    DateOfBirth:"",
    Password:"",
}

//variable to activate submit button
let submitState = true;
function enableSubmit(submitState)
{
    submitState ? document.getElementById('submitbtn').style.opacity = '1.0' : document.getElementById('submitbtn').style.opacity = '0.5';
}
//validations.

function nameHandler(event) {
    const name = event.target.value;
    if (name != '' && (regExName.test(name) || regExFullName.test(name))) {
        console.log('Name ok');
        // localStorage.setItem("Name", name);
        data.name = name;
        document.querySelector('#nameError').style.display = "none";
    } else {
        document.querySelector('#nameError').style.display = "block";
    }
    submitState = checkFormFilled() && finalValidation().text==='Data Saved Successfully';
    enableSubmit(submitState);
}

function emailHandler(event) {
    const email = event.target.value;
    // const regEx = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z.]{2,}$/;
    if (regExEmail.test(email)) {
        console.log('email ok');
        // localStorage.setItem("Email Id", email);
        data.email = email;
        document.querySelector('#emailError').style.display = "none";
    } else {
        document.querySelector('#emailError').style.display = "block";
    }
    submitState = checkFormFilled() && finalValidation().text==='Data Saved Successfully'
    enableSubmit(submitState);
}

function pswdHandler(event) {
    const pswd = event.target.value;
    if (pswd.length >= 8 || pswd.length == 0) {
        console.log('password ok');
        // localStorage.setItem("Password", pswd);
        data.Password = pswd;
        document.querySelector('#pswError').style.display = "none";
    }
    else {
        document.querySelector('#pswError').style.display = 'block';
    }
    submitState = checkFormFilled() && finalValidation().text==='Data Saved Successfully'
    enableSubmit(submitState);
}
function cnfpswdHandler(event) {
    const cnfpswd = event.target.value;
    const pswd = document.getElementById('password').value;
    if (pswd === cnfpswd) {
        console.log('confirm password ok');
        // localStorage.setItem("Confirm Password", cnfpswd);
        // data.ConfirnPassword = cnfpswd;
        document.querySelector('#cnfError').style.display = "none";
    }
    else {
        document.querySelector('#cnfError').style.display = 'block';
        
    }
    submitState = checkFormFilled() && finalValidation().text==='Data Saved Successfully'
    enableSubmit(submitState);
}

function phoneHandler(event) {
    const phoneno = event.target.value;
    if (phoneno.length == 10) {
        document.querySelector('#phoneError').style.display = 'none';
        event.target.value = formatPhoneNo(phoneno);
        // localStorage.setItem('Phone No ', event.target.value);
        data.phoneNo = event.target.value;
    }
    else {
        event.target.value = '';
        document.querySelector('#phoneError').style.display = 'block';
    }
    submitState = checkFormFilled() && finalValidation().text==='Data Saved Successfully'
    enableSubmit(submitState);
}

function checkFormFilled()
{
    const inputElement = document.querySelectorAll('input,select');
    console.log(inputElement)
    let result = true;
    Array.from(inputElement).forEach((ele)=>{
        if(ele.tagName.toLowerCase()==='select')
        {
            if(ele.selectedIndex==0) result = false;
        }
        else if(ele.type==='checkbox')
        {
            if(!ele.checked) result = false;
        }
        
        else if(ele.value.length===0)
        {
            result = false;
        }
    })
    console.log(result);
    return result;
}

function submitHandler(event) {
    event.preventDefault();
    const option = finalValidation();
    if(!checkFormFilled())
    {
        let options = {
            text: "Kindly fill the Complete Data",
            duration: 4500,
            destination: "https://gitlab.com/vansh.gupta3/interactive-form",
            newWindow: true,
            gravity: "top",
            position: 'center',
        };
        Toastify(options).showToast();
        return;
    }
    if(option.text==="Data Saved Successfully")
    {
        localStorage.setItem('User Data',JSON.stringify(data));
        Toastify(option).showToast();
    }
    else{
        Toastify(finalValidation()).showToast();
    }
}

//Handling Date of birth and Gender
document.getElementById('dob').addEventListener('change', (event) => {
    const date = event.target.value;
    data.DateOfBirth = date.split('-').reverse().join('-');
    submitState = checkFormFilled() && finalValidation().text==='Data Saved Successfully'
    enableSubmit(submitState);
})
document.getElementById('gender').addEventListener('change', (event) => {
    // const data = event.target.value;
    // localStorage.setItem('Gender', data);
    data.Gender = event.target.value;
    submitState = checkFormFilled() && finalValidation().text==='Data Saved Successfully'
    enableSubmit(submitState);
})
document.getElementById('termconditions').addEventListener('click', (event) => {
    // const data = event.target.value;
    // localStorage.setItem('Gender', data);
    submitState = checkFormFilled() && finalValidation().text==='Data Saved Successfully'
    enableSubmit(submitState);
})

//Handling show and hide password behaviour
const imgNode = document.querySelector('#pswdEye');
console.log(imgNode);
imgNode.addEventListener('click', () => {
    const passwordInput = document.querySelector('#password');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        imgNode.innerHTML = 'visibility_off'
    } else {
        passwordInput.type = 'password';
        imgNode.innerHTML = 'visibility'
    }
});

let cnfEye = document.querySelector('#cnfEye');
cnfEye.addEventListener('click', () => {
    const passwordInput = document.querySelector('#cnfPswd');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        cnfEye.innerHTML = 'visibility_off';
    } else {
        passwordInput.type = 'password';
        cnfEye.innerHTML = 'visibility'
    }
});

// Formating Phone input;
function formatPhoneNo(number){
    let formatedNumber='';
    Array.from(number).forEach((element,index) => {
        formatedNumber+=element;
        if(index===2 || index==5)
        {
            formatedNumber+='-';
        }
    });
    console.log(formatedNumber);
    return formatedNumber;
}


//checking if all inputs are correct
function finalValidation()
{
    var options = {
        text: "Data Saved Successfully",
        duration: 4500,
        destination: "https://gitlab.com/vansh.gupta3/interactive-form",
        newWindow: true,
        gravity: "top",
        position: 'center',
    };
    errObject.forEach(ele=>{
        if(ele.style.display==='block')
        {
            options = {
                text: "Kindly! Solve all errors before submitting.",
                duration: 4500,
                destination: "https://gitlab.com/vansh.gupta3/interactive-form",
                newWindow: true,
                gravity: "top",
                position: 'center',
            };
            return options;
        }
    })
    return options;
}