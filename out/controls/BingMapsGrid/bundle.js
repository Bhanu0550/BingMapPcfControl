var pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./BingMapsGrid/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./BingMapsGrid/index.ts":
/*!*******************************!*\
  !*** ./BingMapsGrid/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval(" /// <reference path=\"../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.d.ts\" />\n/// <reference path=\"../node_modules/bingmaps/types/MicrosoftMaps/Modules/Clustering.d.ts\" />\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.BingMapsField2 = void 0;\n\nvar BingMapsField2 = function () {\n  function BingMapsField2() {\n    var _this = this;\n\n    this.onClick = function (event) {\n      _this._inputElement.value = _this.resetVal;\n      _this._inputValue = _this._inputElement.value;\n\n      _this._notifyOutputChanged();\n    };\n\n    this.onSave = function (event) {\n      _this._inputValue = _this._inputElement.value;\n\n      _this._notifyOutputChanged();\n    };\n  }\n\n  BingMapsField2.prototype.initMap = function () {\n    var self = this;\n    var temp = \"\";\n\n    if (!this._bMapScriptIsLoaded) {\n      setTimeout(function () {\n        self.initMap();\n      }, 1000);\n      return;\n    } // this._bMapPushpinDefaultColor = isHexColor(this._context.parameters.defaultPushpinColor?.raw || '') ? this._context.parameters.defaultPushpinColor.raw as string : '';\n\n\n    this._bMapOptions = {\n      zoom: 0,\n      center: new Microsoft.Maps.Location(0, 0),\n      mapTypeId: Microsoft.Maps.MapTypeId.aerial\n    };\n    this._bMap = new Microsoft.Maps.Map(this._mapDiv, this._bMapOptions);\n    this._bMapIsLoaded = true;\n    var greenPin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(0, 0), {\n      color: '#0f0',\n      draggable: true\n    });\n\n    this._bMap.entities.push(greenPin);\n\n    Microsoft.Maps.Events.addHandler(greenPin, 'drag', function (e) {\n      var location = greenPin.getLocation();\n      var varLatitude = location.latitude;\n      var varLong = location.longitude;\n      var vartitle = \"lat:\" + varLatitude + \",\" + \"long:\" + varLong;\n      temp = vartitle;\n      document.getElementById(\"longlat\").value = vartitle;\n    });\n    this._inputValue = temp;\n  };\n\n  BingMapsField2.prototype.addBingMapsScriptToHeader = function (context) {\n    var _this = this;\n\n    var headerScript = document.createElement(\"script\");\n    headerScript.type = 'text/javascript';\n    headerScript.id = \"BingMapsHeaderScript\";\n    headerScript.async = true;\n    headerScript.defer = true;\n    headerScript.src = \"https://www.bing.com/api/maps/mapcontrol?key=\" + this._apikey;\n\n    headerScript.onload = function () {\n      _this._bMapScriptIsLoaded = true;\n    };\n\n    this._container.appendChild(headerScript);\n  };\n  /**\r\n   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.\r\n   * Data-set values are not initialized here, use updateView.\r\n   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.\r\n   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.\r\n   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.\r\n   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.\r\n   */\n\n\n  BingMapsField2.prototype.init = function (context, notifyOutputChanged, state, container) {\n    //this will ensure that if the container size changes the updateView function will be called.\n    context.mode.trackContainerResize(true);\n    this._notifyOutputChanged = notifyOutputChanged;\n    this._context = context;\n    this._container = container;\n    this._bMapIsLoaded = false;\n    this._inputElement = document.createElement(\"input\");\n\n    this._inputElement.setAttribute(\"type\", \"text\");\n\n    this._inputElement.setAttribute(\"id\", \"longlat\");\n\n    this._inputElement.setAttribute(\"readonly\", \"true\");\n\n    this._inputElement.setAttribute(\"style\", \"width:65%\"); // this._inputElement.setAttribute(\"style\",\"float:left\");\n\n\n    var _resetElement = document.createElement(\"input\");\n\n    _resetElement.setAttribute(\"type\", \"reset\");\n\n    _resetElement.setAttribute(\"id\", \"_resetElement\");\n\n    _resetElement.setAttribute(\"style\", \"width:15%\");\n\n    _resetElement.onclick = this.onClick;\n\n    var _saveElement = document.createElement(\"input\");\n\n    _saveElement.setAttribute(\"type\", \"submit\");\n\n    _saveElement.setAttribute(\"value\", \"Save\");\n\n    _saveElement.setAttribute(\"id\", \"_saveElement\");\n\n    _saveElement.setAttribute(\"style\", \"width:15%\");\n\n    _saveElement.onclick = this.onSave;\n\n    var _inputDiv = document.createElement(\"div\");\n\n    _inputDiv.setAttribute(\"id\", \"inputDiv\");\n\n    _inputDiv.setAttribute(\"style\", \"position:relative;width:100%;height:3.5rem;;border-style: solid;margin:auto;\");\n\n    _inputDiv.appendChild(this._inputElement);\n\n    _inputDiv.appendChild(_saveElement);\n\n    _inputDiv.appendChild(_resetElement);\n\n    this._inputValue = context.parameters.primaryFieldName.raw || \"\";\n    this.resetVal = this._inputValue;\n    this._inputElement.value = this._inputValue;\n    var apiKey = context.parameters.bingMapsAPIKey.raw;\n    this._apikey = apiKey;\n    this.addBingMapsScriptToHeader(this._context);\n    var mainDiv = document.createElement(\"div\");\n    mainDiv.setAttribute(\"id\", \"mainDiv\");\n    this._mapDiv = document.createElement(\"div\");\n\n    this._mapDiv.setAttribute(\"id\", \"mapDiv\");\n\n    this._mapDiv.setAttribute(\"style\", \"position:relative;width:100%;height:80vh;border-style: solid;margin:auto;\");\n\n    this.initMap(); // input for location\n\n    mainDiv.appendChild(_inputDiv);\n    mainDiv.appendChild(this._mapDiv); //mainDiv.appendChild(this.infodiv);\n\n    this._container.appendChild(mainDiv);\n  };\n  /**\r\n   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.\r\n   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions\r\n   */\n\n\n  BingMapsField2.prototype.updateView = function (context) {};\n  /**\r\n   * It is called by the framework prior to a control receiving new data.\r\n   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”\r\n   */\n\n\n  BingMapsField2.prototype.getOutputs = function () {\n    return {\n      primaryFieldName: this._inputValue\n    };\n  };\n  /**\r\n   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.\r\n   * i.e. cancelling any pending remote calls, removing listeners, etc.\r\n   */\n\n\n  BingMapsField2.prototype.destroy = function () {// Add code to cleanup control if necessary\n  };\n\n  return BingMapsField2;\n}();\n\nexports.BingMapsField2 = BingMapsField2;\n\n//# sourceURL=webpack://pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad/./BingMapsGrid/index.ts?");

/***/ })

/******/ });
if (window.ComponentFramework && window.ComponentFramework.registerControl) {
	ComponentFramework.registerControl('Pcf.BingMapsField2', pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.BingMapsField2);
} else {
	var Pcf = Pcf || {};
	Pcf.BingMapsField2 = pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.BingMapsField2;
	pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad = undefined;
}