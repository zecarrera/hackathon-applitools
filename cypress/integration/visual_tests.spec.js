/// <reference types="cypress"/>
import * as loginPage from "../../page-objects/login-page";
import * as dashboardPage from "../../page-objects/dashboard-page";

describe("When login page is loaded", () => {
    before(() => {
        cy.eyesOpen({appName: 'hackaton-applitools', batchName: 'login-form'});
        
        loginPage.navigate();
        cy.eyesCheckWindow('login page loaded');
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

    after(() => cy.eyesClose());
});

const userAndPasswordInvalidInputs = [
    {
        username:"",
        password:"",
        testDescription: "noUsernameAndPassword"
    },
    {
        username:"testuser",
        password:"",
        testDescription: "noPassword"
    },
    {
        username:"",
        password:"testpass",
        testDescription: "noUsername"
    }
];
userAndPasswordInvalidInputs
    .forEach(testInput => {
        describe("When user logs in with invalid data", () => {
            before(()=> {
                cy.eyesOpen({appName: 'hackaton-applitools', batchName: `login-invalid-${testInput.testDescription}`});

                loginPage.navigate();
                loginPage.loginAs(testInput.username, testInput.password);
            });

            it("Then an error should be displayed", () =>{
                loginPage.isWarningMessageDisplayed();
                cy.eyesCheckWindow(`invalid login - error message shown - ${testInput.testDescription}`);
            });

            after(() => cy.eyesClose());
        });
    });

describe("When user logs in with valid credentials", () => {
    before(() => {
        cy.eyesOpen({appName: 'hackaton-applitools', batchName: 'login-valid'});

        loginPage.navigate();
        loginPage.loginAs("testuser", "testpass");
    });
    
    it("Then app logs in successfully", () => {
        loginPage.checkUserIsLoggedIn("Jack Gomez");
        cy.eyesCheckWindow('valid login - dashboard');
    });

    describe("And user sorts table by amount", () => {
        before(() => {
            cy.eyesOpen({appName: 'hackaton-applitools', batchName: 'transactions-ordering'});
        });
        
        it("Then all entries are ordered by amount in ascending", () => {
            dashboardPage.orderTransactionsByAmount();
            dashboardPage.checkTransactiosnAreOrdered();
            cy.eyesCheckWindow('transactions ordered');
        });
    });

    describe("And user clicks compare expenses", () => {
        before(() => {
            dashboardPage.compareExpenses();
        });

        it("Then chart is properly loaded", () => {
            dashboardPage.checkChartIsDisplayed();
            cy.eyesCheckWindow('compare expenses');
        });

        it("and chart data is correct", () => {
            //can't assert against number of bars and headers... as they consist of a <canvas> element
        });

        describe("And user clicks show data for next year", () => {
            before(() => {
                dashboardPage.showDataForNextYear();
                cy.eyesCheckWindow('compare expenses with next year data');
            });

            it("Then next year is added to graph", () => {
                //can't assert against number of bars and headers... as they consist of a <canvas> element
            });
        });

    });
  
    after(() => cy.eyesClose());
});

describe("When user logs in using app with ads", () => {
    before(() => {
        cy.eyesOpen({appName: 'hackaton-applitools', batchName: 'dashboard-with-ads'});
        loginPage.navigate(true);
        loginPage.loginAs("testUser", "testPass");
    });

    it("Then two ads are displayed", () => {
        dashboardPage.checkAdsAreDisplayed();
        cy.eyesCheckWindow('dashboard ads are displayed');
    });

    after(() => cy.eyesClose());
});
