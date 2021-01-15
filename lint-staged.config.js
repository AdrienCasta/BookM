module.exports = {
  "**/*.ts?(x)": () => ["tsc -p tsconfig.json --noEmit"],
  "!(*test).ts?(x)": ["eslint --fix", "prettier --write"],
}
