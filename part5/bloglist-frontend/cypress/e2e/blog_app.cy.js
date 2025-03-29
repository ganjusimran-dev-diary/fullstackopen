describe("Blog app", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "tatiya",
      username: "ganju",
      password: "simran",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user).then(() => {
      cy.window().then((win) => {
        win.localStorage.setItem("currentUser", JSON.stringify({}));
      });
      cy.visit("http://localhost:5173");
    });
    cy.visit("http://localhost:5173");
  });

  it("front page displays the login form by default", function () {
    cy.contains("Log in to application");
  });

  describe("Login", function () {
    it("user fails with wrong credentials", function () {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();

      cy.contains("Wrong username or password").should("exist");
    });

    it("user can log in with correct credentials", function () {
      cy.get("#username").type("ganju");
      cy.get("#password").type("simran");
      cy.get("#login-button").click();

      cy.contains("tatiya is logged in").should("exist");

      // Ensure localStorage is updated
      cy.window().then((win) => {
        const user = JSON.parse(win.localStorage.getItem("currentUser"));
        expect(user).to.have.property("token");
      });
    });
  });

  describe("When logged in", function () {
    beforeEach(() => {
      cy.request("POST", "http://localhost:3001/api/login", {
        username: "ganju",
        password: "simran",
      }).then((response) => {
        cy.window().then((win) => {
          win.localStorage.setItem(
            "currentUser",
            JSON.stringify(response.body)
          );
        });
        cy.visit("http://localhost:5173");
      });
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("Introduction to Cypress App");
      cy.get("#author").type("Cypress App");
      cy.get("#url").type(
        "https://docs.cypress.io/app/core-concepts/introduction-to-cypress#Cypress-Can-Be-Simple-Sometimes"
      );
      cy.get("#submit-button").click();

      cy.contains(
        "a new blog Introduction to Cypress App by Cypress App is added"
      ).should("exist");
    });

    it("a blog can be liked", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("Introduction to Cypress App");
      cy.get("#author").type("Cypress App");
      cy.get("#url").type(
        "https://docs.cypress.io/app/core-concepts/introduction-to-cypress#Cypress-Can-Be-Simple-Sometimes"
      );
      cy.get("#submit-button").click();
      cy.contains("view")
        .closest(".blog")
        .within(() => {
          cy.get("#view-blog").should("exist").click();
        });
      cy.contains("hide")
        .closest(".blog")
        .within(() => {
          cy.get(".likeBlog").should("be.visible").click();
        });
    });
  });
});
