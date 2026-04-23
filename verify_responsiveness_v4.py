
import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # iPhone 12 Pro size
        context = await browser.new_context(
            viewport={'width': 390, 'height': 844},
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
        )
        page = await context.new_page()

        # Super Admin - Financial Policy Tab
        print("Logging in as SuperAdmin for Financial Policy check...")
        await page.goto("http://localhost:5173/login")
        await page.get_by_placeholder("Enter Digital ID or Email").fill("SA-1")
        await page.click("button:has-text('Sign In')")
        # Wait for either home page or just a few seconds
        await asyncio.sleep(3)
        await page.goto("http://localhost:5173/settings")
        await page.wait_for_selector("text=System Settings")

        # Click Financial Policy tab
        await page.click("button:has-text('Financial Policy')")
        await page.wait_for_selector("text=Fee Structure Management")
        await page.screenshot(path="v4_SuperAdmin_FinancePolicy_mobile.png", full_page=True)

        # Finance Clerk - Transaction Tooltip check
        print("Logging in as FinanceClerk for Tooltip check...")
        await page.goto("http://localhost:5173/login")
        await page.get_by_placeholder("Enter Digital ID or Email").fill("FC-1")
        await page.click("button:has-text('Sign In')")
        await asyncio.sleep(3)
        await page.goto("http://localhost:5173/finance")

        # Hover over a verifiedBy name to see the signature
        await page.wait_for_selector("text=Ato Solomon")
        await page.hover("text=Ato Solomon")
        # Tooltip might take a moment
        await asyncio.sleep(1)
        await page.screenshot(path="v4_Finance_Signature_mobile.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
