#### isValid(geojson[, cb]) 

Determines if an object is a GeoJSON Object or not




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| geojson | `object`  | valid geojson object | &nbsp; |
| cb | `Function`  | callback to invoke on success or failure | *Optional* |




##### Examples

```javascript
isValid(geojson);
// => true
```


##### Returns


- `boolean`  true if valid else false



#### isPoint(geojson[, cb]) 

Determines if an object is a GeoJSON Point or not




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| geojson | `object`  | valid geojson object | &nbsp; |
| cb | `Function`  | callback to invoke on success or failure | *Optional* |




##### Examples

```javascript
isPoint(geojson);
// => true
```


##### Returns


- `boolean`  true if valid else false



#### isMultiPoint(geojson[, cb]) 

Determines if an object is a GeoJSON MultiPoint or not




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| geojson | `object`  | valid geojson object | &nbsp; |
| cb | `Function`  | callback to invoke on success or failure | *Optional* |




##### Examples

```javascript
isMultiPoint(geojson);
// => true
```


##### Returns


- `boolean`  true if valid else false



#### isLineString(geojson[, cb]) 

Determines if an object is a GeoJSON LineString or not




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| geojson | `object`  | valid geojson object | &nbsp; |
| cb | `Function`  | callback to invoke on success or failure | *Optional* |




##### Examples

```javascript
isLineString(geojson);
// => true
```


##### Returns


- `boolean`  true if valid else false



#### isMultiLineString(geojson[, cb]) 

Determines if an object is a GeoJSON MultiLineString or not




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| geojson | `object`  | valid geojson object | &nbsp; |
| cb | `Function`  | callback to invoke on success or failure | *Optional* |




##### Examples

```javascript
isMultiLineString(geojson);
// => true
```


##### Returns


- `boolean`  true if valid else false



#### isPolygon(geojson[, cb]) 

Determines if an object is a GeoJSON Polygon or not




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| geojson | `object`  | valid geojson object | &nbsp; |
| cb | `Function`  | callback to invoke on success or failure | *Optional* |




##### Examples

```javascript
isPolygon(geojson);
// => true
```


##### Returns


- `boolean`  true if valid else false



#### isMultiPolygon(geojson[, cb]) 

Determines if an object is a GeoJSON MultiPolygon or not




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| geojson | `object`  | valid geojson object | &nbsp; |
| cb | `Function`  | callback to invoke on success or failure | *Optional* |




##### Examples

```javascript
isMultiPolygon(geojson);
// => true
```


##### Returns


- `boolean`  true if valid else false



#### isGeometryCollection(geojson[, cb]) 

Determines if an object is a GeoJSON GeometryCollection or not




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| geojson | `object`  | valid geojson object | &nbsp; |
| cb | `Function`  | callback to invoke on success or failure | *Optional* |




##### Examples

```javascript
isGeometryCollection(geojson);
// => true
```


##### Returns


- `boolean`  true if valid else false



#### isFeature(geojson[, cb]) 

Determines if an object is a GeoJSON Feature or not




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| geojson | `object`  | valid geojson object | &nbsp; |
| cb | `Function`  | callback to invoke on success or failure | *Optional* |




##### Examples

```javascript
isFeature(geojson);
// => true
```


##### Returns


- `boolean`  true if valid else false



#### isFeatureCollection(geojson[, cb]) 

Determines if an object is a GeoJSON FeatureCollection or not




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| geojson | `object`  | valid geojson object | &nbsp; |
| cb | `Function`  | callback to invoke on success or failure | *Optional* |




##### Examples

```javascript
isFeatureCollection(geojson);
// => true
```


##### Returns


- `boolean`  true if valid else false



#### isGeometry(geojson[, cb]) 

Determines if an object is a GeoJSON geometry or not




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| geojson | `object`  | valid geojson object | &nbsp; |
| cb | `Function`  | callback to invoke on success or failure | *Optional* |




##### Examples

```javascript
isGeometry(geojson);
// => true
```


##### Returns


- `boolean`  true if valid else false



#### centroidOf(geojson) 

Calculates the centroid of a geojson feature(s) using the mean of all vertices




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| geojson | `object`  | feature to be centered | &nbsp; |




##### Examples

```javascript

const point = centroidOf(polygon);
// => { type: 'Point', coordinates: [ ... ] }
```


##### Returns


- `object`  an Object that can be used as centroid



#### parseCoordinateString(coords[, optns&#x3D;{}]) 

Create geojson geometry or coordinate array from string




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| coords | `string`  | string to extract geojson geometry or coordinates | &nbsp; |
| optns&#x3D;{} | `object`  | valid options | *Optional* |
| optns.delimiter&#x3D;&#x27;,&#x27; | `string`  | long, lat seperator from string | *Optional* |
| optns.separator&#x3D;&#x27; | `string`  | '] long, lat pair seperator from string | *Optional* |




##### Examples

```javascript

const polygonString = '-4.7,39.3 -5.2,38.6 -6.1,40.1 -4.9,39.8 -4.7,39.3'
const polygon = parseCoordinateString(polygonString);
// => { type: 'Polygon', coordinates: [ ... ] }

const cicleString = '-9.2,39.5 180';
const polygon = parseCoordinateString(cirlceString);
// => { type: 'Polygon', coordinates: [ ... ] }
```


##### Returns


- `object` `Array`  geojson geometry or coordinates



#### randomLongitude([optns&#x3D;{}]) 

Generate random longitude




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns&#x3D;{} | `object`  | valid option | *Optional* |
| optns.bbox&#x3D;-180, | `Array.<number>`  | -90, 180, 90]] a bounding box inside of which geometries are placed. | *Optional* |




##### Examples

```javascript
const longitude = randomLongitude();
// => -76.4103176657406
```


##### Returns


- `object`  valid longitude



#### randomLatitude([optns&#x3D;{}]) 

Generate random latitude




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns&#x3D;{} | `object`  | valid option | *Optional* |
| optns.bbox&#x3D;-180, | `Array.<number>`  | -90, 180, 90]] a bounding box inside of which geometries are placed. | *Optional* |




##### Examples

```javascript
const latitude = randomLatitude();
// => 67.07040223216296
```


##### Returns


- `object`  valid latitude



#### randomPosition([optns&#x3D;{}]) 

Generate next random position




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns&#x3D;{} | `object`  | valid option | *Optional* |
| optns.angle | `number`  | = (Math.random() * 2 * Math.PI)] valid angle in radian between points | *Optional* |
| optns.distance | `number`  | = (Math.random() * 0.0001)] valid distance between points | *Optional* |
| optns.longitude | `number`  | valid longitude on last point | *Optional* |
| optns.latitude | `number`  | valid latitude on last point | *Optional* |
| optns.bbox&#x3D;-180, | `Array.<number>`  | -90, 180, 90]] a bounding box inside of which geometries are placed. | *Optional* |




##### Examples

```javascript
const position = randomPosition();
// => [ -76.4103176657406, 67.07040223216296 ]
```


##### Returns


- `object`  valid position



#### randomPositions([optns&#x3D;{}]) 

Generate random positions




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns&#x3D;{} | `object`  | valid option | *Optional* |
| optns.vertices&#x3D;2 | `number`  | how many positions. | *Optional* |
| optns.bbox&#x3D;-180, | `Array.<number>`  | -90, 180, 90]] a bounding box inside of which geometries are placed. | *Optional* |




##### Examples

```javascript
const geo = randomPositions(); // => [ [-76.41031, 67.0704], ...]
```


##### Returns


- `object`  valid positions



#### randomPoint([optns&#x3D;{}]) 

Generate random GeoJSON Point




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns&#x3D;{} | `object`  | valid option | *Optional* |
| optns.bbox&#x3D;-180, | `Array.<number>`  | -90, 180, 90]] a bounding box inside of which geometries are placed. | *Optional* |




##### Examples

```javascript
const geo = randomPoint(); // => { type: 'Point', coordinates:[ ... ] }
```


##### Returns


- `object`  valid GeoJSON Point



#### randomLineString([optns&#x3D;{}]) 

Generate random GeoJSON LineString




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns&#x3D;{} | `object`  | valid option | *Optional* |
| optns.vertices&#x3D;2 | `number`  | how many coordinates each LineString will contain. | *Optional* |
| optns.bbox&#x3D;-180, | `Array.<number>`  | -90, 180, 90]] a bounding box inside of which geometries are placed. | *Optional* |




##### Examples

```javascript
const geo = randomLineString(); // => { type: 'LineString', coordinates:[ ... ] }
```


##### Returns


- `object`  valid GeoJSON LineString



#### randomPolygon([optns&#x3D;{}]) 

Generate random GeoJSON Polygon




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns&#x3D;{} | `object`  | valid option | *Optional* |
| optns.vertices&#x3D;4 | `number`  | how many coordinates Polygon will contain. | *Optional* |
| optns.bbox&#x3D;-180, | `Array.<number>`  | -90, 180, 90]] a bounding box inside of which geometries are placed. | *Optional* |




##### Examples

```javascript

const geo = randomPolygon();
// => { type: 'Polygon', coordinates:[ ... ] }
```


##### Returns


- `object`  valid GeoJSON Polygon



#### randomMultiPoint([optns&#x3D;{}]) 

Generate random GeoJSON MultiPoint




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns&#x3D;{} | `object`  | valid option | *Optional* |
| optns.vertices&#x3D;2 | `number`  | how many points MultiPoint will contain. | *Optional* |
| optns.bbox&#x3D;-180, | `Array.<number>`  | -90, 180, 90]] a bounding box inside of which geometries are placed. | *Optional* |




##### Examples

```javascript

const geo = randomMultiPoint();
// => { type: 'MultiPoint', coordinates:[ ... ] }
```


##### Returns


- `object`  valid GeoJSON MultiPoint



#### randomMultiLineString([optns&#x3D;{}]) 

Generate random GeoJSON MultiLineString




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns&#x3D;{} | `object`  | valid option | *Optional* |
| optns.lines&#x3D;2 | `number`  | how many LineString. | *Optional* |
| optns.vertices&#x3D;2 | `number`  | how many coordinates each LineString will contain. | *Optional* |
| optns.bbox&#x3D;-180, | `Array.<number>`  | -90, 180, 90]] a bounding box inside of which geometries are placed. | *Optional* |




##### Examples

```javascript

const geo = randomMultiLineString();
// => { type: 'MultiLineString', coordinates:[ ... ] }
```


##### Returns


- `object`  valid GeoJSON MultiLineString



#### randomMultiPolygon([optns&#x3D;{}]) 

Generate random GeoJSON MultiPolygon




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns&#x3D;{} | `object`  | valid option | *Optional* |
| optns.polygons&#x3D;2 | `number`  | how many Polygons. | *Optional* |
| optns.vertices&#x3D;2 | `number`  | how many coordinates each Polygon will contain. | *Optional* |
| optns.bbox&#x3D;-180, | `Array.<number>`  | -90, 180, 90]] a bounding box inside of which geometries are placed. | *Optional* |




##### Examples

```javascript

const geo = randomMultiPolygon();
// => {type: 'MultiPolygon', coordinates:[] }
```


##### Returns


- `object`  valid GeoJSON MultiPolygon



#### randomGeometry([optns&#x3D;{}]) 

Generate random GeoJSON Geometry




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns&#x3D;{} | `object`  | valid option | *Optional* |




##### Examples

```javascript

const geo = randomGeometry();
// => { type: 'Point', coordinates:[ ... ] }
```


##### Returns


- `object`  valid GeoJSON Geometry



#### randomGeometryCollection([optns&#x3D;{}]) 

Generate random GeoJSON GeometryCollection




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns&#x3D;{} | `object`  | valid option | *Optional* |




##### Examples

```javascript

const geo = randomGeometryCollection();
// => { type: 'GeometryCollection', geometries: [ ... ] }
```


##### Returns


- `object`  valid GeoJSON GeometryCollection



#### readShapefile(optns, done) 

Read shapefile stream




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns | `object`  | valid options | &nbsp; |
| optns.path | `string`  | valid shapefile path | &nbsp; |
| done | `Function`  | callback to invoke on feature read | &nbsp; |




##### Examples

```javascript
readShapefile(path, (error, { finished, feature, next }) => {
 // handle read error
 if(error) { ... }

 // handle read finished
 else if(finished){ ... }

 // process feature
 // and read next chunk
 else {
  //...
  return next();
 }
});
```


##### Returns


- `Void`



#### readGeoJSON(optns, done) 

Read GeoJSON file stream




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns | `object`  | valid options | &nbsp; |
| optns.path | `string`  | valid GeoJSON file path | &nbsp; |
| done | `Function`  | callback to invoke on feature read | &nbsp; |




##### Examples

```javascript
readGeoJSON({ path }, (error, { finished, feature, next }) => {
 // handle read error
 if(error) { ... }

 // handle read finished
 else if(finished){ ... }

 // process feature
 // and read next chunk
 else {
  //...
  return next();
 }
});
```


##### Returns


- `Void`



#### readCsv(optns, done) 

Read csv file stream




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns | `object`  | valid options | &nbsp; |
| optns.path | `string`  | valid csv file path | &nbsp; |
| optns.delimiter | `string`  | valid csv field delimiter | &nbsp; |
| done | `Function`  | callback to invoke on feature read | &nbsp; |




##### Examples

```javascript
readCsv({ path }, (error, { finished, feature, next }) => {
 // handle read error
 if(error) { ... }

 // handle read finished
 else if(finished){ ... }

 // process feature
 // and read next chunk
 else {
  //...
  return next();
 }
});
```


##### Returns


- `Void`



#### readJson(optns, done) 

Read json file




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns | `object`  | valid options | &nbsp; |
| optns.path | `string`  | valid json file path | &nbsp; |
| optns.throws | `boolean`  | whether to ignore error | &nbsp; |
| done | `Function`  | callback to invoke on success read or error | &nbsp; |




##### Examples

```javascript

readJson({ path }, (error, data) => {
 // handle read error
 if(error) { ... }

 // process json data
 else { ... }
});
```


##### Returns


- `object` `Error`  error or read json data




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
