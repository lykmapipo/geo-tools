import { expect } from '@lykmapipo/test-helpers';
import {
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
  it('should generate random point', () => {
    expect(randomPoint).to.exist;
    expect(randomPoint).to.be.a('function');
    expect(randomPoint.name).to.be.equal('randomPoint');
  });

  it('should generate random line string', () => {
    expect(randomLineString).to.exist;
    expect(randomLineString).to.be.a('function');
    expect(randomLineString.name).to.be.equal('randomLineString');
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
