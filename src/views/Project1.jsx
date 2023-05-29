import "../styles/project1.scss"

export default function Project1(){

    // Event listeners
    const submitForm=(e)=>{
        e.preventDefault()

        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const password2 = document.getElementById('password2');
    
        if(checkRequired([username, email, password, password2])){
            checkLength(username, 3, 15);
            checkLength(password, 6, 25);
            checkEmail(email);
            checkPasswordsMatch(password, password2);
        }
    }

    // Check required fields
    function checkRequired(inputArr) {
        let isRequired = false;
        inputArr.forEach(function(input) {
            if (input.value.trim() === '') {
                showError(input, `${getFieldName(input)} is required`);
                isRequired = true;
            } else {
                showSuccess(input);
            }
        });

        return isRequired;
    }

    // Show input error message
    function showError(input, message) {
        const formControl = input.parentElement;
        formControl.className = 'form-control error';
        const small = formControl.querySelector('small');
        small.innerText = message;
    }

    // Get fieldname
    function getFieldName(input) {
        return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    }

    // Show success outline
    function showSuccess(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
    }

    // Check input length
    function checkLength(input, min, max) {
        if (input.value.length < min) {
            showError(
                input,
                `${getFieldName(input)} must be at least ${min} characters`
            );
        } else if (input.value.length > max) {
            showError(
                input,
                `${getFieldName(input)} must be less than ${max} characters`
            );
        } else {
            showSuccess(input);
        }
    }

    // Check email is valid
    function checkEmail(input) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(input.value.trim())) {
            showSuccess(input);
        } else {
            showError(input, 'Email is not valid');
        }
    }

    // Check passwords match
    function checkPasswordsMatch(input1, input2) {
        if (input1.value !== input2.value) {
            showError(input2, 'Passwords do not match');
        }
    }

    return(
        <div className="project1">
            <div className="container">
                <form id="form" className="form" onSubmit={(e)=>submitForm(e)}>
                    <h2>Register With Us</h2>
                    <div className="form-control">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" placeholder="Enter username" />
                        <small>Error message</small>
                    </div>
                    <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" placeholder="Enter email" />
                        <small>Error message</small>
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter password" />
                        <small>Error message</small>
                    </div>
                    <div className="form-control">
                        <label htmlFor="password2">Confirm Password</label>
                        <input
                            type="password"
                            id="password2"
                            placeholder="Enter password again"
                        />
                        <small>Error message</small>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}