/// <reference types="Cypress" />
describe('Check that Basic download form works for Desktop users', function() {
    it('should go to "atakama.com/pricing" page', function() {
        cy.visit('https://www.atakama.com')
        // Goto plans page
        cy.get('#tryForFreeTop').should("contain",'Try For Free')
        cy.get('#tryForFreeTop').click()
        cy.url().should('include','pricing')
        cy.get('h1').should('contain', 'Plans & Pricing')
        
    })
    
    it('should go to "Basic Download" page', function(){
        cy.get('.button-pricing-basic').should("contain", 'Download')
        cy.get('.button-pricing-basic').click()
        cy.url().should('include', 'basic')
        cy.get('h1').should("contain", "Atakama Basic")
    })
    
    it('fills out the basic download form', function() {
        cy.get('#basic-download-form-mobile').should('not.be.visible')
        
        cy.get('#wf-form-Basic-Download').as('Desktop-form')
        cy.get('@Desktop-form').should("be.visible")
        cy.get('@Desktop-form').within(() => {
            cy.get('[for="first-name"]').should("contain", 'Full name:')
            cy.get('#first-name').type('John').should('have.value', 'John')
            cy.get('#Last-name').type('John').should('have.value', 'John')
            cy.get('[for="email"]').should('contain', 'Email address:')
            cy.get('#email').type('qa@tester.com').should('have.value', 'qa@tester.com')
            cy.get('.button').should('contain','Submit')
            cy.get('.button').click()
        })
        cy.get('#win64-dl-url').should('contain', 'Windows 7, 8, and 10 (64-Bit)')
        cy.get('#win64-dl-url').should('have.attr', 'href').and('contain', 'https://www.atakama.com/release/download/Atakama')

        cy.get('#osx-dl-url').should('contain', '(Sierra, High Sierra, Mojave)')
        cy.get('#osx-dl-url').should('have.attr', 'href').and('contain', 'https://www.atakama.com/release/download/Atakama')
    })

    
})