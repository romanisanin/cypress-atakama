/// <reference types="Cypress" />
describe('Check that Landing Page has a links to download Windows and Mac version', function() {
    it('should go to atakama.com/pricing page', function() {
        cy.visit('https://www.atakama.com/start')
        cy.url().should('include', "/start")
        cy.get('.brand').should('have.attr', 'href').and('contain', '/start')
        cy.get('#win64-dl-url').should('contain', 'Download for Windows')
        cy.get('#win64-dl-url').should('have.attr', 'href').and('contain', 'https://www.atakama.com/release/download/Atakama')

        cy.get('#win64-dl-url-2').should('contain', 'Download for Windows')
        cy.get('#win64-dl-url-2').should('have.attr', 'href').and('contain', 'https://www.atakama.com/release/download/Atakama')

        cy.get('#osx-dl-url').should('contain', 'Download for Mac')
        cy.get('#osx-dl-url').should('have.attr', 'href').and('contain', 'https://www.atakama.com/release/download/Atakama')

        cy.get('#osx-dl-url-2').should('contain', 'Download for Mac')
        cy.get('#osx-dl-url-2').should('have.attr', 'href').and('contain', 'https://www.atakama.com/release/download/Atakama')
    })
})