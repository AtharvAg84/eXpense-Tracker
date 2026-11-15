# eXpense-Tracker

eXpense-Tracker is a multi-page personal-finance website prototype for recording expenses, viewing a category breakdown, editing a profile, and creating savings goals. The frontend uses HTML, CSS, and vanilla JavaScript; it has no frontend framework or build tool.

## Technologies

- HTML5, CSS3, and browser JavaScript
- Browser `localStorage` for prototype account/session and expense data
- Chart.js loaded from jsDelivr for the transaction dashboard
- Google Fonts and Font Awesome loaded externally on applicable pages
- An Express server prototype in `backend/`, currently unconnected to the frontend

There is no `package.json`, lockfile, or frontend build command.

## Project structure

```text
.
├── index.html
├── login.html
├── register.html
├── main-after-login.html
├── transaction.html
├── profile.html
├── profile-goal.html
├── contactUs.html
├── pp.html
├── assets/
│   ├── css/
│   ├── images/
│   └── js/
├── backend/
│   └── app-login-register.js
├── docs/
│   ├── final-presentation-display.pptx
│   ├── in-progress-notes.txt
│   └── pending-work-notes.txt
├── .vscode/
├── .gitignore
├── _config.yml
└── README.md
```

`assets/` contains only the asset types used by the site; there are no local font files or icon files. Empty legacy Poppins files were removed because they were not referenced and contained no font data. Typography uses the external Google Fonts request where present and existing system fallbacks.

- `index.html` is the public landing page; `main-after-login.html` is the post-login landing page.
- `login.html` and `register.html` provide the prototype account forms.
- `transaction.html` uses `assets/js/app.js` and the transaction stylesheets in `assets/css/`.
- `profile.html` uses `assets/js/profile.js`; `profile-goal.html` uses `assets/js/profile-goal.js`.
- `contactUs.html` uses `assets/js/contact.js` for client-side validation; `pp.html` contains the privacy policy.
- `backend/app-login-register.js` is a separate Express server prototype, not loaded by the pages. The Jekyll configuration excludes `backend/` from a future Pages build.
- `docs/` preserves the project's presentation and developer notes; the Jekyll configuration excludes this directory from a future Pages build.
- `.vscode/settings.json` sets the VS Code Live Server port to 5501.

## Run locally

1. Open this folder in Visual Studio Code.
2. Install or enable the **Live Server** extension if it is not already available.
3. Open `index.html` and select **Open with Live Server**.

The workspace Live Server setting uses port `5501`. The pages can also be opened individually through the local server, for example `/transaction.html` or `/profile-goal.html`.

## Browser-local behavior and limitations

- Registration stores account details in browser `localStorage`; passwords are stored in plaintext. Login checks those stored values. This is prototype behavior, not secure authentication.
- Expense dashboard entries are stored in browser `localStorage` under the `expenses` key. Browser data is not shared across browsers or devices.
- Savings goals and recurring expenses are held in page UI and are not persisted between visits. Goal details display a sample saved amount.
- The contact form validates fields and displays a confirmation but does not send a message.
- The profile editor is not backed by a server or a durable user account.
- The Express prototype keeps users in memory, is not connected to the frontend, has no dependency manifest, and is not required to run the static site. GitHub Pages cannot run it; real authentication, durable storage, or message delivery needs a separately hosted service.
- Chart.js, Google Fonts, and Font Awesome are external network dependencies.

## GitHub Pages preparation

This is a static multi-page site with no build step or generated output directory. Local page and asset URLs are relative to the repository root, so they resolve beneath the `/eXpense-Tracker/` project-site prefix as well as when served locally.

The `.github/workflows/deploy.yml` workflow deploys on pushes to `main` and supports manual runs. It assembles a Pages artifact from the nine root HTML pages and `assets/` only; it does not deploy `backend/`, `docs/`, `.vscode/`, or repository metadata. `_config.yml` is not used to build the artifact.

Before the first deployment, enable GitHub Pages for this repository with **Build and deployment → Source: GitHub Actions**. Then push the workflow to `main` or run it from the Actions tab. The configured project-site URL is `https://atharvag84.github.io/eXpense-Tracker/`; this repository has not been deployed or tested at that live URL by this change.
