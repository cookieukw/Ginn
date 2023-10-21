(function() {
  var BinaryTree, constructor,
    __slice = [].slice;

  BinaryTree = constructor = function(userGetNode, userSetLeft, userSetRight, userSetNode, userGetRoot, userSetRoot, duplicating, merging, debug) {
    var assert, attach, binaryTree, detach, duplicatingDirection, getNode, getRoot, instance, safeAttach, safeDetach, safeSearch, search, setLeft, setNode, setRight, setRoot, unsafeAttach, unsafeAttachDuplicates, unsafeAttachDuplicatesOn, unsafeCorner, unsafeDetach, unsafeDetachChange, unsafeDetachResult, unsafeDouble, unsafeDoubleHandler, unsafeDoubleTravel, unsafeMerge, unsafeMergeAction, unsafeSearch, unsafeSearchAction, unsafeTravel, valid;
    binaryTree = instance = this;
    instance.is = valid = {
      array: function(argument) {
        return Object.prototype.toString.call(argument) === "[object Array]";
      },
      boolean: function(argument) {
        return typeof argument === "boolean";
      },
      "function": function(argument) {
        return typeof argument === "function";
      },
      direction: function(argument) {
        return argument === 1 || argument === 2;
      },
      merging: function(argument) {
        return valid.direction(argument);
      },
      duplicating: function(argument) {
        return argument === 0 || argument === 1 || argument === 2;
      },
      key: function(argument) {
        return typeof argument === "number";
      },
      address: function(argument) {
        var _ref;
        return (_ref = typeof argument) === "string" || _ref === "number";
      },
      link: function(argument) {
        return valid.address(argument) || argument === null;
      },
      node: function(argument) {
        return valid.array(argument) && argument.length === 4 && valid.address(argument[0]) && valid.key(argument[1]) && valid.link(argument[2]) && valid.link(argument[3]);
      },
      cursor: function(argument) {
        return argument === null || valid.address(argument) || valid.node(argument);
      },
      pointer: function(argument) {
        return argument === null || valid.node(argument);
      },
      nodeOrAddress: function(argument) {
        return valid.address(argument) || valid.node(argument);
      }
    };
    instance.assert = assert = {};
    (function() {
      var create, key, method, _results;
      create = debug ? function(key, method) {
        return assert[key] = function(argument) {
          if (!method(argument)) {
            throw new Error(key + " " + argument);
          }
        };
      } : function(key) {
        return assert[key] = function() {};
      };
      _results = [];
      for (key in valid) {
        method = valid[key];
        _results.push(create(key, method));
      }
      return _results;
    })();
    assert.duplicating(duplicating);
    assert.merging(merging);
    assert.boolean(debug);
    instance.user = {};
    if (debug) {
      instance.user.getNode = getNode = function(address, callback) {
        assert.address(address);
        return userGetNode(address, function(node) {
          assert.node(node);
          return callback(node);
        });
      };
      instance.user.setLeft = setLeft = function(address, link, callback) {
        assert.address(address);
        assert.link(link);
        return userSetLeft(address, link, function(node) {
          assert.node(node);
          return callback(node);
        });
      };
      instance.user.setRight = setRight = function(address, link, callback) {
        assert.address(address);
        assert.link(link);
        return userSetRight(address, link, function(node) {
          assert.node(node);
          return callback(node);
        });
      };
      instance.user.setNode = setNode = function(address, left, right, callback) {
        assert.address(address);
        assert.link(left);
        assert.link(right);
        return userSetNode(address, left, right, function(node) {
          assert.node(node);
          return callback(node);
        });
      };
      instance.user.getRoot = getRoot = function(callback) {
        return userGetRoot(function(root) {
          assert.link(root);
          return callback(root);
        });
      };
      instance.user.setRoot = setRoot = function(link, callback) {
        assert.link(link);
        return userSetRoot(link, function(root) {
          assert.link(root);
          return callback(root);
        });
      };
    } else {
      instance.user.getNode = getNode = userGetNode;
      instance.user.setLeft = setLeft = userSetLeft;
      instance.user.setRight = setRight = userSetRight;
      instance.user.setNode = setNode = userSetNode;
      instance.user.getRoot = getRoot = userGetRoot;
      instance.user.setRoot = setRoot = userSetRoot;
    }
    instance.unsafe = {};
    instance.unsafe.travel = unsafeTravel = function(node, handler) {
      var action;
      assert.node(node);
      assert["function"](handler);
      action = function(node) {
        return handler(node, function(node) {
          assert.node(node);
          return action(node);
        });
      };
      return action(node);
    };
    duplicatingDirection = duplicating + 1;
    instance.unsafe.double = unsafeDouble = function(node, handler) {
      assert.node(node);
      assert["function"](handler);
      return unsafeDoubleTravel(node, handler);
    };
    unsafeDoubleTravel = duplicating === 0 ? function(node, handler) {
      return handler(node, null);
    } : function(node, handler) {
      return unsafeTravel(node, unsafeDoubleHandler(node, handler));
    };
    unsafeDoubleHandler = function(first, handler) {
      return function(node, next) {
        if (node[duplicatingDirection] != null) {
          return getNode(node[duplicatingDirection], function(duplicate) {
            if (duplicate[1] === first[1]) {
              return handler(node, function() {
                return next(duplicate);
              });
            } else {
              return handler(node, null);
            }
          });
        } else {
          return handler(node, null);
        }
      };
    };
    instance.unsafe.corner = unsafeCorner = function(node, direction, handler) {
      var direct;
      assert.node(node);
      assert.direction(direction);
      assert["function"](handler);
      direct = direction + 1;
      return unsafeTravel(node, function(nodeT, nextT) {
        return unsafeDouble(nodeT, function(nodeD, nextD) {
          if (nextD != null) {
            return handler(nodeD, function() {
              return nextD();
            });
          } else if (nodeD[direct] != null) {
            return handler(nodeD, function() {
              return getNode(nodeD[direct], nextT);
            });
          } else {
            return handler(nodeD, null);
          }
        });
      });
    };
    instance.unsafe.search = unsafeSearch = function(source, target, handler) {
      assert.cursor(source);
      assert.node(target);
      assert["function"](handler);
      if (source === null) {
        return handler(null, null);
      } else {
        if (valid.address(source)) {
          return getNode(source, function(source) {
            return unsafeSearchAction(source, target, handler);
          });
        } else {
          return unsafeSearchAction(source, target, handler);
        }
      }
    };
    unsafeSearchAction = function(source, target, handler) {
      return unsafeTravel(source, function(nodeT, nextT) {
        return unsafeDouble(nodeT, function(nodeD, nextD) {
          if (nodeD[0] === target[0]) {
            return handler(nodeD, null);
          } else if (nextD != null) {
            return handler(nodeD, function() {
              return nextD();
            });
          } else if (nodeD[1] > target[1]) {
            if (nodeD[2] != null) {
              return handler(nodeD, function() {
                return getNode(nodeD[2], nextT);
              });
            } else {
              return handler(nodeD, null);
            }
          } else if (nodeD[1] < target[1]) {
            if (nodeD[3] != null) {
              return handler(nodeD, function() {
                return getNode(nodeD[3], nextT);
              });
            } else {
              return handler(nodeD, null);
            }
          } else {
            return handler(nodeD, null);
          }
        });
      });
    };
    instance.unsafe.attach = unsafeAttach = function(source, target, handler) {
      assert.pointer(source);
      assert.node(target);
      assert["function"](handler);
      if (source === null) {
        return handler(source, function() {
          return setRoot(target[0], function(root) {
            return handler(root, function() {
              return handler(target, null);
            });
          });
        });
      } else if (source[1] === target[1]) {
        return unsafeAttachDuplicates(source, target, handler);
      } else if (source[1] > target[1]) {
        return handler(source, function() {
          return setLeft(source[0], target[0], function(node) {
            return handler(node, function() {
              return handler(target, null);
            });
          });
        });
      } else if (source[1] < target[1]) {
        return handler(source, function() {
          return setRight(source[0], target[0], function(node) {
            return handler(node, function() {
              return handler(target, null);
            });
          });
        });
      } else {
        throw new Error("unexpected");
      }
    };
    unsafeAttachDuplicates = duplicating === 0 ? function(source, target, handler) {
      return handler(source, null);
    } : duplicating === 1 ? function(source, target, handler) {
      return unsafeAttachDuplicatesOn(source, target, handler, setLeft, setLeft, setRight);
    } : duplicating === 2 ? function(source, target, handler) {
      return unsafeAttachDuplicatesOn(source, target, handler, setRight, setRight, setLeft);
    } : void 0;
    unsafeAttachDuplicatesOn = function() {
      var handler, methods, source, target;
      source = arguments[0], target = arguments[1], handler = arguments[2], methods = 4 <= arguments.length ? __slice.call(arguments, 3) : [];
      return handler(source, function() {
        if ((source[2] == null) && (source[3] == null)) {
          return methods[0](source[0], target[0], function(source) {
            return handler(source, function() {
              return handler(target, null);
            });
          });
        } else {
          return methods[1](source[0], target[0], function() {
            return methods[2](source[0], null, function(newSource) {
              return handler(newSource, function() {
                return handler(target, function() {
                  return setNode(target[0], source[2], source[3], function(target) {
                    return handler(target, null);
                  });
                });
              });
            });
          });
        }
      });
    };
    instance.unsafe.merge = unsafeMerge = function(left, right, handler) {
      assert.node(left);
      assert.node(right);
      assert["function"](handler);
      return unsafeMergeAction(left, right, handler);
    };
    unsafeMergeAction = merging === 1 ? function(left, right, handler) {
      return unsafeCorner(left, 2, function(node, next) {
        if (next != null) {
          return handler(node, next);
        } else {
          return handler(node, function() {
            return setRight(node[0], right[0], function(last) {
              if (last[0] === left[0]) {
                return handler(last, null);
              } else {
                return handler(last, function() {
                  return handler(left, null);
                });
              }
            });
          });
        }
      });
    } : merging === 2 ? function(left, right, handler) {
      return unsafeCorner(right, 1, function(node, next) {
        if (next != null) {
          return handler(node, next);
        } else {
          return handler(node, function() {
            return setLeft(node[0], left[0], function(last) {
              if (last[0] === right[0]) {
                return handler(last, null);
              } else {
                return handler(last, function() {
                  return handler(right, null);
                });
              }
            });
          });
        }
      });
    } : void 0;
    instance.unsafe.detach = unsafeDetach = function(source, target, handler) {
      assert.cursor(source);
      assert.node(target);
      assert["function"](handler);
      if (source === null) {
        return handler(target, function() {
          return handler(source, null);
        });
      } else if (valid.address(source)) {
        return handler(target, function() {
          return unsafeDetachResult(target, handler, function(result) {
            return handler(source, function() {
              return setRoot(result, function(root) {
                return handler(root, null);
              });
            });
          });
        });
      } else if (source[1] === target[1]) {
        return handler(target, function() {
          return setLeft(target[0], null, function() {
            return setRight(target[0], null, function(newTarget) {
              return handler(newTarget, function() {
                return handler(source, function() {
                  return setLeft(source[0], target[2], function() {
                    return setRight(source[0], target[3], function(source) {
                      return handler(source, null);
                    });
                  });
                });
              });
            });
          });
        });
      } else {
        return handler(target, function() {
          return unsafeDetachResult(target, handler, function(result) {
            return handler(source, function() {
              if (source[2] === target[0]) {
                return unsafeDetachChange(setLeft, source, target, result, handler);
              } else if (source[3] === target[0]) {
                return unsafeDetachChange(setRight, source, target, result, handler);
              }
            });
          });
        });
      }
    };
    unsafeDetachResult = function(target, handler, callback) {
      if ((target[2] == null) && (target[3] == null)) {
        return callback(null);
      } else if ((target[2] != null) && (target[3] == null)) {
        return setLeft(target[0], null, function(newTarget) {
          return handler(newTarget, function() {
            return callback(target[2]);
          });
        });
      } else if ((target[2] == null) && (target[3] != null)) {
        return setRight(target[0], null, function(newTarget) {
          return handler(newTarget, function() {
            return callback(target[3]);
          });
        });
      } else if ((target[2] != null) && (target[3] != null)) {
        return getNode(target[2], function(left) {
          return getNode(target[3], function(right) {
            return setNode(target[0], null, null, function(target) {
              return handler(target, function() {
                return unsafeMerge(left, right, function(node, next) {
                  return handler(node, function() {
                    if (next != null) {
                      return next();
                    } else {
                      return callback(node[0]);
                    }
                  });
                });
              });
            });
          });
        });
      }
    };
    unsafeDetachChange = function(method, source, target, result, handler) {
      return method(source[0], result, function(source) {
        return handler(source, null);
      });
    };
    instance.safe = {};
    instance.safe.search = safeSearch = function(target, handler) {
      assert.node(target);
      assert["function"](handler);
      return getRoot(function(root) {
        if (root != null) {
          return getNode(root, function(root) {
            return unsafeSearch(root, target, handler);
          });
        } else {
          return handler(null, null);
        }
      });
    };
    instance.safe.attach = safeAttach = function(target, handler) {
      assert.node(target);
      assert["function"](handler);
      return getRoot(function(root) {
        if (root != null) {
          return getNode(root, function(root) {
            return unsafeSearch(root, target, function(node, next) {
              if (next != null) {
                return handler(node, next);
              } else {
                return unsafeAttach(node, target, handler);
              }
            });
          });
        } else {
          return unsafeAttach(root, target, handler);
        }
      });
    };
    instance.safe.detach = safeDetach = function(target, handler) {
      assert.node(target);
      assert["function"](handler);
      return getRoot(function(root) {
        if (root == null) {
          return handler(null, null);
        } else if (root === target[0]) {
          return unsafeDetach(root, target, handler);
        } else {
          return getNode(root, function(root) {
            var last;
            last = null;
            return unsafeSearch(root, target, function(node, next) {
              if (next != null) {
                last = node;
                return handler(node, next);
              } else if (node[0] === target[0]) {
                return unsafeDetach(last, node, handler);
              }
            });
          });
        }
      });
    };
    instance.search = search = function(target, handler) {
      assert.address(target);
      assert["function"](handler);
      return getNode(target, function(target) {
        return safeSearch(target, handler);
      });
    };
    instance.attach = attach = function(target, handler) {
      assert.address(target);
      assert["function"](handler);
      return getNode(target, function(target) {
        return safeAttach(target, handler);
      });
    };
    instance.detach = detach = function(target, handler) {
      assert.address(target);
      assert["function"](handler);
      return getNode(target, function(target) {
        return safeDetach(target, handler);
      });
    };
    return instance;
  };

  if (typeof global !== 'undefined') {
    module.exports = constructor;
  } else if (typeof window !== 'undefined') {
    define(['module'], function(module) {
      return module.exports = constructor;
    });
  }

}).call(this);
