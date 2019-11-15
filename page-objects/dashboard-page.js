import { clickElement, elementIsVisible} from "../cypress/helpers/helpers";

const amountTableHeader = "#amount";
const amountTableRowValue = "td.text-right";
const firstRowAmount = "tbody > :nth-child(1) > .text-right";
const compareExpensesLink = "#showExpensesChart";
const comparisonChart = '#canvas';
const dataForNextYearLink = '#addDataset';
const firstSaleAd = "#flashSale";
const secondSaleAd = "#flashSale2";

function checkAdsAreDisplayed() {
    elementIsVisible(firstSaleAd);
    elementIsVisible(secondSaleAd);
}

function orderTransactionsByAmount() {
    clickElement(amountTableHeader);
}

function checkTransactiosnAreOrdered() {
    let currentAmountValue = cy.get(firstRowAmount);
    cy.get(amountTableRowValue)
    .then(tdAmount => {
        if(tdAmount >= currentAmountValue) {
            currentAmountValue = tdAmount;
        } else {
            throw new Error("Transaction entries are not ordered ascending");
        }
    });
}

function checkChartIsDisplayed() {
    cy.get(comparisonChart).should("be.visible");
}

function compareExpenses() {
    clickElement(compareExpensesLink);
}

function showDataForNextYear(){
    clickElement(dataForNextYearLink);
}

module.exports = {
    checkAdsAreDisplayed,
    checkChartIsDisplayed,
    checkTransactiosnAreOrdered,
    compareExpenses,
    orderTransactionsByAmount,
    showDataForNextYear
};