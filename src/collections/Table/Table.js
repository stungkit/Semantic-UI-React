import _ from 'lodash'
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
  getKeyOrValueAndKey,
  getTextAlignProp,
  getVerticalAlignProp,
  getWidthProp,
} from '../../lib'
import TableBody from './TableBody'
import TableCell from './TableCell'
import TableFooter from './TableFooter'
import TableHeader from './TableHeader'
import TableHeaderCell from './TableHeaderCell'
import TableRow from './TableRow'

/**
 * A table displays a collections of data grouped into rows.
 */
const Table = React.forwardRef(function (props, ref) {
  const {
    attached,
    basic,
    celled,
    children,
    className,
    collapsing,
    color,
    columns,
    compact,
    definition,
    fixed,
    footerRow,
    headerRow,
    headerRows,
    inverted,
    padded,
    renderBodyRow,
    selectable,
    singleLine,
    size,
    sortable,
    stackable,
    striped,
    structured,
    tableData,
    textAlign,
    unstackable,
    verticalAlign,
  } = props

  const classes = cx(
    'ui',
    color,
    size,
    getKeyOnly(celled, 'celled'),
    getKeyOnly(collapsing, 'collapsing'),
    getKeyOnly(definition, 'definition'),
    getKeyOnly(fixed, 'fixed'),
    getKeyOnly(inverted, 'inverted'),
    getKeyOnly(selectable, 'selectable'),
    getKeyOnly(singleLine, 'single line'),
    getKeyOnly(sortable, 'sortable'),
    getKeyOnly(stackable, 'stackable'),
    getKeyOnly(striped, 'striped'),
    getKeyOnly(structured, 'structured'),
    getKeyOnly(unstackable, 'unstackable'),
    getKeyOrValueAndKey(attached, 'attached'),
    getKeyOrValueAndKey(basic, 'basic'),
    getKeyOrValueAndKey(compact, 'compact'),
    getKeyOrValueAndKey(padded, 'padded'),
    getTextAlignProp(textAlign),
    getVerticalAlignProp(verticalAlign),
    getWidthProp(columns, 'column'),
    'table',
    className,
  )
  const rest = getUnhandledProps(Table, props)
  const ElementType = getComponentType(props, { defaultAs: 'table' })

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }

  const hasHeaderRows = headerRow || headerRows
  const headerShorthandOptions = { defaultProps: { cellAs: 'th' } }
  const headerElement = hasHeaderRows && (
    <TableHeader>
      {TableRow.create(headerRow, headerShorthandOptions)}
      {_.map(headerRows, (data) => TableRow.create(data, headerShorthandOptions))}
    </TableHeader>
  )

  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {headerElement}
      <TableBody>
        {renderBodyRow &&
          _.map(tableData, (data, index) => TableRow.create(renderBodyRow(data, index)))}
      </TableBody>
      {footerRow && <TableFooter>{TableRow.create(footerRow)}</TableFooter>}
    </ElementType>
  )
})

Table.displayName = 'Table'
Table.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Attach table to other content */
  attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]),

  /** A table can reduce its complexity to increase readability. */
  basic: PropTypes.oneOfType([PropTypes.oneOf(['very']), PropTypes.bool]),

  /** A table may be divided into individual cells. */
  celled: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A table can be collapsing, taking up only as much space as its rows. */
  collapsing: PropTypes.bool,

  /** A table can be given a color to distinguish it from other tables. */
  color: PropTypes.oneOf(SUI.COLORS),

  /** A table can specify its column count to divide its content evenly. */
  columns: PropTypes.oneOf(SUI.WIDTHS),

  /** A table may sometimes need to be more compact to make more rows visible at a time. */
  compact: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]),

  /** A table may be formatted to emphasize a first column that defines a rows content. */
  definition: PropTypes.bool,

  /**
   * A table can use fixed a special faster form of table rendering that does not resize table cells based on content
   */
  fixed: PropTypes.bool,

  /** Shorthand for a TableRow to be placed within Table.Footer. */
  footerRow: customPropTypes.itemShorthand,

  /** Shorthand for a TableRow to be placed within Table.Header. */
  headerRow: customPropTypes.every([
    customPropTypes.disallow(['headerRows']),
    customPropTypes.itemShorthand,
  ]),

  /** Shorthand for multiple TableRows to be placed within Table.Header. */
  headerRows: customPropTypes.every([
    customPropTypes.disallow(['headerRow']),
    customPropTypes.collectionShorthand,
  ]),

  /** A table's colors can be inverted. */
  inverted: PropTypes.bool,

  /** A table may sometimes need to be more padded for legibility. */
  padded: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]),

  /**
   * Mapped over `tableData` and should return shorthand for each Table.Row to be placed within Table.Body.
   *
   * @param {*} data - An element in the `tableData` array.
   * @param {number} index - The index of the current element in `tableData`.
   * @returns {*} Shorthand for a Table.Row.
   */
  renderBodyRow: customPropTypes.every([
    customPropTypes.disallow(['children']),
    customPropTypes.demand(['tableData']),
    PropTypes.func,
  ]),

  /** A table can have its rows appear selectable. */
  selectable: PropTypes.bool,

  /** A table can specify that its cell contents should remain on a single line and not wrap. */
  singleLine: PropTypes.bool,

  /** A table can also be small or large. */
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'mini', 'tiny', 'medium', 'big', 'huge', 'massive')),

  /** A table may allow a user to sort contents by clicking on a table header. */
  sortable: PropTypes.bool,

  /** A table can specify how it stacks table content responsively. */
  stackable: PropTypes.bool,

  /** A table can stripe alternate rows of content with a darker color to increase contrast. */
  striped: PropTypes.bool,

  /** A table can be formatted to display complex structured data. */
  structured: PropTypes.bool,

  /** Data to be passed to the renderBodyRow function. */
  tableData: customPropTypes.every([
    customPropTypes.disallow(['children']),
    customPropTypes.demand(['renderBodyRow']),
    PropTypes.array,
  ]),

  /** A table can adjust its text alignment. */
  textAlign: PropTypes.oneOf(_.without(SUI.TEXT_ALIGNMENTS, 'justified')),

  /** A table can specify how it stacks table content responsively. */
  unstackable: PropTypes.bool,

  /** A table can adjust its text alignment. */
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS),
}

Table.Body = TableBody
Table.Cell = TableCell
Table.Footer = TableFooter
Table.Header = TableHeader
Table.HeaderCell = TableHeaderCell
Table.Row = TableRow

export default Table
