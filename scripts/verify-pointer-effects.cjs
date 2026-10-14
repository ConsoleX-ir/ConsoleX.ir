/* Visual verification of pointer-gated effects (custom cursor + gel bead)
   by emulating a fine pointer via CDP, plus reduced-motion sanity check.
   Runs against the local dev server only. */
const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()

  // Emulate fine pointer + hover capability (CDP)
  const cdp = await ctx.newCDPSession(page)
  await cdp.send('Emulation.setEmulatedMedia', {
    features: [
      { name: 'pointer', value: 'fine' },
      { name: 'hover', value: 'hover' },
    ],
  })

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
  await page.waitForTimeout(1600)

  const state1 = await page.evaluate(() => ({
    cursorHidden: document.documentElement.classList.contains('cursor-hidden'),
    fine: matchMedia('(pointer: fine)').matches,
  }))
  console.log('after emulation:', JSON.stringify(state1))

  // move mouse to the gel CTA and hover
  const cta = page.locator('main a[href="#work"]').first()
  const box = await cta.boundingBox()
  await page.mouse.move(box.x - 60, box.y + box.height / 2, { steps: 12 })
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 12 })
  await page.waitForTimeout(700)
  await page.screenshot({ path: '/tmp/cx-gel-hover-fine.png' })

  // hover a nav link to see ring expand
  await page.mouse.move(630, 35, { steps: 8 })
  await page.waitForTimeout(600)
  await page.screenshot({ path: '/tmp/cx-cursor-nav-fine.png', clip: { x: 400, y: 0, width: 640, height: 120 } })

  await browser.close()
  console.log('done')
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
