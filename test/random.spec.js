import { expect } from '@lykmapipo/test-helpers';
import {
  randomLongitude,
  randomLatitude,
  randomPosition,
  randomPositions,
  randomPoint,
  randomLineString,
  randomPolygon,
  randomMultiPoint,
  randomMultiLineString,
  randomMultiPolygon,
  randomGeometry,
  randomGeometryCollection,
} from '../src';

describe('random', () => {
  it('should generate random longitude', () => {
    expect(randomLongitude).to.exist;
    expect(randomLongitude).to.be.a('function');
    expect(randomLongitude.name).to.be.equal('randomLongitude');
    const longitude = randomLongitude();
    expect(longitude).to.exist;
    expect(longitude).to.be.above(-180);
    expect(longitude).to.be.below(180);
  });

  it('should generate random latitude', () => {
    expect(randomLatitude).to.exist;
    expect(randomLatitude).to.be.a('function');
    expect(randomLatitude.name).to.be.equal('randomLatitude');
    const latitude = randomLatitude();
    expect(latitude).to.exist;
    expect(latitude).to.be.above(-90);
    expect(latitude).to.be.below(90);
  });

  it('should generate random position', () => {
    expect(randomPosition).to.exist;
    expect(randomPosition).to.be.a('function');
    expect(randomPosition.name).to.be.equal('randomPosition');
    const position = randomPosition();
    expect(position).to.exist.and.have.length(2);
  });

  it('should generate random positions', () => {
    expect(randomPositions).to.exist;
    expect(randomPositions).to.be.a('function');
    expect(randomPositions.name).to.be.equal('randomPositions');
    const positions = randomPositions();
    expect(positions).to.exist.and.have.length.at.least(2);
  });

  it('should generate random point', () => {
    expect(randomPoint).to.exist;
    expect(randomPoint).to.be.a('function');
    expect(randomPoint.name).to.be.equal('randomPoint');
    const geo = randomPoint();
    expect(geo).to.exist;
    expect(geo.type).to.exist.and.be.equal('Point');
    expect(geo.coordinates).to.exist.and.have.length(2);
  });

  it('should generate random line string', () => {
    expect(randomLineString).to.exist;
    expect(randomLineString).to.be.a('function');
    expect(randomLineString.name).to.be.equal('randomLineString');
    const geo = randomLineString();
    expect(geo.type).to.exist.and.be.equal('LineString');
    expect(geo.coordinates).to.exist.and.have.length.at.least(2);
  });

  it('should generate random polygon', () => {
    expect(randomPolygon).to.exist;
    expect(randomPolygon).to.be.a('function');
    expect(randomPolygon.name).to.be.equal('randomPolygon');
    const geo = randomPolygon();
    expect(geo.type).to.exist.and.be.equal('Polygon');
    expect(geo.coordinates).to.exist.and.have.length(1);
  });

  it('should generate random multi point', () => {
    expect(randomMultiPoint).to.exist;
    expect(randomMultiPoint).to.be.a('function');
    expect(randomMultiPoint.name).to.be.equal('randomMultiPoint');
    const geo = randomMultiPoint();
    expect(geo.type).to.exist.and.be.equal('MultiPoint');
    expect(geo.coordinates).to.exist.and.have.length.at.least(2);
  });

  it('should generate random point', () => {
    expect(randomMultiLineString).to.exist;
    expect(randomMultiLineString).to.be.a('function');
    expect(randomMultiLineString.name).to.be.equal('randomMultiLineString');
    const geo = randomMultiLineString();
    expect(geo.type).to.exist.and.be.equal('MultiLineString');
    expect(geo.coordinates).to.exist.and.have.length.at.least(2);
  });

  it('should generate random multi polygon', () => {
    expect(randomMultiPolygon).to.exist;
    expect(randomMultiPolygon).to.be.a('function');
    expect(randomMultiPolygon.name).to.be.equal('randomMultiPolygon');
    const geo = randomMultiPolygon();
    expect(geo.type).to.exist.and.be.equal('MultiPolygon');
    expect(geo.coordinates).to.exist.and.have.length.at.least(2);
  });

  it('should generate random geometry', () => {
    expect(randomGeometry).to.exist;
    expect(randomGeometry).to.be.a('function');
    expect(randomGeometry.name).to.be.equal('randomGeometry');
    const geo = randomGeometry();
    expect(geo.type).to.exist.and.be.oneOf([
      'Point',
      'LineString',
      'Polygon',
      'MultiPoint',
      'MultiLineString',
      'MultiPolygon',
    ]);
    expect(geo.coordinates).to.exist.and.have.length.at.least(1);
  });

  it('should generate random geometry collection', () => {
    expect(randomGeometryCollection).to.exist;
    expect(randomGeometryCollection).to.be.a('function');
    expect(randomGeometryCollection.name).to.be.equal(
      'randomGeometryCollection'
    );
    const geo = randomGeometryCollection();
    expect(geo.type).to.exist.and.be.equal('GeometryCollection');
    expect(geo.geometries).to.exist.and.have.length.at.least(2);
  });
});
