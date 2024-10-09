// @ts-check

const path = require("path");

const buildEslintCommand = (/** @type {string[]} */ filenames) => {
    // filter out non ts js file
    const files = filenames.map((f) => path.relative(process.cwd(), f)).filter((f) => f.endsWith(".ts") || f.endsWith(".tsx") || f.endsWith(".js") || f.endsWith(".jsx"));

    if (files.length === 0) {
        return "";
    }

    return `next lint --fix --file ${files.join(" --file ")}`;
};

module.exports = {
    "*.{js,jsx,ts,tsx}": [buildEslintCommand],
};
