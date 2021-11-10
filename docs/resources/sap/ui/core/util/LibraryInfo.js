/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/base/Log","sap/base/util/Version","sap/ui/thirdparty/jquery"],function(e,r,t,a){"use strict";var o=e.extend("sap.ui.core.util.LibraryInfo",{constructor:function(){e.apply(this);this._oLibInfos={}},destroy:function(){e.prototype.destroy.apply(this,arguments);this._oLibInfos={}},getInterface:function(){return this}});o.prototype._loadLibraryMetadata=function(e,t){e=e.replace(/\//g,".");if(this._oLibInfos[e]){setTimeout(t.bind(window,this._oLibInfos[e]),0);return}var o=this,n,i,l=/themelib_(.*)/i.exec(e),f;if(!l){i=".library";n=sap.ui.require.toUrl(e.replace(/\./g,"/"))+"/"}else{i=".theme";n=sap.ui.require.toUrl("sap/ui/core/themes/"+l[1]+"/")}f=typeof o.getResourceUrl==="function"?o.getResourceUrl(n):n;a.ajax({url:f+i,dataType:"xml",error:function(a,l,f){r.error("failed to load library details from '"+n+i+": "+l+", "+f);o._oLibInfos[e]={name:e,data:null,url:n};t(o._oLibInfos[e])},success:function(r,a,i){o._oLibInfos[e]={name:e,data:r,url:n};t(o._oLibInfos[e])}})};o.prototype._getLibraryInfo=function(e,r){this._loadLibraryMetadata(e,function(e){var t={libs:[],library:e.name,libraryUrl:e.url};if(e.data){var n=a(e.data);t.vendor=n.find("vendor").text();t.copyright=n.find("copyright").text();t.version=n.find("version").text();t.documentation=n.find("documentation").text();t.releasenotes=n.find("releasenotes").attr("url");t.componentInfo=o.prototype._getLibraryComponentInfo(n)}r(t)})};o.prototype._getThirdPartyInfo=function(e,r){this._loadLibraryMetadata(e,function(e){var t={libs:[],library:e.name,libraryUrl:e.url};if(e.data){var o=a(e.data).find("appData").find("thirdparty").children();o.each(function(r,o){if(o.nodeName==="lib"){var n=a(o);var i=n.children("license");t.libs.push({displayName:n.attr("displayName"),homepage:n.attr("homepage"),license:{url:i.attr("url"),type:i.attr("type"),file:e.url+i.attr("file")}})}})}r(t)})};o.prototype._getDocuIndex=function(e,t){var o=this;this._loadLibraryMetadata(e,function(e){var n=e.name,i=e.url,l={docu:{},library:n,libraryUrl:i};if(!e.data){t(l);return}var f=a(e.data).find("appData").find("documentation");var s=f.attr("indexUrl");if(!s){t(l);return}if(f.attr("resolve")=="lib"){s=e.url+s}if(typeof o.getResourceUrl==="function"){s=o.getResourceUrl(s)}a.ajax({url:s,dataType:"json",error:function(e,a,o){r.error("failed to load library docu from '"+s+"': "+a+", "+o);t(l)},success:function(e,r,a){e.library=n;e.libraryUrl=i;t(e)}})})};o.prototype._getReleaseNotes=function(e,o,n){var i=this;this._loadLibraryMetadata(e,function(l){if(!l.data){n({});return}var f=o.split(".").length===3&&!/-SNAPSHOT/.test(o);var s=t(o);var u=s.getMajor();var c=s.getMinor();var p=s.getPatch();var d=a(l.data).find("appData").find("releasenotes");var y=d.attr("url");var m=typeof i.getResourceUrl==="function";if(!y){r.warning("failed to load release notes for library "+e);n({});return}if(s.getSuffix()==="-SNAPSHOT"){if(c%2!=0){c=c+1;p=0}o=u+"."+c+"."+p}var h=m?i.getResourceUrl(""):window.location.href,g=/\/\d.\d{1,2}.\d{1,2}\//;if(d.attr("resolve")=="lib"){if(g.test(h)||f===false){y=l.url+y}else{y="{major}.{minor}.{patch}/"+l.url+y}}y=y.replace(/\{major\}/g,u);y=y.replace(/\{minor\}/g,c);y=y.replace(/\{patch\}/g,p);if(m){y=i.getResourceUrl(y)}a.ajax({url:y,dataType:"json",error:function(t,a,o){if(a==="parsererror"){r.error("failed to parse release notes for library '"+e+", "+o)}else{r.warning("failed to load release notes for library '"+e+", "+o)}n({})},success:function(e,r,t){n(e,o)}})})};o.prototype._getLibraryComponentInfo=function(e){var r={};var t=[];var a="";e.find("ownership > component").each(function(e,r){if(r.childElementCount===0){a=r.textContent}else{var o=r.getElementsByTagName("name");if(o&&o.length>0){o=o[0].textContent;var n=r.getElementsByTagName("module");if(o&&n&&n.length>0){var i=[];for(var l=0;l<n.length;l++){var f=n[l].textContent.replace(/\//g,".");if(f){i.push(f)}}if(i.length>0){t.push({component:o,modules:i})}}}}});r["defaultComponent"]=a;if(t&&t.length>0){r["specialCases"]=t}return r};o.prototype._getActualComponent=function(e,t){function a(e,r){e=e.toLowerCase();r=r.toLowerCase();return e===r||r.match(/\*$/)&&e.indexOf(r.slice(0,-1))===0||r.match(/\.\*$/)&&e===r.slice(0,-2)}if(t){for(var o in e){if(!e[o]){r.error("No library information deployed for "+o);continue}var n;if(t.indexOf(o)===0){n=e[o].defaultComponent}var i=e[o].specialCases;if(i){for(var l=0;l<i.length;l++){var f=i[l].modules;for(var s=0;s<f.length;s++){if(a(t,f[s])){n=i[l].component}}}}if(n){return n}}}};o.prototype._getDefaultComponent=function(e){return e&&e.componentInfo&&e.componentInfo.defaultComponent};return o});