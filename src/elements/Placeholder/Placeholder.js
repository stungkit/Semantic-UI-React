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
import PlaceholderHeader from './PlaceholderHeader'
import PlaceholderImage from './PlaceholderImage'
import PlaceholderLine from './PlaceholderLine'
import PlaceholderParagraph from './PlaceholderParagraph'

/**
 * A placeholder is used to reserve space for content that soon will appear in a layout.
 */
const Placeholder = React.forwardRef(function (props, ref) {
  const { children, className, content, fluid, inverted } = props
  const classes = cx(
    'ui',
    getKeyOnly(fluid, 'fluid'),
    getKeyOnly(inverted, 'inverted'),
    'placeholder',
    className,
  )
  const rest = getUnhandledProps(Placeholder, props)
  const ElementType = getComponentType(props)

  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})

Placeholder.displayName = 'Placeholder'
Placeholder.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A fluid placeholder takes up the width of its container. */
  fluid: PropTypes.bool,

  /** A placeholder can have their colors inverted. */
  inverted: PropTypes.bool,
}

Placeholder.Header = PlaceholderHeader
Placeholder.Image = PlaceholderImage
Placeholder.Line = PlaceholderLine
Placeholder.Paragraph = PlaceholderParagraph

export default Placeholder
