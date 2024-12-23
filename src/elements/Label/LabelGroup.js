import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
} from '../../lib'

/**
 * A label can be grouped.
 */
const LabelGroup = React.forwardRef(function (props, ref) {
  const { children, circular, className, color, content, size, tag } = props

  const classes = cx(
    'ui',
    color,
    size,
    getKeyOnly(circular, 'circular'),
    getKeyOnly(tag, 'tag'),
    'labels',
    className,
  )
  const rest = getUnhandledProps(LabelGroup, props)
  const ElementType = getComponentType(props)

  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})

LabelGroup.displayName = 'LabelGroup'
LabelGroup.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Labels can share shapes. */
  circular: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** Label group can share colors together. */
  color: PropTypes.oneOf(SUI.COLORS),

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Label group can share sizes together. */
  size: PropTypes.oneOf(SUI.SIZES),

  /** Label group can share tag formatting. */
  tag: PropTypes.bool,
}

export default LabelGroup
