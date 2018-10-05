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

    const createSpace = () => {
        // Go to edit page
        cy.get('#addSpace').click();

        // Entering the details
        cy.get('#name').type('The Awesome Forrest App 3000');
        cy.get('#memory').type('1024');
        cy.get('#disk').type('1');

        // Save
        cy.get('#save').click();
    }

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

    it('shows details of space when a space is clicked in sidebar', function () {
        createSpace()

        // Reload
        cy.reload();

        // Click item in sidebar
        cy.get('#spaceList').get('a').first().click();

        cy.get('#spaceDetail');
    });

    it('renders the edit space view when clicking the edit button on a space detail view', function () {
        createSpace()

        // Click Edit on the space detail view
        cy.get('#editButton').click();

        cy.get('#spaceEdit');
    });

    it('returns to space detail screen when clicking the cancel button', function () {
        createSpace()

        cy.get('#spaceList').get('a').first().click();
        cy.get('#editButton').click();
        cy.get('#memory').type('7');
        cy.get('#cancel').click();

        cy.get('#spaceDetail');

        cy.get('#memory').should('not.contain', '7');
    });

    it('should update an existing space after editing it and clicking save', function () {
        createSpace();

        cy.get('#spaceList').get('a').first().click();
        cy.get('#editButton').click();

        cy.get('#memory').type('7');
        cy.get('#save').click();

        cy.get('#memory').contains('7');
    });

    it('should prompt user for confirmation when delete button is clicked', function () {
        cy.on('window:confirm', (str) => {
            expect(str).to.eq('Delete?');
        });

        createSpace();

        cy.get('#spaceList').get('a').first().click();

        cy.get('#deleteButton').click();
    });

    it('removes space from sidebar when delete is confirmed', function () {
        cy.on('window:confirm', (str) => {
            expect(str).to.eq('Delete?');
        });

        createSpace();

        cy.get('#spaceList').get('a').first().click();

        cy.get('#deleteButton').click();

        cy.get('#spaceList').get('a').should('have.length', 0);
    });

    it('when viewing details of a space there is an add button', function () {
        createSpace();

        cy.get('#spaceList').get('a').first().click();

        cy.get('#addApp');
    });

    it.only('clicking the Add App button goes to the Create App screen', function () {
        createSpace();

        cy.get('#addApp').click();

        cy.get('#appEdit');
    });
});