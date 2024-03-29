import camelCase from 'lodash/camelCase'

const files = require.context('.', false, /\.js$/)
const modules = {}

files.keys().forEach(fileName => {
  if (fileName === './index.js') {
    return
  }

  const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ''))

  modules[moduleName] = {
    namespaced: true,
    ...files(fileName)
  }
})

export default modules
