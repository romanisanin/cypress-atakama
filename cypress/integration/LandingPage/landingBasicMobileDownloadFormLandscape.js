/// <reference types="Cypress" />
describe('Check that Basic download form works for Mobile Landscape view users', function() {
    beforeEach(function () {
        cy.viewport('iphone-6+', 'landscape')
      })
    
    it('should check required elements on the landing start page', function() {
        cy.visit('https://www.atakama.com/start')
        cy.url().should('include', "/start")
        cy.get('.brand').should('have.attr', 'href', '/start')
        cy.get('.button-main-landing').should('contain', 'Click to get a download link')
        cy.get('.w-icon-nav-menu').should('be.visible')
    })
    
    it('should go to "atakama.com/basic-landing" page', function() {
        cy.get('.container > .centering-div > .button-main-landing').click()
        cy.url().should('include','/basic-landing')
        cy.get('.brand').should('have.attr', 'href', '/start')
        cy.get('h1').should('contain', 'Atakama for desktop file encryption')

        cy.get('wf-form-Basic-Download').should('not.be.visible')

        cy.get('#wf-form-Mobile-Download-Submission').as('mobileForm')
        cy.get('@mobileForm').should('be.visible')
        cy.get('@mobileForm').within(() =>{
            cy.get('[for="email-2"]').should('contain', 'Enter your email to receive a download link for your desktop:')
            cy.get('#email-2').should('be.visible')
            cy.get('.button').should('be.visible')
        })
        
    })

    it('should submit the form "Mobile Download Sumbmission"', function(){
        cy.get('#wf-form-Mobile-Download-Submission').as('mobileForm')
        cy.get('@mobileForm').within(() =>{
            cy.get('#email-2').type('qa@tester.com').should('have.value', 'qa@tester.com')
            cy.get('.button').click()
        })
        cy.get('.basic-success-message > img').should('be.visible')
    })
    
})