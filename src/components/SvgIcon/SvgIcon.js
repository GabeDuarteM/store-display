import React from 'react'

import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import cn from 'classnames'

export const styles = {
  svgIcon: {
    height: ({ height }) => height,
    width: ({ width }) => width,
    fill: ({ color }) => color,
    display: 'block',
  },
}

// eslint-disable-next-line no-unused-vars
const SvgIcon = ({
  classes,
  src,
  height,
  width,
  color,
  className,
  ...rest
}) => (
  <span
    className={cn(classes.svgIcon, className)}
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: src }}
    {...rest}
  />
)

export const propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** If passed, the className will be applied to the root of the component */
  className: PropTypes.string,
  /** A string containing the content of the svg */
  src: PropTypes.string.isRequired,
  /** The height of the svg */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** The width of the svg */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** The color to use as the fill of the svg */
  color: PropTypes.string,
}
export const defaultProps = {
  height: 'auto',
  width: 'auto',
  color: null,
  className: null,
}

SvgIcon.propTypes = propTypes
SvgIcon.defaultProps = defaultProps

export default injectSheet(styles)(SvgIcon)
