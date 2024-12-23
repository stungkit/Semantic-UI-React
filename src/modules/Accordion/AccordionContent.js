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
 * A content sub-component for Accordion component.
 */
const AccordionContent = React.forwardRef(function (props, ref) {
  const { active, children, className, content } = props

  const classes = cx('content', getKeyOnly(active, 'active'), className)
  const rest = getUnhandledProps(AccordionContent, props)
  const ElementType = getComponentType(props)

  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})

AccordionContent.displayName = 'AccordionContent'
AccordionContent.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Whether or not the content is visible. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
}

AccordionContent.create = createShorthandFactory(AccordionContent, (content) => ({ content }))

export default AccordionContent
