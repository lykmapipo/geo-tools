/**
 * @function readShapefile
 * @name readShapefile
 * @description Read shapefile stream
 * @param {string} path valid shapefile path
 * @param {Function} done callback to invoke on feature read
 * @returns {object} valid return options
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * readShapefile(path, (error, { finished, feature, next }) => {
 *  // handle read error
 *  if(error) { ... }
 *
 *  // handle read finished
 *  else if(finished){ ... }
 *
 *  // process feature
 *  // and read next
 *  else {
 *   //...
 *   return next();
 *  }
 * });
 */
export const readShapefile = (path, done) => {
  return done();
};

/**
 * @function readGeoJSON
 * @name readGeoJSON
 * @description Read GeoJSON file stream
 * @param {string} path valid GeoJSON file path
 * @param {Function} done callback to invoke on feature read
 * @returns {object} valid return options
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * readGeoJSON(path, (error, { finished, feature, next }) => {
 *  // handle read error
 *  if(error) { ... }
 *
 *  // handle read finished
 *  else if(finished){ ... }
 *
 *  // process feature
 *  // and read next
 *  else {
 *   //...
 *   return next();
 *  }
 * });
 */
export const readGeoJSON = (path, done) => {
  return done();
};
