// https://docs.cypress.io/api/introduction/api.html

describe("Page: Contact Us", () => {
  before(() => {
    cy.visit("/#/contact_us");
  });

  it("page title is '联系我们'", () => {
    cy.title().should("eq", "联系我们");
  });

  it("qq is correctly", () => {
    cy.contains(".cell:nth-child(1) > .content", "官方QQ");
    cy.contains(".cell:nth-child(1) > .right", "3517463744");
  });

  it("tips content is '加客服微信进入官方微信群'", () => {
    cy.contains(".tips", "加客服微信进入官方微信群");
  });
});
