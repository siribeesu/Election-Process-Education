import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Layout } from './Layout';

// Mock Navbar component to simplify testing
vi.mock('./Navbar', () => ({
  Navbar: () => <div data-testid="navbar">Navbar</div>,
}));

describe('Layout Component', () => {
  it('should render layout with navbar, main content, and footer', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    // Check for navbar
    expect(screen.getByTestId('navbar')).toBeInTheDocument();

    // Check for main content
    expect(screen.getByText('Test Content')).toBeInTheDocument();

    // Check for footer text
    expect(screen.getByText('A nonpartisan digital civic guide.')).toBeInTheDocument();
    expect(screen.getByText(/Not affiliated with any government agency/)).toBeInTheDocument();
  });

  it('should render children correctly', () => {
    const testContent = 'This is test content';
    render(
      <Layout>
        <div>{testContent}</div>
      </Layout>
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('should have proper semantic HTML structure', () => {
    const { container } = render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    const main = container.querySelector('main');
    const footer = container.querySelector('footer');

    expect(main).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

  it('should render with proper CSS classes', () => {
    const { container } = render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    const rootDiv = container.firstChild;
    expect(rootDiv).toHaveClass('min-h-[100dvh]');
    expect(rootDiv).toHaveClass('flex');
    expect(rootDiv).toHaveClass('flex-col');

    const main = container.querySelector('main');
    expect(main).toHaveClass('flex-1');
    expect(main).toHaveClass('flex');
    expect(main).toHaveClass('flex-col');

    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('border-t');
    expect(footer).toHaveClass('py-8');
    expect(footer).toHaveClass('mt-auto');
  });
});
