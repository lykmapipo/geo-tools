import { expect } from '@lykmapipo/test-helpers';
import { readShapefile, readGeoJSON, readCsv, readJson } from '../src';

describe('read', () => {
  // shapefile

  it('should read shapefile', done => {
    const path = `${__dirname}/fixtures/points.shp`;
    readShapefile({ path }, (error, { finished, feature, next }) => {
      if (error) {
        expect(error).to.exist;
        return done(error);
      }
      if (finished) {
        expect(finished).to.be.ok;
        return done();
      }
      expect(feature).to.exist;
      expect(next).to.exist.and.be.a('function');
      return next();
    });
  });

  it('should handle no file error when read shapefile', done => {
    const path = './fixtures/points.shp';
    readShapefile({ path }, (error, { finished, feature, next }) => {
      expect(error).to.exist;
      expect(finished).to.be.true;
      expect(feature).to.not.exist;
      expect(next).to.not.exist;
      done();
    });
  });

  it('should handle process error when read shapefile', done => {
    const path = `${__dirname}/fixtures/points.shp`;
    readShapefile({ path }, (error, { next }) => {
      if (error) {
        expect(error).to.exist;
        expect(error.message).to.be.equal('Processing Error');
        return done();
      }
      return next(new Error('Processing Error'));
    });
  });

  // geojson

  it('should read geojson file', done => {
    const path = `${__dirname}/./fixtures/points.geojson`;
    readGeoJSON({ path }, (error, { finished, feature, next }) => {
      if (error) {
        expect(error).to.not.exist;
        return done(error);
      }
      if (finished) {
        expect(finished).to.be.ok;
        return done();
      }
      expect(feature).to.exist;
      expect(next).to.exist.and.be.a('function');
      return next();
    });
  });

  it('should handle no file error when read geojson file', done => {
    const path = './fixtures/points.geojson';
    readGeoJSON({ path }, (error, { finished, feature, next }) => {
      expect(error).to.exist;
      expect(finished).to.be.true;
      expect(feature).to.not.exist;
      expect(next).to.not.exist;
      done();
    });
  });

  it('should handle process error when read geojson file', done => {
    const path = `${__dirname}/./fixtures/points.geojson`;
    readGeoJSON({ path }, (error, { next }) => {
      if (error) {
        expect(error).to.exist;
        expect(error.message).to.be.equal('Processing Error');
        return done();
      }
      return next(new Error('Processing Error'));
    });
  });

  // csv
  it('should read csv file', done => {
    const path = `${__dirname}/./fixtures/points.csv`;
    readCsv({ path }, (error, { finished, feature, next }) => {
      if (error) {
        expect(error).to.not.exist;
        return done(error);
      }
      if (finished) {
        expect(finished).to.be.ok;
        return done();
      }
      expect(feature).to.exist;
      expect(next).to.exist.and.be.a('function');
      return next();
    });
  });

  it('should handle no file error when read csv file', done => {
    const path = './fixtures/points.csv';
    readCsv({ path }, (error, { finished, feature, next }) => {
      expect(error).to.exist;
      expect(finished).to.be.true;
      expect(feature).to.not.exist;
      expect(next).to.not.exist;
      done();
    });
  });

  it('should handle process error when read csv file', done => {
    const path = `${__dirname}/./fixtures/points.csv`;
    readCsv({ path }, (error, { next }) => {
      if (error) {
        expect(error).to.exist;
        expect(error.message).to.be.equal('Processing Error');
        return done();
      }
      return next(new Error('Processing Error'));
    });
  });

  // json

  it('should read json file', done => {
    const path = `${__dirname}/./fixtures/points.json`;
    readJson({ path }, (error, data) => {
      expect(error).to.not.exist;
      expect(data).to.exist;
      done(error, data);
    });
  });

  it('should handle no file error when read json file', done => {
    const path = './fixtures/points.json';
    readJson({ path }, (error, data) => {
      expect(error).to.exist;
      expect(data).to.not.exist;
      done();
    });
  });

  it('should not throw error when safe read json file', done => {
    const path = './fixtures/points.json';
    const throws = false;
    readJson({ path, throws }, (error, data) => {
      expect(error).to.not.exist;
      expect(data).to.exist.and.be.eql({});
      done(error, data);
    });
  });
});
