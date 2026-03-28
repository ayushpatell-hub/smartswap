import { chromium } from 'playwright'

async function main() {
  const url = 'http://localhost:3000'

  const browser = await chromium.launch({
    headless: true,
    // Use system Chrome so we don't need to download Playwright browsers.
    channel: 'chrome',
  })

  const context = await browser.newContext()
  const page = await context.newPage()

  const consoleMessages = []
  page.on('console', (msg) => {
    consoleMessages.push({
      type: msg.type(),
      text: msg.text(),
      location: msg.location(),
    })
  })
  page.on('pageerror', (err) => {
    consoleMessages.push({ type: 'pageerror', text: err?.message ?? String(err) })
  })

  await page.goto(url, { waitUntil: 'domcontentloaded' })

  // Wait for the page to render interactive parts.
  await page.waitForSelector('body')

  const themeToggle = page.getByRole('button', { name: 'Toggle theme' })
  await themeToggle.waitFor()

  const themeBefore = await page.evaluate(() => ({
    hasDarkClass: document.documentElement.classList.contains('dark'),
    background: getComputedStyle(document.documentElement)
      .getPropertyValue('--background')
      .trim(),
    card: getComputedStyle(document.documentElement).getPropertyValue('--card').trim(),
  }))

  await themeToggle.click()
  await page
    .waitForFunction(
      () => document.documentElement.classList.contains('dark'),
      null,
      { timeout: 5000 },
    )
    .catch(() => {})

  const themeAfter = await page.evaluate(() => ({
    hasDarkClass: document.documentElement.classList.contains('dark'),
    background: getComputedStyle(document.documentElement)
      .getPropertyValue('--background')
      .trim(),
    card: getComputedStyle(document.documentElement).getPropertyValue('--card').trim(),
  }))

  // Hero CTA via keyboard navigation (Tab -> Enter)
  let foundRequest = false
  for (let i = 0; i < 60; i++) {
    await page.keyboard.press('Tab')
    await page.waitForTimeout(30)
    const activeText = await page.evaluate(
      () => document.activeElement?.textContent?.trim() ?? '',
    )
    if (activeText.includes('Request Money')) {
      foundRequest = true
      break
    }
  }
  if (!foundRequest) {
    throw new Error('Could not focus the "Request Money" button with keyboard Tab.')
  }

  await page.keyboard.press('Enter')

  const dialog = page.locator('[role="dialog"]')
  await dialog.waitFor()

  const nameInput = page.getByLabel('Name')
  const phoneInput = page.getByLabel('Phone')
  await nameInput.waitFor()
  await phoneInput.waitFor()

  // Zod validation (invalid phone + empty name)
  await nameInput.fill('')
  await phoneInput.fill('123')
  await page.getByRole('button', { name: 'Submit' }).click()

  // Expected messages from zodSchema
  const nameErrVisible = page.getByText('Name is required').first()
  const phoneErrVisible = page.getByText('Enter a valid phone number').first()
  await Promise.allSettled([nameErrVisible.waitFor({ state: 'visible' }).catch(() => {}), phoneErrVisible.waitFor({ state: 'visible' }).catch(() => {})])

  const validationErrors = await page.evaluate(() => {
    const dialogEl = document.querySelector('[role="dialog"]')
    if (!dialogEl) return []
    return Array.from(dialogEl.querySelectorAll('[role="alert"], [data-state="open"]'))
      .map((el) => el.textContent?.trim() ?? '')
      .filter(Boolean)
  })

  const phoneErrText = await phoneErrVisible.textContent().catch(() => null)
  const nameErrText = await nameErrVisible.textContent().catch(() => null)

  // Submit valid values and expect toast + dialog close
  await nameInput.fill('Test User')
  await phoneInput.fill('+91 9876543210')
  await page.getByRole('button', { name: 'Submit' }).click()

  const toastText = await page.getByText('Request received').first().textContent().catch(() => null)

  // Allow dialog close
  await page.waitForTimeout(300)
  const dialogCount = await dialog.count()
  const dialogOpenedAfterSubmit = dialogCount > 0

  // Pricing CTA
  // (Close if still open)
  if (dialogOpenedAfterSubmit) {
    await page.keyboard.press('Escape')
    await page.waitForTimeout(200)
  }

  // Scroll to Pricing
  await page.locator('section#pricing').scrollIntoViewIfNeeded()
  await page.getByRole('button', { name: 'Upgrade Now' }).click()
  await dialog.waitFor()
  const pricingDialogOpened = (await dialog.count()) > 0
  await page.keyboard.press('Escape')
  await page.waitForTimeout(200)

  // Dashboard CTA
  await page.locator('section#dashboard').scrollIntoViewIfNeeded()
  await page.getByRole('button', { name: 'Accept' }).first().click()
  await dialog.waitFor()
  const dashboardDialogOpened = (await dialog.count()) > 0
  await page.keyboard.press('Escape')
  await page.waitForTimeout(200)

  const consoleErrors = consoleMessages.filter((m) => m.type === 'error' || m.type === 'warning' || m.type === 'pageerror')

  await browser.close()

  console.log(
    JSON.stringify(
      {
        themeBefore,
        themeAfter,
        keyboardFocusRequestMoney: foundRequest,
        dialogOpened: true,
        phoneErrorExpected: 'Enter a valid phone number',
        phoneErrorText: phoneErrText,
        nameErrorExpected: 'Name is required',
        nameErrorText: nameErrText,
        toastText,
        dialogOpenedAfterSubmit,
        dialogCountAfterSubmit: dialogCount,
        pricingDialogOpened,
        dashboardDialogOpened,
        consoleErrors,
      },
      null,
      2,
    ),
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

