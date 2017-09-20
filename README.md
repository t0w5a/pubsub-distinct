PubSubDistinct
=====
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Methods](#methods)
5. [Git repository](#git)
6. [Version](#version)

### <a name="description"></a>1. Description
`pubsub-distinct` or `PubSubDistinct` is an extension of the [rx-pubsub](https://www.npmjs.com/package/rx-pubsub) service. 
Additionally to the functionality of the `rx-pubsub` it has one more public method `publishDistinct()`
which publishes only distinct data. It means, the same data will not be published on the same event twice in a row.

#### Example:
```javascript
let eventName = 'testEvent';
  
console.log('register the subscriber to the event');
let sub1 = PubSubDistinct.subscribe(eventName, (data) => {
    console.log('subscriber receives data: ', data);
});  
  
console.log('publish data to the event');
PubSubDistinct.publishDistinct(eventName, {testProp: 'test Value'});

console.log('publish other data to the event');
PubSubDistinct.publishDistinct(eventName, {testProp: 'test Value 2'});

console.log('publish the same data as the previous one. the subscriber shouldn\'t be triggered!');
PubSubDistinct.publishDistinct(eventName, {testProp: 'test Value 2'});

console.log('publish new data');
PubSubDistinct.publishDistinct(eventName, {testProp: 'test Value 3'});
```

#### Output:
```
register the subscriber to the event  
  
publish data to the event  
subscriber receives data:  Object {testProp: "test Value"}  
  
publish other data to the event  
subscriber receives data:  Object {testProp: "test Value 2"}  
  
publish the same data as the previous one. the subscriber shouldn't be triggered!  
  
publish new data  
subscriber receives data:  Object {testProp: "test Value 3"}
```

This module is separated from the `rx-pubsub` because of its dependencies and the final size of the module.
It is using `object-hash` module to generate the hash of the published data. As the result its size is 7 times bigger than `rx-pubsub`.
So, if you don't need this feature, to publish only distinct data, please take a look at the module 
[rx-pubsub](https://www.npmjs.com/package/rx-pubsub).


### <a name="installation"></a>2. Installation
Install the module into your application and save it as a dev 
dependency in your `package.json` file  
```
npm install pubsub-distinct --save-dev
```

### <a name="usage"></a>3. Usage
In order to use the `PubSubDistinct` you have to include/import 
it into your application:

```typescript
import {PubSubDistinct} from "pubsub-distinct";
```

If you want to use it in a plain/vanilla Javascript project then you 
might just include the js file into your html/page application:
```html
<script type="application/javascript" src="./node_modules/pubsub-distinct/dist/pubsub-distinct.min.js"></script>
```

Create new `PubSubDistinct` object and use it as it's shown in the above example.  
  

### <a name="methods"></a>4. Methods
The only difference of this module from the `rx-pubsub` is the method `publishDistinct()`:    
#### publishDistinct(eventName: string, data: any, previousMessagesNr: number = 1)
Publish only distinct data to an event. 
The same data will not be published two times in a row!  
  
*Parameters:*  
**eventName** - Event which should be fired  
**data** - Data sent to all Subscribers of the event  
**previousMessagesNr** - Maximum element count of the replay 
buffer  
  
*Return:*  
Method returns `void`.

  
  
The description of other methods can be found in the 
[rx-pubsub](https://www.npmjs.com/package/rx-pubsub) documentation.
     
### <a name="git"></a>5. Git repository
[https://github.com/t0w5a/pubsub-distinct](https://github.com/t0w5a/pubsub-distinct)

### <a name="version"></a>6. Version
0.2.0