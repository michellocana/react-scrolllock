import React, {
  AnchorHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  PropsWithChildren,
  RefObject,
  forwardRef,
} from 'react'

const gutter = 15

// styled components
// ------------------------------

type ContainerProps = PropsWithChildren<{
  height: number
}>

export const Container = ({ height, ...props }: ContainerProps) => (
  <div
    style={{
      alignItems: 'center',
      display: 'flex ',
      flexDirection: 'column',
      height: height,
      justifyContent: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 420,
      padding: gutter,
      textAlign: 'center',
    }}
    {...props}
  />
)

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  PropsWithChildren<{
    isLocked: boolean
  }>

export const Anchor = ({ isLocked, ...props }: AnchorProps) => (
  <a style={{ color: isLocked ? '#FF5630' : '#36B37E' }} {...props} />
)

export const Repo = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    target='_blank'
    style={{
      paddingBottom: 1,
      borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
      textDecoration: 'none',
    }}
    {...props}
  />
)

/*
  ==============================
  Misc.
  ==============================
*/

export const Header = (props: HTMLAttributes<HTMLElement>) => <header style={{ marginBottom: '2em' }} {...props} />

export const Footer = (props: HTMLAttributes<HTMLElement>) => <footer style={{ marginTop: '2em' }} {...props} />

export const Icon = (props: HTMLAttributes<HTMLElement>) => (
  <div
    style={{
      fontSize: 64,
      height: 64,
      lineHeight: 1,
      margin: '0 auto 0.5em',
      position: 'relative',
      width: 64,
    }}
    {...props}
  />
)

type ScrollAreaProps = PropsWithChildren<{
  height: number
  innerRef: RefObject<HTMLDivElement>
}>

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(({ height, innerRef, ...props }, ref) => (
  <div
    ref={ref || innerRef}
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      boxSizing: 'border-box',
      color: '#091e42',
      display: 'none',
      fontSize: '0.8em',
      height: height,
      lineHeight: '1.4',
      marginLeft: -gutter,
      marginRight: -gutter,
      marginTop: '2em',
      overflowY: 'auto',
      paddingLeft: 20,
      paddingRight: 20,
      WebkitOverflowScrolling: 'touch',
    }}
    {...props}
  />
))

export const Title = (props: HTMLAttributes<HTMLElement>) => (
  <h1
    style={{
      display: 'inline',
      fontSize: 18,
      fontWeight: 500,
      letterSpacing: '-0.025em',
      margin: 0,
    }}
    {...props}
  />
)

export const Code = (props: HTMLAttributes<HTMLElement>) => (
  <code
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0.09)',
      borderRadius: '3px',
      color: '#091e42',
      display: 'inline-block',
      fontFamily: '"Monaco", monospace',
      fontSize: '0.85em',
      lineHeight: '1.4',
      padding: '1px 5px',
    }}
    {...props}
  />
)

export const Button = (props: HTMLAttributes<HTMLElement>) => (
  <button
    type='button'
    style={{
      alignItems: 'center',
      background: 'linear-gradient(to bottom, white, #fafbfc)',
      backgroundColor: 'white',
      border: 0,
      borderRadius: 5,
      boxShadow: '0 1px 5px rgba(0, 0, 0, 0.25), 0 1px 1px rgba(0, 0, 0, 0.1)',
      boxSizing: 'border-box',
      cursor: 'pointer',
      display: 'flex ',
      fontSize: 24,
      fontWeight: '500',
      justifyContent: 'center',
      outline: 0,
      padding: 20,
      position: 'relative',
      touchAction: 'manipulation',
      width: '100%',
    }}
    {...props}
  />
)

type ChevronDownProps = {
  fg?: string
  bg?: string
  style: CSSProperties
}

export const ChevronDown = ({ fg = 'white', bg = 'inherit', style }: ChevronDownProps) => (
  <svg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' style={style}>
    <g stroke='none' strokeWidth='1' fill='inherit' fillRule='evenodd'>
      <circle fill={bg} cx='12' cy='12' r='10' />
      <path
        d='M8.29175,10.293 C7.90275,10.685 7.90275,11.32 8.29175,11.712 L11.23075,14.677 C11.44875,14.892 11.73075,14.999 12.00975,14.999 C12.28875,14.999 12.56575,14.892 12.77875,14.677 L15.70875,11.722 C16.09675,11.33 16.09675,10.695 15.70875,10.303 C15.31975,9.911 14.69075,9.911 14.30275,10.303 L12.00475,12.62 L9.69775,10.293 C9.50375,10.098 9.24875,10 8.99475,10 C8.73975,10 8.48475,10.098 8.29175,10.293 Z'
        fill={fg}
      />
    </g>
  </svg>
)
