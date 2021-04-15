'use strict';

const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);

class Util {
  static snakeToCamel(str) {
    return str
      .replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', ''))
      .replace('Id', 'ID');
  }

  static mergeDefault(def, given) {
    if (!given) return def;
    for (const key in def) {
      if (!has(given, key) || given[key] === undefined) {
        given[key] = def[key];
      } else if (given[key] === Object(given[key])) {
        given[key] = Util.mergeDefault(def[key], given[key]);
      }
    }

    return given;
  }
}

module.exports = Util;
