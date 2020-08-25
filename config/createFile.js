const fs = require('fs')
const path = require('path')

const createPage = require('./createTemp')
const fileConfig = require('./fileName')
const { defaultFileConfig } = require('./config.file')

const createProj = function () {
  Object.keys(fileConfig).forEach(path => {
    let config = Object.assign({}, defaultFileConfig, fileConfig[path])
    createPage(path, config)
  })
}
module.exports = createProj
