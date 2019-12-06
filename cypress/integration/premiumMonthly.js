/// <reference types="Cypress" />
Cypress.Commands.add('iframe', { prevSubject: 'element' }, $iframe => {
    return new Cypress.Promise(resolve => {
        $iframe.on('load', () => {
            resolve($iframe.contents().find('body'));
        });
    });
});
describe('Atakama Premium Monthly Download Test', function() {
    it('should go to Plans and Pricing page', function() {
        cy.visit('https://www.atakama.com')
        // Goto plans page
        cy.get('#tryForFreeTop').should("contain",'Try For Free')
        cy.get('#tryForFreeTop').click()
        cy.url().should('include','/pricing')
        cy.get('h1').should('contain', 'Plans & Pricing')
        
    })

    it('should go to "Atakama Premium" page', function(){
        cy.get('.button-pricing').should("contain", 'Subscribe')
        cy.get('.button-pricing').click()
        cy.url().should('include', '/premium')
        cy.get('h1').should("contain", "Subscribe to Atakama Premium")
        cy.get('#button-business-monthly').should('contain', 'Monthly Subscription')
    })

    it('Should fill out a monthly subscription iFrame Chargebee form', function() {
        
        cy.visit('https://www.atakama.com/test-premium')
        cy.get('#button-business-monthly').should('contain', 'Monthly Subscription')
        cy.get('#button-business-monthly').click()
        
        //First page
        cy.get('iframe[id="cb-frame"]').iframe().as('firstTodo')
        cy.get('@firstTodo').find('.cb-line-item__name').should('contain', 'Business Monthly')
        cy.get('@firstTodo').find('.cb-line-item__total').should('contain', '$15.00')
        cy.get('@firstTodo').find('input[name="given-name"]').type("a")
        cy.get('@firstTodo').find('input[name="family-name"]').type("b")
        cy.get('@firstTodo').find('.cb-button__primary').click()
        //Second-page
        cy.get('@firstTodo').find('input[name="billing email"]').type("tester@qa.com")
        cy.get('@firstTodo').find('input[name="phone"]').type("3471234567")
        cy.get('@firstTodo').find('input[name="billing organization"]').type("Atakama")
        cy.get('@firstTodo').find('input[name="billing address-line1"]').type("200 Park Ave")
        cy.get('@firstTodo').find('input[name="billing address-line1"]').type('{downarrow}{enter}');
        cy.get('@firstTodo').find('input[name="billing address-line2"]').type("20th floor")
        cy.get('@firstTodo').find('input[name="billing address-level2"]').type("New York")
        cy.get('@firstTodo').find('input[name="billing postal-code"]').type("11229")
        cy.get('@firstTodo').find('input[name="billing address-level1"]').type("New York")
        cy.get('@firstTodo').find('select[name="country"]').
        select('United States').should('have.value', 'US')
        cy.get('@firstTodo').find('.cb-button__primary').click()
        //Third page
        cy.get('@firstTodo').find('input[name="cc-number"]').type("4111111111111111")
        cy.get('@firstTodo').find('.cb-field__month').type("03")
        cy.get('@firstTodo').find('.cb-field__year').type("23")
        cy.get('@firstTodo').find('#first_name').type("Tester")
        cy.get('@firstTodo').find('#last_name').type("QA")
        cy.get('@firstTodo').find('.cb-button__primary').click()
        //Fourth page
        cy.get('@firstTodo').find('.cb-button__primary').click()
    })
    
    it('should open premium download page and contain links to Atakama', function()
    {
        cy.url().should('include', '/premium-download?key=').and('have.length', 65)

        cy.get('h1').should('contain', 'Atakama Premium')
        cy.get('h1').should('contain', 'Desktop Download')
                
        cy.get('#win64-dl-url').should('contain', 'Windows 7, 8, and 10 (64-Bit)')
        cy.get('#win64-dl-url').should('have.attr', 'href').and('contain', 'https://www.atakama.com/release/download/Atakama')

        cy.get('#osx-dl-url').should('contain', '(Sierra, High Sierra, Mojave)')
        cy.get('#osx-dl-url').should('have.attr', 'href').and('contain', 'https://www.atakama.com/release/download/Atakama')

        cy.get('.key-placeholder').should('not.be.empty')

    })

})

