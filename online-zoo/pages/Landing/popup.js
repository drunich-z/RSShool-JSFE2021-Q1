const coverElem = document.getElementById("cover");
const bodyElem = document.getElementById("body");

const signInButton = document.getElementById("header-signIn");
const logInButton = document.getElementById("header-logIn");
const userSignInButton = document.getElementById("header-user");

const formUserElem = document.getElementById("form-signIn");

formUserSignInButton = document.getElementById("btn-signIn");
formUserLogInButton = document.getElementById("btn-logIn");

const formUserNameWrapper = document.getElementById("signIn-name-wrapper");
const formUserCheckboxWrapper = document.getElementById(
  "signIn-checkbox-wrapper"
);

const formUserNameInput = document.getElementById("signIn-name");
const formUserEmailInput = document.getElementById("signIn-email");
const formUserPasswordInput = document.getElementById("signIn-password");
const formUserCheckboxInput = document.getElementById("signIn-checkbox");

const formUserSendButton = document.getElementById("btn-signIn-send");
const formUserGoogleButton = document.getElementById("btn-google-signIn");
const formUserFacebookButton = document.getElementById("btn-facebook-signIn");

//SignIn or LogIn (one form)
function initUserForm(e) {
  const exactForm =
    e.target == undefined
      ? e.dataset.activateform
      : e.target.dataset.activateform;
  if (exactForm === "signIn") {
    if (formUserElem.dataset.currentform !== "signIn") {
      formUserSignInButton.classList.add("popup-btn-active");
      formUserLogInButton.classList.remove("popup-btn-active");
      formUserNameWrapper.classList.remove("hidden");
      formUserNameInput.setAttribute("required", true);
      formUserCheckboxWrapper.classList.remove("hidden");
      formUserCheckboxInput.setAttribute("required", true);
      formUserElem.dataset.currentform = "signIn";
    }
  }
  if (exactForm === "logIn") {
    if (formUserElem.dataset.currentform !== "logIn") {
      formUserSignInButton.classList.remove("popup-btn-active");
      formUserLogInButton.classList.add("popup-btn-active");
      formUserNameWrapper.classList.add("hidden");
      formUserNameInput.removeAttribute("required", true);
      formUserCheckboxWrapper.classList.add("hidden");
      formUserCheckboxInput.removeAttribute("required", true);
      formUserElem.dataset.currentform = "logIn";
    }
  }
}

//сделать тултип на любой элемент
function signInValidate() {
  if (
    (formUserElem.dataset.currentform == "signIn" &&
      formUserNameInput.validity.valid &&
      formUserEmailInput.validity.valid &&
      formUserPasswordInput.validity.valid &&
      formUserCheckboxInput.validity.valid) ||
    (formUserElem.dataset.currentform == "logIn" &&
      formUserEmailInput.validity.valid &&
      formUserPasswordInput.validity.valid)
  ) {
    formUserSendButton.classList.remove("btn-signIn-invalid");
  } else {
    formUserSendButton.classList.add("btn-signIn-invalid");
  }
}

function login(e) {
  let userName = "";
  if (e.target === formUserGoogleButton) userName = "Logged in with Google";
  if (e.target === formUserFacebookButton) userName = "Logged in with Facebook";
  if (e.target === formUserSendButton) {
    if (formUserElem.dataset.currentform === "signIn") {
      userName = "logged as " + formUserNameInput.value;
    } else {
      userName = "logged as " + formUserEmailInput.value;
    }
  }
  userSignInButton.dataset.authorized = true;
  userSignInButton.title = userName;

  signInButton.classList.add("hidden");
  logInButton.classList.add("hidden");
  userSignInButton.classList.remove("hidden");
  coverElem.click();
}

function loginFromSend(e) {
  if (formUserSendButton.classList.contains("btn-signIn-invalid")) return;
  login(e);
  e.preventDefault();
}

function logout() {
  console.log("ttt");
}

function setSignInListeners() {
  formUserSignInButton.addEventListener("click", initUserForm);
  formUserLogInButton.addEventListener("click", initUserForm);
  formUserNameInput.addEventListener("input", signInValidate);
  formUserEmailInput.addEventListener("input", signInValidate);
  formUserPasswordInput.addEventListener("input", signInValidate);
  formUserCheckboxInput.addEventListener("input", signInValidate);
  formUserSendButton.addEventListener("click", loginFromSend);
  formUserGoogleButton.addEventListener("click", login);
  formUserFacebookButton.addEventListener("click", login);
}

function removeSignInListeners() {
  formUserSignInButton.removeEventListener("click", initUserForm);
  formUserLogInButton.removeEventListener("click", initUserForm);
  formUserNameInput.removeEventListener("input", signInValidate);
  formUserEmailInput.removeEventListener("input", signInValidate);
  formUserPasswordInput.removeEventListener("input", signInValidate);
  formUserCheckboxInput.removeEventListener("input", signInValidate);
  formUserSendButton.removeEventListener("click", login);
  formUserGoogleButton.removeEventListener("click", login);
  formUserFacebookButton.removeEventListener("click", login);
}

signInButton.addEventListener("click", () => {
  bodyElem.classList.add("notScrollable");
  coverElem.classList.remove("hidden");
  initUserForm(formUserSignInButton);
  formUserElem.classList.remove("hidden");
  setSignInListeners();
});

userSignInButton.addEventListener("click", (e) => {
  if (!e.target.parentNode.dataset.authorized) {
    bodyElem.classList.add("notScrollable");
    coverElem.classList.remove("hidden");
    initUserForm(formUserSignInButton);
    formUserElem.classList.remove("hidden");
    setSignInListeners();
  } else {
    logout();
  }
});

logInButton.addEventListener("click", () => {
  bodyElem.classList.add("notScrollable");
  coverElem.classList.remove("hidden");
  initUserForm(formUserLogInButton);
  formUserElem.classList.remove("hidden");
  setSignInListeners();
});

coverElem.addEventListener("click", () => {
  bodyElem.classList.remove("notScrollable");
  coverElem.classList.add("hidden");
  formUserElem.classList.add("hidden");
  removeSignInListeners();
});
