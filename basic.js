const { test, expect } = require('@playwright/test');

test("login", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://app.dayschedule.in/login");


    const username = page.locator("#email");
    const password = page.locator("#password");
    const btn = page.locator("#accordionSidebar li");
    const btnName = "Survey";

    await username.type("ashish.duhan@agenty.com");
    await password.fill("Ashi$h2710");

    await page.locator('[type="submit"]').click();

    await page.waitForLoadState("networkidle");
    await page.locator(".close").click();
    await page.pause();
    console.log(await page.title()); // output Resources - DaySchedule
    await expect(page).toHaveTitle("Resources - DaySchedule"); //page title shown

    console.log(await page.locator(".nav-link").allTextContents()); //to verify the text which present in this given elements/locator
    // await expect(page.locator(".nav-link")).toContainText('');
    const count = await btn.count();
    for (let i = 0; i < count; ++i) {
        if (await btn.nth(i).locator('a').textContent() == btnName)
         {
            await btn.nth(i).locator('[routerlink*="survey"]').click();

            break;
        }

    }

    console.log(await page.url()) // check the Url
    await expect(page).toHaveURL("https://app.dayschedule.in/surveys");

    await page.locator('.card-body').click();

    await page.locator("#survey_name").type("Testing Survey");



})