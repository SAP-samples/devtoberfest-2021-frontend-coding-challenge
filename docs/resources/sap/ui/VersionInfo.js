/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/LoaderExtensions"],function(n){"use strict";var e={};e.load=function(n){n=n||{};n.async=true;return e._load(n)};var i=null;var r;var s;var a;Object.defineProperty(sap.ui,"versioninfo",{configurable:true,enumerable:true,get:function(){return r},set:function(n){r=n;s=null;a=null}});e._load=function(r){if(typeof r!=="object"){r={library:r}}r.async=r.async===true;r.failOnError=r.failOnError!==false;if(!sap.ui.versioninfo){if(r.async&&i instanceof Promise){return i.then(function(){return e._load(r)})}var s=function(n){i=null;if(n===null){return undefined}sap.ui.versioninfo=n;return e._load(r)};var a=function(n){i=null;throw n};var o=n.loadResource("sap-ui-version.json",{async:r.async,failOnError:r.async||r.failOnError});if(o instanceof Promise){i=o;return o.then(s,a)}else{return s(o)}}else{var t;if(typeof r.library!=="undefined"){var f=sap.ui.versioninfo.libraries;if(f){for(var u=0,c=f.length;u<c;u++){if(f[u].name===r.library){t=f[u];break}}}}else{t=sap.ui.versioninfo}return r.async?Promise.resolve(t):t}};function o(){if(sap.ui.versioninfo&&sap.ui.versioninfo.libraries&&!s){s={};sap.ui.versioninfo.libraries.forEach(function(n,e){s[n.name]={};var i=n.manifestHints&&n.manifestHints.dependencies&&n.manifestHints.dependencies.libs;for(var r in i){if(!i[r].lazy){s[n.name][r]=true}}})}if(sap.ui.versioninfo&&sap.ui.versioninfo.components&&!a){a={};Object.keys(sap.ui.versioninfo.components).forEach(function(n){var e=sap.ui.versioninfo.components[n];a[n]={library:e.library,hasOwnPreload:e.hasOwnPreload||false,dependencies:[]};var i=e.manifestHints&&e.manifestHints.dependencies&&e.manifestHints.dependencies.libs;for(var r in i){if(!i[r].lazy){a[n].dependencies.push(r)}}})}}e._getTransitiveDependencyForLibraries=function(n){o();if(s){var e=n.reduce(function(n,e){n[e]=true;return Object.assign(n,s[e])},{});n=Object.keys(e)}return n};e._getTransitiveDependencyForComponent=function(n){o();if(a){return a[n]}};return e});