import { clickElement, elementIsVisible} from "../cypress/helpers/helpers";

const usernameLabel = ":nth-child(1) > label";
const usernameIcon = ":nth-child(1) > .pre-icon";
const usernameInput = "#username";
const passwordLabel = 'form > :nth-child(2) > label';
const passwordIcon = ":nth-child(2) > .pre-icon";
const passwordInput = "#password";
const loginButton = "#log-in";
const rememberMeLabel = ".form-check-label";
const rememberMeInput = ".form-check-input";
const twitterIcon = "[style='display: inline-block; margin-bottom:4px;'] > img";
const linkedinIcon = ":nth-child(3) > img";
const facebookIcon = ":nth-child(2) > img";
const warningMessage = ".alert-warning";
const loggedUsernameLabel = "#logged-user-name";


function navigate(withAds = false) {
    const url = `${getBaseUrlOrDefaultToV2()}?showAd=${withAds}`;
    cy.visit(url);
}

function getBaseUrlOrDefaultToV2() {
    const hackatonV2Url = "https://demo.applitools.com/hackathonV2.html";
    return !!Cypress.env("baseUrl") ? Cypress.env("baseUrl") : hackatonV2Url;
}

function checkLoginButton() {
    cy.get(loginButton).should("be.enabled").should("be.visible");
}

function checkUsernameInputGroup() {
    elementIsVisible(usernameLabel);
    cy.get(usernameLabel).should("have.text", "Username");
    elementIsVisible(usernameIcon);
    cy.get(usernameInput).invoke('attr', 'placeholder').should('contain', 'username');
    
    cy.get(usernameInput).should("be.enabled").should("be.visible");
}

function checkPasswordInputGroup() {
    elementIsVisible(passwordLabel);
    cy.get(passwordLabel).should("have.text", "Password");
    elementIsVisible(passwordIcon);
    cy.get(passwordInput).should("be.enabled").should("be.visible");
    cy.get(passwordInput).invoke('attr', 'placeholder').should('contain', 'password');
}

function checkRememberMeAction() {
    cy.get(rememberMeLabel).should("have.text", "Remember Me");
    cy.get(rememberMeInput)
        .should("be.enabled")
        .should("be.visible")
        .should("not.be.checked");
}

function socialMediaIconsAreAvailable() {
    elementIsVisible(facebookIcon);
    elementIsVisible(twitterIcon);
    elementIsVisible(linkedinIcon);
}

function logoIsVisible() {
    elementIsVisible(".logo-w > a > img");
}

function loginHeaderIsVisible() {
    elementIsVisible('.auth-header');
}

function isWarningMessageDisplayed() {
    cy.get(warningMessage).should("contain.text", "must be present");
}

function loginAs(username, password) {
    if(!!username) {
        cy.get(usernameInput).type(username);
    }
    if(!!password) {
        cy.get(passwordInput).type(password);
    }
    clickElement(loginButton);
}

function checkUserIsLoggedIn(username) {
    cy.get(loggedUsernameLabel).should("contain.text", username);
}

module.exports = {
    checkLoginButton,
    checkPasswordInputGroup,
    checkRememberMeAction,
    checkUsernameInputGroup,
    checkUserIsLoggedIn,
    isWarningMessageDisplayed,
    logoIsVisible,
    loginAs,
    loginHeaderIsVisible,
    navigate,
    socialMediaIconsAreAvailable
};