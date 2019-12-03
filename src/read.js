import { createReadStream } from 'fs';
import { Writable } from 'stream';
import { parse as parseGeoJSON } from 'geojson-stream';
import { mergeObjects } from '@lykmapipo/common';
import { open as openShapefile } from 'shapefile';

/**
 * @function readShapefile
 * @name readShapefile
 * @description Read shapefile stream
 * @param {string} path valid shapefile path
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
export const readShapefile = (path, done) => {
  // refs
  const results = { finished: true, feature: undefined, next: undefined };

  // read & parse feature from shapefile
  const readFeature = (source, processFeature) => {
    const onFeature = ({ done: finished, value: feature }) => {
      // try read next feature
      const next = error => {
        if (error) {
          return processFeature(error, mergeObjects(results));
        }
        return source.read().then(onFeature);
      };
      // read finish
      if (finished) {
        return processFeature(null, mergeObjects(results));
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
  openShapefile(path)
    .then(source => readFeature(source, done)) // wire write & processing handler
    .catch(error => done(error, mergeObjects(results))); // handle read error

  // return;
};

/**
 * @function readGeoJSON
 * @name readGeoJSON
 * @description Read GeoJSON file stream
 * @param {string} path valid GeoJSON file path
 * @param {Function} done callback to invoke on feature read
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
 *  // and read next chunk
 *  else {
 *   //...
 *   return next();
 *  }
 * });
 */
export const readGeoJSON = (path, done) => {
  // refs
  const results = { finished: true, feature: undefined, next: undefined };

  // read geojson file
  const readStream = createReadStream(path);
  readStream.on('error', error => done(error, mergeObjects(results)));

  // wire GeoJSON parser
  const parseStream = readStream.pipe(parseGeoJSON());
  parseStream.on('error', error => done(error, mergeObjects(results)));

  // wire write & processing stream handler
  const processStream = parseStream.pipe(
    new Writable({
      write: (feature, encoding, callback) => {
        return done(null, { feature, finished: false, next: callback });
      },
      objectMode: true,
    })
  );
  processStream.on('error', error => done(error, mergeObjects(results)));
  processStream.on('finish', () => done(null, mergeObjects(results)));

  // return;
};
