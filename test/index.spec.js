import { expect } from '@lykmapipo/test-helpers';
import {
  randomLongitude,
  randomLatitude,
  randomPosition,
  randomPoint,
  randomLineString,
  randomPolygon,
  randomMultiPoint,
  randomMultiLineString,
  randomMultiPolygon,
  randomGeometry,
  randomGeometryCollection,
} from '../src';

describe('geo tools', () => {
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
  });

  it('should generate random multi point', () => {
    expect(randomMultiPoint).to.exist;
    expect(randomMultiPoint).to.be.a('function');
    expect(randomMultiPoint.name).to.be.equal('randomMultiPoint');
  });

  it('should generate random point', () => {
    expect(randomMultiLineString).to.exist;
    expect(randomMultiLineString).to.be.a('function');
    expect(randomMultiLineString.name).to.be.equal('randomMultiLineString');
  });

  it('should generate random multi polygon', () => {
    expect(randomMultiPolygon).to.exist;
    expect(randomMultiPolygon).to.be.a('function');
    expect(randomMultiPolygon.name).to.be.equal('randomMultiPolygon');
  });

  it('should generate random geometry', () => {
    expect(randomGeometry).to.exist;
    expect(randomGeometry).to.be.a('function');
    expect(randomGeometry.name).to.be.equal('randomGeometry');
  });

  it('should generate random geometry collection', () => {
    expect(randomGeometryCollection).to.exist;
    expect(randomGeometryCollection).to.be.a('function');
    expect(randomGeometryCollection.name).to.be.equal(
      'randomGeometryCollection'
    );
  });
});
