import { canUseEventListeners } from 'exenv'
import { cloneElement, PureComponent, ReactElement } from 'react'

import { allowTouchMove, listenerOptions, preventInertiaScroll } from './utils'

type TouchScrollableProps = {
  children: ReactElement
}

export class TouchScrollable extends PureComponent<TouchScrollableProps> {
  scrollableArea: HTMLElement | null = null

  getScrollableArea = (ref: HTMLElement) => {
    this.scrollableArea = ref
  }

  componentDidMount() {
    if (!canUseEventListeners) return

    this.scrollableArea?.addEventListener('touchstart', preventInertiaScroll, listenerOptions)
    this.scrollableArea?.addEventListener('touchmove', allowTouchMove, listenerOptions)
  }

  componentWillUnmount() {
    if (!canUseEventListeners) return

    this.scrollableArea?.removeEventListener('touchstart', preventInertiaScroll, listenerOptions)
    this.scrollableArea?.removeEventListener('touchmove', allowTouchMove, listenerOptions)
  }

  render() {
    const { children, ...rest } = this.props
    return cloneElement(children, { ref: this.getScrollableArea, ...rest })
  }
}
