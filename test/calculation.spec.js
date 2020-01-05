import { expect } from '@lykmapipo/test-helpers';

import { parseCoordinateString, randomPolygon, centroidOf } from '../src';

describe('calculation', () => {
  it('should parse point coordinate string to geometry', () => {
    const point = parseCoordinateString('1,2');
    expect(point).to.exist;
    expect(point.type).to.be.equal('Point');
    expect(point.coordinates).to.be.an('array');
  });

  it('should parse circle coordinate string to geomentry', () => {
    const polygon = parseCoordinateString('1,2 3');
    expect(polygon).to.exist;
    expect(polygon.type).to.be.equal('Polygon');
    expect(polygon.coordinates).to.be.an('array');
  });

  it('should parse circle coordinate string to geomentry', () => {
    const point = parseCoordinateString('1,2 0');
    expect(point).to.exist;
    expect(point.type).to.be.equal('Point');
    expect(point.coordinates).to.be.an('array');
  });

  it('should parse polygon coordinate string to geometry', () => {
    const polygon = parseCoordinateString('1,2 1.3,2.3, 1.9,2.9 1,2');
    expect(polygon).to.exist;
    expect(polygon.type).to.be.equal('Polygon');
    expect(polygon.coordinates).to.be.an('array');
  });

  it('should calculate centroid of a geometry', () => {
    const polygon = randomPolygon();
    const point = centroidOf(polygon);
    expect(point).to.exist;
    expect(point.type).to.be.equal('Point');
    expect(point.coordinates).to.be.an('array');
  });
});
