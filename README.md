# Movie Listing App

A Vue 3 application built with Vite that allows users to browse and search for movies. Users can also save their favorite movies for quick access. This project is built for a job application. But feel free to experiment with it for your own personal intent.

## Features

- **Movie Browsing**: View a list of movies fetched from an external API.
- **Search Functionality**: Search for movies by title.
- **Pagination**: Navigate through multiple pages of movie results.
- **Favorites**: Save and manage favorite movies using local storage.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend**: Vue 3, Vite
- **State Management**: Pinia
- **Styling**: SCSS
- **Testing**: Vitest, Playwright
- **API**: Axios for HTTP requests

## Project Setup

To get started with the project, follow these steps:

1. **Clone the repository**:
   ```sh
   git clone <repository-url>
   cd movie-listing-app
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Run the development server**:
   ```sh
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173` to see the app in action.

## Scripts

- **Development**: `npm run dev` - Starts the development server with hot-reload.
- **Build**: `npm run build` - Compiles the application for production.
- **Preview**: `npm run preview` - Preview the production build.
- **Run Unit Tests**: `npm run test:unit` - Executes unit tests using Vitest.
- **Run End-to-End Tests**: `npm run test:e2e` - Executes end-to-end tests using Playwright.
- **Linting**: `npm run lint` - Lints the codebase using ESLint.

## Directory Structure
```
src/
├── assets/         # Contains global styles and assets
├── components/     # Reusable Vue components
├── mocks/          # Mock data for testing
├── router/         # Vue Router configuration
├── services/       # API service functions
├── stores/         # Pinia stores for state management
├── types/          # TypeScript type definitions
├── views/          # Vue components for different views
└── App.vue         # Main application component
```

## API Integration

The application fetches movie data from the [JSON Mock API](https://jsonmock.hackerrank.com/api/movies). The following endpoints are used:

- **Get Movies**: `GET https://jsonmock.hackerrank.com/api/movies/?page={page}`
- **Search Movies**: `GET https://jsonmock.hackerrank.com/api/movies/search/?Title={title}&page={page}`

## Heroku Deployment

In order to deploy the application you must install the Heroku CLI first. [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.

```sh
heroku login
```

Make sure to create the application on Heroku first.

After that you can add the project to the Heroku remote.

```sh
heroku git:remote -a movie-listing-app
```

### Deploy your changes

Make some changes to the code you just cloned and deploy them to Heroku using Git.

```sh
git add .
git commit -am "make it better"
git push heroku main
```

After pushing the changes, heroku gets a build and deploys the application. The Procfile file in the root of the project tells Heroku which command to run to start the application. In our case we are using the http-server package to serve the application that has a built in the dist folder. 

You can view the deployed application at the link that Heroku provides after the build is complete.