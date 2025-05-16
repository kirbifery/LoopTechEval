import { test, expect, type Page } from '@playwright/test';
import type { Task, ProjectData, ProjectConfig } from '../data/types';
import rawTaskData from '../data/taskData.json';
import rawProjectConfig from '../data/projectConfig.json';

const projectConfig = rawProjectConfig as ProjectConfig;
const projects = rawTaskData as ProjectData[];

// Reusable login flow that runs before each test
test.beforeEach(async ({ page }) => {
  // Navigate to the login page
  await page.goto(projectConfig.url);

  // Fill in the login form using provided credentials
  await page.locator('#username').fill(projectConfig.username);
  await page.locator('#password').fill(projectConfig.password);

  // Submit the form by clicking the "Sign in" button
  await page.getByRole('button', { name: 'Sign in' }).click();
  // Wait for the "To Do" heading to ensure the UI has loaded before continuing
  await expect(page.getByRole('heading', { name: 'To Do' })).toBeVisible();
});

// Reusable function that validates tasks and tags in the specified columns
async function validateTasks(page: Page, project: ProjectData) {
  // Navigate to the project tab if needed
  await page.getByRole('button', { name: project.project }).click();

  // Wait for a confirmation element from JSON to ensure the section loaded
  await expect(page.locator('.text-gray-500', { hasText: project.confirmText})).toBeVisible();

  //await expect(page.getByText(project.confirmText)).toBeVisible();

  for (const task of project.tasks) {
    // Locate the column container by its heading (e.g., "To Do", "In Progress")
    const column = page.locator(`h2:has-text("${task.column}")`).locator('..');

    // Verify the task title is visible in the correct column
    await expect(column.getByText(task.title)).toBeVisible();

    // Locate the specific task card using the task title inside an <h3> element
    const taskCard = column.locator(`.bg-white:has(h3:has-text("${task.title}"))`);
    for (const tag of task.tags) {
      // Validate expected tags are displayed on the task card
      await expect(taskCard.getByText(tag, { exact: true })).toBeVisible();
    }
  }
}

test('All tasks appear in correct columns with correct tags', async ({ page }) => {
  for (const project of projects) {
    await validateTasks(page, project);
  }
});