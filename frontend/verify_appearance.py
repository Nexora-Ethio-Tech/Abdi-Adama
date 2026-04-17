from playwright.sync_api import sync_playwright

def verify_appearance_improvements(page):
    page.goto("http://localhost:5173")
    page.wait_for_timeout(1000)

    # Login as school-admin
    page.get_by_role("button", name="School Admin").click()
    page.wait_for_timeout(1000)

    # Navigate to Settings
    page.get_by_role("link", name="Settings").click()
    page.wait_for_timeout(1000)

    # Click Appearance
    page.get_by_role("button", name="Appearance").click()
    page.wait_for_timeout(1000)

    # 1. Modern Style
    page.get_by_role("button", name="Modern").click()
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/style_modern.png")

    # 2. Compact Style
    page.get_by_role("button", name="Compact").click()
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/style_compact.png")

    # 3. Classic Style
    page.get_by_role("button", name="Classic").click()
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/style_classic.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            verify_appearance_improvements(page)
        finally:
            context.close()
            browser.close()
