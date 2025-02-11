
<h1>
    <a href="https://hgod.in/paletaaa">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="./public/paletaaa-dark.svg">
            <source media="(prefers-color-scheme: light)" srcset="./public/paletaaa-light.svg">
            <img src="./public/paletaaa-dark.svg" alt="paletaaa">
        </picture>
    </a>
</h1>

> Create accessible color palettes

---

![GitHub Tag](https://img.shields.io/github/v/tag/hgodinho/paletaaa?sort=semver&color=%238544C1)
 [![deploy](https://github.com/hgodinho/paletaaa/actions/workflows/deploy.yaml/badge.svg)](https://github.com/hgodinho/paletaaa/actions/workflows/deploy.yaml)

## Key features

![graph](/public/paletaaa-graph.png)

- WCAG contrast validation
- Graph-based color relationships
- Save to localStorage
- Share with a link [(soon)](https://github.com/users/hgodinho/projects/4/views/1?pane=issue&itemId=96795896&issue=hgodinho%7Cpaletaaa%7C59)
- Download as: [(soon)](https://github.com/users/hgodinho/projects/4/views/1?pane=issue&itemId=96795910&issue=hgodinho%7Cpaletaaa%7C60)
  - JSON
  - tailwind css variables (tailwind 4.0)
- Figma integration (to be confirmed) [(?)](https://www.figma.com/developers/api#variables)

\>\> For more items see: [backlog](https://github.com/users/hgodinho/projects/4)

## Description

This project was created to help designers and developers to create accessible color systems.

It use a graph data structure to elaborate intricate color relationships and validation between then to ensure minimal contrast ratios based on [WCAG rules](https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum).

Many of the current validation tools are based on a single color contrast validation, but this project aims to create a more complex system that can validate multiple colors at once and also demonstrating graphically the relationships between them.

---

## Contribute

### dependencies

- [docker](https://docs.docker.com/get-docker/)
- [docker-compose](https://docs.docker.com/compose/install/)
- [node](https://nodejs.org/en/download/)
- [pnpm](https://pnpm.io/installation)
- [gh-cli](https://cli.github.com/)

### setup

- clone the project

    ```bash
    git clone https://github.com/hgodinho/paletaaa.git
    ```

- run development mode

    ```bash
    docker compose up -d dev
    ```

- run production build

    ```bash
    docker compose up -d prod
    ```

### commit

- commit to `dev` branch and use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

    ```bash
    git add <files>
    pnpm commit # and follow the instructions
    ```

- create a pull request to `main` branch
  
  ```bash
  pnpm pr:main
  ```

### hooks

Created with [husky](https://typicode.github.io/husky/), the following hooks are available:

- `pre-commit`: typecheck, test, lint and format staged code;
- `commit-msg`: ensure conventional-commits format.

### actions

- release: semantic-release will be created on `push` to `main` branch, it will add a new tag and create a new release on github;
- deploy: on `release` event, the project will be deployed to github pages;
