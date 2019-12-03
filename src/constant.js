import { getNumber, getNumbers } from '@lykmapipo/env';

export const GEO_POINT = 'Point';
export const GEO_LINESTRING = 'LineString';
export const GEO_POLYGON = 'Polygon';
export const GEO_MULTIPOINT = 'MultiPoint';
export const GEO_MULTILINESTRING = 'MultiLineString';
export const GEO_MULTIPOLYGON = 'MultiPolygon';
export const GEO_GEOMETRY_COLLECTION = 'GeometryCollection';
export const GEO_FEATURE = 'Feature';
export const GEO_FEATURE_COLLECTION = 'FeatureCollection';

export const GEO_MAX_LENGTH = getNumber('GEO_MAX_LENGTH', 0.0001);
export const GEO_MAX_ROTATION = getNumber('GEO_MAX_ROTATION', Math.PI / 8);
export const GEO_BBOX = getNumbers('GEO_BBOX') || [-180, -90, 180, 90];
