const { Resolver } = require("@parcel/plugin");
const path = require("path");

module.exports = new Resolver({
  async resolve({ options, specifier }) {
    console.log(specifier);
    if (specifier.startsWith("@wordpress")) {
      const propertyName = specifier
        .substring(11)
        .toLowerCase()
        .replace(/(-\w)/g, (m) => m.toUpperCase().substring(1));
      return {
        filePath: path.join(options.projectRoot, `wp-${propertyName}.js`),
        code: `module.exports = wp[${propertyName}];`,
      };
    }
    return null;
  },
});
