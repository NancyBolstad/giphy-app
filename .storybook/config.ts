import * as React from 'react';
import { addDecorator, configure } from '@storybook/react';

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context('../src', true, /story\.tsx?$/));
}

configure(loadStories, module);
