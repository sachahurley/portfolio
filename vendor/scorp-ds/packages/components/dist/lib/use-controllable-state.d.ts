/**
 * CONTROLLABLE STATE (internal)
 *
 * One hook for the controlled / uncontrolled pattern: when `value` is
 * defined the parent owns the state, otherwise the component keeps its own
 * copy seeded from `defaultValue`. `onChange` fires either way, so a
 * consumer can observe an uncontrolled component without taking it over.
 *
 * Not exported from the package barrel.
 */
export declare function useControllableState<T>({ value, defaultValue, onChange, }: {
    value: T | undefined;
    defaultValue: T;
    onChange?: (next: T) => void;
}): [T, (next: T) => void];
//# sourceMappingURL=use-controllable-state.d.ts.map