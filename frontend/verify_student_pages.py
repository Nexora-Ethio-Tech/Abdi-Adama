from playwright.sync_api import sync_playwright

def verify_student_pages(page):
    page.goto("http://localhost:5173")
    page.wait_for_timeout(1000)

    # Login as student
    page.get_by_role("button", name="Student").click()
    page.wait_for_timeout(1000)

    # 1. Verify Grades & Courses
    page.get_by_role("link", name="Grades & Courses").click()
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/student_courses.png")

    # 2. Verify Academic History
    page.get_by_role("link", name="Academic History").click()
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/academic_history.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            verify_student_pages(page)
        finally:
            context.close()
            browser.close()
