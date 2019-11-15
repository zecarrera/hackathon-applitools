/// <reference types="cypress"/>
import * as loginPage from "../../page-objects/login-page";
import * as dashboardPage from "../../page-objects/dashboard-page";

describe("When login page is loaded", () => {
    before(() => {
        loginPage.navigate();
    });

    it("Then app logo is visible", () => {
        loginPage.logoIsVisible();
    });

    it("then header is set properly", () =>{
        loginPage.loginHeaderIsVisible();
    });

    it('Then username label, icon and input are visible', () => {
        loginPage.checkUsernameInputGroup();
    });

    it('Then password label, icon and input are visible', () => {
        loginPage.checkPasswordInputGroup();
    });

    it("then the login button is enabled", () => {
        loginPage.checkLoginButton();
    });

    it("then the remember me checkbox is available and unchecked", () => {
        loginPage.checkRememberMeAction();
    });

    it("then social media icons are visible", () => {
        loginPage.socialMediaIconsAreAvailable();
    });
});

const userAndPasswordInvalidInputs = [
    {
        username:"",
        password:""
    },
    {
        username:"testuser",
        password:""
    },
    {
        username:"",
        password:"testpass"
    }
];
userAndPasswordInvalidInputs
    .forEach(testInput => {
        describe("When user logs in with invalid data", () => {
            before(()=> {
                loginPage.navigate();
                loginPage.loginAs(testInput.username, testInput.password);
            });

            it("Then an error should be displayed", () =>{
                loginPage.isWarningMessageDisplayed();
            });
        });
    });

describe("When user logs in with valid credentials", () => {
    before(()=> {
        loginPage.navigate();
        loginPage.loginAs("testuser", "testpass");
    });
    
    it("Then app logs in successfully", () => {
        loginPage.checkUserIsLoggedIn("Jack Gomez");
    });

    describe("And user sorts table by amount", () => {
        it("Then all entries are ordered by amount in ascending", () => {
            dashboardPage.orderTransactionsByAmount();
            dashboardPage.checkTransactiosnAreOrdered();
        });
    });

    describe("And user clicks compare expenses", () => {
        before(() => {
            dashboardPage.compareExpenses();
        });

        it("Then chart is properly loaded", () => {
            dashboardPage.checkChartIsDisplayed();
        });

        it("and chart data is correct", () => {
            //can't assert against number of bars and headers... as they consist of a <canvas> element
        });

        describe("And user clicks show data for next year", () => {
            before(() => {
                dashboardPage.showDataForNextYear();
            });

            it("Then next year is added to graph", () => {
                //can't assert against number of bars and headers... as they consist of a <canvas> element
            });
        });
    });
});

describe("When user logs in using app with ads", () => {
    before(() => {
        loginPage.navigate(true);
        loginPage.loginAs("testUser", "testPass");
    });

    it("Then two ads are displayed", () => {
        dashboardPage.checkAdsAreDisplayed();
    });
});
