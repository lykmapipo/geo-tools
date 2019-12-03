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



#### readShapefile(path, done) 

Read shapefile stream




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| path | `string`  | valid shapefile path | &nbsp; |
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



#### readGeoJSON(path, done) 

Read GeoJSON file stream




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| path | `string`  | valid GeoJSON file path | &nbsp; |
| done | `Function`  | callback to invoke on feature read | &nbsp; |




##### Examples

```javascript
readGeoJSON(path, (error, { finished, feature, next }) => {
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




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*