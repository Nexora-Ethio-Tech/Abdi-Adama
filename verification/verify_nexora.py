from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    # 1. Start at Landing Page and enter as Super Admin
    page.goto("http://localhost:5173")
    page.wait_for_timeout(1000)
    page.get_by_role("button", name="Super Admin").click()
    page.wait_for_timeout(2000)

    # 2. Verify Dashboard Priority Watchlist
    page.screenshot(path="verification/screenshots/01_dashboard.png")

    # 3. Verify Analytics AI Watchlist
    page.get_by_role("link", name="Analytics").click()
    page.wait_for_timeout(2000)
    page.evaluate("window.scrollTo(0, 400)")
    page.wait_for_timeout(500)
    page.screenshot(path="verification/screenshots/02_analytics_watchlist.png")

    # 4. Switch to School Admin
    page.get_by_role("button").filter(has_text="Super Admin").click()
    page.get_by_role("button", name="School Admin").click()
    page.wait_for_timeout(2000)

    # 5. Navigate to a student profile from Students list
    page.get_by_role("link", name="Students").click()
    page.wait_for_timeout(2000)
    page.get_by_text("10A").click()
    page.wait_for_timeout(2000)
    page.locator("a:has(svg.lucide-history)").first.click()
    page.wait_for_timeout(3000)

    # 6. Verify Student Profile (SIS, Medical, AI)
    page.evaluate("window.scrollTo(0, 500)")
    page.wait_for_timeout(500)
    page.screenshot(path="verification/screenshots/03_student_profile_sis.png")

    page.evaluate("window.scrollTo(0, 1200)")
    page.wait_for_timeout(500)
    page.screenshot(path="verification/screenshots/04_student_profile_docs_ai.png")

    # 7. Verify Transcript Modal
    page.evaluate("window.scrollTo(0, 0)")
    # Find button by text exactly
    page.get_by_role("button", name="Generate Transcript").click()
    page.wait_for_timeout(2000)
    page.screenshot(path="verification/screenshots/05_transcript_modal.png")
    page.keyboard.press("Escape")
    page.wait_for_timeout(1000)

    # 8. Verify LMS (as student)
    page.get_by_role("button").filter(has_text="School Admin").click()
    page.get_by_role("button", name="Student").click()
    page.wait_for_timeout(2000)
    page.get_by_role("link", name="My Courses").click()
    page.wait_for_timeout(2000)
    page.screenshot(path="verification/screenshots/06_lms_curriculum.png")
    page.get_by_role("button", name="Digital Repository").click()
    page.wait_for_timeout(1000)
    page.screenshot(path="verification/screenshots/07_lms_repository.png")

    # 9. Verify Attendance Substitution (as school-admin)
    page.get_by_role("button").filter(has_text="Student").click()
    page.get_by_role("button", name="School Admin").click()
    page.wait_for_timeout(2000)
    page.get_by_role("link", name="Attendance").click()
    page.wait_for_timeout(2000)
    page.get_by_role("button", name="Assign Proxy Teacher").click()
    page.wait_for_timeout(2000)
    page.get_by_role("button", name="Ato Solomon").click()
    page.wait_for_timeout(2000)
    page.screenshot(path="verification/screenshots/08_attendance_substitution.png")
    page.keyboard.press("Escape")
    page.wait_for_timeout(1000)

    # 10. Verify Hardware Settings
    page.get_by_role("link", name="Settings").click()
    page.wait_for_timeout(2000)
    page.get_by_role("button", name="Hardware & Integrations").click()
    page.wait_for_timeout(2000)
    page.screenshot(path="verification/screenshots/09_settings_hardware.png")

    # 11. Interact with Smart Assistant
    page.get_by_role("button", name="NEXORA Smart Assistant").click()
    page.wait_for_timeout(1000)
    page.get_by_placeholder("Type your question...").fill("What is the holiday schedule?")
    page.keyboard.press("Enter")
    page.wait_for_timeout(2000)
    page.screenshot(path="verification/screenshots/10_smart_assistant.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="verification/videos",
            viewport={'width': 1280, 'height': 1000}
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
