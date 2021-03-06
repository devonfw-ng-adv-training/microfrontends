# microfrontends
Code for the microfrontend exercises of the Angular Advanced training

This contains one main exercise with three parts and one sample solution
for creating npm modules out of Angular modules.

# Structure Microfrontend - Web Components

## Goal

Modify the "Tour of Heroes" so that the hero row in the list is a separately loaded web component with a minimal API.

## Origin

Baseline is branch "start-part-1".
It is based on the Angular tutorial example "Tour of Heroes"
(2019-08-23, download from https://angular.io/tutorial, running example https://stackblitz.com/angular/apxmkvnedrk)
but with some specific modifications to illustrate the web component development.

Codebase is updated to Angular 8.2.11.

The following modifications were made:
* Move the styling of the badge from heroes.component.css to styles.css
* Introduce Badge next at top of heroes list for count
* Bugfix: initialized heroes variable in heroes component
* Feature: added a refresh button to list
* Removed the simulated backend server and put the list in the HeroesService
* Removed the local storage of the list in the heroes component and reload upon change

## Parts

The exercise is split into the following parts, each with their own goal and learnings.

1. Custom Element & Shadow DOM: Extract a Custom Element for the row in the heroes list and use it
1. Separate Deployment: Build a separately deployable file with the Custom Element
1. Independent Custom Elements: Let the hero row use the hero service directly for data loading and deletion

Details below.

# Part 1 - Custom Element & Shadow DOM

**Goal:** Extract a Custom Element for the row in the heroes list and use it  
**Start branch:** start-part-1  
**Optional:** start-part-1b which has the row component already extracted as Angular Component  
**Sample solution branch:** start-part-2

Considerations:
- What API should the row component have?

Steps:
- Create an Angular component for the row
  - Hint: ng g c heroes/heroRow
  - Define API and move code/html/css
- Update list (HeroesComponent) to use the new component
- Check: Still working as before?
(start-part-1b begins here)
- Add angular element support to project
  - Hint: ng add @angular/elements
- Create a Custom Element out of the Angular Component
  - Hint: in a central place use createCustomElement(...) and customElements.define
  - add the row component to module's entry components
  - Hint: you do not need to create a separate module yet but can use the AppModule
- In the HeroesComponent, use the Custom Element instead of the Angular Component
  - What does the error during runtime mean?
  - Hint: CUSTOM_ELEMENTS_SCHEMA
- Activate Shadow Dom
  - Hint: encapsulation: ViewEncapsulation.ShadowDom
- Fix the styles (but make the row's badge's color gray)
- Test: Does everything work as before?
  - If not: fix it :-)


Reflection:
- What is the difference to using a normal Angular Component?
- What did we gain?
- How did you experience the effect of the Shadow Dom?
- What is missing for re-use?

# Part 2 - Separate Deployment

**Goal:** Build a separately deployable file with the Custom Element  
**Start branch:** start-part-2  
**Sample solution branch:** start-part-3

Steps:
- Create an Angular sub project application
  - Hint: ng g application hero-row
- Adjust the build result paths to coexist peacefully
  - Hint: angular.json
- Move the code of the hero-row to the new application
  - Either delete, rename, or reuse the generated 'app.*' files
- Move the custom element registration to the new module
  - Hint: module implements DoBootstrap instead of declaring bootstrap components
- Add a build target for the new application
  - Try the build
- Create a simple standalone html page that tests the custom element
  - add some rows with input data and register for an output event
- Use the custom element in our Heroes-Application
  - Don't forget to delete the old code for the row...
  - What does the error mean?
  - Hint: Use ngx-build-plus
  - Hint: zone.js is available in node_modules/zone.js/dist/zone.js
- Test: does everything work as before?
  - if not: fix it :-)

Reflection:
- Why did we start with an application template and not a library template?
- What positive and negative consequences are there of using a sub project
  instead of a separate project?
- What did you learn about APIs of custom elements?
- What does the difference of using an angular custom element
  within an angular application and standalone mean?
- How large is your custom element file?
- What is the effect on browser caching?

# Part 3: Independent Custom Elements

**Goal:** Let the hero row use the hero service directly for data loading and deletion  
**Start branch:** start-part-3  
**Sample solution branch:** end-part-3

Steps:
- Let the hero row only have the ID as input and call delete on its own
  - Use the HeroesService internally to load the data by ID
  - Call delete upon the delete button in the hero row
  - Adjust usages and change HeroesComponent to no longer delete (because the row already did)
- Test: What happens?

Reflection:
- What does it mean that custom elements run in their own scope?
- How can we get shared services in a microfrontend application?
- What is the lifecycle of a service in a custom element?

# Structure Microfrontends - npm Modules

**Goal:** Create a re-usable npm module for the row in the heroes list and use it
**Start branch:** start-part-1
**Optional:** start-part-1b which has the row component already extracted as Angular Component
**Sample solution branch:** example-npm-module

Considerations:
- What API should the row component have?

Steps:
- Create an Angular component for the row
  - Hint: ng g c heroes/heroRow
  - Define API and move code/html/css
- Update list (HeroesComponent) to use the new component
- Check: Still working as before?
- Create a library
  - Hint: ng g library hero-row
- Move your code for the row to the library
  - Make sure everything in the old place is deleted
  - Build the library
  - Find a solution for the routerLink
- Change the Heroes application to use the library
- Test: Does everything work as before?
  - If not: fix it :-)
- Rearrange your configuration so that both library and application can be built


Reflection:
- How is the directory structure organized?
  - Where are the important configuration and entry files?
- What does the build result contain, and what not?
- What types of libraries can you think of? Would you organize them differently?
- What do you do with the main application when using a separate repository?
- Where do you put the library for re-use?
- What is missing for re-usability?

Reference:
- https://angular.io/guide/creating-libraries

# Possible future extensions of these exercises

- keep up to date with angular
  - especially update the code concerning the Ivy Compiler
- add an example on how shared services can work
- add an example on how a method call from parent to angular element can work
  - this is not trivial because public methods are not exported, only @Input and @Output. 
  You have to use element.ngElementStrategy.componentRef.instance
