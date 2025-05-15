import { test, expect, type Page } from '@playwright/test';
import mobileTasks from '../data/mobileTasks.json';
import websiteTasks from '../data/websiteTasks.json';

// Define constants for app URL and login credentials
const URL = 'https://animated-gingersnap-8cf7f2.netlify.app/'
const username = 'admin';
const password = 'password123';

// Define TypeScript interfaces to describe the structure of task data
interface Task {
  title: string;
  tags: string[];
}

interface Columns {
  columnName: string;
  tasks: Task[];
}

// Reusable login flow that runs before each test
test.beforeEach(async ({ page }) => {
  // Navigate to the login page
  await page.goto(URL);

  // Fill in the login form using provided credentials
  await page.locator('#username').fill(username);
  await page.locator('#password').fill(password);

  // Submit the form by clicking the "Sign in" button
  await page.getByRole('button', { name: 'Sign in' }).click();
  // Wait for the "To Do" heading to ensure the UI has loaded before continuing
  await expect(page.getByRole('heading', { name: 'To Do' })).toBeVisible();
});

// Reusable function that validates tasks and tags in the specified columns
async function validateTasksInColumns(page: Page, columns: Columns[]) {
  for (const group of columns) {
    const columnName = group.columnName;

    // Locate the column container by its heading (e.g., "To Do", "In Progress")
    const columnLocator = page.locator(`h2:has-text("${columnName}")`).locator('..');

    for (const task of group.tasks) {
      const { title, tags } = task;
      // Verify the task title is visible in the correct column
      await expect(columnLocator.getByText(title)).toBeVisible();

      // Locate the specific task card using the task title inside an <h3> element
      const taskCard = columnLocator.locator(`.bg-white:has(h3:has-text("${title}"))`);

      // Verify all expected tags are visible within that task card
      for (const tag of tags) {
        await expect(taskCard.getByText(tag, { exact: true })).toBeVisible();
      }
    }
  }
}

// Test: Validate Web Application tasks using websiteTasks.json
test('Website tasks appear under correct columns with correct tags', async ({ page }) => {
  await validateTasksInColumns(page, websiteTasks);
});

// Test: Validate Mobile Application tasks using mobileTasks.json
test('Mobile tasks appear under correct columns with correct tags', async ({ page }) => {
  // Switch to the "Mobile Application" section by clicking its tab
  await page.getByRole('button', { name: 'Mobile Application' }).click();

  // Confirm that the correct section content has loaded
  await expect(page.locator('.text-gray-500', { hasText: 'Native mobile app development' })).toBeVisible();

  // Run the same task validation logic using the mobile-specific task data
  await validateTasksInColumns(page, mobileTasks);
});

