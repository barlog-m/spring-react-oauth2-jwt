module.exports = () => Object.keys(JSON.parse(require("fs").readFileSync("package.json", {encoding: "utf8"})).dependencies);
