/**
 * Defines the possible global CSS values.
 * These values can be used in various CSS properties to reset or inherit styles.
 */
export type FirengGlobalCssValues = 'inherit' | 'initial' | 'unset' | 'revert';

/**
 * Defines the possible overflow alignments.
 */
export type FirengCssOverflowAlignment = 'safe center' | 'unsafe center';

/**
 * Accepted values for flexDirection are:
 * - `row`: Items are placed in a row, from left to right in LTR context.
 * - `column`: Items are placed in a column, from top to bottom.
 * - `row-reverse`: Items are placed in a row, from right to left in LTR context.
 * - `column-reverse`: Items are placed in a column, from bottom to top.
 *
 * Global CSS values are also accepted: `inherit`, `initial`, `unset`, `revert`.
 */
export type FirengFlexDirection =
  | 'row'
  | 'column'
  | 'row-reverse'
  | 'column-reverse'
  | FirengGlobalCssValues;

/**
 * Accepted values for justifyContent are:
 * - `flex-start`: Items are packed towards the start of the flex-direction.
 * - `flex-end`: Items are packed towards the end of the flex-direction.
 * - `center`: Items are centered along the main axis.
 * - `space-between`: Items are evenly distributed with the first item at the start
 * and the last item at the end.
 * - `space-around`: Items are evenly distributed with equal space around them.
 * - `space-evenly`: Items are evenly distributed with equal space around them,
 * including the space at the ends.
 *
 * Other accepted values include:
 * `start`, `end`, `left`, `right`, `normal`, `stretch`,
 * `safe center`, `unsafe center`.
 */
export type FirengJustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'start'
  | 'end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'left'
  | 'right'
  | 'normal'
  | 'stretch'
  | FirengCssOverflowAlignment
  | FirengGlobalCssValues;

/**
 * Accepted values for alignItems are:
 * - `flex-start`: Items are aligned to the start of the cross axis.
 * - `flex-end`: Items are aligned to the end of the cross axis.
 * - `center`: Items are centered along the cross axis.
 * - `baseline`: Items are aligned such that their baselines align.
 * - `stretch`: Items stretch to fill the container (this is the default behavior).
 *
 * Other accepted values include: `normal`, `start`, `end`, `self-start`, `self-end`,
 * `anchor-center`, `first baseline`, `last baseline`, `safe center`, `unsafe center`.
 *
 * Global CSS values are also accepted: `inherit`, `initial`, `unset`, `revert`.
 */
export type FirengAlignItems =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'stretch'
  | 'normal'
  | 'start'
  | 'end'
  | 'self-start'
  | 'self-end'
  | 'anchor-center'
  | 'first baseline'
  | 'last baseline'
  | FirengCssOverflowAlignment
  | FirengGlobalCssValues;

/**
 * Accepted values for alignContent are:
 * - `stretch`: Lines stretch to take up the remaining space.
 * - `flex-start`: Lines are packed towards the start of the cross axis.
 * - `flex-end`: Lines are packed towards the end of the cross axis.
 * - `center`: Lines are centered along the cross axis.
 * - `space-between`: Lines are evenly distributed with the first line at the start
 * and the last line at the end.
 * - `space-around`: Lines are evenly distributed with equal space around them.
 * Note: The space between lines is double the space at the ends.
 * - `space-evenly`: Lines are evenly distributed with equal space around them,
 * including the space at the ends.
 *
 * Other accepted values include: `normal`, `start`, `end`, `self-start`, `self-end`,
 * `anchor-center`, `first baseline`, `last baseline`, `safe center`, `unsafe center`.
 *
 * Global CSS values are also accepted: `inherit`, `initial`, `unset`, `revert`.
 */
export type FirengAlignContent =
  | 'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-evenly'
  | 'space-around'
  | 'start'
  | 'end'
  | 'baseline'
  | 'first baseline'
  | 'last baseline'
  | 'normal'
  | FirengCssOverflowAlignment
  | FirengGlobalCssValues;

/**
 * Accepted values for flexWrap are:
 * - `nowrap`: All flex items will be on one line.
 * - `wrap`: Flex items will wrap onto multiple lines.
 * - `wrap-reverse`: Flex items will wrap onto multiple lines in reverse order.
 *
 * Global CSS values are also accepted: `inherit`, `initial`, `unset`, `revert`.
 */
export type FirengFlexWrap =
  | 'nowrap'
  | 'wrap'
  | 'wrap-reverse'
  | FirengGlobalCssValues;

/**
 * Accepted values for gap are any valid CSS <length> or <percentage> value,
 * which can be a single value (for both row and column gap) or two values
 * (first for row-gap, second for column-gap).
 */
export type FirengGap = string | FirengGlobalCssValues;

/**
 * Accepted values for display are:
 * - `block`: The element generates a block-level box.
 * - `inline`: The element generates an inline-level box.
 * - `inline-block`: The element generates a block-level box that flows with surrounding content as if it were a single inline box.
 * - `flex`: The element generates a block-level flex container.
 * - `inline-flex`: The element generates an inline-level flex container.
 * - `grid`: The element generates a block-level grid container.
 * - `inline-grid`: The element generates an inline-level grid container.
 * - `none`: The element and its descendants are hidden, and it takes up no space.
 * - `contents`: The element itself does not generate any boxes, but its children and pseudo-elements still generate boxes.
 *
 * Other accepted values include: `flow-root`, `block flex`, `block flow`, `block flow-root`,
 * `block grid`, `inline flex`, `inline flow`, `inline flow-root`, `inline grid`,
 * `table`, `table-row`, `list-item`.
 *
 * Global CSS values are also accepted: `inherit`, `initial`, `unset`, `revert`.
 *
 * For more details on the display property, refer to the MDN documentation:
 * @see [MDN - display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
 */
export type FirengDisplay =
  | 'block'
  | 'inline'
  | 'inline-block'
  | 'flex'
  | 'inline-flex'
  | 'grid'
  | 'inline-grid'
  | 'flow-root'
  | 'none'
  | 'contents'
  | 'block flex'
  | 'block flow'
  | 'block flow-root'
  | 'block grid'
  | 'inline flex'
  | 'inline flow'
  | 'inline flow-root'
  | 'inline grid'
  | 'table'
  | 'table-row'
  | 'list-item'
  | FirengGlobalCssValues;
