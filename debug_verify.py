from playwright.sync_api import sync_playwright

def debug():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.on("console", lambda msg: print(f"Browser Log: {msg.text}"))

        print("Goto page")
        page.goto("http://localhost:3000/auction.html")
        page.wait_for_timeout(2000)

        print("Clicking Create Room")
        page.click("#createRoomBtn")

        print("Waiting for waiting room...")
        try:
            page.wait_for_selector("#waitingRoom:not(.hidden)", timeout=5000)
            print("Success")
        except Exception as e:
            print(f"Failed: {e}")
            page.screenshot(path="debug_fail.png")

        browser.close()

if __name__ == "__main__":
    debug()
