import { test, expect } from '@playwright/test';

test.describe('Movie Listing App', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should display the header with navigation links', async ({ page }) => {
        await expect(page.locator('.app-title')).toHaveText('Movie Listing App');
        await expect(page.locator('.app-nav')).toContainText('Home');
        await expect(page.locator('.app-nav')).toContainText('Favorites');
    });

    test('should display movie list and handle pagination', async ({ page }) => {
        // Wait for movies to load
        await page.waitForSelector('.movie-grid');

        // Check if movies are displayed
        const movieItems = page.locator('.movie-item');
        await expect(movieItems).toHaveCount(10); // Based on per_page in the API response

        // Test pagination
        await expect(page.locator('.pagination')).toBeVisible();
        const nextButton = page.locator('.pagination button').nth(1);
        await nextButton.click();

        // Verify page change
        await expect(page.locator('.pagination .info')).toContainText('Page 2');
    });

    test('should handle movie search', async ({ page }) => {
        const searchInput = page.locator('.search-wrapper input');

        // Type search query
        await searchInput.fill('Waterworld');
        await page.waitForTimeout(500); // Wait for debounce

        // Verify search results
        const movieTitles = page.locator('.movie-title');
        await expect(movieTitles.first()).toContainText('Waterworld');
    });

    test('should handle favorites functionality', async ({ page }) => {
        // Add a movie to favorites
        const firstMovieFavoriteButton = page.locator('.movie-item').first().locator('.favorite-button');
        await firstMovieFavoriteButton.click();

        // Navigate to favorites page
        await page.click('text=Favorites');

        // Verify movie is in favorites
        await expect(page.locator('.movie-item')).toHaveCount(1);

        // Remove from favorites
        const favoriteButton = page.locator('.favorite-button');
        await favoriteButton.click();

        // Verify movie is removed
        await expect(page.locator('.movie-item')).toHaveCount(0);
        await expect(page.locator('text=No favorites yet')).toBeVisible();
    });

    test('should handle error states', async ({ page }) => {
        // Mock the specific API endpoint from our api.ts file
        await page.route('**/jsonmock.hackerrank.com/api/movies/**', async (route) => {
            await route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({ error: 'Internal Server Error' })
            });
        });

        await page.goto('/');

        // Wait for loading state to finish
        await expect(page.locator('.loading-overlay')).not.toBeVisible();

        // Now check for error message
        await expect(page.locator('.error-message')).toBeVisible();
        await expect(page.locator('.error-message')).toContainText('Failed to fetch movies. Please try again.');
    });

    test('should handle loading states', async ({ page }) => {
        await page.goto('/');

        // Check if loading spinner is shown
        await expect(page.locator('.loading-overlay')).toBeVisible();

        // Wait for content to load
        await expect(page.locator('.movie-grid')).toBeVisible();

        // Loading spinner should be hidden
        await expect(page.locator('.loading-overlay')).not.toBeVisible();
    });
}); 