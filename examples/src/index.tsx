import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'

import ScrollLock, { TouchScrollable } from '../../src'
import { getWindowHeight, isTouchDevice } from '../../src/utils'
import './index.css'
import { Anchor, Button, ChevronDown, Code, Container, Footer, Header, Icon, Repo, ScrollArea, Title } from './styled'

// example
// ------------------------------

function App() {
  const [currentHeight, setCurrentHeight] = useState(window.innerHeight)
  const [chevronOpacity, setChevronOpacity] = useState(0.5)
  const [isLocked, setIsLocked] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, getWindowHeight(0.6))
    }, 100)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const chevronOpacity = (scrollAreaRef.current?.clientHeight ?? 0 - document.documentElement.scrollTop) / 100 / 2
      setChevronOpacity(chevronOpacity)
    })
  }, [])

  useEffect(() => {
    document.body.style.background = isLocked ? 'linear-gradient(165deg, #FFBDAD, #FFEBE5)' : ''
  }, [isLocked])

  const toggleLock = useCallback(() => {
    const offset = window.innerHeight - currentHeight

    // adjust scroll if the window has been resized
    if (offset && !isLocked) {
      window.scrollTo(0, window.scrollY + offset)
    }

    setIsLocked((currentIsLocked) => !currentIsLocked)
    setCurrentHeight(window.innerHeight)
  }, [currentHeight])

  return (
    <Container height={getWindowHeight(2)}>
      <Header>
        <Icon role='img' className='animate-dropin' style={{ bottom: isLocked ? -3 : 0 }}>
          {isLocked ? '🔒' : '🔓'}
        </Icon>
        <div>
          Prevent scroll on <Code>{'<body />'}</Code> with
          <Title>
            {' '}
            <Repo href='https://github.com/jossmac/react-scrolllock'>react-scrolllock</Repo>
          </Title>
        </div>
      </Header>
      <Button onClick={toggleLock}>{isLocked ? 'Locked' : 'Unlocked'}</Button>

      <ScrollLock isActive={isLocked} />
      {isTouchDevice() ? (
        <div style={{ position: 'relative' }}>
          <TouchScrollable>
            <ScrollArea height={scrollAreaRef.current?.clientHeight ?? 0} innerRef={scrollAreaRef}>
              <p>
                Wrap an element in the <Code>TouchScrollable</Code> component if you need an area that supports scroll
                on mobile.
              </p>
              {isLocked ? (
                <p>
                  This is necessary because the <Code>touchmove</Code> event is explicitly cancelled &mdash; iOS doesn't
                  observe <Code>{'overflow: hidden;'}</Code> when applied to the <Code>{'<body />'}</Code> element 😢
                </p>
              ) : null}
            </ScrollArea>
          </TouchScrollable>
          {isLocked ? (
            <div
              style={{
                position: 'relative',
                opacity: chevronOpacity,
                lineHeight: 1,
              }}
            >
              <ChevronDown style={{ position: 'absolute', marginLeft: -12, top: -12 }} />
            </div>
          ) : null}
        </div>
      ) : null}

      <Footer>
        <span> by </span>
        <Anchor isLocked={isLocked} href='https://twitter.com/jossmackison' target='_blank'>
          @jossmac
        </Anchor>
      </Footer>
    </Container>
  )
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)
