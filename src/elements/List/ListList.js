import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'

/**
 * A list can contain a sub list.
 */
const ListList = React.forwardRef(function (props, ref) {
  const { children, className, content } = props

  const rest = getUnhandledProps(ListList, props)
  const ElementType = getComponentType(props)
  const classes = cx(getKeyOnly(ElementType !== 'ul' && ElementType !== 'ol', 'list'), className)

  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})

ListList.displayName = 'ListList'
ListList.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
}

export default ListList
