# Requirements

> I want a portfolio in which I could show all my projects and write a blog where I may write articles about
> technology and curiosities, that can be found in the App Bar

The Portfolio should have the following parts:

    - Homepage/About Me: A brief, compelling introduction. Who are you? What are you passionate about? What kind of work are you looking for?
    - Projects: This is the most important section. Showcase 3-5 of your best projects.
    - Resume: A link to download your full resume in PDF format.
    - Contact: Your email address and links to your professional profiles (GitHub, LinkedIn are essential).
    - Another Pages Should have a section that on click will sent them to my portfolio.

The Blog should have:

    - A button that will sent the people to my portfolio.
    - A button to change the colorscheme (Should have at least 2 colorschemes like Catppuccin Mocha, Catppuccin Latte and Gruvbox)
    - A button to change the language
    - The reading sections that I will be explaining the topics and more.
    - A button to mark if the content was useful.
    - A comments sections where people could write their opinions(will be added latter).

## Functional Requirements

- [ ] All the pages should display a static sidebar in the left side of the screen, where will be show, my photo, name, My dev rol ,
      and links to my profile ( GitHub,LinkedIn, My Email and Telegram), Also have a button for changing the color theme and the language.
      (Optional: add buy a coffee button)
- [ ] The content that will be in the right section should be load from the database to make it easier to change.
- [ ] The Homepage of the website should show the articles that I have made, tags and categories

## Non - Functional Requirements

- [ ] Should work in web browser size(Desktop, Tablet, Smartphone)
- [ ] Front-end and Back-end should be hosted in different servers(Front-end in Netlify ,Back-end in Oracle VPS).

## Technologies

I have been thinking around what technologies I should use and I have in mind the followings:

- React (Front - End) Typescript
- Express.js (Back - End) Typescript
- PostgreSQL (Database)
- Nix (Managing Development Environments and write container Deployments)
- Docker (Containers build with Nix, making the containers the most lightweight possible)
