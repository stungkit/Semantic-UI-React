import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'

/**
 * A statistic can contain a numeric, icon, image, or text value.
 */
const StatisticValue = React.forwardRef(function (props, ref) {
  const { children, className, content, text } = props

  const classes = cx(getKeyOnly(text, 'text'), 'value', className)
  const rest = getUnhandledProps(StatisticValue, props)
  const ElementType = getComponentType(props)

  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})

StatisticValue.displayName = 'StatisticValue'
StatisticValue.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Format the value with smaller font size to fit nicely beside number values. */
  text: PropTypes.bool,
}

StatisticValue.create = createShorthandFactory(StatisticValue, (content) => ({ content }))

export default StatisticValue
