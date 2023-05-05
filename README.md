# Site

This Next.js app constitutes the frontend of the OpenSanctions.org website.

Please, note that it runs the latest released version __Next.js 13__.

## Getting Started

### Installation
The requirement for running a Next.js 13 app is having __Node.js 16.8.0__ (or newer) installed.

__Notes__:
- You might need to upgrade your local version of npm as well.
- If you're looking for a Node.js version manager, try [n](https://github.com/tj/n) for macOS, Linux, or Windows Subsystem for Linux (does not work on native shells on Microsoft Windows).

1- Clone this repository
```bash
git clone git@github.com:opensanctions/site.git
```
2- Install the dependencies by running:
```bash
npm install
```

### Running the app locally
1- Set up environment variables (they're listed in `/lib/constants.ts`).
To make a search on your local website, you need to set an `API_TOKEN` var and assign it your API key. This is the only env var to set up if you plan to use the Opensanctions production API (https://api.opensanctions.org).

2- Run the development server:

```bash
npm run dev
```

3- Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.
