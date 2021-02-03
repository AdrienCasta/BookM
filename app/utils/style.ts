export const combine = (...v: Record<string, any>[]) =>
  v.reduce((a, c) => ({ ...a, ...(c || {}) }), {})
