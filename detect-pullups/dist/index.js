
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./detect-pullups.cjs.production.min.js')
} else {
  module.exports = require('./detect-pullups.cjs.development.js')
}
