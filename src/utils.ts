import { canUseDOM } from 'exenv'

export const listenerOptions = {
  capture: false,
  passive: false,
}

// ==============================
// Touch Helpers
// ==============================

export function preventTouchMove(e: TouchEvent) {
  e.preventDefault()

  return false
}

export function allowTouchMove(e: TouchEvent) {
  const target = e.currentTarget as Element

  if (target.scrollHeight > target.clientHeight) {
    e.stopPropagation()
    return true
  }

  e.preventDefault()
  return false
}

export function preventInertiaScroll(this: HTMLElement) {
  const top = this.scrollTop
  const totalScroll = this.scrollHeight
  const currentScroll = top + this.offsetHeight

  if (top === 0) {
    this.scrollTop = 1
  } else if (currentScroll === totalScroll) {
    this.scrollTop = top - 1
  }
}

// `ontouchstart` check works on most browsers
// `maxTouchPoints` works on IE10/11 and Surface
export function isTouchDevice() {
  if (!canUseDOM) return false
  return 'ontouchstart' in window || navigator.maxTouchPoints
}

// ==============================
// Misc.
// ==============================

// Take a list of functions and return a function that applies the list of
// functions from left to right

const pipeFns =
  (a: Function, b: Function) =>
  (...args: Function[]) =>
    b(a(...args))
export const pipe = (...fns: Function[]) => fns.reduce(pipeFns)

// ==============================
// Document Helpers
// ==============================

export function getPadding() {
  if (!canUseDOM) return 0

  const paddingRight = parseInt(window.getComputedStyle(document.body).paddingRight, 10)
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

  return paddingRight + scrollbarWidth
}

export function getWindowHeight(multiplier: number = 1) {
  if (canUseDOM) {
    return window.innerHeight * multiplier
  }

  return 0
}

export function getDocumentHeight() {
  if (canUseDOM) {
    return document.body.clientHeight
  }
}

// ==============================
// Style Sheets
// ==============================

export function makeStyleTag() {
  if (!canUseDOM) return

  let tag = document.createElement('style')
  tag.setAttribute('data-react-scrolllock', '')

  return tag
}
export function injectStyles(tag: HTMLStyleElement, css: string) {
  if (!canUseDOM) return

  tag.appendChild(document.createTextNode(css))
}

export function insertStyleTag(tag: HTMLStyleElement) {
  if (!canUseDOM) return

  const head = document.head || document.getElementsByTagName('head')[0]
  head.appendChild(tag)
}
