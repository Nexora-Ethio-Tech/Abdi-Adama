
import { test, expect } from '@playwright/test';

test('Parent Clinic Chat Back Button', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.fill('input[placeholder="Enter your Digital ID"]', 'PA123456');
  await page.fill('input[placeholder="Enter password"]', 'password');
  await page.click('button:has-text("Sign In")');

  await page.waitForURL('http://localhost:5173/');

  // Navigate to clinic chat
  await page.click('button:has-text("Contact Clinic")');
  await page.waitForURL('http://localhost:5173/clinic-chat');

  // Verify back button exists and works
  const backButton = page.locator('button:has(svg.lucide-arrow-left)');
  await expect(backButton).toBeVisible();
  await backButton.click();

  await page.waitForURL('http://localhost:5173/');
  await expect(page.locator('h2:has-text("Parent Dashboard")')).toBeVisible();
});

test('Student Teacher of the Week Visibility', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.fill('input[placeholder="Enter your Digital ID"]', 'ST123456');
  await page.fill('input[placeholder="Enter password"]', 'password');
  await page.click('button:has-text("Sign In")');

  await page.waitForURL('http://localhost:5173/');

  // Verify Teacher of the Week is visible (due to override)
  await expect(page.locator('h3:has-text("Teacher of the Week")')).toBeVisible();

  // Take a screenshot for visual confirmation
  await page.screenshot({ path: 'verification/student-portal-vote.png' });
});

test('Teacher Portal Tabbed Interface', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.fill('input[placeholder="Enter your Digital ID"]', 'TR123456');
  await page.fill('input[placeholder="Enter password"]', 'password');
  await page.click('button:has-text("Sign In")');

  await page.waitForURL('http://localhost:5173/');

  // Verify tabs
  await expect(page.locator('button:has-text("Overview")')).toBeVisible();
  await expect(page.locator('button:has-text("Weekly Plans")')).toBeVisible();

  // Check Weekly Plans tab
  await page.click('button:has-text("Weekly Plans")');
  await expect(page.locator('h3:has-text("Weekly Plan Submission")')).toBeVisible();

  // Check Dept. Plans Review tab (assuming TR123456 maps to a dean or use SA if needed,
  // but currentTeacher logic in TeacherPortal defaults to mockTeachers[0] which is Solomon, a dean)
  await expect(page.locator('button:has-text("Dept. Plans Review")')).toBeVisible();
  await page.click('button:has-text("Dept. Plans Review")');
  await expect(page.locator('h3:has-text("Department Plans Review")')).toBeVisible();

  await page.screenshot({ path: 'verification/teacher-portal-tabs.png' });
});
