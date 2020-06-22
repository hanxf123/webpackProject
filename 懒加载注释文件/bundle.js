/*! hxf */
(function(modules) { // webpackBootstrap
	// install a JSONP callback for chunk loading
  // 设置成功的方法，状态0
	function webpackJsonpCallback(data) {
		var chunkIds = data[0];
		var moreModules = data[1];

    // add "moreModules" to the modules object,
    for(moduleId in moreModules) {
      if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        modules[moduleId] = moreModules[moduleId];
      }
    }
		// then flag all "chunkIds" as loaded and fire callback
    // 然后把所有模块id作为已加载，并且触发回调函数执行
		var moduleId, chunkId, i = 0, resolves = [];
		for(;i < chunkIds.length; i++) {
			chunkId = chunkIds[i];
			// installedChunks[chunkId] = [resolve,reject,promise]
			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
			  // 把所有resolve方法放到了resolves中
				resolves.push(installedChunks[chunkId][0]);
			}
			// 设置为0，表示加载完成
			installedChunks[chunkId] = 0;
		}
		// 将chunk放到了window["webpackJsonp"]中
		if(parentJsonpFunction) parentJsonpFunction(data);
    // 循环resolves数组，从左往右执行，让所有promise都成功
		while(resolves.length) {
			resolves.shift()();
		}

	};


	// The module cache
	var installedModules = {};

	// object to store loaded and loading chunks
	// undefined = chunk not loaded, null = chunk preloaded/prefetched
	// Promise = chunk loading, 0 = chunk loaded
	var installedChunks = {
		"main": 0
	};



	// script path function
	function jsonpScriptSrc(chunkId) {
	  // p表示output中的publicPath
		return __webpack_require__.p + "" + chunkId + ".bundle.js"
	}

	// The require function
	function __webpack_require__(moduleId) {

		// Check if module is in cache
		if(installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}
		// Create a new module (and put it into the cache)
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: false,
			exports: {}
		};

		// Execute the module function
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		// Flag the module as loaded
		module.l = true;

		// Return the exports of the module
		return module.exports;
	}

	// This file contains only the entry chunk.
	// The chunk loading function for additional chunks
  // e -> ensure 确保
  // 设置加载中，返回promise
	__webpack_require__.e = function requireEnsure(chunkId) {
		var promises = [];


		// JSONP chunk loading for javascript

		var installedChunkData = installedChunks[chunkId];
		if(installedChunkData !== 0) { // 0 means "already installed".

			// a Promise means "currently loading".
			if(installedChunkData) {
				promises.push(installedChunkData[2]);
			} else {
				// setup Promise in chunk cache
				var promise = new Promise(function(resolve, reject) {
					installedChunkData = installedChunks[chunkId] = [resolve, reject];
				});
				// 相当于 installedChunkData = installedChunks[chunkId] = [resolve, reject, promise];
				promises.push(installedChunkData[2] = promise);

				// start chunk loading
        // 创建script标签
				var script = document.createElement('script');
				// 当脚本加载完成后
				var onScriptComplete;
        // 指定脚本编码
				script.charset = 'utf-8';
        // 指定超时时间
				script.timeout = 120;
				// nc -> nonce 用来防止重放攻击 防csrf
				if (__webpack_require__.nc) {
					script.setAttribute("nonce", __webpack_require__.nc);
				}
				// 获取文件路径，并赋值给src
				script.src = jsonpScriptSrc(chunkId);

				// create error before stack unwound to get useful stacktrace later
				var error = new Error();
				onScriptComplete = function (event) {
					// avoid mem leaks in IE. 防止IE内存泄漏
					script.onerror = script.onload = null;
					clearTimeout(timeout);
					var chunk = installedChunks[chunkId];
					if(chunk !== 0) {
						if(chunk) {
						  // 报错，最后一步reject promiss
							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
							var realSrc = event && event.target && event.target.src;
							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
							error.name = 'ChunkLoadError';
							error.type = errorType;
							error.request = realSrc;
							chunk[1](error);
						}
						// 将chunk设置为undefined
						installedChunks[chunkId] = undefined;
					}
				};
				// 如果120s内没有返回，掉onScriptComplete
				var timeout = setTimeout(function(){
					onScriptComplete({ type: 'timeout', target: script });
				}, 120000);
				script.onerror = script.onload = onScriptComplete;
				document.head.appendChild(script);
			}
		}
		return Promise.all(promises);
	};

	// expose the modules object (__webpack_modules__)
	__webpack_require__.m = modules;

	// expose the module cache
	__webpack_require__.c = installedModules;

	// define getter function for harmony exports
	// 定义getter函数为了输出
	__webpack_require__.d = function(exports, name, getter) {
		// o -> own
		if(!__webpack_require__.o(exports, name)) {
			// defineProperty(obj, attr, discriptor)
			Object.defineProperty(exports, name, { enumerable: true, get: getter });
		}
	};

	// define __esModule on exports
	__webpack_require__.r = function(exports) {
		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
			// exports[Symbol.toStringTag] = "Module"
			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
		}
		Object.defineProperty(exports, '__esModule', { value: true });
	};

	// create a fake namespace object
	// mode & 1: value is a module id, require it
	// mode & 2: merge all properties of value into the ns
	// mode & 4: return value when already ns object
	// mode & 8|1: behave like require
	__webpack_require__.t = function(value, mode) {
		if(mode & 1) value = __webpack_require__(value);
		if(mode & 8) return value;
		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
		var ns = Object.create(null);
		__webpack_require__.r(ns);
		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
		return ns;
	};

	// getDefaultExport function for compatibility with non-harmony modules
	__webpack_require__.n = function(module) {
		var getter = module && module.__esModule ?
			function getDefault() { return module['default']; } :
			function getModuleExports() { return module; };
		__webpack_require__.d(getter, 'a', getter);
		return getter;
	};

	// Object.prototype.hasOwnProperty.call
	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

	// __webpack_public_path__
	__webpack_require__.p = "";

	// on error function for async loading
	__webpack_require__.oe = function(err) { console.error(err); throw err; };

	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
	// 备份[].push，取到jsonpArray的处理方法，把this绑定成jsonpArray
	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
	// 给jsonpArray.push重新复制
	jsonpArray.push = webpackJsonpCallback;
	// 生成一个新数组
	jsonpArray = jsonpArray.slice();
	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
	var parentJsonpFunction = oldJsonpFunction;


	// Load entry module and return exports
	return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
/************************************************************************/
({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/*! ModuleConcatenation bailout: Module is an entry point */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.less */ \"./src/index.less\");\n/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_less__WEBPACK_IMPORTED_MODULE_0__);\nvar _class, _descriptor, _temp;\n\nfunction _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }\n\nfunction _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }\n\n\n/*{\r\n  enumerable: true, // 是否可枚举\r\n  writable: true, // 是否可修改\r\n  configurable: true, // 是否可配置 delete obj[key]\r\n  value(){}\r\n  get(){}\r\n  set(){}\r\n}*/\n\nfunction readonly(target, key, discriptor) {\n  discriptor.writable = false;\n}\n\nfunction log(target, key, discriptor) {\n  var orgValue = discriptor.value;\n\n  discriptor.value = function () {\n    console.log('计算周长1');\n    return orgValue.call.apply(orgValue, [this].concat(Array.prototype.slice.call(arguments)));\n  };\n}\n\nvar Circle = (_class = (_temp = /*#__PURE__*/function () {\n  function Circle(radius) {\n    _classCallCheck(this, Circle);\n\n    _initializerDefineProperty(this, \"PI\", _descriptor, this);\n\n    this.radius = radius;\n  }\n\n  _createClass(Circle, [{\n    key: \"getRound\",\n    value: function getRound() {\n      return 2 * this.PI * this.radius;\n    }\n  }]);\n\n  return Circle;\n}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, \"PI\", [readonly], {\n  configurable: true,\n  enumerable: true,\n  writable: true,\n  initializer: function initializer() {\n    return 3.14;\n  }\n}), _applyDecoratedDescriptor(_class.prototype, \"getRound\", [log], Object.getOwnPropertyDescriptor(_class.prototype, \"getRound\"), _class.prototype)), _class);\nvar a = new Circle(2);\n\nfunction lazyClick() {\n  __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.t.bind(null, /*! ./lazy */ \"./src/lazy.js\", 7)).then(function (res) {\n    console.log(res);\n  });\n}\n\nconsole.log(\"1.0.0\", \"development\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJuYW1lcyI6WyJyZWFkb25seSIsInRhcmdldCIsImtleSIsImRpc2NyaXB0b3IiLCJ3cml0YWJsZSIsImxvZyIsIm9yZ1ZhbHVlIiwidmFsdWUiLCJjb25zb2xlIiwiY2FsbCIsImFyZ3VtZW50cyIsIkNpcmNsZSIsInJhZGl1cyIsIlBJIiwiYSIsImxhenlDbGljayIsInRoZW4iLCJyZXMiLCJWRVJTSU9OIiwicHJvY2VzcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7Ozs7Ozs7OztBQVFBLFNBQVNBLFFBQVQsQ0FBa0JDLE1BQWxCLEVBQTBCQyxHQUExQixFQUErQkMsVUFBL0IsRUFBMkM7QUFDekNBLFlBQVUsQ0FBQ0MsUUFBWCxHQUFzQixLQUF0QjtBQUNEOztBQUNELFNBQVNDLEdBQVQsQ0FBY0osTUFBZCxFQUFzQkMsR0FBdEIsRUFBMkJDLFVBQTNCLEVBQXVDO0FBQ3JDLE1BQUlHLFFBQVEsR0FBR0gsVUFBVSxDQUFDSSxLQUExQjs7QUFDQUosWUFBVSxDQUFDSSxLQUFYLEdBQW1CLFlBQVk7QUFDN0JDLFdBQU8sQ0FBQ0gsR0FBUixDQUFZLE9BQVo7QUFDQSxXQUFPQyxRQUFRLENBQUNHLElBQVQsT0FBQUgsUUFBUSxHQUFNLElBQU4sb0NBQWNJLFNBQWQsR0FBZjtBQUNELEdBSEQ7QUFJRDs7SUFDS0MsTTtBQUNKLGtCQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQUE7O0FBQ2xCLFNBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNEOzs7OytCQUVlO0FBQ2QsYUFBTyxJQUFFLEtBQUtDLEVBQVAsR0FBVSxLQUFLRCxNQUF0QjtBQUNEOzs7OytFQUhBWixROzs7OztXQUFjLEk7OzZEQUNkSyxHO0FBS0gsSUFBTVMsQ0FBQyxHQUFHLElBQUlILE1BQUosQ0FBVyxDQUFYLENBQVY7O0FBRUEsU0FBU0ksU0FBVCxHQUFxQjtBQUNuQixvSEFBaUJDLElBQWpCLENBQXNCLFVBQUNDLEdBQUQsRUFBUztBQUM3QlQsV0FBTyxDQUFDSCxHQUFSLENBQVlZLEdBQVo7QUFDRCxHQUZEO0FBR0Q7O0FBQ0RULE9BQU8sQ0FBQ0gsR0FBUixDQUFZYSxPQUFaLEVBQW9CQyxhQUFwQiIsImZpbGUiOiIuL3NyYy9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi9pbmRleC5sZXNzJ1xyXG4vKntcclxuICBlbnVtZXJhYmxlOiB0cnVlLCAvLyDmmK/lkKblj6/mnprkuL5cclxuICB3cml0YWJsZTogdHJ1ZSwgLy8g5piv5ZCm5Y+v5L+u5pS5XHJcbiAgY29uZmlndXJhYmxlOiB0cnVlLCAvLyDmmK/lkKblj6/phY3nva4gZGVsZXRlIG9ialtrZXldXHJcbiAgdmFsdWUoKXt9XHJcbiAgZ2V0KCl7fVxyXG4gIHNldCgpe31cclxufSovXHJcbmZ1bmN0aW9uIHJlYWRvbmx5KHRhcmdldCwga2V5LCBkaXNjcmlwdG9yKSB7XHJcbiAgZGlzY3JpcHRvci53cml0YWJsZSA9IGZhbHNlO1xyXG59XHJcbmZ1bmN0aW9uIGxvZyAodGFyZ2V0LCBrZXksIGRpc2NyaXB0b3IpIHtcclxuICBsZXQgb3JnVmFsdWUgPSBkaXNjcmlwdG9yLnZhbHVlO1xyXG4gIGRpc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZygn6K6h566X5ZGo6ZW/MScpO1xyXG4gICAgcmV0dXJuIG9yZ1ZhbHVlLmNhbGwodGhpcywuLi5hcmd1bWVudHMpO1xyXG4gIH1cclxufVxyXG5jbGFzcyBDaXJjbGUge1xyXG4gIGNvbnN0cnVjdG9yKHJhZGl1cykge1xyXG4gICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XHJcbiAgfVxyXG4gIEByZWFkb25seSBQSSA9IDMuMTQ7XHJcbiAgQGxvZyBnZXRSb3VuZCgpIHtcclxuICAgIHJldHVybiAyKnRoaXMuUEkqdGhpcy5yYWRpdXM7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBhID0gbmV3IENpcmNsZSgyKVxyXG5cclxuZnVuY3Rpb24gbGF6eUNsaWNrKCkge1xyXG4gIGltcG9ydCgnLi9sYXp5JykudGhlbigocmVzKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gIH0pXHJcbn1cclxuY29uc29sZS5sb2coVkVSU0lPTixwcm9jZXNzLmVudi5OT0RFX0VOVilcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/index.less":
/*!************************!*\
  !*** ./src/index.less ***!
  \************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgubGVzcz82MDRiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Ii4vc3JjL2luZGV4Lmxlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.less\n");

/***/ })

});