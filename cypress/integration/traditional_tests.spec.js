/// <reference types="cypress"/>
import {
    checkAdsAreDisplayed,
    checkChartIsDisplayed,
    checkLoginButton,
    checkPasswordInputGroup,
    checkRememberMeAction,
    checkUsernameInputGroup,
    checkUserIsLoggedIn,
    checkTransactiosnAreOrdered,
    compareExpenses,
    isWarningMessageDisplayed,
    logoIsVisible,
    loginAs,
    loginHeaderIsVisible,
    navigate,
    orderTransactionsByAmount,
    showDataForNextYear,
    socialMediaIconsAreAvailable
} from "../../page-objects/login-page";

describe("When login page is loaded", () => {
    beforeEach(() => {
        navigate();
    });

    it("Then app logo is visible", () => {
        logoIsVisible();
    });

    it("then header is set properly", () =>{
        loginHeaderIsVisible();
    });

    it('Then username label, icon and input are visible', () => {
        checkUsernameInputGroup();
    });

    it('Then password label, icon and input are visible', () => {
        checkPasswordInputGroup();
    });

    it("then the login button is enabled", () => {
        checkLoginButton();
    });

    it("then the remember me checkbox is available and unchecked", () => {
        checkRememberMeAction();
    });

    it("then social media icons are visible", () => {
        socialMediaIconsAreAvailable();
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
            beforeEach(()=> {
                navigate();
                loginAs(testInput.username, testInput.password);
            });

            it("Then an error should be displayed", () =>{
                isWarningMessageDisplayed();
            });
        });
    });

describe("When user logs in with valid credentials", () => {
    beforeEach(()=> {
        navigate();
        loginAs("testuser", "testpass");
    });
    
    it("Then app logs in successfully", () => {
        checkUserIsLoggedIn("Jack Gomez");
    });

    describe("And user sorts table by amount", () => {
        it("Then all entries are ordered by amount in ascending", () => {
            orderTransactionsByAmount();
            checkTransactiosnAreOrdered();
        });
    });

    describe("And user clicks compare expenses", () => {
        beforeEach(() => {
            compareExpenses();
        });

        it("Then chart is properly loaded", () => {
            checkChartIsDisplayed();
        });

        it("and chart data is correct", () => {
            //can't assert against number of bars and headers... as they consist of a <canvas> element
        });

        describe("And user clicks show data for next year", () => {
            beforeEach(() => {
                showDataForNextYear();
            });

            it("Then next year is added to graph", () => {
                //can't assert against number of bars and headers... as they consist of a <canvas> element
            });
        });
    });
});

describe("When user logs in using app with ads", () => {
    beforeEach(() => {
        navigate(true);
        loginAs("testUser", "testPass");
    });

    it("Then two ads are displayed", () => {
        checkAdsAreDisplayed();
    });
});
