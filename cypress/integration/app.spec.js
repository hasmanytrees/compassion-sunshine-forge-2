/// <reference types="Cypress" />

describe('Main Page', function () {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    xit('displays button when visited', function () {
        cy.get('#addSpace');
    });

    xit('displays space form when add space button is clicked', function () {
        cy.get('#addSpace').click();
        cy.get('#spaceEdit');
        cy.get('#name');
        cy.get('#memory');
        cy.get('#disk');
        cy.get('#save');
    });

    it('renders entered text on screen when \"Save\" button is clicked', function () {
        // Validate the sidebar list is empty
        cy.get('#spaceList li').should('have.length', 0);

        // Go to edit page
        cy.get('#addSpace').click();

        // Entering the details
        cy.get('#name').type('The Awesome Forrest App 3000');
        cy.get('#memory').type('1024');
        cy.get('#disk').type('1GB');
        cy.get('#save').click();

        // Switching to new views
        cy.get('#spaceDetail');
        cy.get('#name').contains('The Awesome Forrest App 3000');
        cy.get('#memory').contains('1024');
        cy.get('#disk').contains('1GB');
        cy.get('#spaceList').should('have.length', 1); // should be in sidebar
    });
});