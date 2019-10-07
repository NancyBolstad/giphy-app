# Gif Search App

A simple gif search React app made with [GIPHY API](https://developers.giphy.com/docs/api).

### Technology Stack

- TypeScript
- React
- Styled components
- Storybook

## Demo

This app is deployed on the following platforms:

- Heroku: [https://giphy-react-app.herokuapp.com/](https://giphy-react-app.herokuapp.com/)
- Github Page: [https://nancybolstad.github.io/giphy-app/](https://nancybolstad.github.io/giphy-app/)

View design/prototype: https://github.com/NancyBolstad/giphy-app/blob/master/doc/giphy-design.pdf

### Running locally in development mode

Ensure you have yarn installed

```bash
yarn install
yarn start
```

### Testing

You can run UI test with Storybook

```bash
yarn storybook
```

## Features

- Async fetching
- Display search results in a Masonry-like grid layout/photo gallery
- Support infinite loading: keep loading more images when user clicks the "Load more" button
- Show trending gifs in the index page
- Responsive design. Mobile-first.
- Meet the Web accessibility requirements.

## TODO:

- [x] UI Test
- [ ] Unit Test
- [ ] Dark/light mode toggle
- [ ] Progressive image loading
- [ ] Add routing: Keep the URL in sync with the search input.
