(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Cesium~2545203d"],{"1b40":function(e,t,i){"use strict";var r=i("be18"),a=i("abab"),o=i("2f63"),n=i("7d62"),s=i("0123"),u=i("c67a"),c=i("e42d"),h=i("f20a"),p=i("8b68"),l=i("5b54"),d=i("9ab9"),_=i("6ef5"),f=i("e90c"),m=i("a913"),v=i("7c5e"),x=i("cb10"),y=i("3018"),b=i("99fa"),g=i("a58e");function w(e){this._url=e,this._cubeMapBuffers=void 0,this._cubeMaps=void 0,this._texture=void 0,this._mipTextures=void 0,this._va=void 0,this._sp=void 0,this._maximumMipmapLevel=void 0,this._loading=!1,this._ready=!1,this._readyPromise=g["a"].defer()}Object.defineProperties(w.prototype,{url:{get:function(){return this._url}},texture:{get:function(){return this._texture}},maximumMipmapLevel:{get:function(){return this._maximumMipmapLevel}},ready:{get:function(){return this._ready}},readyPromise:{get:function(){return this._readyPromise.promise}}}),w.isSupported=function(e){return e.colorBufferHalfFloat&&e.halfFloatingPointTexture||e.floatingPointTexture&&e.colorBufferFloat};for(var O=new r["a"](1,0,0),A=new r["a"](0,0,1),j=new r["a"](-1,0,0),T=new r["a"](0,0,-1),M=new r["a"](0,1,0),L=new r["a"](0,-1,0),S=[M,j,A,L,O,M,T,M,M],P=S.length,B=new Float32Array(3*P),F=0,D=0;D<P;++D,F+=3)r["a"].pack(S[D],B,F);var I=new Float32Array([-1,1,-1,0,0,1,0,0,1,0,1,1,0,-1,-1,-1,1,-1]),C=new Uint16Array([0,1,2,2,3,1,7,6,1,3,6,1,2,5,4,3,4,2,4,8,6,3,4,6]);function z(e){var t=h["a"].createVertexBuffer({context:e,typedArray:I,usage:p["a"].STATIC_DRAW}),i=h["a"].createVertexBuffer({context:e,typedArray:B,usage:p["a"].STATIC_DRAW}),r=h["a"].createIndexBuffer({context:e,typedArray:C,usage:p["a"].STATIC_DRAW,indexDatatype:s["a"].UNSIGNED_SHORT}),o=[{index:0,vertexBuffer:t,componentsPerAttribute:2,componentDatatype:a["a"].FLOAT},{index:1,vertexBuffer:i,componentsPerAttribute:3,componentDatatype:a["a"].FLOAT}];return new v["a"]({context:e,attributes:o,indexBuffer:r})}function Y(e){return function(){return e}}function R(e){var t,i;e._va=e._va&&e._va.destroy(),e._sp=e._sp&&e._sp.destroy();var r=e._cubeMaps;if(Object(o["a"])(r))for(i=r.length,t=0;t<i;++t)r[t].destroy();var a=e._mipTextures;if(Object(o["a"])(a))for(i=a.length,t=0;t<i;++t)a[t].destroy();e._va=void 0,e._sp=void 0,e._cubeMaps=void 0,e._cubeMapBuffers=void 0,e._mipTextures=void 0}w.prototype.update=function(e){var t=e.context;if(w.isSupported(t)&&(Object(o["a"])(this._texture)&&Object(o["a"])(this._va)&&R(this),!Object(o["a"])(this._texture))){if(!Object(o["a"])(this._texture)&&!this._loading){var i=t.textureCache.getTexture(this._url);if(Object(o["a"])(i))return R(this),this._texture=i,this._maximumMipmapLevel=this._texture.maximumMipmapLevel,this._ready=!0,void this._readyPromise.resolve()}var r=this._cubeMapBuffers;if(!Object(o["a"])(r)&&!this._loading){var a=this;Object(u["a"])(this._url).then((function(e){a._cubeMapBuffers=e,a._loading=!1})).otherwise(this._readyPromise.reject),this._loading=!0}if(Object(o["a"])(this._cubeMapBuffers)){this._va=z(t),this._sp=f["a"].fromCache({context:t,vertexShaderSource:b["a"],fragmentShaderSource:y["a"],attributeLocations:{position:0,cubeMapCoordinates:1}});var n=Math.min(r.length,6);this._maximumMipmapLevel=n-1;for(var s=this._cubeMaps=new Array(n),h=this._mipTextures=new Array(n),p=2*r[0].positiveX.width,v={originalSize:function(){return p}},g=t.halfFloatingPointTexture?_["a"].HALF_FLOAT:_["a"].FLOAT,O=c["a"].RGBA,A=0;A<n;++A){var j=r[A].positiveY;r[A].positiveY=r[A].negativeY,r[A].negativeY=j;var T=s[A]=new d["a"]({context:t,source:r[A]}),M=2*s[A].width,L=h[A]=new m["a"]({context:t,width:M,height:M,pixelDatatype:g,pixelFormat:O}),S=new l["a"]({vertexArray:this._va,shaderProgram:this._sp,uniformMap:{cubeMap:Y(T)},outputTexture:L,persists:!0,owner:this});e.commandList.push(S),v["texture"+A]=Y(L)}this._texture=new m["a"]({context:t,width:1.5*p+2,height:p,pixelDatatype:g,pixelFormat:O}),this._texture.maximumMipmapLevel=this._maximumMipmapLevel,t.textureCache.addTexture(this._url,this._texture);var P=new l["a"]({fragmentShaderSource:x["a"],uniformMap:v,outputTexture:this._texture,persists:!1,owner:this});e.commandList.push(P),this._ready=!0,this._readyPromise.resolve()}}},w.prototype.isDestroyed=function(){return!1},w.prototype.destroy=function(){return R(this),this._texture=this._texture&&this._texture.destroy(),Object(n["a"])(this)},t["a"]=w},"3d43":function(e,t,i){"use strict";var r=i("535a"),a=i("2f63"),o=i("7d62"),n=i("738d");function s(){this._length=0,this._collections={},this._collectionsArray=[],this.show=!0}Object.defineProperties(s.prototype,{length:{get:function(){return this._length}}}),s.prototype.add=function(e,t){t=Object(r["a"])(t,0);var i=this._collections[t];if(!Object(a["a"])(i)){i=new n["a"]({destroyPrimitives:!1}),i._zIndex=t,this._collections[t]=i;var o=this._collectionsArray,s=0;while(s<o.length&&o[s]._zIndex<t)s++;o.splice(s,0,i)}return i.add(e),this._length++,e._zIndex=t,e},s.prototype.set=function(e,t){return t===e._zIndex||(this.remove(e,!0),this.add(e,t)),e},s.prototype.remove=function(e,t){if(this.contains(e)){var i,r=e._zIndex,a=this._collections[r];return i=t?a.remove(e):a.removeAndDestroy(e),i&&this._length--,0===a.length&&(this._collectionsArray.splice(this._collectionsArray.indexOf(a),1),this._collections[r]=void 0,a.destroy()),i}return!1},s.prototype.removeAll=function(){for(var e=this._collectionsArray,t=0;t<e.length;t++){var i=e[t];i.destroyPrimitives=!0,i.destroy()}this._collections={},this._collectionsArray=[],this._length=0},s.prototype.contains=function(e){if(!Object(a["a"])(e))return!1;var t=this._collections[e._zIndex];return Object(a["a"])(t)&&t.contains(e)},s.prototype.update=function(e){if(this.show)for(var t=this._collectionsArray,i=0;i<t.length;i++)t[i].update(e)},s.prototype.isDestroyed=function(){return!1},s.prototype.destroy=function(){return this.removeAll(),Object(o["a"])(this)},t["a"]=s},"9ccd":function(e,t,i){"use strict";var r=i("8dfe"),a=i("535a"),o=i("2f63"),n=i("eace"),s=i("d4ed"),u=i("d3a0"),c=i("e288"),h=new r["a"]("MapQuest, Open Street Map and contributors, CC-BY-SA");function p(e){e=Object(a["a"])(e,a["a"].EMPTY_OBJECT);var t=s["a"].createIfNeeded(Object(a["a"])(e.url,"https://a.tile.openstreetmap.org/"));t.appendForwardSlash(),t.url+="{z}/{x}/{y}."+Object(a["a"])(e.fileExtension,"png");var i=new u["a"]({ellipsoid:e.ellipsoid}),o=256,p=256,l=Object(a["a"])(e.minimumLevel,0),d=e.maximumLevel,_=Object(a["a"])(e.rectangle,i.rectangle),f=i.positionToTileXY(n["a"].southwest(_),l),m=i.positionToTileXY(n["a"].northeast(_),l),v=(Math.abs(m.x-f.x),Math.abs(m.y-f.y),Object(a["a"])(e.credit,h));"string"===typeof v&&(v=new r["a"](v)),c["a"].call(this,{url:t,credit:v,tilingScheme:i,tileWidth:o,tileHeight:p,minimumLevel:l,maximumLevel:d,rectangle:_})}Object(o["a"])(Object.create)&&(p.prototype=Object.create(c["a"].prototype),p.prototype.constructor=p),t["a"]=p}}]);