import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Alert, AlertTitle, AlertDescription } from './alert';

describe('Alert Component', () => {
  it('should render alert with default variant', () => {
    const { container } = render(
      <Alert>
        <AlertTitle>Test Alert</AlertTitle>
        <AlertDescription>This is a test alert</AlertDescription>
      </Alert>
    );

    const alertElement = container.firstChild;
    expect(alertElement).toHaveAttribute('role', 'alert');
    expect(screen.getByText('Test Alert')).toBeInTheDocument();
    expect(screen.getByText('This is a test alert')).toBeInTheDocument();
  });

  it('should render alert with destructive variant', () => {
    const { container } = render(
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
      </Alert>
    );

    const alertElement = container.firstChild;
    expect(alertElement).toHaveClass('text-destructive');
    expect(alertElement).toHaveAttribute('role', 'alert');
  });

  it('should support custom className', () => {
    const { container } = render(
      <Alert className="custom-class">
        <AlertTitle>Test</AlertTitle>
      </Alert>
    );

    const alertElement = container.firstChild;
    expect(alertElement).toHaveClass('custom-class');
  });

  it('should render AlertTitle with proper styling', () => {
    render(
      <Alert>
        <AlertTitle>Test Title</AlertTitle>
      </Alert>
    );

    const titleElement = screen.getByText('Test Title');
    expect(titleElement.tagName).toBe('H5');
    expect(titleElement).toHaveClass('font-medium');
    expect(titleElement).toHaveClass('leading-none');
  });

  it('should render AlertDescription', () => {
    render(
      <Alert>
        <AlertDescription>Test Description</AlertDescription>
      </Alert>
    );

    const descriptionElement = screen.getByText('Test Description');
    expect(descriptionElement).toBeInTheDocument();
  });

  it('should accept ref forwarding', () => {
    let alertRef: HTMLDivElement | null = null;

    render(
      <Alert ref={(ref) => { alertRef = ref; }}>
        <AlertTitle>Test</AlertTitle>
      </Alert>
    );

    expect(alertRef).toBeInstanceOf(HTMLDivElement);
  });
});
