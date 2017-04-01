const context = require.context('./specs/', true, /\.spec\.(js|jsx)$/);
context.keys().forEach(context);

module.exports = context;
