function elementIsVisible(locator) {
    cy.get(locator).should("be.visible");
}

function clickElement(locator) {
    cy.get(locator).click();
}

module.exports = {
    clickElement,
    elementIsVisible
};