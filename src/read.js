import { createReadStream } from 'fs';
import { Writable } from 'stream';
import parseCsv from 'csv-parse';
import { parse as parseGeoJSON } from 'geojson-stream';
import { mergeObjects } from '@lykmapipo/common';
import { open as openShapefile } from 'shapefile';
import { readFile as readJsonFile } from 'jsonfile';

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
export const readShapefile = (optns, done) => {
  // merge options
  const { path } = mergeObjects(optns);

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
export const readGeoJSON = (optns, done) => {
  // merge options
  const { path } = mergeObjects(optns);

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
export const readCsv = (optns, done) => {
  // merge options
  const parseOptns = { bom: true, columns: true, trim: true };
  const { path, ...options } = mergeObjects(parseOptns, optns);

  // refs
  const results = { finished: true, feature: undefined, next: undefined };

  // read csv file
  const readStream = createReadStream(path);
  readStream.on('error', error => done(error, mergeObjects(results)));

  // wire csv parser
  const parseStream = readStream.pipe(parseCsv(options));
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

/**
 * @function readJson
 * @name readJson
 * @description Read json file
 * @param {object} optns valid options
 * @param {string} optns.path valid json file path
 * @param {boolean} optns.throws whether to ignore error
 * @param {Function} done callback to invoke on success read or error
 * @returns {object|Error} error or read json data
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.6.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * readJson({ path }, (error, data) => {
 *  // handle read error
 *  if(error) { ... }
 *
 *  // process json data
 *  else { ... }
 * });
 */
export const readJson = (optns, done) => {
  // merge options
  const { path, throws, ...options } = mergeObjects({ throws: true }, optns);

  // return;
  return readJsonFile(path, options, (error, data) => {
    if (!throws) {
      return done(null, mergeObjects(data));
    }
    return done(error, data);
  });
};
