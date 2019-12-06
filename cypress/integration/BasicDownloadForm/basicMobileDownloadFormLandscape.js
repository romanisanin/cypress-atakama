/// <reference types="Cypress" />
describe('Check that Basic download form works for Mobile Users in Tablet view', function() {
    beforeEach(function () {
        cy.viewport('iphone-6+', 'landscape')
      })
    
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
        cy.get('#wf-form-Basic-Download').should('not.be.visible')
        
        cy.get('#basic-download-form-mobile').as('mobile-form')
        cy.get('@mobile-form').should("be.visible")
        cy.get('@mobile-form').within(() => {
            cy.get('[for="first-name-2"]').should('not.be.visible')
            cy.get('#first-name-2').should('not.be.visible')
            cy.get('#Last-name-2').should('not.be.visible')
            cy.get('[for="email-2"]').should('contain', 'Email address:')
            cy.get('#email-2').type('qa@tester.com').should('have.value', 'qa@tester.com')
            cy.get('.button').should('contain','Submit')
            cy.get('.button').click()
        })
        cy.get('.basic-success-message > img').should('be.visible')
    })
})