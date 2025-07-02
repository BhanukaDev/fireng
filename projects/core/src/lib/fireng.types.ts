/**
 * Defines a map where keys are breakpoint names and values are the corresponding pixel values.
 */
export type FirengBreakpoints = Record<string, number>;

/**
 * Defines a map where keys are breakpoint names and values are the corresponding responsive values.
 * This is used to store responsive values for different breakpoints.
 */
export type FirengResponsiveMap<T> = Record<string, T>;
