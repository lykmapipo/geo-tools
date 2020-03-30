import { isFunction, map } from 'lodash';
import { parallel } from 'async';
import { normalizeError, assign } from '@lykmapipo/common';
import {
  valid as checkIfIsValid,
  isPoint as checkIfIsPoint,
  isMultiPoint as checkIfIsMultiPoint,
  isLineString as checkIfIsLineString,
  isMultiLineString as checkIfIsMultiLineString,
  isPolygon as checkIfIsPolygon,
  isMultiPolygon as checkIfIsMultiPolygon,
  isGeometryCollection as checkIfIsGeometryCollection,
  isFeature as checkIfIsFeature,
  isFeatureCollection as checkIfIsFeatureCollection,
} from 'geojson-validation';

const composeError = (errors = []) => {
  const status = 400;
  const code = 400;
  const message = 'Validation failed';
  const name = 'ValidationError';
  const error = normalizeError(
    assign(new Error(message), {
      name,
      status,
      code,
      message,
    })
  );
  error.errors = [...errors]; // TODO: bagify(errors)
  return error;
};

const withCallback = (cb) => (isValid, messages) => {
  if (isFunction(cb)) {
    return cb(composeError(messages), isValid);
  }
  return isValid;
};

/**
 * @function isValid
 * @name isValid
 * @description Determines if an object is a GeoJSON Object or not
 * @param {object} geojson valid geojson object
 * @param {Function} [cb] callback to invoke on success or failure
 * @returns {boolean} true if valid else false
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.2.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * isValid(geojson);
 * // => true
 */
export const isValid = (geojson, cb) => {
  return checkIfIsValid(geojson, withCallback(cb));
};

/**
 * @function isPoint
 * @name isPoint
 * @description Determines if an object is a GeoJSON Point or not
 * @param {object} geojson valid geojson object
 * @param {Function} [cb] callback to invoke on success or failure
 * @returns {boolean} true if valid else false
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.2.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * isPoint(geojson);
 * // => true
 */
export const isPoint = (geojson, cb) => {
  return checkIfIsPoint(geojson, withCallback(cb));
};

/**
 * @function isMultiPoint
 * @name isMultiPoint
 * @description Determines if an object is a GeoJSON MultiPoint or not
 * @param {object} geojson valid geojson object
 * @param {Function} [cb] callback to invoke on success or failure
 * @returns {boolean} true if valid else false
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.2.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * isMultiPoint(geojson);
 * // => true
 */
export const isMultiPoint = (geojson, cb) => {
  return checkIfIsMultiPoint(geojson, withCallback(cb));
};

/**
 * @function isLineString
 * @name isLineString
 * @description Determines if an object is a GeoJSON LineString or not
 * @param {object} geojson valid geojson object
 * @param {Function} [cb] callback to invoke on success or failure
 * @returns {boolean} true if valid else false
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.2.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * isLineString(geojson);
 * // => true
 */
export const isLineString = (geojson, cb) => {
  return checkIfIsLineString(geojson, withCallback(cb));
};

/**
 * @function isMultiLineString
 * @name isMultiLineString
 * @description Determines if an object is a GeoJSON MultiLineString or not
 * @param {object} geojson valid geojson object
 * @param {Function} [cb] callback to invoke on success or failure
 * @returns {boolean} true if valid else false
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.2.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * isMultiLineString(geojson);
 * // => true
 */
export const isMultiLineString = (geojson, cb) => {
  return checkIfIsMultiLineString(geojson, withCallback(cb));
};

/**
 * @function isPolygon
 * @name isPolygon
 * @description Determines if an object is a GeoJSON Polygon or not
 * @param {object} geojson valid geojson object
 * @param {Function} [cb] callback to invoke on success or failure
 * @returns {boolean} true if valid else false
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.2.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * isPolygon(geojson);
 * // => true
 */
export const isPolygon = (geojson, cb) => {
  return checkIfIsPolygon(geojson, withCallback(cb));
};

/**
 * @function isMultiPolygon
 * @name isMultiPolygon
 * @description Determines if an object is a GeoJSON MultiPolygon or not
 * @param {object} geojson valid geojson object
 * @param {Function} [cb] callback to invoke on success or failure
 * @returns {boolean} true if valid else false
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.2.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * isMultiPolygon(geojson);
 * // => true
 */
export const isMultiPolygon = (geojson, cb) => {
  return checkIfIsMultiPolygon(geojson, withCallback(cb));
};

/**
 * @function isGeometryCollection
 * @name isGeometryCollection
 * @description Determines if an object is a GeoJSON GeometryCollection or not
 * @param {object} geojson valid geojson object
 * @param {Function} [cb] callback to invoke on success or failure
 * @returns {boolean} true if valid else false
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.2.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * isGeometryCollection(geojson);
 * // => true
 */
export const isGeometryCollection = (geojson, cb) => {
  return checkIfIsGeometryCollection(geojson, withCallback(cb));
};

/**
 * @function isFeature
 * @name isFeature
 * @description Determines if an object is a GeoJSON Feature or not
 * @param {object} geojson valid geojson object
 * @param {Function} [cb] callback to invoke on success or failure
 * @returns {boolean} true if valid else false
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.2.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * isFeature(geojson);
 * // => true
 */
export const isFeature = (geojson, cb) => {
  return checkIfIsFeature(geojson, withCallback(cb));
};

/**
 * @function isFeatureCollection
 * @name isFeatureCollection
 * @description Determines if an object is a GeoJSON FeatureCollection or not
 * @param {object} geojson valid geojson object
 * @param {Function} [cb] callback to invoke on success or failure
 * @returns {boolean} true if valid else false
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.2.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * isFeatureCollection(geojson);
 * // => true
 */
export const isFeatureCollection = (geojson, cb) => {
  return checkIfIsFeatureCollection(geojson, withCallback(cb));
};

/**
 * @function isGeometry
 * @name isGeometry
 * @description Determines if an object is a GeoJSON geometry or not
 * @param {object} geojson valid geojson object
 * @param {Function} [cb] callback to invoke on success or failure
 * @returns {boolean} true if valid else false
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.4.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * isGeometry(geojson);
 * // => true
 */
export const isGeometry = (geojson, cb) => {
  // async
  if (isFunction(cb)) {
    const checkIfIsGeometry = map(
      [
        isValid,
        isPoint,
        isMultiPoint,
        isLineString,
        isMultiLineString,
        isPolygon,
        isMultiPolygon,
        isGeometryCollection,
      ],
      (validator) => {
        return (next) => validator(geojson, next);
      }
    );
    return parallel(checkIfIsGeometry, withCallback(cb));
  }
  // sync
  return (
    isPoint(geojson) ||
    isMultiPoint(geojson) ||
    isLineString(geojson) ||
    isMultiLineString(geojson) ||
    isPolygon(geojson) ||
    isMultiPolygon(geojson) ||
    isGeometryCollection(geojson)
  );
};
