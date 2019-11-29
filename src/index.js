import { getNumbers } from '@lykmapipo/env';

// internal
const GEO_BBOX = getNumbers('GEO_BBOX', [-180, -90, 180, 90]);
const GEO_POINT = 'Point';

/**
 * @function randomLongitude
 * @name randomLongitude
 * @description Generate random longitude
 * @param {object} [optns={}] valid option
 * @param {number[]} [optns.bbox=[-180, -90, 180, 90]] a bounding box inside
 * of which geometries are placed.
 * @returns {object} valid longitude
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * const longitude = randomLongitude();
 * // => -76.4103176657406
 */
export const randomLongitude = (optns = {}) => {
  const { bbox = GEO_BBOX } = optns;
  const longitude = Math.random() * (bbox[2] - bbox[0]) + bbox[0];
  return longitude;
};

/**
 * @function randomLatitude
 * @name randomLatitude
 * @description Generate random latitude
 * @param {object} [optns={}] valid option
 * @param {number[]} [optns.bbox=[-180, -90, 180, 90]] a bounding box inside
 * of which geometries are placed.
 * @returns {object} valid latitude
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * const latitude = randomLatitude();
 * // => 67.07040223216296
 */
export const randomLatitude = (optns = {}) => {
  const { bbox = GEO_BBOX } = optns;
  const latitude = Math.random() * (bbox[3] - bbox[1]) + bbox[1];
  return latitude;
};

/**
 * @function randomPoint
 * @name randomPoint
 * @description Generate random GeoJSON Point
 * @param {object} [optns={}] valid option
 * @param {number[]} [optns.bbox=[-180, -90, 180, 90]] a bounding box inside
 * of which geometries are placed.
 * @returns {object} valid GeoJSON Point
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example const geo = randomPoint();
 * // => { type: 'Point', coordinates:[ ... ] }
 */
export const randomPoint = (optns = {}) => {
  const longitude = randomLongitude(optns);
  const latitude = randomLatitude(optns);
  return { type: GEO_POINT, coordinates: [longitude, latitude] };
};

/**
 * @function randomLineString
 * @name randomLineString
 * @description Generate random GeoJSON LineString
 * @returns {object} valid GeoJSON LineString
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const geo = randomLineString();
 * // => { type: 'LineString', coordinates:[ ... ] }
 */
export const randomLineString = () => {
  return {};
};

/**
 * @function randomPolygon
 * @name randomPolygon
 * @description Generate random GeoJSON Polygon
 * @returns {object} valid GeoJSON Polygon
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const geo = randomPolygon();
 * // => { type: 'Polygon', coordinates:[ ... ] }
 */
export const randomPolygon = () => {
  return {};
};

/**
 * @function randomMultiPoint
 * @name randomMultiPoint
 * @description Generate random GeoJSON MultiPoint
 * @returns {object} valid GeoJSON MultiPoint
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const geo = randomMultiPoint();
 * // => { type: 'MultiPoint', coordinates:[ ... ] }
 */
export const randomMultiPoint = () => {
  return {};
};

/**
 * @function randomMultiLineString
 * @name randomMultiLineString
 * @description Generate random GeoJSON MultiLineString
 * @returns {object} valid GeoJSON MultiLineString
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const geo = randomMultiLineString();
 * // => { type: 'MultiLineString', coordinates:[ ... ] }
 */
export const randomMultiLineString = () => {
  return {};
};

/**
 * @function randomMultiPolygon
 * @name randomMultiPolygon
 * @description Generate random GeoJSON MultiPolygon
 * @returns {object} valid GeoJSON MultiPolygon
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const geo = randomMultiPolygon();
 * // => {type: 'MultiPolygon', coordinates:[] }
 */
export const randomMultiPolygon = () => {
  return {};
};

/**
 * @function randomGeometry
 * @name randomGeometry
 * @description Generate random GeoJSON Geometry
 * @returns {object} valid GeoJSON Geometry
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const geo = randomGeometry();
 * // => { type: 'Point', coordinates:[ ... ] }
 */
export const randomGeometry = () => {
  return {};
};

/**
 * @function randomGeometryCollection
 * @name randomGeometryCollection
 * @description Generate random GeoJSON GeometryCollection
 * @returns {object} valid GeoJSON GeometryCollection
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const geo = randomGeometryCollection();
 * // => { type: 'GeometryCollection', geometries: [ ... ] }
 */
export const randomGeometryCollection = () => {
  return {};
};
