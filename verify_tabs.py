
import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        # iPhone 12 Pro size
        await page.set_viewport_size({"width": 390, "height": 844})

        # Super Admin - Financial Policy
        await page.goto("http://localhost:5173/login")
        await page.fill("input[placeholder*='Digital ID']", "SA-1")
        await page.click("button:has-text('Sign In')")
        await asyncio.sleep(2)
        await page.goto("http://localhost:5173/settings")
        await page.click("button:has-text('Financial Policy')")
        await asyncio.sleep(1)
        await page.screenshot(path="v5_Settings_Finance_mobile.png", full_page=True)

        # Super Admin - Hardware
        await page.click("button:has-text('Hardware')")
        await asyncio.sleep(1)
        await page.screenshot(path="v5_Settings_Hardware_mobile.png", full_page=True)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
