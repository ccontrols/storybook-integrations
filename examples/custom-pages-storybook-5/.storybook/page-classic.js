import React from 'react';
import ClassicPage from '@component-controls/pages/ClassicPage';
import { DocsContainer } from '@component-controls/storybook';
export default {
  key: 'page',
  title: 'Page',
  render: ({ active }) =>
    active ? (
      <DocsContainer active={active}>
        <ClassicPage />
      </DocsContainer>
    ) : null,
};
