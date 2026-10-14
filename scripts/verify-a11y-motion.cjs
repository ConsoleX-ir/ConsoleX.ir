/* Reduced-motion + keyboard accessibility verification. */
const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch()

  // ---- reduced motion context ----
  const rctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  })
  const rpage = await rctx.newPage()
  await rpage.goto('http://localhost:3000', { waitUntil: 'networkidle' })
  await rpage.waitForTimeout(800)

  const reducedState = await rpage.evaluate(() => ({
    lenisActive: !!document.querySelector('html.lenis, .lenis-smooth'),
    heroCharsVisible: (() => {
      const c = document.querySelector('[data-char]')
      if (!c) return 'none'
      const t = getComputedStyle(c).transform
      return t === 'none' || t === ''
    })(),
    marqueeAnim: getComputedStyle(document.querySelector('.marquee-track')).animationName,
    contentVisible: (() => {
      const p = document.querySelector('#intro h2')
      return p ? getComputedStyle(p).opacity : 'missing'
    })(),
  }))
  console.log('REDUCED MOTION:', JSON.stringify(reducedState))
  await rpage.screenshot({ path: '/tmp/cx-reduced-hero.png' })

  // keyboard: can we tab through and is focus visible?
  await rpage.keyboard.press('Tab') // skip link
  const focus1 = await rpage.evaluate(() => document.activeElement?.textContent?.trim())
  await rpage.keyboard.press('Tab') // wordmark
  await rpage.keyboard.press('Tab') // intro
  await rpage.keyboard.press('Tab') // work
  const focus2 = await rpage.evaluate(() => ({
    text: document.activeElement?.textContent?.trim(),
    outline: getComputedStyle(document.activeElement).outlineWidth,
  }))
  console.log('TAB FOCUS:', JSON.stringify({ focus1, focus2 }))

  // activate via keyboard: Enter on WORK link scrolls
  await rpage.keyboard.press('Enter')
  await rpage.waitForTimeout(1400)
  const scrolledKb = await rpage.evaluate(() => Math.round(window.scrollY))
  console.log('KEYBOARD NAV scrollY:', scrolledKb)

  // Escape/mobile menu trap is in the other context; check mobile menu focus quickly
  await rpage.setViewportSize({ width: 390, height: 844 })
  await rpage.evaluate(() => window.scrollTo(0, 0))
  await rpage.waitForTimeout(600)
  await rpage.keyboard.press('Tab')
  await rpage.keyboard.press('Tab')
  await rpage.keyboard.press('Tab')
  await rpage.keyboard.press('Tab')
  await rpage.keyboard.press('Tab')
  const menuBtnFocused = await rpage.evaluate(() => {
    const el = document.activeElement
    return el?.getAttribute('aria-controls') === 'mobile-menu'
  })
  if (menuBtnFocused) {
    await rpage.keyboard.press('Enter')
    await rpage.waitForTimeout(500)
    const menuOpen = await rpage.evaluate(() => {
      const m = document.getElementById('mobile-menu')
      return { open: getComputedStyle(m).opacity, focusIn: m.contains(document.activeElement) }
    })
    await rpage.keyboard.press('Escape')
    await rpage.waitForTimeout(400)
    const menuClosed = await rpage.evaluate(() => getComputedStyle(document.getElementById('mobile-menu')).opacity)
    console.log('MENU KB:', JSON.stringify({ ...menuOpen, closedOpacity: menuClosed }))
  } else {
    console.log('MENU KB: menu button not reached in 5 tabs')
  }
  await rctx.close()

  await browser.close()
  console.log('done')
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
