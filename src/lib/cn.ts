type CnArg =
  | string
  | undefined
  | null
  | false
  | Record<string, boolean | undefined | null>;

export function cn(...args: CnArg[]) {
  const classes: string[] = [];

  for (const a of args) {
    if (!a) continue;
    if (typeof a === "string") {
      classes.push(a);
      continue;
    }
    for (const [k, v] of Object.entries(a)) {
      if (v) classes.push(k);
    }
  }

  return classes.join(" ");
}

