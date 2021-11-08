/**
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/layout/library"],function(t){"use strict";function i(){var t=0;for(var i=0;i<this.virtualGridMatrix.length;i++){if(this.virtualGridMatrix[i][0]!==0){t++}}if(t>0){this.addEmptyRows(t)}}function r(t){return t===0}var e=t.extend("sap.f.VirtualGrid");e.prototype.init=function(t){this.virtualGridMatrix=[[]];this.numberOfCols=t.numberOfCols?t.numberOfCols:1;this.numberOfRows=t.numberOfRows?t.numberOfRows:1;this.cellWidth=t.cellWidth?t.cellWidth:5;this.cellHeight=t.cellHeight?t.cellHeight:5;this.unitOfMeasure=t.unitOfMeasure?t.unitOfMeasure:"rem";this.iGapSize=t.gapSize?t.gapSize:1;this.bAllowDenseFill=t.allowDenseFill?t.allowDenseFill:false;this.items={};this.rtl=t.rtl;this.width=t.width;this.rowsAutoHeight=t.rowsAutoHeight;this.topOffset=t.topOffset?t.topOffset:0;this.leftOffset=t.topOffset?t.leftOffset:0;for(var i=0;i<this.numberOfRows;i++){for(var r=0;r<this.numberOfCols;r++){this.virtualGridMatrix[i][r]=0}}this.lastItemPosition={top:-1,left:-1}};e.prototype.addEmptyRows=function(t){var i=this.virtualGridMatrix.length;for(var r=i;r<i+t;r++){this.virtualGridMatrix[r]=Array.apply(null,Array(this.numberOfCols)).map(Number.prototype.valueOf,0)}};e.prototype.getItems=function(){return this.items};e.prototype.getMatrix=function(){return this.virtualGridMatrix};e.prototype.getWidth=function(){if(!this.virtualGridMatrix[0]){return 0}var t=this.virtualGridMatrix[0].length;return t*this.cellWidth+(t-1)*this.iGapSize};e.prototype.getHeight=function(){var t=-this.iGapSize,i=0,e;if(this.rowsAutoHeight){this.rowsHeights.forEach(function(i){t+=i+this.iGapSize}.bind(this));return t}for(e=0;e<this.virtualGridMatrix.length;e++){if(!this.virtualGridMatrix[e].every(r)){i++}}return i*this.cellHeight+(i-1)*this.iGapSize};e.prototype.calculatePositions=function(){if(this.rowsAutoHeight){this.calculateRowsHeights()}var t,i,r,e,s,h,o;for(t=0;t<this.virtualGridMatrix.length;t++){r=this.virtualGridMatrix[t];for(i=0;i<r.length;i++){e=r[i];if(!e){continue}s=this.items[e];if(s.calculatedCoords){continue}h=i*(this.cellWidth+this.iGapSize)+this.leftOffset;o=s.cols*(this.cellWidth+this.iGapSize)-this.iGapSize;if(this.rtl){h=this.width-h-o}this.setItemTopAndHeight(s);s.left=h+this.unitOfMeasure;s.width=o+this.unitOfMeasure;s.calculatedCoords=true}}};e.prototype.fitElement=function(t,r,e,s,h,o){var a,l,n=this,u=Math.min(r,this.numberOfCols),f=n.lastItemPosition.top,p=n.lastItemPosition.left;this.items[t]=l={rows:e,height:s,cols:u,calculatedCoords:false};if(e>this.virtualGridMatrix.length){this.addEmptyRows(e-this.virtualGridMatrix.length)}if(h){i.call(this)}this.virtualGridMatrix.forEach(function(i,r,s){i.forEach(function(i,s,h){var o=n.bAllowDenseFill||r>f||r===f&&s>p;if(o&&n.virtualGridMatrix[r][s]===0&&!a){if(n.shouldElementFit(r,s,u,e)){n.fillElement(r,s,u,e,t);l.rowIndex=r;a=true}}})});if(!a&&!o){this.fitElement(t,r,e,s,true,true)}};e.prototype.shouldElementFit=function(t,i,r,e){var s=t+e;var h=i+r;var o=this.virtualGridMatrix;for(var a=t;a<s;a++){for(var l=i;l<h;l++){if(o[a][l]!==0||o.length<s||o[a].length<i+r){return false}}}return true};e.prototype.fillElement=function(t,i,r,e,s){for(var h=t;h<t+e;h++){for(var o=i;o<i+r;o++){this.virtualGridMatrix[h][o]=s}}this.lastItemPosition={top:t,left:i}};e.prototype.calculateRowsHeights=function(){var t,i,r=this.items,e=[],s,h,o,a=this.virtualGridMatrix.length,l=[];for(t=0;t<a;t++){l.push(0)}for(h in r){if(!r.hasOwnProperty(h)){continue}e.push(r[h])}e.sort(function(t,i){return t.rows-i.rows});e.forEach(function(t){s=-this.iGapSize;for(i=0;i<t.rows;i++){s+=l[i+t.rowIndex]+this.iGapSize}if(t.height>s){o=(t.height-s)/t.rows;for(i=0;i<t.rows;i++){l[i+t.rowIndex]+=o}}}.bind(this));this.rowsHeights=l};e.prototype.setItemTopAndHeight=function(t){var i=t.rowIndex;if(!this.rowsAutoHeight){t.top=i*(this.cellHeight+this.iGapSize)+this.topOffset+this.unitOfMeasure;t.height=t.rows*(this.cellHeight+this.iGapSize)-this.iGapSize+this.unitOfMeasure;return}var r,e=0,s=-this.iGapSize,h=this.rowsHeights;for(r=0;r<i;r++){e+=h[r]+this.iGapSize}for(r=i;r<i+t.rows;r++){s+=h[r]+this.iGapSize}t.top=e+this.unitOfMeasure;t.height=s+this.unitOfMeasure};return e});