/**
 * Defines the possible global CSS values.
 * These values can be used in various CSS properties to reset or inherit styles.
 */
export type FirengGlobalCssValues = 'inherit' | 'initial' | 'unset' | 'revert';

/**
 * Defines the possible values for CSS flex-direction.
 */
export type FirengFlexDirection =
  | 'row'
  | 'column'
  | 'row-reverse'
  | 'column-reverse'
  | FirengGlobalCssValues;

/**
 * Defines the possible values for CSS justify-content.
 */
export type FirengJustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | FirengGlobalCssValues;

/**
 * Defines the possible values for CSS align-items.
 */
export type FirengAlignItems =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'stretch'
  | FirengGlobalCssValues;

/**
 * Defines the possible values for CSS align-self.
 */
export type FirengAlignContent =
  | 'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | FirengGlobalCssValues;

/**
 * Defines the possible values for CSS flex-wrap.
 */
export type FirengFlexWrap =
  | 'nowrap'
  | 'wrap'
  | 'wrap-reverse'
  | FirengGlobalCssValues;

/**
 * Defines the possible values for CSS gap.
 */
export type FirengGap = string | FirengGlobalCssValues;
