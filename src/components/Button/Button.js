import React from 'react'

import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import cn from 'classnames'

export const styles = {
  button: {
    cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
    width: ({ width }) => width,
    height: 50,
    backgroundColor: '#6e8be3',
    userSelect: 'none',
    color: '#ffffff',
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    border: 0,
  },
}

const Button = ({
  classes,
  className,
  children,
  onClick,
  disabled,
  ...rest
}) => (
  <button
    className={cn(classes.button, className)}
    onClick={onClick}
    disabled={disabled}
    {...rest}
  >
    {children}
  </button>
)

export const propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The content of the button */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf([PropTypes.node]),
    PropTypes.node,
  ]).isRequired,
  /** The click handler of the button. */
  onClick: PropTypes.func.isRequired,
  /** If present, it will be added to the root component */
  className: PropTypes.string,
  /** The width of the component */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // eslint-disable-line react/no-unused-prop-types
  /** Prop that defines if the button is disabled or not */
  disabled: PropTypes.bool,
}

export const defaultProps = {
  width: 280,
  disabled: false,
  className: null,
}

Button.propTypes = propTypes
Button.defaultProps = defaultProps

export default injectSheet(styles)(Button)
