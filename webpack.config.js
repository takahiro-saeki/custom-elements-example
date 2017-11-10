module.exports = () => {
  if (process.env.NODE_ENV === 'production') {
    return require(`./webpack.prod.js`);
  } else {
    return require(`./webpack.dev.js`);
  }
};