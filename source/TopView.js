import { ajaxSignIn, ajaxSignOut } from "./ajaxStuff.js";

export default class TopView{
    constructor(id=null){
        this.element = null;

        this.loginLabel = null;
        this.loginForm = null;

        this.logoutLabel = null;

        
        this.userNameLabel = null;
        this.userNameInput = null;
        this.passwordLabel = null;
        this.passwordInput = null;
        

        this.isLoggedIn = false;
        

        this.username = "";
        this.password = "";

        this.instantiateView(id);
    }

    detectIfHitEnter(e){
        if (e.key === 'Enter' || e.keyCode === 13){
            this.login();
        }
    }

    login = () => {
        ajaxSignIn(this.username, this.password, this.login);
    }

    logout = () => {
        ajaxSignOut(this.username, this.logout);
    }

    onLogin = () => {
        this.isLoggedIn = true;
        this.updateLogin();
    }

    onLogout(){
        this.isLoggedIn = false;
        this.updateLogin();
    }

    updateLogin = () => {
        if (this.isLoggedIn){
            this.userNameLabel.hidden = true;
            this.userNameInput.hidden = true;
            this.passwordLabel.hidden = true;
            this.passwordInput.hidden = true;

            this.loginLabel.hidden = true;
            this.logoutLabel.hidden = false;
        }
        else{
            this.userNameLabel.hidden = false;
            this.userNameInput.hidden = false;
            this.passwordLabel.hidden = false;
            this.passwordInput.hidden = false;

            this.logoutLabel.hidden = true;
            this.loginLabel.hidden = false;
        }
    }

    instantiateView = (id) => {
        const element = document.createElement('div');
        //element.className = "topDiv";
        //element.className = "sb-topnav navbar navbar-expand navbar-dark bg-dark";
        
        
        if (id){
            element.id = id;
        }
        //element.id = 'fixed-top';

        const userNameLabel = document.createElement('div');
        userNameLabel.className = "top-element";
        userNameLabel.innerHTML = "Username: ";
        const userNameInput = document.createElement('input');
        userNameInput.type = "text";
        userNameInput.size = 10;
        this.userNameLabel = userNameLabel;
        this.userNameInput = userNameInput;

        const passwordLabel = document.createElement('div');
        passwordLabel.innerHTML = "Password: ";
        passwordLabel.className = "top-element";
        const passwordInput = document.createElement('input');
        passwordInput.type = "password";
        passwordInput.size = 10;
        //passwordInput.
        this.passwordLabel = passwordLabel;
        this.passwordInput = passwordInput;

        userNameInput.addEventListener("input", ()=> {this.username = userNameInput.value;});
        passwordInput.addEventListener("input", ()=> {this.password = passwordInput.value;});

        userNameInput.addEventListener("change", ()=> {this.username = userNameInput.value;});
        passwordInput.addEventListener("change", ()=> {this.password = passwordInput.value;});
        passwordInput.addEventListener("input", (e) => {this.detectIfHitEnter(e);});

        
        const loginLabel = document.createElement('button');
        loginLabel.innerHTML = "Login";
        loginLabel.addEventListener("click", this.login );
        this.loginLabel = loginLabel;

        const logoutLabel = document.createElement('div');
        logoutLabel.innerHTML = "Logout";
        logoutLabel.addEventListener("click", this.logout);
        this.logoutLabel = logoutLabel;

        this.updateLogin();


        this.element = element;
        element.append(userNameLabel);
        element.append(userNameInput);
        element.append(passwordLabel);
        element.append(passwordInput);

        element.append(loginLabel);
        //element.append(welcomeLabel);
        element.append(logoutLabel);
        
        this.userNameLabel = userNameLabel;
        this.userNameInput = userNameInput;
        
        this.passwordLabel = passwordLabel;
        this.passwordInput = passwordInput;
    }
}