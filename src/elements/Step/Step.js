import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
  useEventCallback,
} from '../../lib'
import Icon from '../Icon'
import StepContent from './StepContent'
import StepDescription from './StepDescription'
import StepGroup from './StepGroup'
import StepTitle from './StepTitle'

/**
 * A step shows the completion status of an activity in a series of activities.
 */
const Step = React.forwardRef(function (props, ref) {
  const {
    active,
    children,
    className,
    completed,
    content,
    description,
    disabled,
    href,
    onClick,
    icon,
    link,
    title,
  } = props

  const handleClick = useEventCallback((e) => {
    if (!disabled) {
      _.invoke(props, 'onClick', e, props)
    }
  })

  const classes = cx(
    getKeyOnly(active, 'active'),
    getKeyOnly(completed, 'completed'),
    getKeyOnly(disabled, 'disabled'),
    getKeyOnly(link, 'link'),
    'step',
    className,
  )

  const rest = getUnhandledProps(Step, props)
  const ElementType = getComponentType(props, {
    getDefault: () => {
      if (onClick) {
        return 'a'
      }
    },
  })

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} href={href} onClick={handleClick} ref={ref}>
        {children}
      </ElementType>
    )
  }

  if (!childrenUtils.isNil(content)) {
    return (
      <ElementType {...rest} className={classes} href={href} onClick={handleClick} ref={ref}>
        {content}
      </ElementType>
    )
  }

  return (
    <ElementType {...rest} className={classes} href={href} onClick={handleClick} ref={ref}>
      {Icon.create(icon, { autoGenerateKey: false })}
      {StepContent.create({ description, title }, { autoGenerateKey: false })}
    </ElementType>
  )
})

Step.displayName = 'Step'
Step.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A step can be highlighted as active. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A step can show that a user has completed it. */
  completed: PropTypes.bool,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Shorthand for StepDescription. */
  description: customPropTypes.itemShorthand,

  /** Show that the Loader is inactive. */
  disabled: PropTypes.bool,

  /** Render as an `a` tag instead of a `div` and adds the href attribute. */
  href: PropTypes.string,

  /** Shorthand for Icon. */
  icon: customPropTypes.itemShorthand,

  /** A step can be link. */
  link: PropTypes.bool,

  /**
   * Called on click. When passed, the component will render as an `a`
   * tag by default instead of a `div`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /** A step can show a ordered sequence of steps. Passed from StepGroup. */
  ordered: PropTypes.bool,

  /** Shorthand for StepTitle. */
  title: customPropTypes.itemShorthand,
}

Step.Content = StepContent
Step.Description = StepDescription
Step.Group = StepGroup
Step.Title = StepTitle

Step.create = createShorthandFactory(Step, (content) => ({ content }))

export default Step
