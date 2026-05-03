import { test, expect } from '@playwright/test';

test.describe('Election Hub Smoke Tests', () => {
  test('should load the homepage and show main navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check for main heading
    await expect(page.getByText('Election Hub India')).toBeVisible();
    
    // Verify navigation links
    await expect(page.getByRole('link', { name: 'Voter Guide' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'AI Assistant' })).toBeVisible();
  });

  test('should navigate to Voter Journey page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Voter Guide' }).click();
    await expect(page).toHaveURL(/.*voter-journey/);
    await expect(page.getByText('Your Path to the Ballot')).toBeVisible();
  });

  test('should load AI Assistant and show prompt', async ({ page }) => {
    await page.goto('/assistant');
    await expect(page.getByText('Indian Civic AI Assistant')).toBeVisible();
    await expect(page.getByPlaceholder('Ask about Voter ID, polling stations, election dates...')).toBeVisible();
  });

  test('should be able to start the quiz', async ({ page }) => {
    await page.goto('/quiz');
    await expect(page.getByText('Citizen Proficiency Quiz')).toBeVisible();
    
    // Check for difficulty buttons
    await expect(page.getByRole('button', { name: /Start Beginner/i })).toBeVisible();
  });
});
