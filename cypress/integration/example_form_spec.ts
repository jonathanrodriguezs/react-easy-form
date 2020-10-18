describe("Basic Form test", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000");

    cy.get('input[name="name"]').as("name-text");
    cy.get('input[name="secret"]').as("secret-text");
    cy.get("#mui-component-select-hometown").as("hometown-select");
    cy.get('input[name="language"][value="ASM"]').as("language-radio");
    cy.get('textarea[name="notes"]').as("notes-textarea");
    cy.get("button#submit").as("submit-button");
  });

  it("Should submit successfully the form", function () {
    cy.get("@name-text").type("Randal Gregory");
    cy.get("@secret-text").type("CSDH439");
    cy.get("@hometown-select").click();
    cy.get('#menu-hometown li[data-value="other"]').click();
    cy.get('input[name="hometown-other"]').type("Tokyo");
    cy.get("@language-radio").check();
    cy.get("@notes-textarea").type("Excellent developer");
    cy.get("@submit-button").click();

    cy.on("window:alert", (txt) => {
      expect(txt).to.contains("Randal Gregory");
    });
  });
});
