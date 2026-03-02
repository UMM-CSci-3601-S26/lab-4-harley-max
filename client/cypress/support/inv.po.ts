
export class InventoryPage {
  private readonly baseUrl = '/inventory';
  private readonly titleSelector = '.inventory-title';
  private readonly sideNavButton = '.sidenav-button';
  private readonly sideNav = '.sidenav';
  private readonly sideNavOption = '[routerlink] > .mdc-list-item__content';


  navigateTo() {
    return cy.visit(this.baseUrl);
  }

  getAppTitle() {
    return cy.get(this.titleSelector);
  }

  getSidenavButton() {
    return cy.get(this.sideNavButton);
  }

  getSidenav() {
    return cy.get(this.sideNav);
  }

  getNavLink(navOption: 'Home' | 'Inventory') {
    return cy.contains(this.sideNavOption, `${navOption}`);
  }
  getInventoryItem() {
    return cy.get('.inventory-item');
  }
}
