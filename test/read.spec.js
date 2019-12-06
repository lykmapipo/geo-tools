import { expect } from '@lykmapipo/test-helpers';
import { readShapefile, readGeoJSON, readCsv } from '../src';

describe('read', () => {
  // shapefile

  it('should read shapefile', done => {
    const path = `${__dirname}/fixtures/points.shp`;
    readShapefile(path, (error, { finished, feature, next }) => {
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
    readShapefile(path, (error, { finished, feature, next }) => {
      expect(error).to.exist;
      expect(finished).to.be.true;
      expect(feature).to.not.exist;
      expect(next).to.not.exist;
      done();
    });
  });

  it('should handle process error when read shapefile', done => {
    const path = `${__dirname}/fixtures/points.shp`;
    readShapefile(path, (error, { next }) => {
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
    readGeoJSON(path, (error, { finished, feature, next }) => {
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
    readGeoJSON(path, (error, { finished, feature, next }) => {
      expect(error).to.exist;
      expect(finished).to.be.true;
      expect(feature).to.not.exist;
      expect(next).to.not.exist;
      done();
    });
  });

  it('should handle process error when read geojson file', done => {
    const path = `${__dirname}/./fixtures/points.geojson`;
    readGeoJSON(path, (error, { next }) => {
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
    const path = `${__dirname}/./fixtures/contacts.csv`;
    readCsv(path, (error, { finished, feature, next }) => {
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
    const path = './fixtures/contacts.csv';
    readCsv(path, (error, { finished, feature, next }) => {
      expect(error).to.exist;
      expect(finished).to.be.true;
      expect(feature).to.not.exist;
      expect(next).to.not.exist;
      done();
    });
  });

  it('should handle process error when read csv file', done => {
    const path = `${__dirname}/./fixtures/contacts.csv`;
    readCsv(path, (error, { next }) => {
      if (error) {
        expect(error).to.exist;
        expect(error.message).to.be.equal('Processing Error');
        return done();
      }
      return next(new Error('Processing Error'));
    });
  });
});
