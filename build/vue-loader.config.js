module.exports = (isDev) => {
  return {
    preserveWhitepace: true,
    extractCSS: !isDev,
    localIdentName: '[path]-[name]-[hash:base64:5]',
    cssModules: {
      camelCase: true
    }
  }
}
