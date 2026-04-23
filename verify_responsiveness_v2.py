import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 375, 'height': 812}, is_mobile=True)
        page = await context.new_page()

        roles = [
            ('PR-1', 'Parent', '/'),
            ('TR-1', 'Teacher', '/'),
            ('SA-1', 'SuperAdmin', '/settings'),
            ('FC-1', 'FinanceClerk', '/finance'),
            ('CA-1', 'ClinicAdmin', '/clinic')
        ]

        for user_id, role_name, target_path in roles:
            try:
                print(f"Logging in as {role_name}...")
                await page.goto('http://localhost:5173/login')
                await page.get_by_placeholder('Enter Digital ID or Email').fill(user_id)
                # Click the button more explicitly
                await page.locator('button:has-text("Sign In")').click()

                # Check for error message or successful login
                try:
                    await page.wait_for_url('http://localhost:5173/**', timeout=5000)
                except:
                    print(f"Login failed for {role_name} or took too long. URL: {page.url}")
                    continue

                if target_path != '/':
                    print(f"Navigating to {target_path}...")
                    await page.goto(f'http://localhost:5173{target_path}')

                await asyncio.sleep(2)
                await page.screenshot(path=f'v2_{role_name}_mobile.png', full_page=True)
                print(f"Screenshot saved for {role_name}")

                await page.evaluate("localStorage.clear()")
            except Exception as e:
                print(f"Error for {role_name}: {e}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
