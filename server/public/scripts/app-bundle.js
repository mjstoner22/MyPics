define('app',['exports', 'aurelia-auth'], function (exports, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.addPipelineStep('authorize', _aureliaAuth.AuthorizeStep);
      config.map([{
        route: ['', 'home'],
        moduleId: './modules/home',
        name: 'Home'
      }, {
        route: 'list',
        moduleId: './modules/list',
        name: 'List',
        auth: true
      }, {
        route: 'image',
        moduleId: './modules/image',
        name: 'Image',
        auth: false
      }]);
    };

    return App;
  }();
});
define('auth-config',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var authConfig = {
    baseUrl: "http://localhost:5000/api",
    loginUrl: '/users/login',
    tokenName: 'token',
    authHeader: 'Authorization',
    authToken: '',
    logoutRedirect: '#/home'
  };

  exports.default = authConfig;
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', './auth-config', 'regenerator-runtime'], function (exports, _environment, _authConfig, _regeneratorRuntime) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var _authConfig2 = _interopRequireDefault(_authConfig);

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  window.regeneratorRuntime = _regeneratorRuntime2.default;

  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig2.default);
    }).feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('modules/home',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/users', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _users, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _users.Users, _aureliaAuth.AuthService), _dec(_class = function () {
    function Home(router, users, auth) {
      _classCallCheck(this, Home);

      this.router = router;
      this.auth = auth;
      this.loginError = '';
      this.message = 'Home Message from Class Home';
      this.showLogin = true;
      this.users = users;
    }

    Home.prototype.login = function login() {
      var _this = this;

      return this.auth.login(this.email, this.password).then(function (response) {
        sessionStorage.setItem("user", JSON.stringify(response.user));
        _this.loginError = "";
        _this.router.navigate('list');
      }).catch(function (error) {
        console.log(error);
        _this.loginError = "Invalid credentials.";
      });
    };

    Home.prototype.showRegister = function showRegister() {
      this.user = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      };
      this.registerError = "";
      this.showLogin = false;
    };

    Home.prototype.save = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.users.save(this.user);

              case 2:
                serverResponse = _context.sent;

                if (!serverResponse.error) {
                  this.showLogin = true;
                } else {
                  this.registerError = "There was a problem registering the user.";
                }

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save() {
        return _ref.apply(this, arguments);
      }

      return save;
    }();

    return Home;
  }()) || _class);
});
define('modules/image',['exports', 'aurelia-framework', 'aurelia-router', 'aurelia-auth', '../resources/data/images'], function (exports, _aureliaFramework, _aureliaRouter, _aureliaAuth, _images) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.image = undefined;

	function _asyncToGenerator(fn) {
		return function () {
			var gen = fn.apply(this, arguments);
			return new Promise(function (resolve, reject) {
				function step(key, arg) {
					try {
						var info = gen[key](arg);
						var value = info.value;
					} catch (error) {
						reject(error);
						return;
					}

					if (info.done) {
						resolve(value);
					} else {
						return Promise.resolve(value).then(function (value) {
							step("next", value);
						}, function (err) {
							step("throw", err);
						});
					}
				}

				return step("next");
			});
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var image = exports.image = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _images.Images, _aureliaAuth.AuthService), _dec(_class = function () {
		function image(router, images, auth) {
			_classCallCheck(this, image);

			this.router = router;
			this.images = images;
			this.auth = auth;
			this.message = 'Image List';
			this.user = JSON.parse(sessionStorage.getItem('user'));
			this.showList = true;
			this.showForm = false;
			this.title = "Rafa Has Some Images!";
			this.editTodoForm = false;
			this.showCompleted = false;
		}

		image.prototype.activate = function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(gallery) {
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return this.images.getGalleryImages(JSON.parse(sessionStorage.getItem('gallery'))._id);

							case 2:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function activate(_x) {
				return _ref.apply(this, arguments);
			}

			return activate;
		}();

		image.prototype.logout = function logout() {
			sessionStorage.removeItem('user');
			this.auth.logout();
		};

		image.prototype.createImage = function createImage() {
			this.imageObj = {
				galleryId: JSON.parse(sessionStorage.getItem('gallery'))._id

			};
			this.showList = false;
			this.showForm = true;
		};

		image.prototype.saveImage = function () {
			var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
				var response, galleryId, imageId;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								if (!this.imageObj) {
									_context2.next = 16;
									break;
								}

								_context2.next = 3;
								return this.images.save(this.imageObj);

							case 3:
								response = _context2.sent;

								if (!response.error) {
									_context2.next = 8;
									break;
								}

								alert("There was an error creating the Image");
								_context2.next = 14;
								break;

							case 8:
								galleryId = JSON.parse(sessionStorage.getItem('gallery'))._id;
								imageId = response._id;

								if (!(this.filesToUpload && this.filesToUpload.length)) {
									_context2.next = 14;
									break;
								}

								_context2.next = 13;
								return this.images.uploadFile(this.filesToUpload, galleryId, imageId);

							case 13:
								this.filesToUpload = [];

							case 14:
								this.showList = true;
								this.showForm = false;

							case 16:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function saveImage() {
				return _ref2.apply(this, arguments);
			}

			return saveImage;
		}();

		image.prototype.backToList = function backToList() {
			this.router.navigate('list');
		};

		image.prototype.back = function back() {
			this.showList = true;
			this.showForm = false;
		};

		image.prototype.editImage = function editImage(image) {
			this.imageObj = image;
			this.showList = false;
			this.showForm = true;
		};

		image.prototype.deleteImage = function deleteImage(image) {
			this.images.deleteImage(image._id);
		};

		image.prototype.changeFiles = function changeFiles() {
			this.filesToUpload = new Array();
			this.filesToUpload.push(this.files[0]);
		};

		image.prototype.removeFile = function removeFile(index) {
			this.filesToUpload.splice(index, 1);
		};

		return image;
	}()) || _class);
});
define('modules/list',['exports', 'aurelia-framework', 'aurelia-router', 'aurelia-auth', '../resources/data/galleries'], function (exports, _aureliaFramework, _aureliaRouter, _aureliaAuth, _galleries) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.List = undefined;

	function _asyncToGenerator(fn) {
		return function () {
			var gen = fn.apply(this, arguments);
			return new Promise(function (resolve, reject) {
				function step(key, arg) {
					try {
						var info = gen[key](arg);
						var value = info.value;
					} catch (error) {
						reject(error);
						return;
					}

					if (info.done) {
						resolve(value);
					} else {
						return Promise.resolve(value).then(function (value) {
							step("next", value);
						}, function (err) {
							step("throw", err);
						});
					}
				}

				return step("next");
			});
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var List = exports.List = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _galleries.Galleries, _aureliaAuth.AuthService), _dec(_class = function () {
		function List(router, galleries, auth) {
			_classCallCheck(this, List);

			this.router = router;
			this.galleries = galleries;
			this.auth = auth;
			this.message = 'Welcome to the list of galleries';
			this.user = JSON.parse(sessionStorage.getItem('user'));
			this.showList = true;
			this.showForm = false;
			this.editTodoForm = false;
			this.showCompleted = false;
		}

		List.prototype.activate = function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return this.galleries.getUserGalleries(this.user._id);

							case 2:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function activate() {
				return _ref.apply(this, arguments);
			}

			return activate;
		}();

		List.prototype.logout = function logout() {
			sessionStorage.removeItem('user');
			this.auth.logout();
		};

		List.prototype.createGallery = function createGallery() {
			this.galleryObj = {
				gallery: "",
				description: "",
				userId: this.user._id
			};
			this.showList = false;
			this.showForm = true;
		};

		List.prototype.saveGallery = function () {
			var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
				var response;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								if (!this.galleryObj) {
									_context2.next = 7;
									break;
								}

								_context2.next = 3;
								return this.galleries.save(this.galleryObj);

							case 3:
								response = _context2.sent;

								if (response.error) {
									alert("There was an error creating the Gallery");
								} else {}
								this.showList = true;
								this.showForm = false;

							case 7:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function saveGallery() {
				return _ref2.apply(this, arguments);
			}

			return saveGallery;
		}();

		List.prototype.back = function back() {
			this.showList = true;
			this.showForm = false;
		};

		List.prototype.editGallery = function editGallery(gallery) {
			this.galleryObj = gallery;
			this.showList = false;
			this.showForm = true;
		};

		List.prototype.checkGallery = function checkGallery(gallery) {
			sessionStorage.setItem("gallery", JSON.stringify(gallery));
			this.router.navigate('image');
		};

		List.prototype.deleteGallery = function deleteGallery(gallery) {
			this.galleries.deleteGallery(gallery._id);
		};

		List.prototype.completeGallery = function completeGallery(gallery) {
			gallery.completed = !gallery.completed;
			this.galleryObj = gallery;
			this.saveGallery();
		};

		List.prototype.changeFiles = function changeFiles() {
			this.filesToUpload = new Array();
			this.filesToUpload.push(this.files[0]);
		};

		List.prototype.removeFile = function removeFile(index) {
			this.filesToUpload.splice(index, 1);
		};

		return List;
	}()) || _class);
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['./value-converters/date-format']);
    config.globalResources(['./value-converters/completed']);
  }
});
define('resources/data/data-services',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DataServices = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var DataServices = exports.DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
		function DataServices(http) {
			var _this = this;

			_classCallCheck(this, DataServices);

			this.httpClient = http;
			this.BASE_URL = "http://localhost:5000/api/";
			this.httpClient.configure(function (config) {
				config.withBaseUrl(_this.BASE_URL).withDefaults({
					credentials: 'same-origin',
					headers: {
						'Accept': 'application/json',
						'X-Requested-With': 'Fetch'
					}
				}).withInterceptor({
					request: function request(_request) {
						var authHeader = 'Bearer ' + localStorage.getItem('aurelia_token');
						_request.headers.append('Authorization', authHeader);
						console.log('Requesting ' + _request.method + ' ' + _request.url);
						return _request;
					},
					response: function response(_response) {
						console.log('Received ' + _response.status + ' ' + _response.url);
						return _response;
					}
				});
			});
		}

		DataServices.prototype.get = function get(url) {
			return this.httpClient.fetch(url).then(function (response) {
				return response.json();
			}).then(function (data) {
				return data;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.post = function post(content, url) {
			return this.httpClient.fetch(url, {
				method: 'post',
				body: (0, _aureliaFetchClient.json)(content)
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.put = function put(content, url) {
			return this.httpClient.fetch(url, {
				method: 'put',
				body: (0, _aureliaFetchClient.json)(content)
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.delete = function _delete(url) {
			return this.httpClient.fetch(url, {
				method: 'delete'
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.uploadFiles = function uploadFiles(files, url) {
			return this.httpClient.fetch(url, {
				method: 'post',
				body: files
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		return DataServices;
	}()) || _class);
});
define('resources/data/galleries',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Galleries = undefined;

	function _asyncToGenerator(fn) {
		return function () {
			var gen = fn.apply(this, arguments);
			return new Promise(function (resolve, reject) {
				function step(key, arg) {
					try {
						var info = gen[key](arg);
						var value = info.value;
					} catch (error) {
						reject(error);
						return;
					}

					if (info.done) {
						resolve(value);
					} else {
						return Promise.resolve(value).then(function (value) {
							step("next", value);
						}, function (err) {
							step("throw", err);
						});
					}
				}

				return step("next");
			});
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var Galleries = exports.Galleries = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
		function Galleries(data) {
			_classCallCheck(this, Galleries);

			this.data = data;
			this.GALLERY_SERVICE = 'galleries';
			this.galleriesArray = [];
		}

		Galleries.prototype.save = function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(gallery) {
				var serverResponse, _serverResponse;

				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								if (!gallery) {
									_context.next = 13;
									break;
								}

								if (gallery._id) {
									_context.next = 9;
									break;
								}

								_context.next = 4;
								return this.data.post(gallery, this.GALLERY_SERVICE);

							case 4:
								serverResponse = _context.sent;

								if (!serverResponse.error) {
									this.galleriesArray.push(serverResponse);
								}
								return _context.abrupt('return', serverResponse);

							case 9:
								_context.next = 11;
								return this.data.put(gallery, this.GALLERY_SERVICE + "/" + gallery._id);

							case 11:
								_serverResponse = _context.sent;
								return _context.abrupt('return', _serverResponse);

							case 13:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function save(_x) {
				return _ref.apply(this, arguments);
			}

			return save;
		}();

		Galleries.prototype.getUserGalleries = function () {
			var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id) {
				var response;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.next = 2;
								return this.data.get(this.GALLERY_SERVICE + "/user/" + id);

							case 2:
								response = _context2.sent;

								if (!response.error && !response.message) {
									this.galleriesArray = response;
								}

							case 4:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function getUserGalleries(_x2) {
				return _ref2.apply(this, arguments);
			}

			return getUserGalleries;
		}();

		Galleries.prototype.deleteGallery = function () {
			var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(id) {
				var response, i;
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								_context3.next = 2;
								return this.data.delete(this.GALLERY_SERVICE + "/" + id);

							case 2:
								response = _context3.sent;

								if (!response.error) {
									for (i = 0; i < this.galleriesArray.length; i++) {
										if (this.galleriesArray[i]._id === id) {
											this.galleriesArray.splice(i, 1);
										}
									}
								}

							case 4:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function deleteGallery(_x3) {
				return _ref3.apply(this, arguments);
			}

			return deleteGallery;
		}();

		return Galleries;
	}()) || _class);
});
define('resources/data/images',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Images = undefined;

	function _asyncToGenerator(fn) {
		return function () {
			var gen = fn.apply(this, arguments);
			return new Promise(function (resolve, reject) {
				function step(key, arg) {
					try {
						var info = gen[key](arg);
						var value = info.value;
					} catch (error) {
						reject(error);
						return;
					}

					if (info.done) {
						resolve(value);
					} else {
						return Promise.resolve(value).then(function (value) {
							step("next", value);
						}, function (err) {
							step("throw", err);
						});
					}
				}

				return step("next");
			});
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var Images = exports.Images = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
		function Images(data) {
			_classCallCheck(this, Images);

			this.data = data;
			this.IMAGE_SERVICE = 'images';
			this.imagesArray = [];
		}

		Images.prototype.save = function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(image) {
				var serverResponse, _serverResponse;

				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								if (!image) {
									_context.next = 13;
									break;
								}

								if (image._id) {
									_context.next = 9;
									break;
								}

								_context.next = 4;
								return this.data.post(image, this.IMAGE_SERVICE);

							case 4:
								serverResponse = _context.sent;

								if (!serverResponse.error) {
									this.imagesArray.push(serverResponse);
								}
								return _context.abrupt('return', serverResponse);

							case 9:
								_context.next = 11;
								return this.data.put(image, this.IMAGE_SERVICE + "/" + image._id);

							case 11:
								_serverResponse = _context.sent;
								return _context.abrupt('return', _serverResponse);

							case 13:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function save(_x) {
				return _ref.apply(this, arguments);
			}

			return save;
		}();

		Images.prototype.uploadFile = function () {
			var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(files, galleryId, imageId) {
				var formData, response;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								formData = new FormData();

								files.forEach(function (item, index) {
									formData.append("file" + index, item);
								});

								_context2.next = 4;
								return this.data.uploadFiles(formData, this.IMAGE_SERVICE + "/upload/" + galleryId + "/" + imageId);

							case 4:
								response = _context2.sent;

								console.log("this is being called " + this.IMAGE_SERVICE + "/upload/" + galleryId + "/" + imageId);
								return _context2.abrupt('return', response);

							case 7:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function uploadFile(_x2, _x3, _x4) {
				return _ref2.apply(this, arguments);
			}

			return uploadFile;
		}();

		Images.prototype.getGalleryImages = function () {
			var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(id) {
				var response;
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								_context3.next = 2;
								return this.data.get(this.IMAGE_SERVICE + "/gallery/" + id);

							case 2:
								response = _context3.sent;

								if (!response.error && !response.message) {
									this.imagesArray = response;
								}

							case 4:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function getGalleryImages(_x5) {
				return _ref3.apply(this, arguments);
			}

			return getGalleryImages;
		}();

		Images.prototype.deleteImage = function () {
			var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(id) {
				var response, i;
				return regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								_context4.next = 2;
								return this.data.delete(this.IMAGE_SERVICE + "/" + id);

							case 2:
								response = _context4.sent;

								if (!response.error) {
									for (i = 0; i < this.imagesArray.length; i++) {
										if (this.imagesArray[i]._id === id) {
											this.imagesArray.splice(i, 1);
										}
									}
								}

							case 4:
							case 'end':
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function deleteImage(_x6) {
				return _ref4.apply(this, arguments);
			}

			return deleteImage;
		}();

		return Images;
	}()) || _class);
});
define('resources/data/users',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Users = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function Users(data) {
            _classCallCheck(this, Users);

            this.data = data;
            this.USER_SERVICE = 'users';
        }

        Users.prototype.save = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(user) {
                var serverResponse;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!user) {
                                    _context.next = 5;
                                    break;
                                }

                                _context.next = 3;
                                return this.data.post(user, this.USER_SERVICE);

                            case 3:
                                serverResponse = _context.sent;
                                return _context.abrupt('return', serverResponse);

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function save(_x) {
                return _ref.apply(this, arguments);
            }

            return save;
        }();

        return Users;
    }()) || _class);
});
define('resources/elements/flatpickr',[], function () {
  "use strict";
});
define('resources/value-converters/completed',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var CompletedValueConverter = exports.CompletedValueConverter = function () {
    function CompletedValueConverter() {
      _classCallCheck(this, CompletedValueConverter);
    }

    CompletedValueConverter.prototype.toView = function toView(array, value) {
      if (!value) {
        return array.filter(function (item) {
          return !item.completed;
        });
      } else {
        return array;
      }
    };

    return CompletedValueConverter;
  }();
});
define('resources/value-converters/date-format',['exports', 'moment'], function (exports, _moment) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DateFormatValueConverter = undefined;

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var DateFormatValueConverter = exports.DateFormatValueConverter = function () {
		function DateFormatValueConverter() {
			_classCallCheck(this, DateFormatValueConverter);
		}

		DateFormatValueConverter.prototype.toView = function toView(value) {
			if (value === undefined || value === null) {
				return;
			}

			return (0, _moment2.default)(value).format('MMM Do YYYY');
		};

		return DateFormatValueConverter;
	}();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"resources/css/styles.css\"></require><router-view></router-view></template>"; });
define('text!resources/css/styles.css', ['module'], function(module) { module.exports = "/*.rightMargin {\r\n margin-right: 10px;\r\n}\r\n.leftMargin {margin-right: 10px;}\r\n.centerMargin {margin-right: 10px;} */\r\n\r\n@charset \"UTF-8\";\r\n/* CSS Document */\r\n\r\n\r\n  .left {\r\n    float: left;\r\n}\r\n\r\n.right {\r\n    float: right;\r\n}\r\n\r\n.wrapper {\r\n    width: 500px;\r\n    margin: auto;\r\n    padding: auto;\r\n    overflow: auto;\r\n}\r\n\r\n.textcolor {color: #ff0000}\r\n\r\n.btn-login {background-color: #990099} \r\n.btn-login {color: #ffffff}\r\n\r\n\r\n\r\n\r\n"; });
define('text!modules/home.html', ['module'], function(module) { module.exports = "<template><style>body{background-color:#fcf}</style><center><link href=\"../../resources/css/styles.css\" rel=\"stylesheet\"><div class=\"container\">      <compose show.bind=\"showLogin\" view=\"./components/login.html\"></compose>    <compose show.bind=\"!showLogin\" view=\"./components/register.html\"></compose></div></center></template>"; });
define('text!modules/image.html', ['module'], function(module) { module.exports = "<template><style>body{background-color:#fcf}</style><center><h1 style=\"font-family:Impact,Charcoal,sans-serif\">${message} </h1></center>    <compose show.bind=\"showList\" show.bind=\"!showForm\" view=\"./components/imageList.html\"></compose>    <compose show.bind=\"!showList\" show.bind=\"showForm\" view=\"./components/imageForm.html\"></compose></template>"; });
define('text!modules/list.html', ['module'], function(module) { module.exports = "<template><style>body{background-color:#fcf}</style>    <compose show.bind=\"showList\" show.bind=\"!showForm\" view=\"./components/galleryList.html\"></compose>    <compose show.bind=\"!showList\" show.bind=\"showForm\" view=\"./components/galleryForm.html\"></compose></template>"; });
define('text!modules/components/galleryForm.html', ['module'], function(module) { module.exports = "<template><button type=\"button\" class=\"btn btn-login\" click.trigger=\"back()\">BACK</button><br><br><form><center><div class=\"col-lg-3 col-lg-offset-5\"><label for=\"galleryInput\">Gallery *</label><input value.bind=\"galleryObj.gallery\" type=\"text\" class=\"form-control\" id=\"galleryInput\" aria-describedby=\"galleryHelp\" placeholder=\"Enter Gallery\"> <small id=\"galleryHelp\" class=\"form-text text-muted\">A short name for the gallery.</small></div></center><center>        <div class=\"col-lg-3 col-lg-offset-5\">            <label for=\"descriptionInput\">Description</label>            <textarea value.bind=\"galleryObj.description\" type=\"text\" class=\"form-control\" id=\"descriptionInput\" aria-describedby=\"descriptionHelp\" placeholder=\"Enter Description\"></textarea>            <small id=\"descriptionHelp\" class=\"form-text text-muted\">A longer description if required.</small>         </div></center>        <button click.trigger=\"saveGallery()\" class=\"btn btn-login\">Save</button>     </form></template>"; });
define('text!modules/components/galleryList.html', ['module'], function(module) { module.exports = "<template><center><h2 style=\"font-family:Impact,Charcoal,sans-serif\">Welcome to ${user.firstName}'s Galleries!</h2></center>    <div class=\"card topMargin\">        <div class=\"card-body\">            <div class=\"row\">                <span class=\"col\">     </span><span class=\"col\"><span class=\"rightMargin pull-right\"><button type=\"button\" class=\"btn btn-login\" click.trigger=\"createGallery()\">Create a Gallery</button> <button type=\"button\" class=\"btn btn-login\" click.trigger=\"logout()\">Logout</button> </span></span>            </div><div show.bind=\"galleries.galleriesArray.length\"><table class=\"table\"><thead><tr><th>Gallery</th> <th>Edit</th></tr></thead><tbody><tr repeat.for=\"gallery of galleries.galleriesArray\"><th click.trigger=\"checkGallery(gallery)\">${gallery.gallery}</th><td>             <i click.trigger=\"editGallery(gallery)\" class=\"fa fa-pencil rightMargin\" aria-hidden=\"true\"></i> <i click.trigger=\"deleteGallery(gallery)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\"></i>          </td></tr></tbody></table></div><center><div show.bind=\"!galleries.galleriesArray.length\"><h2 style=\"font-family:Impact,Charcoal,sans-serif\">Looks like you currently do not have any gallaries...</h2></div></center></div>        </div>    </template>"; });
define('text!modules/components/imageForm.html', ['module'], function(module) { module.exports = "<template><button type=\"button\" class=\"btn btn-login\" click.trigger=\"back()\">BACK</button><br><br><form>            <center><div class=\"row\"><div class=\"col-lg-3 col-lg-offset-5\"><label class=\"btn btn-secondary\">Browse Image <input type=\"file\" style=\"display:none\" change.delegate=\"changeFiles()\" files.bind=\"files\"></label><small id=\"fileHelp\" class=\"form-text text-muted\">Upload Image.</small></div><div class=\"col-8\"><ul><li repeat.for=\"file of filesToUpload\" class=\"list-group-item\"> ${file.name}<span click.delegate=\"removeFile($index)\" class=\"pull-right\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span></li></ul></div></div></center>        <button click.trigger=\"saveImage()\" class=\"btn btn-login\">Save</button>     </form></template>"; });
define('text!modules/components/imageList.html', ['module'], function(module) { module.exports = "<template><button type=\"button\" class=\"btn btn-login\" click.trigger=\"backToList()\">BACK</button><br><br>    <div class=\"card topMargin\">        <div class=\"card-body\">            <div class=\"row\">                <span class=\"col\"></span> <span class=\"col\"><span class=\"rightMargin pull-right\"><button type=\"button\" class=\"btn btn-login\" click.trigger=\"createImage()\">Create Image</button> <button type=\"button\" class=\"btn btn-login\" click.trigger=\"logout()\">Logout</button> </span></span>               </div><div show.bind=\"images.imagesArray.length\"><table class=\"table\"><thead><tr><th>Image</th> <th>Edit</th></tr></thead><tbody><tr repeat.for=\"image of images.imagesArray\"><td><a href=\"uploads/${image.galleryId}/${image.file.fileName}\" target=\"_blank\"><img src=\"uploads/${image.galleryId}/${image.file.fileName}\" style=\"width:50px;height:50px\"></a></td><td>             <i click.trigger=\"editImage(image)\" class=\"fa fa-pencil rightMargin\" aria-hidden=\"true\"></i> <i click.trigger=\"deleteImage(image)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\"></i>  </td></tr></tbody></table></div><div show.bind=\"!images.imagesArray.length\"><h2 style=\"font-family:Impact,Charcoal,sans-serif\">Looks like you currently do not have any Images...</h2></div>        </div>    </div></template>"; });
define('text!modules/components/login.html', ['module'], function(module) { module.exports = "<template><link href=\"../../resources/css/styles.css\" rel=\"stylesheet\">    <center>    <h1>Welcome to MyPics</h1><p>Please sign in to access your MyPics Gallaries</p></center><div class=\"form-group col\"><div class=\"col-lg-3 col-lg-offset-5\"><label for=\"email\"></label>Email<input value.bind=\"email\" type=\"email\" class=\"form-control\" id=\"email\" placeholder=\"Email\"><label for=\"password\">Password</label><input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\"><br><button type=\"button\" class=\"btn btn-login\" click.trigger=\"login()\">Login</button> <button type=\"button\" class=\"btn btn-link\" click.trigger=\"showRegister()\">Register</button><br><br><div id=\"errorMsg\" class=\"textcolor\" innerhtml.bind=\"loginError\"></div></div></div></template>"; });
define('text!modules/components/register.html', ['module'], function(module) { module.exports = "<template><center><p>Please fill out the appropriate information to register:</p></center><div id=\"errorMsg\" innerhtml.bind=\"registerError\"></div><center><center>First Name: <input value.bind=\"user.firstName\" class=\"col-lg-3 col-lg-offset-5\" id=\"firstName\" placeholder=\"First Name\"><br><br>Last Name: <input value.bind=\"user.lastName\" class=\"col-lg-3 col-lg-offset-5\" id=\"lastName\" placeholder=\"Last Name\"><br><br>Email: <input value.bind=\"user.email\" type=\"email\" class=\"col-lg-3 col-lg-offset-5\" id=\"email\" placeholder=\"Email\"><br><br>Password: <input value.bind=\"user.password\" type=\"password\" class=\"col-lg-3 col-lg-offset-5\" id=\"password\" placeholder=\"Password\"><br><br><button type=\"button\" class=\"btn btn-login\" click.trigger=\"save()\">Register</button>   </center></center></template>"; });
define('text!resources/elements/flatpickr.html', ['module'], function(module) { module.exports = ""; });
//# sourceMappingURL=app-bundle.js.map