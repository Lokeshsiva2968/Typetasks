# Little Wins

Little Wins is a small, browser-based task list built with plain HTML, CSS, and
TypeScript. Its compiled JavaScript runs directly in the browser; no framework
or bundler is required.

## Run locally

Compile the TypeScript files with:

```sh
tsc
```

Then open `index.html` from a local static web server. The task list supports
adding, starting, completing, removing, and filtering tasks. Tasks remain in
memory for the current page session.

The workflow uses three statuses: `todo`, `in-progress`, and `done`. The typed
operations are defined in `model.ts`, and `app.ts` connects those operations to
the page.

## Deploy

The GitHub Actions workflow publishes the compiled static site to GitHub Pages
when `main` or `part-2-ui-ship` is updated. In the repository's **Settings →
Pages**, choose **GitHub Actions** as the build and deployment source.
