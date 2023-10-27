/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import React from 'react';

import ScrollLock from '../src';


describe('test', () => {
  it('should find the lock sheet',async () => {
    const { container } = render(<ScrollLock />, { container: document.head });
    const stylesheet = container.querySelector('[data-react-scrolllock]');

    expect(stylesheet).not.toBeNull();
    expect(stylesheet).not.toBeUndefined();
  });

  it('should find many lock sheets', () => {
    const { container } = render(
      <>
        <ScrollLock />
        <ScrollLock />
      </>,
      { container: document.head }
    );
    const stylesheets = container.querySelectorAll('[data-react-scrolllock]');

    expect(stylesheets).toHaveLength(2);
  });
});
