# Vallenato

Vallenato is an interactive and static graphic creation utility for the Council on Foreign Relations. Designers and developers at CFR can quickly stand up a project for prototyping or production by calling one command. While developing a project, Vallenato continuously watches for changes in a project's source code and pushes it to a local server. When ready for production, deployments made to GitHub are then captured by CircleCI and published through Pantheon. [Netlify](https://netlify.com) hosts and serves it [to the web.](https://vallenato-media.cfr.org/vallenato/interactive/global_growth_tracker/index.html)

This demo repo contains projects currently live at CFR.org.

[Global Growth Tracker](https://www.cfr.org/article/global-growth-tracker-world-economies-gdp)

[Currency Manipulators](https://www.cfr.org/article/global-growth-tracker-world-economies-gdp)

[Women's Power Index](https://www.cfr.org/article/womens-power-index)

---

## How to use

### INSTALLATION:

- use Node 12.

- `./bin/build.sh` -> Installs all root and project dependencies.

### USAGE:

`npm run v-interactive`

- Selecting 'Chart' will run a separate script that installs project-level dependencies, like billboard.js, and lets you choose a [billboard.js-supported](https://naver.github.io/billboard.js/) chart. You can still run code from D3's library within your project's index.js file.

- After running through the prompts, the script will spin up a dev server at localhost:4000. Navigate to /your_project_name to view the project.

### TOOLS:

`npm run dev` -> spins up a dev server and compiles all projects in the manifest (/projects.json)

`npm run dev global_growth_tracker` -> spins up a dev server and ONLY compiles the project in the argument.

`npm run stage` -> allows you to view and change the project compilation manifest.

### TROUBLESHOOTING:

- Project not running in the dev server? Make sure it's staged! `npm run stage` anywhere in the root directory to run the staging process.

- If you're trying to stage and build a project that already exists, make sure its dependencies are installed if applicable. `cd` into that project directory and run `npm install` to download the project-level dependencies.

### Notes about this demo repo:

`npm run v` and `npm run vup` will not work as intended in this repo. The functionality is very similar to `v-interactive` in that it allows CFR designers to search through a special shared folder directory, select an .ai file they are working on, and automatically converts it into a web-ready graphic.

If you need additional dependencies while working on a project, DO NOT install those dependencies at the repository root. The base repository directory is used exclusively for building, developing and testing projects. Any project level dependencies should be included in the `package.json` file in the `/src/graphics/project_name` directory. This reduces clutter.

---

### Goals:
- Make D3.js projects easier and faster to construct, modify, and deploy, leveraging Billboard.js.
- Provide a space for projects that call for a non-D3 approach
- Automatically adhere _all_ new projects to Product/Design's digital graphic style guide
- Better deployment speed
- Serve static data files

### Supported Features:
- Project level dependencies
- Shared resources (CSS, JS, images, data, etc.)
- Tailwind
- Image and SVG inlining
- xslx, CSV exporting

### To-do:
- Configure V6 as new D3 default
- Upgrade to new billboard.js version
- remove jQuery from default configuration
- Deployment process optimization
- Dream feature: a GUI to make one of these things in a browser.
---

## Additional info:

- `v-interactive` creates a new project folder in `/src/graphics` and populates it with a templated HTML and JS file. It also provides a project-level `package.json` file and installs it for you.
- `stage.js` checks the build manifest at `projects.json` and lets you choose which projects to build out for testing or production.
- If you choose 'Chart' during the scaffolding process, `bb_cli.js` will be called. This script injects a chart template of your choosing into the project's index.js file.
