
// The current screen viewed by the user
// Certain button presses changes this variable
// It is used in the render function to determine what to display to the user
let currentView = "signup-or-login"
let reason = ""
let token = ""

let signupOrLoginView = () => {
    //  You will need to modify this function
    let container = document.createElement("div")
    let loginButton = document.createElement("button")
    loginButton.innerText = "Login"
    let signupButton = document.createElement("button")
    signupButton.innerText = "Signup"
    signupButton.addEventListener("click", () => {
        currentView = "signup"
        render()
    })

    signupButton.style.margin = "0 20px"
    loginButton.style.margin = "0 20px"

    signupButton.style.padding = "5px"
    loginButton.style.padding = "5px"


    loginButton.addEventListener("click", () => {
        currentView = "login"
        render()
    })
    container.appendChild(signupButton)
    container.appendChild(loginButton)
    container.setAttribute("class", "flexed-center")

    return container
}

let signupView = () => {
    //  You will need to modify this function

    let container = document.createElement("div")
    let signupHeader = document.createElement("h2")
    signupHeader.innerText = "Sign up"

    let usernameLabel = document.createElement("div")
    usernameLabel.setAttribute("class", "username-passwordLabel")
    usernameLabel.innerText = "Username"
    usernameLabel.setAttribute("class", "label")

    let passwordLabel = document.createElement("div")
    passwordLabel.setAttribute("class", "username-passwordLabel")
    passwordLabel.innerText = "Password"
    passwordLabel.setAttribute("class", "label")

    let usernameInput = document.createElement("input")
    usernameLabel.append(usernameInput)
    let passwordInput = document.createElement("input")
    passwordInput.setAttribute("type", "password")
    passwordLabel.append(passwordInput)
    let submitButton = document.createElement("button")
    submitButton.innerText = "submit"
    submitButton.style.margin = "0 5px"


    submitButton.addEventListener('click', () => {
        let username = usernameInput.value
        let password = passwordInput.value
        // JSON.stringify converts a JavaScript value to a string
        let bodyToBeSent = JSON.stringify({ username, password })
        // fetch is covered in depth in the slides
        // You will need to replace PASTE_THE_URL_FROM_GLITCH with your glitch server url

        let signup = async () => {
            let promise = await fetch("https://fanatical-classy-feta.glitch.me/signup", { method: "POST", body: bodyToBeSent })
            let body = await promise.text()
            console.log("received from /signup  " + body)
            // JSON.parse converts a string to a JavaScript value
            // For this particular server, you always need to call it.
            let parsed = JSON.parse(body)
            if (!parsed.success) {
                //alert("signup not successful")
                currentView = "signupFailed"
                reason = parsed.reason
                render()
            } else {
                alert("signup successful")
                currentView = "login"
                render()
            }
        }

        signup()

    })

    let cancelButton = document.createElement("button")
    cancelButton.innerText = "Cancel"
    cancelButton.style.margin = "0 5px"
    cancelButton.addEventListener('click', () => {
        currentView = "signup-or-login"
        render()
    })
    let boxSignupView = document.createElement("div")
    boxSignupView.setAttribute("class", "signup-view")

    let boxSignupHeader = document.createElement("div")
    boxSignupHeader.style.display = "flex"
    boxSignupHeader.style.justifyContent = "center"
    boxSignupHeader.appendChild(signupHeader)

    let boxInputUser = document.createElement("div")
    boxInputUser.setAttribute("class", "layout-SignupView")
    boxInputUser.append(usernameLabel, usernameInput)

    let boxInputPass = document.createElement("div")
    boxInputPass.setAttribute("class", "layout-SignupView")
    boxInputPass.append(passwordLabel, passwordInput)


    let boxButtons = document.createElement("div")
    boxButtons.style.display = "flex"
    boxButtons.append(cancelButton, submitButton)
    boxButtons.style.justifyContent = "center"

    boxSignupView.append(boxSignupHeader, boxInputUser, boxInputPass, boxButtons)
    container.append(boxSignupView)

    return container

}

let signupFailedView = () => {

    let container = document.createElement("div")
    let boxContainer = document.createElement("div")
    let boxButton = document.createElement("div")
    boxButton.setAttribute("class", "flexed-center")
    boxContainer.style.display = "grid"
    container.setAttribute("class", "flexed-center")
    boxContainer.innerText = "Signup failed. Reason: " + reason
    let buttonBack = document.createElement("button")
    buttonBack.innerText = "Back to home"
    buttonBack.addEventListener("click", () => {
        currentView = "signup-or-login"
        render()
    })
    boxButton.append(buttonBack)
    boxContainer.append(boxButton)
    container.append(boxContainer)
    return container
}



let loginView = () => {
    //  You will need to modify this function

    let container = document.createElement("div")
    let signupHeader = document.createElement("h2")
    signupHeader.innerText = "Login"

    let usernameLabel = document.createElement("div")
    usernameLabel.setAttribute("class", "username-passwordLabel")
    usernameLabel.innerText = "Username"
    usernameLabel.setAttribute("class", "label")

    let passwordLabel = document.createElement("div")
    passwordLabel.setAttribute("class", "username-passwordLabel")
    passwordLabel.innerText = "Password"
    passwordLabel.setAttribute("class", "label")

    let usernameInput = document.createElement("input")
    usernameLabel.append(usernameInput)
    let passwordInput = document.createElement("input")
    passwordInput.setAttribute("type", "password")
    passwordLabel.append(passwordInput)
    let submitButton = document.createElement("button")
    submitButton.innerText = "submit"
    submitButton.style.margin = "0 5px"


    submitButton.addEventListener('click', () => {
        let username = usernameInput.value
        let password = passwordInput.value
        // JSON.stringify converts a JavaScript value to a string
        let bodyToBeSent = JSON.stringify({ username, password })
        // fetch is covered in depth in the slides
        // You will need to replace PASTE_THE_URL_FROM_GLITCH with your glitch server url
        let submit = async () => {
            let promise = await fetch("https://fanatical-classy-feta.glitch.me/login", { method: "POST", body: bodyToBeSent })
            let body = await promise.text()
            console.log("received from /login  " + body)
            // JSON.parse converts a string to a JavaScript value
            // For this particular server, you always need to call it.
            let parsed = JSON.parse(body)
            if (!parsed.success) {
                // alert("signup not successful")
                currentView = "loginFailed"
                reason = parsed.reason
                render()
            } else {
                alert("Login successful")
                token = parsed.token
                currentView = "messages"
                render()

            }
        }

        submit()

    })

    let cancelButton = document.createElement("button")
    cancelButton.innerText = "Cancel"
    cancelButton.style.margin = "0 5px"
    cancelButton.addEventListener('click', () => {
        currentView = "signup-or-login"
        render()
    })
    let boxSignupView = document.createElement("div")
    boxSignupView.setAttribute("class", "signup-view")

    let boxSignupHeader = document.createElement("div")
    boxSignupHeader.style.display = "flex"
    boxSignupHeader.style.justifyContent = "center"
    boxSignupHeader.appendChild(signupHeader)

    let boxInputUser = document.createElement("div")
    boxInputUser.setAttribute("class", "layout-SignupView")
    boxInputUser.append(usernameLabel, usernameInput)

    let boxInputPass = document.createElement("div")
    boxInputPass.setAttribute("class", "layout-SignupView")
    boxInputPass.append(passwordLabel, passwordInput)


    let boxButtons = document.createElement("div")
    boxButtons.style.display = "flex"
    boxButtons.append(cancelButton, submitButton)
    boxButtons.style.justifyContent = "center"

    boxSignupView.append(boxSignupHeader, boxInputUser, boxInputPass, boxButtons)
    container.append(boxSignupView)

    return container

}

let loginFailedView = () => {

    let container = document.createElement("div")
    let boxContainer = document.createElement("div")
    let boxButton = document.createElement("div")
    boxButton.setAttribute("class", "flexed-center")
    boxContainer.style.display = "grid"
    container.setAttribute("class", "flexed-center")
    boxContainer.innerText = "Login failed. Reason: " + reason
    let buttonBack = document.createElement("button")
    buttonBack.innerText = "Back to home"
    buttonBack.addEventListener("click", () => {
        currentView = "login"
        render()
    })
    boxButton.append(buttonBack)
    boxContainer.append(boxButton)
    container.append(boxContainer)
    return container
}

let messagesView = () => {
    let boxButtonRefresh = document.createElement("div")
    boxButtonRefresh.style.width = "100%"
    let txt = document.createElement("span")

    let container = document.createElement("div")

    container.setAttribute("class", "messages-view")

    let buttonBack = document.createElement("button")
    buttonBack.innerText = "Home"
    buttonBack.setAttribute("class", "button-back")
    buttonBack.addEventListener("click", () => {
        currentView = "signup-or-login"
        render()
    })

    let buttonRefresh = document.createElement("button")
    boxButtonRefresh.append(buttonRefresh)
    buttonRefresh.innerText = "Refresh"
    buttonRefresh.setAttribute("class", "button-refresh")
    let inputMessage = document.createElement("input")
    buttonRefresh.addEventListener("click", () => {

        txt.innerText = ''


        let getContent = async () => {

            let promise = await fetch("https://fanatical-classy-feta.glitch.me/messages", { method: "GET" })
            let body = await promise.text()

            let message;
            let parsed = JSON.parse(body)

            for (let i = 0; i < parsed.messages.length; i++) {
                message = parsed.messages[i].from + ": " + parsed.messages[i].contents + "\n"
                txt.innerText += message
            }

        }

        getContent()

    });

    let boxInputMessage = document.createElement("div")
    boxInputMessage.style.display = "flex"


    inputMessage.style.width = "inherit"
    let buttonSend = document.createElement("button")
    buttonSend.innerText = "Send message"
    buttonSend.setAttribute("class", "buttonSend")
    buttonSend.addEventListener("click", () => {
        let contents = inputMessage.value
        // JSON.stringify converts a JavaScript value to a string
        let bodyToBeSent = JSON.stringify({ token, contents })
        // fetch is covered in depth in the slides
        // You will need to replace PASTE_THE_URL_FROM_GLITCH with your glitch server url


        let sendMessage = async () => {

            let promise = await fetch("https://fanatical-classy-feta.glitch.me/message", { method: "POST", body: bodyToBeSent })
            let responseBody = await promise.text()
            let parsed = JSON.parse(responseBody)

            console.log("received from /message  " + responseBody)
            // JSON.parse converts a string to a JavaScript value
            // For this particular server, you always need to call it.
            if (!parsed.success) {
                reason = parsed.reason
                alert("Error:" + reason)
                // render()
            } else {
                console.log("Message sent")
            }
        }

        sendMessage()
        inputMessage.value = ""

    })


    boxInputMessage.setAttribute("class", "box-input-send")
    boxInputMessage.append(inputMessage, buttonSend)
    container.append(boxButtonRefresh, buttonBack, txt, boxInputMessage)
    return container
}


// Rerenders the page
let render = () => {
    // Will contain a reference 
    let toRender = undefined
    // For debugging purposes
    console.log("rendering view", currentView)
    if (currentView === "signup-or-login") {
        toRender = signupOrLoginView()
    } else if (currentView === "signup") {
        toRender = signupView()
    } else if (currentView === "login") {
        toRender = loginView()
    } else if (currentView === "signupFailed") {
        toRender = signupFailedView()
    } else if (currentView === "loginFailed") {
        toRender = loginFailedView()
    } else if (currentView === "messages") {
        toRender = messagesView()
    } else {
        // woops
        alert("unhandled currentView " + currentView)
    }

    // Removes all children from the body
    document.body.innerHTML = ""
    document.body.appendChild(toRender)
}

// Initial render
render()