export const GAMES = ['maze', 'focus', 'whack', 'trail', 'dualNback'] as const;

// Firebase keys: reject anything that could change the database path.
const ID_PATTERN = /^[A-Za-z0-9_-]{1,128}$/;

export const isValidId = (value: string | null): value is string =>
  !!value && ID_PATTERN.test(value);

export const isValidGame = (value: string | null): value is string =>
  !!value && (GAMES as readonly string[]).includes(value);
