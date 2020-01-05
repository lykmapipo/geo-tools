import { compact, first, map, nth, toNumber, size, split } from 'lodash';
import { mergeObjects } from '@lykmapipo/common';
import { isPosition, isPolygonCoor } from 'geojson-validation';
import {
  centroid as toCentroid,
  circle as toCircle,
  point as toPoint,
  polygon as toPolygon,
} from '@turf/turf';

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
export const centroidOf = geojson => {
  try {
    let centroid = toCentroid(geojson);
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
export const parseCoordinateString = (coords = '', optns) => {
  // ensure options
  const { deliminator = ',', separator = ' ' } = mergeObjects(optns);

  // prepare geometry
  try {
    // split to pairs
    const pairs = compact(split(coords, separator)); // [pair]

    // map to points
    const points = map(pairs, pair => {
      return map(split(pair, deliminator), toNumber);
    }); // [[point]]

    // convert points to point geometry
    if (size(points) === 1 && isPosition(first(points))) {
      const { geometry } = toPoint(first(points));
      return geometry;
    }

    // convert circle to polygon geometry
    if (size(points) === 2 && isPosition(first(points))) {
      const center = first(points);
      const radius = first(nth(points, 1));
      const { geometry } =
        radius === 0 ? toPoint(center) : toCircle(center, radius);
      return geometry;
    }

    // convert points to polygon geometry
    if (isPolygonCoor([points])) {
      const { geometry } = toPolygon([points]);
      return geometry;
    }

    // return coordinates
    return points;
  } catch (error) {
    return undefined;
  }
};
