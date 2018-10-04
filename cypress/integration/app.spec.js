/// <reference types="Cypress" />
const clearDB = () => {
    cy.exec('psql -d spaces_development -a -f clearDB.sql')
}

describe('Main Page', function () {
    beforeEach(() => {
        clearDB();
        cy.visit('http://localhost:3000');
    });

    after(() => {
        clearDB();
    });

    it('displays button when visited', function () {
        cy.get('#addSpace');
    });

    it('displays space form when add space button is clicked', function () {
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
        cy.get('#disk').type('1');

        // Save
        cy.get('#save').click();

        // Switching to new views
        cy.get('#spaceDetail');
        cy.get('#name').contains('The Awesome Forrest App 3000');
        cy.get('#memory').contains('1024');
        cy.get('#disk').contains('1');
        cy.get('#spaceList').should('have.length', 1); // should be in sidebar
    });

    it('renders space list after saving a space and refreshing the browser', function () {
        // Validate the sidebar list is empty
        cy.get('#spaceList li').should('have.length', 0);

        // Go to edit page
        cy.get('#addSpace').click();

        // Entering the details
        cy.get('#name').type('The Awesome Forrest App 3000');
        cy.get('#memory').type('1024');
        cy.get('#disk').type('1');

        // Save
        cy.get('#save').click();

        // Reload
        cy.reload();

        // Switching to new views
        cy.get('#spaceList').should('have.length', 1); // should be in sidebar
    });
});