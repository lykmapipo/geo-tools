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
} from '../src';

describe('validation', () => {
  it('should check for valid geojson object', () => {
    expect(isValid).to.exist;
    expect(isValid).to.be.a('function');
    expect(isValid.name).to.be.equal('isValid');
    expect(
      isPoint({
        type: 'Point',
        coordinates: [100.0, 0.0],
      })
    ).to.be.true;
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
          [
            [
              [100.0, 0.0],
              [101.0, 0.0],
              [101.0, 1.0],
              [100.0, 1.0],
              [100.0, 0.0],
            ],
            [
              [100.2, 0.2],
              [100.2, 0.8],
              [100.8, 0.8],
              [100.8, 0.2],
              [100.2, 0.2],
            ],
          ],
        ],
      })
    ).to.be.true;
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
});
