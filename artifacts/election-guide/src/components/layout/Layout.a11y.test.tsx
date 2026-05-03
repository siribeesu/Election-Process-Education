import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Layout } from './Layout';

expect.extend(toHaveNoViolations);

// Mock Navbar
vi.mock('./Navbar', () => ({
  Navbar: () => <div data-testid="navbar">Navbar</div>,
}));

describe('Layout Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper heading hierarchy', async () => {
    const { container } = render(
      <Layout>
        <div>
          <h1>Main Title</h1>
          <h2>Subtitle</h2>
          <h3>Minor heading</h3>
        </div>
      </Layout>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper semantic structure', async () => {
    const { container } = render(
      <Layout>
        <section>
          <h2>Test Section</h2>
          <p>Content here</p>
        </section>
      </Layout>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible footer', async () => {
    const { container } = render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
