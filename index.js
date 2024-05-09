
//variables
const errObject = document.querySelectorAll('.form form input + p');
console.log(errObject);

// errObject[5].style.display = "block";
//validations.

function nameHandler(event)
{
    const name = event.target.value;
    const regEx = /^[A-Za-z]+\ [A-Za-z]+$/;
    if(name!='' && regEx.test(name))
    {
        console.log('Name ok');
        localStorage.setItem("Name",name);
        errObject[0].style.display = "none";
    }else{
        errObject[0].style.display = "block";
    }
}

function emailHandler(event)
{
    const email = event.target.value;
    const regEx = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if(regEx.test(email))
    {
        console.log('email ok');
        localStorage.setItem("Email Id",email);
        errObject[1].style.display = "none";
    }else{
        errObject[1].style.display = "block";
    }
}

function pswdHandler(event)
{
    const pswd = event.target.value;
    if(pswd.length >=8 )
    {
        console.log('password ok');
        localStorage.setItem("Password",pswd);
        errObject[2].style.display = "none";
    }
    else
    {
        errObject[2].style.display = 'block'
    }
}
function cnfpswdHandler(event)
{
    const cnfpswd = event.target.value;
    const pswd = document.getElementById('password').value;
    if(pswd === cnfpswd )
    {
        console.log('confirm password ok');
        localStorage.setItem("Confirm Password",cnfpswd);
        errObject[3].style.display = "none";
    }
    else
    {
        errObject[3].style.display = 'block'
    }
}

function phoneHandler(event)
{
    const phoneno = event.target.value;
    if(phoneno.length==10)
    {
        localStorage.setItem('Phone No ',phoneno);
        errObject[4].style.display = 'none';
    }
    else
    {
        errObject[4].style.display = 'block';
    }
}

function submitHandler()
{
    console.log(localStorage);
}

document.getElementById('dob').addEventListener('change',(event)=>{
    const date = event.target.value;
    localStorage.setItem('Date Of Birth',date.split('-').reverse().join('-'));
})
document.getElementById('gender').addEventListener('change',(event)=>{
    const data = event.target.value;
    localStorage.setItem('Gender',data);
})
