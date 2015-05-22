Feature: native support for CRUD operations
  As a developer
  I want to have simple, boilerplate-free code for API resource definition
  
  Scenario: green path
    Given a valid person resource
    When I post it to its endpoint
    Then the resource is added to the database