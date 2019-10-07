# Gif Search App

A simple gif search React app made with [GIPHY API](https://developers.giphy.com/docs/api).

### Technology Stack

- Typescript
- React
- Styled components
- Storybook

## Demo

This app is deployed on the following platforms:

- Heroku: [https://giphy-react-app.herokuapp.com/](https://giphy-react-app.herokuapp.com/)
- Github Page: [https://nancybolstad.github.io/giphy-app/](https://nancybolstad.github.io/giphy-app/)

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

- Show trending gifs if you haven't searched for anything.
- Display search results in a Masonry-like grid layout/photo gallery
- Support infinite loading: keep loading more images when user clicks the "Load more" button
- Async fetching
- Mobile-first responsive design.
- Meet the Web accessibility requirements.

## TODO:

- [x] UI Test
- [ ] Unit Test
- [ ] Dark/light mode toggle
- [ ] Progressive image loading
- [ ] Add routing: Keep the URL in sync with the search input.
