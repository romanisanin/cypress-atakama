describe('Traverses from homepage to plans and pricing page to contact us page', function() {
    it('fills out the contact form', function() {
        //Arrange
        cy.visit('https://www.atakama.com')
        //Act

        // Goto plans and pricing page
        cy.get('#tryForFreeBottom').should('contain', 'Try For Free')
        cy.get('#tryForFreeBottom').click()
        
        // Goto contact page
        cy.url().should('include', '/pricing')
        cy.get('.column-3 > .plan-basic-div > .div-block-77 > .h3-medium').should('contain', 'Enterprise')
        cy.get('.button-pricing-contactus').should('have.attr', 'href').and('contain', '/contact')
        cy.get('.button-pricing-contactus').should('contain', 'Contact Us')
        cy.get('.button-pricing-contactus').click()
        // Find form
        cy.url().should('include', '/contact')
        cy.get('h1').should('contain', 'Get in touch')
        cy.get('.top-headline-div > :nth-child(2)').contains('here').should('have.attr', 'href', 'https://support.atakama.com/support/tickets/new')

        cy.get('#wf-form-Contact-Us').within(() => {
            cy.get('#name').type('Swedish Fish').should('have.value', 'Swedish Fish')
            cy.get('#email').type('qa@tester.com').should('have.value', 'qa@tester.com')
            cy.get('#Your-Phone-2').type('212-555-1234').should('have.value', '212-555-1234')
            cy.get('#Job-Title').type('CEO').should('have.value', 'CEO')
            cy.get('#Company-Size').select('101-500').should('have.value', '101-500')
            cy.get('#Country').type('USA').should('have.value', 'USA')
            cy.get('#Subject-Business').type('Testing Contact Us Page').should('have.value', 'Testing Contact Us Page')
            cy.contains('Submit').click()

        })

        //Assert
    })
})