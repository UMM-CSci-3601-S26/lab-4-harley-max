import { AppPage } from '../support/app.po';

const page = new AppPage();

describe('App', () => {
  beforeEach(() => page.navigateTo());

  it('Should have the correct title', () => {
    page.getAppTitle().should('contain', 'CSCI 3601 - HGBT Iteration 1');
  });

  // Note: This should be updated to include the Supply List page once that is implemented
  it('The sidenav should open, navigate to "Inventory" and back to "Home"', () => {
    // Before clicking on the button, the sidenav should be hidden
    page.getSidenav()
      .should('be.hidden');
    page.getSidenavButton()
      .should('be.visible');

    // Click the sidenav button
    page.getSidenavButton().click();
    page.getNavLink('Inventory').click();
    cy.url().should('match', /\/inventory$/);
    page.getSidenav()
      .should('be.hidden');

    // Try to navigate to Home
    page.getSidenavButton().click();
    page.getNavLink('Home').click();
    cy.url().should('match', /^https?:\/\/[^/]+\/?$/);
    page.getSidenav()
      .should('be.hidden');
  });
});
