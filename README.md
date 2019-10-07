# Gif Search App

A simple gif search React app made with [GIPHY API](https://developers.giphy.com/docs/api).

### Technology Stack

- Typescript
- Styled components
- Storybook

## Demo

This app deployed on the following platform:

- Heroko: [https://giphy-react-app.herokuapp.com/](https://giphy-react-app.herokuapp.com/)
- Github Page: [https://nancybolstad.github.io/giphy-app/](https://nancybolstad.github.io/giphy-app/)

### Running locally in development mode

- Ensure you have yarn installed

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

- Show trending if you haven't searched for anything.
- Masonry-like grid
- Infinite loading: keep loading more images as you scroll
- Async fetching

## TODO:

- [x] UI Test
- [ ] Unit Test
- [ ] Dark/light mode toggle
- [ ] Progressive image loading
- [ ] Added routing: Keep the URL in sync with the search input.
