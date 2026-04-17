from playwright.sync_api import sync_playwright

def verify_focus_fix(page):
    page.goto("http://localhost:5173")
    page.wait_for_timeout(1000)

    # Login as teacher
    page.get_by_role("button", name="Teacher").click()
    page.wait_for_timeout(1000)

    # Navigate to Exams & Assignments
    page.get_by_role("link", name="Exams & Assignments").click()
    page.wait_for_timeout(1000)

    # Click New Exam
    page.get_by_role("button", name="New Exam").click()
    page.wait_for_timeout(1000)

    # Add Question
    page.get_by_role("button", name="New Root Question").click()
    page.wait_for_timeout(1000)

    # Focus on the first root question input (the one added above)
    input_field = page.locator('input[placeholder="Enter question text..."]').last
    input_field.click()
    page.wait_for_timeout(500)

    # Type characters one by one and check if focus is maintained
    text_to_type = "Testing focus"
    for char in text_to_type:
        page.keyboard.type(char)
        page.wait_for_timeout(100)

    # Verify the value
    current_val = input_field.input_value()
    print(f"Typed value: {current_val}")

    if current_val == text_to_type:
        print("Focus was maintained and text was typed successfully.")
    else:
        print("Text mismatch or focus lost.")

    # Screenshot
    page.screenshot(path="/home/jules/verification/screenshots/focus_verify.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        try:
            verify_focus_fix(page)
        finally:
            context.close()
            browser.close()
