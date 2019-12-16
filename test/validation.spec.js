import { expect } from '@lykmapipo/test-helpers';
import {
  isValid,
  isPoint,
  isMultiPoint,
  isLineString,
  isMultiLineString,
  isPolygon,
  isMultiPolygon,
  isGeometryCollection,
  isFeature,
  isFeatureCollection,
  isGeometry,
} from '../src';

describe('validation', () => {
  it('should check for valid geojson object', () => {
    expect(isValid).to.exist;
    expect(isValid).to.be.a('function');
    expect(isValid.name).to.be.equal('isValid');
    expect(
      isValid({
        type: 'Point',
        coordinates: [100.0, 0.0],
      })
    ).to.be.true;
  });

  it('should check for invalid geojson object', done => {
    expect(isValid).to.exist;
    expect(isValid).to.be.a('function');
    expect(isValid.name).to.be.equal('isValid');
    isValid(
      {
        type: 'Poit',
        coordinates: [100.0],
      },
      error => {
        expect(error).to.exist;
        expect(error.name).to.be.equal('ValidationError');
        expect(error.message).to.be.equal('Validation failed');
        expect(error.errors).to.exist.and.have.length.at.least(1);
        done();
      }
    );
  });

  it('should check for valid point', () => {
    expect(isPoint).to.exist;
    expect(isPoint).to.be.a('function');
    expect(isPoint.name).to.be.equal('isPoint');
    expect(
      isPoint({
        type: 'Point',
        coordinates: [100.0, 0.0],
      })
    ).to.be.true;
  });

  it('should check for invalid point', done => {
    expect(isPoint).to.exist;
    expect(isPoint).to.be.a('function');
    expect(isPoint.name).to.be.equal('isPoint');
    isPoint(
      {
        type: 'Point',
        coordinates: [100.0],
      },
      error => {
        expect(error).to.exist;
        expect(error.name).to.be.equal('ValidationError');
        expect(error.message).to.be.equal('Validation failed');
        expect(error.errors).to.exist.and.have.length.at.least(1);
        done();
      }
    );
  });

  it('should check for valid multi point', () => {
    expect(isMultiPoint).to.exist;
    expect(isMultiPoint).to.be.a('function');
    expect(isMultiPoint.name).to.be.equal('isMultiPoint');
    expect(
      isMultiPoint({
        type: 'MultiPoint',
        coordinates: [
          [100.0, 0.0],
          [101.0, 1.0],
        ],
      })
    ).to.be.true;
  });

  it('should check for invalid multi point', done => {
    expect(isMultiPoint).to.exist;
    expect(isMultiPoint).to.be.a('function');
    expect(isMultiPoint.name).to.be.equal('isMultiPoint');
    isMultiPoint(
      {
        type: 'MultiPoint',
        coordinates: [[100.0, 0.0], [101.0]],
      },
      error => {
        expect(error).to.exist;
        expect(error.name).to.be.equal('ValidationError');
        expect(error.message).to.be.equal('Validation failed');
        expect(error.errors).to.exist.and.have.length.at.least(1);
        done();
      }
    );
  });

  it('should check for valid line string', () => {
    expect(isLineString).to.exist;
    expect(isLineString).to.be.a('function');
    expect(isLineString.name).to.be.equal('isLineString');
    expect(
      isLineString({
        type: 'LineString',
        coordinates: [
          [100.0, 0.0],
          [101.0, 1.0],
        ],
      })
    ).to.be.true;
  });

  it('should check for invalid line string', done => {
    expect(isLineString).to.exist;
    expect(isLineString).to.be.a('function');
    expect(isLineString.name).to.be.equal('isLineString');
    isLineString(
      {
        type: 'LineString',
        coordinates: [[100.0, 0.0], [101.0]],
      },
      error => {
        expect(error).to.exist;
        expect(error.name).to.be.equal('ValidationError');
        expect(error.message).to.be.equal('Validation failed');
        expect(error.errors).to.exist.and.have.length.at.least(1);
        done();
      }
    );
  });

  it('should check for valid multi line string', () => {
    expect(isMultiLineString).to.exist;
    expect(isMultiLineString).to.be.a('function');
    expect(isMultiLineString.name).to.be.equal('isMultiLineString');
    expect(
      isMultiLineString({
        type: 'MultiLineString',
        coordinates: [
          [
            [100.0, 0.0],
            [101.0, 1.0],
          ],
          [
            [102.0, 2.0],
            [103.0, 3.0],
          ],
        ],
      })
    ).to.be.true;
  });

  it('should check for invalid multi line string', done => {
    expect(isMultiLineString).to.exist;
    expect(isMultiLineString).to.be.a('function');
    expect(isMultiLineString.name).to.be.equal('isMultiLineString');
    isMultiLineString(
      {
        type: 'MultiLineString',
        coordinates: [
          [
            [100.0, 0.0],
            [101.0, 1.0],
          ],
          [],
        ],
      },
      error => {
        expect(error).to.exist;
        expect(error.name).to.be.equal('ValidationError');
        expect(error.message).to.be.equal('Validation failed');
        expect(error.errors).to.exist.and.have.length.at.least(1);
        done();
      }
    );
  });

  it('should check for valid polygon', () => {
    expect(isPolygon).to.exist;
    expect(isPolygon).to.be.a('function');
    expect(isPolygon.name).to.be.equal('isPolygon');
    expect(
      isPolygon({
        type: 'Polygon',
        coordinates: [
          [
            [100.0, 0.0],
            [101.0, 0.0],
            [101.0, 1.0],
            [100.0, 1.0],
            [100.0, 0.0],
          ],
        ],
      })
    ).to.be.true;
  });

  it('should check for invalid polygon', done => {
    expect(isPolygon).to.exist;
    expect(isPolygon).to.be.a('function');
    expect(isPolygon.name).to.be.equal('isPolygon');
    isPolygon(
      {
        type: 'Polygon',
        coordinates: [
          [[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], []],
        ],
      },
      error => {
        expect(error).to.exist;
        expect(error.name).to.be.equal('ValidationError');
        expect(error.message).to.be.equal('Validation failed');
        expect(error.errors).to.exist.and.have.length.at.least(1);
        done();
      }
    );
  });

  it('should check for valid multi polygon', () => {
    expect(isMultiPolygon).to.exist;
    expect(isMultiPolygon).to.be.a('function');
    expect(isMultiPolygon.name).to.be.equal('isMultiPolygon');
    expect(
      isMultiPolygon({
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [102.0, 2.0],
              [103.0, 2.0],
              [103.0, 3.0],
              [102.0, 3.0],
              [102.0, 2.0],
            ],
          ],
          [],
        ],
      })
    ).to.be.true;
  });

  it('should check for invalid multi polygon', done => {
    expect(isMultiPolygon).to.exist;
    expect(isMultiPolygon).to.be.a('function');
    expect(isMultiPolygon.name).to.be.equal('isMultiPolygon');
    isMultiPolygon(
      {
        type: 'MultiPolygon',
        coordinates: [
          [[[102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], []]],
          [],
        ],
      },
      error => {
        expect(error).to.exist;
        expect(error.name).to.be.equal('ValidationError');
        expect(error.message).to.be.equal('Validation failed');
        expect(error.errors).to.exist.and.have.length.at.least(1);
        done();
      }
    );
  });

  it('should check for valid geometry collection', () => {
    expect(isGeometryCollection).to.exist;
    expect(isGeometryCollection).to.be.a('function');
    expect(isGeometryCollection.name).to.be.equal('isGeometryCollection');
    expect(
      isGeometryCollection({
        type: 'GeometryCollection',
        geometries: [
          {
            type: 'Point',
            coordinates: [100.0, 0.0],
          },
          {
            type: 'LineString',
            coordinates: [
              [101.0, 0.0],
              [102.0, 1.0],
            ],
          },
        ],
      })
    ).to.be.true;
  });

  it('should check for invalid geometry collection', done => {
    expect(isGeometryCollection).to.exist;
    expect(isGeometryCollection).to.be.a('function');
    expect(isGeometryCollection.name).to.be.equal('isGeometryCollection');
    isGeometryCollection(
      {
        type: 'GeometryCollection',
        geometries: [
          {
            type: 'Point',
            coordinates: [100.0],
          },
          {
            type: 'LineString',
            coordinates: [[101.0, 0.0], [102.0]],
          },
        ],
      },
      error => {
        expect(error).to.exist;
        expect(error.name).to.be.equal('ValidationError');
        expect(error.message).to.be.equal('Validation failed');
        expect(error.errors).to.exist.and.have.length.at.least(1);
        done();
      }
    );
  });

  it('should check for valid feature', () => {
    expect(isFeature).to.exist;
    expect(isFeature).to.be.a('function');
    expect(isFeature.name).to.be.equal('isFeature');
    expect(
      isFeature({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [102.0, 0.5],
        },
        properties: {
          prop0: 'value0',
        },
      })
    ).to.be.true;
  });

  it('should check for invalid feature', done => {
    expect(isFeature).to.exist;
    expect(isFeature).to.be.a('function');
    expect(isFeature.name).to.be.equal('isFeature');
    isFeature(
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [102.0],
        },
        properties: {
          prop0: 'value0',
        },
      },
      error => {
        expect(error).to.exist;
        expect(error.name).to.be.equal('ValidationError');
        expect(error.message).to.be.equal('Validation failed');
        expect(error.errors).to.exist.and.have.length.at.least(1);
        done();
      }
    );
  });

  it('should check for valid feature collection', () => {
    expect(isFeatureCollection).to.exist;
    expect(isFeatureCollection).to.be.a('function');
    expect(isFeatureCollection.name).to.be.equal('isFeatureCollection');
    expect(
      isFeatureCollection({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [102.0, 0.5],
            },
            properties: {
              prop0: 'value0',
            },
          },
        ],
      })
    ).to.be.true;
  });

  it('should check for invalid feature collection', done => {
    expect(isFeatureCollection).to.exist;
    expect(isFeatureCollection).to.be.a('function');
    expect(isFeatureCollection.name).to.be.equal('isFeatureCollection');
    isFeatureCollection(
      {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [102.0],
            },
            properties: {
              prop0: 'value0',
            },
          },
        ],
      },
      error => {
        expect(error).to.exist;
        expect(error.name).to.be.equal('ValidationError');
        expect(error.message).to.be.equal('Validation failed');
        expect(error.errors).to.exist.and.have.length.at.least(1);
        done();
      }
    );
  });

  it('should check for valid geometry', () => {
    expect(isGeometry).to.exist;
    expect(isGeometry).to.be.a('function');
    expect(isGeometry.name).to.be.equal('isGeometry');
    expect(
      isGeometry({
        type: 'Point',
        coordinates: [100.0, 0.0],
      })
    ).to.be.true;
  });

  it('should check for invalid geometry', () => {
    expect(isGeometry).to.exist;
    expect(isGeometry).to.be.a('function');
    expect(isGeometry.name).to.be.equal('isGeometry');
    expect(
      isGeometry({
        type: 'Point',
        coordinates: [100.0],
      })
    ).to.be.false;
  });

  it('should check for invalid geometry', done => {
    expect(isGeometry).to.exist;
    expect(isGeometry).to.be.a('function');
    expect(isGeometry.name).to.be.equal('isGeometry');
    isGeometry(
      {
        type: 'Point',
        coordinates: [100.0],
      },
      error => {
        expect(error).to.exist;
        expect(error.name).to.be.equal('ValidationError');
        expect(error.message).to.be.equal('Validation failed');
        expect(error.errors).to.exist.and.have.length.at.least(1);
        done();
      }
    );
  });
});
