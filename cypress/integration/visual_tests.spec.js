/// <reference types="cypress"/>
import * as loginPage from "../../page-objects/login-page";
import * as dashboardPage from "../../page-objects/dashboard-page";

describe("When login page is loaded", () => {
    before(() => {
        cy.eyesOpen({appName: 'hackaton-applitools', batchName: 'login-form'});
        
        loginPage.navigate();
    });

    it("Then all elements are properly shown", () => {
        cy.eyesCheckWindow('login page loaded');
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
                cy.eyesOpen({appName: 'hackaton-applitools-2', batchName: `login-invalid`});

                loginPage.navigate();
                loginPage.loginAs(testInput.username, testInput.password);
            });

            it(`Then an error should be displayed-${testInput.testDescription}`, () =>{
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
        cy.eyesCheckWindow('valid login - dashboard');
    });

    describe("And user sorts table by amount", () => {
        it("Then all entries are ordered by amount in ascending", () => {
            dashboardPage.orderTransactionsByAmount();
            cy.eyesCheckWindow('transactions ordered');
        });
    });

    describe("And user clicks compare expenses", () => {
        before(() => {
            dashboardPage.compareExpenses();
        });

        it("Then chart is properly loaded", () => {
            cy.eyesCheckWindow('compare expenses');
        });

        describe("And user clicks show data for next year", () => {
            before(() => {
                dashboardPage.showDataForNextYear();
                cy.eyesCheckWindow('compare expenses with next year data');
            });

            it("Then next year is added to graph", () => {
                cy.eyesCheckWindow('compare expenses with next year data');
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
        cy.eyesCheckWindow('dashboard ads are displayed');
    });

    after(() => cy.eyesClose());
});
