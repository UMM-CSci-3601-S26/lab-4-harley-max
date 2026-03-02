import { InventoryPage } from "../support/inv.po";

const page = new InventoryPage();

describe('Inventory', () => {
  beforeEach(() => page.navigateTo());

  it('Should have the correct title', () => {
    page.getAppTitle().should('contain', 'Inventory');
  });

  it('The sidenav should open, navigate to "Inventory" and back to "Home"', () => {
    // Before clicking on the button, the sidenav should be hidden
    page.getSidenav()
      .should('be.hidden');
    page.getSidenavButton()
      .should('be.visible');

    page.getSidenavButton().click();
    page.getNavLink('Inventory').click();
    cy.url().should('match', /\/inventory$/);
    page.getSidenav()
      .should('be.hidden');

    page.getSidenavButton().click();
    page.getNavLink('Home').click();
    cy.url().should('match', /^https?:\/\/[^/]+\/?$/);
    page.getSidenav()
      .should('be.hidden');
  });

  it('Should display inventory items', () => {
    page.getSidenavButton().click();
    page.getNavLink('Inventory').click();
    cy.url().should('match', /\/inventory$/);
    page.getSidenav()
      .should('be.hidden');
    cy.contains('td', 'Backpack').should('exist');
  });
  it('should have pagination controls', () => {
    page.getSidenavButton().click();
    page.getNavLink('Inventory').click();
    cy.url().should('match', /\/inventory$/);
    page.getSidenav()
      .should('be.hidden');
    cy.get('.mat-mdc-paginator').should('exist');
  });

  it('Should display all inventory column headers', () => {
    cy.get('.demo-table thead th').as('headers');

    cy.get('@headers').should('contain', 'Item');
    cy.get('@headers').should('contain', 'Description');
    cy.get('@headers').should('contain', 'Brand');
    cy.get('@headers').should('contain', 'Color');
    cy.get('@headers').should('contain', 'Size');
    cy.get('@headers').should('contain', 'Type');
    cy.get('@headers').should('contain', 'Material');
    cy.get('@headers').should('contain', 'Count');
    cy.get('@headers').should('contain', 'Quantity');
    cy.get('@headers').should('contain', 'Notes');
  });

});
