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
import SearchCategoryLayout from './SearchCategoryLayout'

const SearchCategory = React.forwardRef(function (props, ref) {
  const {
    active,
    children,
    className,
    content,
    layoutRenderer = SearchCategoryLayout,
    renderer = ({ name }) => name,
  } = props

  const classes = cx(getKeyOnly(active, 'active'), 'category', className)
  const rest = getUnhandledProps(SearchCategory, props)
  const ElementType = getComponentType(props)

  const categoryContent = renderer(props)
  const resultsContent = childrenUtils.isNil(children) ? content : children

  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {layoutRenderer({ categoryContent, resultsContent })}
    </ElementType>
  )
})

SearchCategory.displayName = 'SearchCategory'
SearchCategory.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** The item currently selected by keyboard shortcut. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Display name. */
  name: PropTypes.string,

  /**
   * Renders the category layout contents.
   *
   * @param {object} props - The SearchCategoryLayout props object.
   * @returns {*} - Renderable category layout contents.
   */
  layoutRenderer: PropTypes.func,

  /**
   * Renders the category contents.
   *
   * @param {object} props - The SearchCategory props object.
   * @returns {*} - Renderable category contents.
   */
  renderer: PropTypes.func,

  /** Array of Search.Result props. */
  results: PropTypes.array,
}

export default SearchCategory
