import { forEach, range } from 'lodash';
import { mergeObjects } from '@lykmapipo/common';
import { getNumber, getNumbers } from '@lykmapipo/env';

// internal
const MAX_LENGTH = getNumber('GEO_MAX_LENGTH', 0.0001);
const MAX_ROTATION = getNumber('GEO_MAX_ROTATION', Math.PI / 8);
const GEO_BBOX = getNumbers('GEO_BBOX', []) || [-180, -90, 180, 90];
const GEO_POINT = 'Point';
const GEO_LINESTRING = 'LineString';
const GEO_MULTIPOINT = 'MultiPoint';

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
 * @function randomPosition
 * @name randomPosition
 * @description Generate next random position
 * @param {object} [optns={}] valid option
 * @param {number} [optns.angle = (Math.random() * 2 * Math.PI)] valid angle in radian between points
 * @param {number} [optns.distance = (Math.random() * 0.0001)] valid distance between points
 * @param {number} [optns.longitude] valid longitude on last point
 * @param {number} [optns.latitude] valid latitude on last point
 * @param {number[]} [optns.bbox=[-180, -90, 180, 90]] a bounding box inside
 * of which geometries are placed.
 * @returns {object} valid position
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * const position = randomPosition();
 * // => [ -76.4103176657406, 67.07040223216296 ]
 */
export const randomPosition = (optns = {}) => {
  // TODO: restric within bbox

  // calculate angle
  const angle =
    (optns.angle || Math.random() * 2 * Math.PI) +
    (Math.random() - 0.5) * MAX_ROTATION * 2;

  // calculate hypotenus
  const distance = optns.distance || Math.random() * MAX_LENGTH;

  // x2 = x1 + dcos0
  const x1 = optns.longitude || randomLongitude(optns);
  const x2 = x1 + distance * Math.cos(angle);

  // y2 = y1 + dsin0
  const y1 = optns.latitude || randomLatitude(optns);
  const y2 = y1 + distance * Math.sin(angle);

  // return x2,y2
  return [x2, y2];
};

/**
 * @function randomPositions
 * @name randomPositions
 * @description Generate random positions
 * @param {object} [optns={}] valid option
 * @param {number} [optns.vertices=2] how many positions.
 * @param {number[]} [optns.bbox=[-180, -90, 180, 90]] a bounding box inside
 * of which geometries are placed.
 * @returns {object} valid positions
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example const geo = randomPositions();
 * // => [ [-76.41031, 67.0704], ...]
 */
export const randomPositions = (optns = { vertices: 2 }) => {
  // refs
  let coordinates = [];
  let longitude;
  let latitude;

  // compute position for vertices
  forEach(range(optns.vertices), () => {
    // random next position after last
    const position = randomPosition(
      mergeObjects(optns, { longitude, latitude })
    );
    [longitude, latitude] = position;
    // collect position
    coordinates = [...coordinates, position];
  });

  // return positions
  return coordinates;
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
  // refs
  const type = GEO_POINT;
  const coordinates = randomPosition(optns);

  // return point
  return { type, coordinates };
};

/**
 * @function randomLineString
 * @name randomLineString
 * @description Generate random GeoJSON LineString
 * @param {object} [optns={}] valid option
 * @param {number} [optns.vertices=2] how many coordinates each LineString will contain.
 * @param {number[]} [optns.bbox=[-180, -90, 180, 90]] a bounding box inside
 * of which geometries are placed.
 * @returns {object} valid GeoJSON LineString
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example const geo = randomLineString();
 * // => { type: 'LineString', coordinates:[ ... ] }
 */
export const randomLineString = (optns = { vertices: 2 }) => {
  // refs
  const type = GEO_LINESTRING;
  const coordinates = randomPositions(optns);

  // return linestring
  return { type, coordinates };
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
 * @param {object} [optns={}] valid option
 * @param {number} [optns.vertices=2] how many points MultiPoint will contain.
 * @param {number[]} [optns.bbox=[-180, -90, 180, 90]] a bounding box inside
 * of which geometries are placed.
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
export const randomMultiPoint = (optns = { vertices: 2 }) => {
  // refs
  const type = GEO_MULTIPOINT;
  const coordinates = randomPositions(optns);

  // return multipoint
  return { type, coordinates };
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
