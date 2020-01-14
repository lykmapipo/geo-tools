'use strict';

const env = require('@lykmapipo/env');
const lodash = require('lodash');
const async = require('async');
const common = require('@lykmapipo/common');
const geojsonValidation = require('geojson-validation');
const turf = require('@turf/turf');
const fs = require('fs');
const stream = require('stream');
const parseCsv = require('csv-parse');
const geojsonStream = require('geojson-stream');
const shapefile = require('shapefile');

const GEO_POINT = 'Point';
const GEO_LINESTRING = 'LineString';
const GEO_POLYGON = 'Polygon';
const GEO_MULTIPOINT = 'MultiPoint';
const GEO_MULTILINESTRING = 'MultiLineString';
const GEO_MULTIPOLYGON = 'MultiPolygon';
const GEO_GEOMETRY_COLLECTION = 'GeometryCollection';
const GEO_FEATURE = 'Feature';
const GEO_FEATURE_COLLECTION = 'FeatureCollection';

const GEO_MAX_LENGTH = env.getNumber('GEO_MAX_LENGTH', 0.0001);
const GEO_MAX_ROTATION = env.getNumber('GEO_MAX_ROTATION', Math.PI / 8);
const GEO_BBOX = env.getNumbers('GEO_BBOX', [-180, -90, 180, 90], {
  merge: false,
});

const composeError = (errors = []) => {
  const status = 400;
  const code = 400;
  const message = 'Validation failed';
  const name = 'ValidationError';
  const error = common.normalizeError(
    common.assign(new Error(message), {
      name,
      status,
      code,
      message,
    })
  );
  error.errors = [...errors]; // TODO: bagify(errors)
  return error;
};

const withCallback = cb => (isValid, messages) => {
  if (lodash.isFunction(cb)) {
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
const isValid = (geojson, cb) => {
  return geojsonValidation.valid(geojson, withCallback(cb));
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
const isPoint = (geojson, cb) => {
  return geojsonValidation.isPoint(geojson, withCallback(cb));
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
const isMultiPoint = (geojson, cb) => {
  return geojsonValidation.isMultiPoint(geojson, withCallback(cb));
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
const isLineString = (geojson, cb) => {
  return geojsonValidation.isLineString(geojson, withCallback(cb));
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
const isMultiLineString = (geojson, cb) => {
  return geojsonValidation.isMultiLineString(geojson, withCallback(cb));
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
const isPolygon = (geojson, cb) => {
  return geojsonValidation.isPolygon(geojson, withCallback(cb));
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
const isMultiPolygon = (geojson, cb) => {
  return geojsonValidation.isMultiPolygon(geojson, withCallback(cb));
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
const isGeometryCollection = (geojson, cb) => {
  return geojsonValidation.isGeometryCollection(geojson, withCallback(cb));
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
const isFeature = (geojson, cb) => {
  return geojsonValidation.isFeature(geojson, withCallback(cb));
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
const isFeatureCollection = (geojson, cb) => {
  return geojsonValidation.isFeatureCollection(geojson, withCallback(cb));
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
const isGeometry = (geojson, cb) => {
  // async
  if (lodash.isFunction(cb)) {
    const checkIfIsGeometry = lodash.map(
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
      validator => {
        return next => validator(geojson, next);
      }
    );
    return async.parallel(checkIfIsGeometry, withCallback(cb));
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

/**
 * @function centroidOf
 * @name centroidOf
 * @description Calculates the centroid of a geojson feature(s) using
 * the mean of all vertices
 * @param {object} geojson feature to be centered
 * @returns {object} an Object that can be used as centroid
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.5.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const point = centroidOf(polygon);
 * // => { type: 'Point', coordinates: [ ... ] }
 *
 */
const centroidOf = geojson => {
  try {
    let centroid = turf.centroid(geojson);
    if (centroid && centroid.geometry) {
      centroid = centroid.geometry;
    }
    return centroid;
  } catch (error) {
    return undefined;
  }
};

/**
 * @name centroidOf
 * @description calculates the centroid of a feature(s) using
 * the mean of all vertices
 * @param {object} geojson feature to be centered
 * @returns {object} an Object that can be used as centroid
 */

/**
 * @function parseCoordinateString
 * @name parseCoordinateString
 * @description Create geojson geometry or coordinate array from string
 * @param {string} coords string to extract geojson geometry or coordinates
 * @param {object} [optns={}] valid options
 * @param {string} [optns.delimiter=','] long, lat seperator from string
 * @param {string} [optns.separator=' '] long, lat pair seperator from string
 * @returns {object|Array|undefined} geojson geometry or coordinates
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.5.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const polygonString = '-4.7,39.3 -5.2,38.6 -6.1,40.1 -4.9,39.8 -4.7,39.3'
 * const polygon = parseCoordinateString(polygonString);
 * // => { type: 'Polygon', coordinates: [ ... ] }
 *
 * const cicleString = '-9.2,39.5 180';
 * const polygon = parseCoordinateString(cirlceString);
 * // => { type: 'Polygon', coordinates: [ ... ] }
 *
 */
const parseCoordinateString = (coords = '', optns) => {
  // ensure options
  const { deliminator = ',', separator = ' ' } = common.mergeObjects(optns);

  // prepare geometry
  try {
    // split to pairs
    const pairs = lodash.compact(lodash.split(coords, separator)); // [pair]

    // map to points
    const points = lodash.map(pairs, pair => {
      return lodash.map(lodash.split(pair, deliminator), lodash.toNumber);
    }); // [[point]]

    // convert points to point geometry
    if (lodash.size(points) === 1 && geojsonValidation.isPosition(lodash.first(points))) {
      const { geometry } = turf.point(lodash.first(points));
      return geometry;
    }

    // convert circle to polygon geometry
    if (lodash.size(points) === 2 && geojsonValidation.isPosition(lodash.first(points))) {
      const center = lodash.first(points);
      const radius = lodash.first(lodash.nth(points, 1));
      const { geometry } =
        radius === 0 ? turf.point(center) : turf.circle(center, radius);
      return geometry;
    }

    // convert points to polygon geometry
    if (geojsonValidation.isPolygonCoor([points])) {
      const { geometry } = turf.polygon([points]);
      return geometry;
    }

    // return coordinates
    return points;
  } catch (error) {
    return undefined;
  }
};

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
const randomLongitude = (optns = {}) => {
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
const randomLatitude = (optns = {}) => {
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
const randomPosition = (optns = {}) => {
  // TODO: restric within bbox

  // calculate angle
  const angle =
    (optns.angle || Math.random() * 2 * Math.PI) +
    (Math.random() - 0.5) * GEO_MAX_ROTATION * 2;

  // calculate hypotenus
  const distance = optns.distance || Math.random() * GEO_MAX_LENGTH;

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
const randomPositions = (optns = { vertices: 2 }) => {
  // ensure options
  const options = common.mergeObjects({ vertices: 2, bbox: GEO_BBOX }, optns);

  // refs
  let coordinates = [];
  let longitude;
  let latitude;

  // compute position for vertices
  lodash.forEach(lodash.range(options.vertices), () => {
    // random next position after last
    const position = randomPosition(
      common.mergeObjects(options, { longitude, latitude })
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
const randomPoint = (optns = {}) => {
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
const randomLineString = (optns = { vertices: 2 }) => {
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
 * @param {object} [optns={}] valid option
 * @param {number} [optns.vertices=4] how many coordinates Polygon will contain.
 * @param {number[]} [optns.bbox=[-180, -90, 180, 90]] a bounding box inside
 * of which geometries are placed.
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
const randomPolygon = (optns = { vertices: 3 }) => {
  // ensure 4 vertices & above
  const options = common.mergeObjects({ vertices: 3 }, optns);
  options.vertices = options.vertices < 3 ? 3 : options.vertices;

  // refs
  const type = GEO_POLYGON;
  let coordinates = randomPositions(options);

  // close the ring
  coordinates = [...coordinates, coordinates[0]];

  // return linestring
  return { type, coordinates: [coordinates] };
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
const randomMultiPoint = (optns = { vertices: 2 }) => {
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
 * @param {object} [optns={}] valid option
 * @param {number} [optns.lines=2] how many LineString.
 * @param {number} [optns.vertices=2] how many coordinates each LineString will contain.
 * @param {number[]} [optns.bbox=[-180, -90, 180, 90]] a bounding box inside
 * of which geometries are placed.
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
const randomMultiLineString = (optns = { lines: 2, vertices: 2 }) => {
  // ensure lines & vertices
  const options = common.mergeObjects({ lines: 2, vertices: 2 }, optns);

  // refs
  const type = GEO_MULTILINESTRING;
  const coordinates = [
    ...lodash.map(lodash.range(options.lines), () => {
      return randomPositions(options);
    }),
  ];

  // return multilinestring
  return { type, coordinates };
};

/**
 * @function randomMultiPolygon
 * @name randomMultiPolygon
 * @description Generate random GeoJSON MultiPolygon
 * @param {object} [optns={}] valid option
 * @param {number} [optns.polygons=2] how many Polygons.
 * @param {number} [optns.vertices=2] how many coordinates each Polygon will contain.
 * @param {number[]} [optns.bbox=[-180, -90, 180, 90]] a bounding box inside
 * of which geometries are placed.
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
const randomMultiPolygon = (optns = { polygons: 2, vertices: 3 }) => {
  // ensure polygons & vertices
  const options = common.mergeObjects({ polygons: 2, vertices: 3 }, optns);

  // refs
  const type = GEO_MULTIPOLYGON;
  const coordinates = [
    ...lodash.map(lodash.range(options.polygons), () => {
      const coords = randomPositions(options);
      return [[...coords, coords[0]]];
    }),
  ];

  // return multipolygon
  return { type, coordinates };
};

/**
 * @function randomGeometry
 * @name randomGeometry
 * @description Generate random GeoJSON Geometry
 * @param {object} [optns={}] valid option
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
const randomGeometry = (optns = {}) => {
  // ensure options
  const options = common.mergeObjects({ lines: 2, polygons: 2, vertices: 3 }, optns);

  // geometry generators
  const generators = [
    randomPoint,
    randomLineString,
    randomPolygon,
    randomMultiPoint,
    randomMultiLineString,
    randomMultiPolygon,
  ];

  // generate geometry
  const generateGeomentry = lodash.sample(generators);
  const geometry = generateGeomentry(options);

  // retunr geometry
  return geometry;
};

/**
 * @function randomGeometryCollection
 * @name randomGeometryCollection
 * @description Generate random GeoJSON GeometryCollection
 * @param {object} [optns={}] valid option
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
const randomGeometryCollection = (optns = {}) => {
  // ensure options
  const options = common.mergeObjects({ lines: 2, polygons: 2, vertices: 3 }, optns);

  // geometry generators
  const generators = [
    randomPoint,
    randomLineString,
    randomPolygon,
    randomMultiPoint,
    randomMultiLineString,
    randomMultiPolygon,
  ];

  // refs
  const type = GEO_GEOMETRY_COLLECTION;

  // generate geometry
  const geometries = lodash.map(
    lodash.sampleSize(generators, options.vertices),
    generateGeomentry => {
      return generateGeomentry(options);
    }
  );

  // return geometrycollection
  return { type, geometries };
};

/**
 * @function readShapefile
 * @name readShapefile
 * @description Read shapefile stream
 * @param {object} optns valid options
 * @param {string} optns.path valid shapefile path
 * @param {Function} done callback to invoke on feature read
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
 *  // and read next chunk
 *  else {
 *   //...
 *   return next();
 *  }
 * });
 */
const readShapefile = (optns, done) => {
  // merge options
  const { path } = common.mergeObjects(optns);

  // refs
  const results = { finished: true, feature: undefined, next: undefined };

  // read & parse feature from shapefile
  const readFeature = (source, processFeature) => {
    const onFeature = ({ done: finished, value: feature }) => {
      // try read next feature
      const next = error => {
        if (error) {
          return processFeature(error, common.mergeObjects(results));
        }
        return source.read().then(onFeature);
      };
      // read finish
      if (finished) {
        return processFeature(null, common.mergeObjects(results));
      }
      // process read feature
      return processFeature(null, {
        feature,
        finished: false,
        next,
      });
    };
    return source.read().then(onFeature);
  };

  // open & read shapefile
  shapefile.open(path)
    .then(source => readFeature(source, done)) // wire write & processing handler
    .catch(error => done(error, common.mergeObjects(results))); // handle read error

  // return;
};

/**
 * @function readGeoJSON
 * @name readGeoJSON
 * @description Read GeoJSON file stream
 * @param {object} optns valid options
 * @param {string} optns.path valid GeoJSON file path
 * @param {Function} done callback to invoke on feature read
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * readGeoJSON({ path }, (error, { finished, feature, next }) => {
 *  // handle read error
 *  if(error) { ... }
 *
 *  // handle read finished
 *  else if(finished){ ... }
 *
 *  // process feature
 *  // and read next chunk
 *  else {
 *   //...
 *   return next();
 *  }
 * });
 */
const readGeoJSON = (optns, done) => {
  // merge options
  const { path } = common.mergeObjects(optns);

  // refs
  const results = { finished: true, feature: undefined, next: undefined };

  // read geojson file
  const readStream = fs.createReadStream(path);
  readStream.on('error', error => done(error, common.mergeObjects(results)));

  // wire GeoJSON parser
  const parseStream = readStream.pipe(geojsonStream.parse());
  parseStream.on('error', error => done(error, common.mergeObjects(results)));

  // wire write & processing stream handler
  const processStream = parseStream.pipe(
    new stream.Writable({
      write: (feature, encoding, callback) => {
        return done(null, { feature, finished: false, next: callback });
      },
      objectMode: true,
    })
  );
  processStream.on('error', error => done(error, common.mergeObjects(results)));
  processStream.on('finish', () => done(null, common.mergeObjects(results)));

  // return;
};

/**
 * @function readCsv
 * @name readCsv
 * @description Read csv file stream
 * @param {object} optns valid options
 * @param {string} optns.path valid csv file path
 * @param {string} optns.delimiter valid csv field delimiter
 * @param {Function} done callback to invoke on feature read
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.3.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * readCsv({ path }, (error, { finished, feature, next }) => {
 *  // handle read error
 *  if(error) { ... }
 *
 *  // handle read finished
 *  else if(finished){ ... }
 *
 *  // process feature
 *  // and read next chunk
 *  else {
 *   //...
 *   return next();
 *  }
 * });
 */
const readCsv = (optns, done) => {
  // merge options
  const parseOptns = { bom: true, columns: true, trim: true };
  const { path, ...options } = common.mergeObjects(parseOptns, optns);

  // refs
  const results = { finished: true, feature: undefined, next: undefined };

  // read csv file
  const readStream = fs.createReadStream(path);
  readStream.on('error', error => done(error, common.mergeObjects(results)));

  // wire csv parser
  const parseStream = readStream.pipe(parseCsv(options));
  parseStream.on('error', error => done(error, common.mergeObjects(results)));

  // wire write & processing stream handler
  const processStream = parseStream.pipe(
    new stream.Writable({
      write: (feature, encoding, callback) => {
        return done(null, { feature, finished: false, next: callback });
      },
      objectMode: true,
    })
  );
  processStream.on('error', error => done(error, common.mergeObjects(results)));
  processStream.on('finish', () => done(null, common.mergeObjects(results)));

  // return;
};

exports.GEO_BBOX = GEO_BBOX;
exports.GEO_FEATURE = GEO_FEATURE;
exports.GEO_FEATURE_COLLECTION = GEO_FEATURE_COLLECTION;
exports.GEO_GEOMETRY_COLLECTION = GEO_GEOMETRY_COLLECTION;
exports.GEO_LINESTRING = GEO_LINESTRING;
exports.GEO_MAX_LENGTH = GEO_MAX_LENGTH;
exports.GEO_MAX_ROTATION = GEO_MAX_ROTATION;
exports.GEO_MULTILINESTRING = GEO_MULTILINESTRING;
exports.GEO_MULTIPOINT = GEO_MULTIPOINT;
exports.GEO_MULTIPOLYGON = GEO_MULTIPOLYGON;
exports.GEO_POINT = GEO_POINT;
exports.GEO_POLYGON = GEO_POLYGON;
exports.centroidOf = centroidOf;
exports.isFeature = isFeature;
exports.isFeatureCollection = isFeatureCollection;
exports.isGeometry = isGeometry;
exports.isGeometryCollection = isGeometryCollection;
exports.isLineString = isLineString;
exports.isMultiLineString = isMultiLineString;
exports.isMultiPoint = isMultiPoint;
exports.isMultiPolygon = isMultiPolygon;
exports.isPoint = isPoint;
exports.isPolygon = isPolygon;
exports.isValid = isValid;
exports.parseCoordinateString = parseCoordinateString;
exports.randomGeometry = randomGeometry;
exports.randomGeometryCollection = randomGeometryCollection;
exports.randomLatitude = randomLatitude;
exports.randomLineString = randomLineString;
exports.randomLongitude = randomLongitude;
exports.randomMultiLineString = randomMultiLineString;
exports.randomMultiPoint = randomMultiPoint;
exports.randomMultiPolygon = randomMultiPolygon;
exports.randomPoint = randomPoint;
exports.randomPolygon = randomPolygon;
exports.randomPosition = randomPosition;
exports.randomPositions = randomPositions;
exports.readCsv = readCsv;
exports.readGeoJSON = readGeoJSON;
exports.readShapefile = readShapefile;
