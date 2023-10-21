(function() {
  var BinaryTree, assert, construct, equal, vows,
    __slice = [].slice;

  vows = require("vows");

  assert = require("assert");

  require("coffee-script");

  BinaryTree = null;

  construct = function(nodes, root, duplicating, merging) {
    var getNode, getRoot, setLeft, setNode, setRight, setRoot;
    if (nodes == null) {
      nodes = {};
    }
    if (root == null) {
      root = null;
    }
    if (duplicating == null) {
      duplicating = 0;
    }
    if (merging == null) {
      merging = 1;
    }
    getNode = (function(_this) {
      return function(address, callback) {
        return callback([address].concat(__slice.call(nodes[address])));
      };
    })(this);
    setLeft = (function(_this) {
      return function(address, link, callback) {
        nodes[address][1] = link;
        return callback([address].concat(__slice.call(nodes[address])));
      };
    })(this);
    setRight = (function(_this) {
      return function(address, link, callback) {
        nodes[address][2] = link;
        return callback([address].concat(__slice.call(nodes[address])));
      };
    })(this);
    setNode = (function(_this) {
      return function(address, left, right, callback) {
        nodes[address][1] = left;
        nodes[address][2] = right;
        return callback([address].concat(__slice.call(nodes[address])));
      };
    })(this);
    getRoot = (function(_this) {
      return function(callback) {
        return callback(root);
      };
    })(this);
    setRoot = (function(_this) {
      return function(link, callback) {
        return callback(root = link);
      };
    })(this);
    return new BinaryTree(getNode, setLeft, setRight, setNode, getRoot, setRoot, duplicating, merging, true);
  };

  equal = function() {
    return assert.deepEqual.apply(assert, arguments);
  };

  vows.describe("BinaryTree").addBatch({
    "module": {
      "source": function() {
        return BinaryTree = require("./BinaryTree.js");
      },
      "directory": function() {
        return require("./");
      }
    },
    "constructor": {
      "is function": function() {
        return assert.isFunction(BinaryTree);
      }
    },
    "instance": {
      "is object": function() {
        return assert.isObject(construct());
      },
      "unsafe": {
        "is object": function() {
          var instance;
          instance = construct();
          return assert.isObject(instance.unsafe);
        },
        "travel": {
          "traveling": function() {
            var counter, instance;
            instance = construct({
              0: [1, null, 1],
              1: [3, 2, null],
              2: [2, null, null]
            }, null, 0, 1);
            counter = 0;
            instance.unsafe.travel([0, 1, null, 1], function(node, next) {
              counter++;
              if (counter === 1) {
                equal(node, [0, 1, null, 1]);
              }
              if (counter === 2) {
                equal(node, [1, 3, 2, null]);
              }
              if (counter === 3) {
                equal(node, [2, 2, null, null]);
              }
              if (counter === 1) {
                return next([1, 3, 2, null]);
              } else if (counter === 2) {
                return next([2, 2, null, null]);
              }
            });
            return equal(counter, 3);
          }
        },
        "double": {
          "without duplicating": {
            "without duplicates": function() {
              var counter, instance;
              instance = construct({
                0: [1, null, 1],
                1: [2, null, null]
              }, null, 0, 1);
              counter = 0;
              instance.unsafe.double([0, 1, null, 1], function(node, next) {
                counter++;
                if (counter === 1) {
                  equal(node, [0, 1, null, 1]);
                }
                if (next != null) {
                  return next();
                }
              });
              return equal(counter, 1);
            },
            "with duplicates": function() {
              var counter, instance;
              instance = construct({
                0: [1, null, 1],
                1: [1, null, null]
              }, null, 0, 1);
              counter = 0;
              instance.unsafe.double([0, 1, null, 1], function(node, next) {
                counter++;
                if (counter === 1) {
                  equal(node, [0, 1, null, 1]);
                }
                if (next != null) {
                  return next();
                }
              });
              return equal(counter, 1);
            }
          },
          "duplicating left": {
            "left duplicates": function() {
              var counter, instance;
              instance = construct({
                0: [1, 1, null],
                1: [1, null, null]
              }, null, 1, 1);
              counter = 0;
              instance.unsafe.double([0, 1, 1, null], function(node, next) {
                counter++;
                if (counter === 1) {
                  equal(node, [0, 1, 1, null]);
                }
                if (counter === 2) {
                  equal(node, [1, 1, null, null]);
                }
                if (next != null) {
                  return next();
                }
              });
              return equal(counter, 2);
            },
            "right duplicates": function() {
              var counter, instance;
              instance = construct({
                0: [1, null, 1],
                1: [1, null, null]
              }, null, 1, 1);
              counter = 0;
              instance.unsafe.double([0, 1, null, 1], function(node, next) {
                counter++;
                if (counter === 1) {
                  equal(node, [0, 1, null, 1]);
                }
                if (next != null) {
                  return next();
                }
              });
              return equal(counter, 1);
            }
          },
          "duplicating right": {
            "left duplicates": function() {
              var counter, instance;
              instance = construct({
                0: [1, 1, null],
                1: [1, null, null]
              }, null, 2, 1);
              counter = 0;
              instance.unsafe.double([0, 1, 1, null], function(node, next) {
                counter++;
                if (counter === 1) {
                  equal(node, [0, 1, 1, null]);
                }
                if (next != null) {
                  return next();
                }
              });
              return equal(counter, 1);
            },
            "right duplicates": function() {
              var counter, instance;
              instance = construct({
                0: [1, null, 1],
                1: [1, null, null]
              }, null, 2, 1);
              counter = 0;
              instance.unsafe.double([0, 1, null, 1], function(node, next) {
                counter++;
                if (counter === 1) {
                  equal(node, [0, 1, null, 1]);
                }
                if (counter === 2) {
                  equal(node, [1, 1, null, null]);
                }
                if (next != null) {
                  return next();
                }
              });
              return equal(counter, 2);
            }
          }
        },
        "corner": {
          "without duplicating": {
            "direction left": function() {
              var counter, instance;
              instance = construct({
                0: [3, 1, null],
                1: [2, 2, null],
                2: [1, null, null]
              }, null, 0, 1);
              counter = 0;
              instance.unsafe.corner([0, 3, 1, null], 1, function(node, next) {
                counter++;
                if (counter === 1) {
                  equal(node, [0, 3, 1, null]);
                }
                if (counter === 2) {
                  equal(node, [1, 2, 2, null]);
                }
                if (counter === 3) {
                  equal(node, [2, 1, null, null]);
                }
                if (next != null) {
                  return next();
                }
              });
              return equal(counter, 3);
            },
            "direction right": function() {
              var counter, instance;
              instance = construct({
                0: [1, null, 1],
                1: [2, null, 2],
                2: [3, null, null]
              }, null, 0, 1);
              counter = 0;
              instance.unsafe.corner([0, 1, null, 1], 2, function(node, next) {
                counter++;
                if (counter === 1) {
                  equal(node, [0, 1, null, 1]);
                }
                if (counter === 2) {
                  equal(node, [1, 2, null, 2]);
                }
                if (counter === 3) {
                  equal(node, [2, 3, null, null]);
                }
                if (next != null) {
                  return next();
                }
              });
              return equal(counter, 3);
            }
          },
          "duplicating left": {
            "direction left": function() {
              var counter, instance;
              instance = construct({
                0: [2, 1, null],
                1: [2, 2, null],
                2: [1, null, null]
              }, null, 1, 1);
              counter = 0;
              instance.unsafe.corner([0, 2, 1, null], 1, function(node, next) {
                counter++;
                if (counter === 1) {
                  equal(node, [0, 2, 1, null]);
                }
                if (counter === 2) {
                  equal(node, [1, 2, 2, null]);
                }
                if (counter === 3) {
                  equal(node, [2, 1, null, null]);
                }
                if (next != null) {
                  return next();
                }
              });
              return equal(counter, 3);
            },
            "direction right": function() {
              var counter, instance;
              instance = construct({
                0: [1, 1, null],
                1: [1, null, 2],
                2: [2, null, null]
              }, null, 1, 1);
              counter = 0;
              instance.unsafe.corner([0, 1, 1, null], 2, function(node, next) {
                counter++;
                if (counter === 1) {
                  equal(node, [0, 1, 1, null]);
                }
                if (counter === 2) {
                  equal(node, [1, 1, null, 2]);
                }
                if (counter === 3) {
                  equal(node, [2, 2, null, null]);
                }
                if (next != null) {
                  return next();
                }
              });
              return equal(counter, 3);
            }
          },
          "duplicating right": {
            "direction left": function() {
              var counter, instance;
              instance = construct({
                0: [2, null, 1],
                1: [2, 2, null],
                2: [1, null, null]
              }, null, 2, 1);
              counter = 0;
              instance.unsafe.corner([0, 2, null, 1], 1, function(node, next) {
                counter++;
                if (counter === 1) {
                  equal(node, [0, 2, null, 1]);
                }
                if (counter === 2) {
                  equal(node, [1, 2, 2, null]);
                }
                if (counter === 3) {
                  equal(node, [2, 1, null, null]);
                }
                if (next != null) {
                  return next();
                }
              });
              return equal(counter, 3);
            },
            "direction right": function() {
              var counter, instance;
              instance = construct({
                0: [2, null, 1],
                1: [2, null, 2],
                2: [1, null, null]
              }, null, 2, 1);
              counter = 0;
              instance.unsafe.corner([0, 2, null, 1], 2, function(node, next) {
                counter++;
                if (counter === 1) {
                  equal(node, [0, 2, null, 1]);
                }
                if (counter === 2) {
                  equal(node, [1, 2, null, 2]);
                }
                if (counter === 3) {
                  equal(node, [2, 1, null, null]);
                }
                if (next != null) {
                  return next();
                }
              });
              return equal(counter, 3);
            }
          }
        },
        "search": {
          "without duplicating": {
            "from node to node": function() {
              var counter, instance;
              instance = construct({
                0: [3, 1, null],
                1: [1, null, 2],
                2: [2, null, null]
              }, null, 0, 1);
              counter = 0;
              instance.unsafe.search([0, 3, 1, null], [2, 2, null, null], function(node, next) {
                counter++;
                if (counter === 1) {
                  equal(node, [0, 3, 1, null]);
                }
                if (counter === 2) {
                  equal(node, [1, 1, null, 2]);
                }
                if (counter === 3) {
                  equal(node, [2, 2, null, null]);
                }
                if (next != null) {
                  return next();
                }
              });
              return equal(counter, 3);
            },
            "from node to nonexists node": function() {
              var counter, instance;
              instance = construct({
                0: [4, 1, null],
                1: [1, null, 2],
                2: [2, null, null]
              }, 0, 0, 1);
              counter = 0;
              instance.unsafe.search([0, 4, 1, null], [3, 3, null, null], function(node, next) {
                counter++;
                if (counter === 1) {
                  equal(node, [0, 4, 1, null]);
                }
                if (counter === 2) {
                  equal(node, [1, 1, null, 2]);
                }
                if (counter === 3) {
                  equal(node, [2, 2, null, null]);
                }
                if (next != null) {
                  return next();
                }
              });
              return equal(counter, 3);
            }
          },
          "left duplicating": {
            "from node to node with left duplicates": function() {
              var counter, instance;
              instance = construct({
                0: [3, 1, null],
                1: [1, 2, null],
                2: [1, null, 3],
                3: [2, null, null]
              }, null, 1, 1);
              counter = 0;
              instance.unsafe.search([0, 3, 1, null], [3, 2, null, null], function(node, next) {
                counter++;
                if (counter === 1) {
                  equal(node, [0, 3, 1, null]);
                }
                if (counter === 2) {
                  equal(node, [1, 1, 2, null]);
                }
                if (counter === 3) {
                  equal(node, [2, 1, null, 3]);
                }
                if (counter === 4) {
                  equal(node, [3, 2, null, null]);
                }
                if (next != null) {
                  return next();
                }
              });
              return equal(counter, 4);
            },
            "from node to node with right duplicates": function() {
              var counter, instance;
              instance = construct({
                0: [3, 1, null],
                1: [1, null, 2],
                2: [1, null, 3],
                3: [2, null, null]
              }, null, 1, 1);
              counter = 0;
              instance.unsafe.search([0, 3, 1, null], [3, 2, null, null], function(node, next) {
                counter++;
                if (counter === 1) {
                  equal(node, [0, 3, 1, null]);
                }
                if (counter === 2) {
                  equal(node, [1, 1, null, 2]);
                }
                if (counter === 3) {
                  equal(node, [2, 1, null, 3]);
                }
                if (counter === 4) {
                  equal(node, [3, 2, null, null]);
                }
                if (next != null) {
                  return next();
                }
              });
              return equal(counter, 4);
            }
          },
          "right duplicating": {
            "from node to node with left duplicates": function() {
              var counter, instance;
              instance = construct({
                0: [3, 1, null],
                1: [1, 2, null],
                2: [1, null, 3],
                3: [2, null, null]
              }, null, 2, 1);
              counter = 0;
              instance.unsafe.search([0, 3, 1, null], [3, 2, null, null], function(node, next) {
                counter++;
                if (counter === 1) {
                  equal(node, [0, 3, 1, null]);
                }
                if (counter === 2) {
                  equal(node, [1, 1, 2, null]);
                }
                if (next != null) {
                  return next();
                }
              });
              return equal(counter, 2);
            },
            "from node to node with right duplicates": function() {
              var counter, instance;
              instance = construct({
                0: [3, 1, null],
                1: [1, null, 2],
                2: [1, null, 3],
                3: [2, null, null]
              }, null, 2, 1);
              counter = 0;
              instance.unsafe.search([0, 3, 1, null], [3, 2, null, null], function(node, next) {
                counter++;
                if (counter === 1) {
                  equal(node, [0, 3, 1, null]);
                }
                if (counter === 2) {
                  equal(node, [1, 1, null, 2]);
                }
                if (counter === 3) {
                  equal(node, [2, 1, null, 3]);
                }
                if (counter === 4) {
                  equal(node, [3, 2, null, null]);
                }
                if (next != null) {
                  return next();
                }
              });
              return equal(counter, 4);
            }
          }
        },
        "attach": {
          "node to root": function() {
            var counter, instance;
            instance = construct({
              0: [1, null, null]
            }, null, 0, 1);
            counter = 0;
            instance.unsafe.attach(null, [0, 1, null, null], function(node, next) {
              counter++;
              if (counter === 1) {
                equal(node, null);
              }
              if (counter === 2) {
                equal(node, 0);
              }
              if (counter === 3) {
                equal(node, [0, 1, null, null]);
              }
              if (next != null) {
                return next();
              }
            });
            return equal(counter, 3);
          },
          "without duplicating": {
            "node to node": function() {
              var counter, instance;
              instance = construct({
                0: [1, null, null],
                1: [2, null, null]
              }, null, 0, 1);
              counter = 0;
              instance.unsafe.attach([0, 1, null, null], [1, 2, null, null], function(node, next) {
                counter++;
                if (counter === 1) {
                  equal(node, [0, 1, null, null]);
                }
                if (counter === 2) {
                  equal(node, [0, 1, null, 1]);
                }
                if (counter === 3) {
                  equal(node, [1, 2, null, null]);
                }
                if (next != null) {
                  return next();
                }
              });
              return equal(counter, 3);
            },
            "duplicate to node": function() {
              var counter, instance;
              instance = construct({
                0: [1, null, null],
                1: [1, null, null]
              }, null, 0, 1);
              counter = 0;
              instance.unsafe.attach([0, 1, null, null], [1, 1, null, null], function(node, next) {
                counter++;
                if (counter === 1) {
                  equal(node, [0, 1, null, null]);
                }
                if (next != null) {
                  return next();
                }
              });
              return equal(counter, 1);
            }
          },
          "left duplicating": {
            "duplicate to empty node": function() {
              var counter, instance;
              instance = construct({
                0: [1, null, null],
                1: [1, null, null]
              }, null, 1, 1);
              counter = 0;
              instance.unsafe.attach([0, 1, null, null], [1, 1, null, null], function(node, next) {
                counter++;
                if (counter === 1) {
                  equal(node, [0, 1, null, null]);
                }
                if (counter === 2) {
                  equal(node, [0, 1, 1, null]);
                }
                if (counter === 3) {
                  equal(node, [1, 1, null, null]);
                }
                if (next != null) {
                  return next();
                }
              });
              return equal(counter, 3);
            },
            "duplicate to noempty node": function() {
              var counter, instance;
              instance = construct({
                0: [1, null, 2],
                1: [1, null, null],
                2: [2, null, null]
              }, null, 1, 1);
              counter = 0;
              instance.unsafe.attach([0, 1, null, 2], [1, 1, null, null], function(node, next) {
                counter++;
                if (counter === 1) {
                  equal(node, [0, 1, null, 2]);
                }
                if (counter === 2) {
                  equal(node, [0, 1, 1, null]);
                }
                if (counter === 3) {
                  equal(node, [1, 1, null, null]);
                }
                if (counter === 4) {
                  equal(node, [1, 1, null, 2]);
                }
                if (next != null) {
                  return next();
                }
              });
              return equal(counter, 4);
            }
          },
          "right duplicating": {
            "duplicate to noempty node": function() {
              var counter, instance;
              instance = construct({
                0: [1, null, null],
                1: [1, null, null]
              }, null, 2, 1);
              counter = 0;
              instance.unsafe.attach([0, 1, null, null], [1, 1, null, null], function(node, next) {
                counter++;
                if (counter === 1) {
                  equal(node, [0, 1, null, null]);
                }
                if (counter === 2) {
                  equal(node, [0, 1, null, 1]);
                }
                if (counter === 3) {
                  equal(node, [1, 1, null, null]);
                }
                if (next != null) {
                  return next();
                }
              });
              return equal(counter, 3);
            },
            "duplicate to noempty node": function() {
              var counter, instance;
              instance = construct({
                0: [2, 2, 3],
                1: [2, null, null],
                2: [1, null, null],
                3: [3, null, null]
              }, null, 1, 1);
              counter = 0;
              instance.unsafe.attach([0, 2, 2, 3], [1, 2, null, null], function(node, next) {
                counter++;
                if (counter === 1) {
                  equal(node, [0, 2, 2, 3]);
                }
                if (counter === 2) {
                  equal(node, [0, 2, 1, null]);
                }
                if (counter === 3) {
                  equal(node, [1, 2, null, null]);
                }
                if (counter === 4) {
                  equal(node, [1, 2, 2, 3]);
                }
                if (next != null) {
                  return next();
                }
              });
              return equal(counter, 4);
            }
          }
        },
        "merge": {
          "left noempty node with right noempty node": function() {
            var counter, instance;
            instance = construct({
              0: [2, 1, 2],
              1: [1, null, null],
              2: [3, null, null],
              3: [5, 3, 4],
              4: [4, null, null],
              5: [6, null, null]
            }, null, 0, 1);
            counter = 0;
            instance.unsafe.merge([0, 2, 1, 2], [3, 5, 3, 4], function(node, next) {
              counter++;
              if (counter === 1) {
                equal(node, [0, 2, 1, 2]);
              }
              if (counter === 2) {
                equal(node, [2, 3, null, null]);
              }
              if (counter === 3) {
                equal(node, [2, 3, null, 3]);
              }
              if (counter === 4) {
                equal(node, [0, 2, 1, 2]);
              }
              if (next != null) {
                return next();
              }
            });
            return equal(counter, 4);
          },
          "right noempty node with left noempty node": function() {
            var counter, instance;
            instance = construct({
              0: [2, 1, 2],
              1: [1, null, null],
              2: [3, null, null],
              3: [5, 4, 5],
              4: [4, null, null],
              5: [6, null, null]
            }, null, 0, 2);
            counter = 0;
            instance.unsafe.merge([0, 2, 1, 2], [3, 5, 4, 5], function(node, next) {
              counter++;
              if (counter === 1) {
                equal(node, [3, 5, 4, 5]);
              }
              if (counter === 2) {
                equal(node, [4, 4, null, null]);
              }
              if (counter === 3) {
                equal(node, [4, 4, 0, null]);
              }
              if (counter === 4) {
                equal(node, [3, 5, 4, 5]);
              }
              if (next != null) {
                return next();
              }
            });
            return equal(counter, 4);
          }
        },
        "detach": {
          "empty node from root": function() {
            var counter, instance;
            instance = construct({
              0: [1, null, null]
            }, 0, 0, 1);
            counter = 0;
            instance.unsafe.detach(0, [0, 1, null, null], function(node, next) {
              counter++;
              if (counter === 1) {
                equal(node, [0, 1, null, null]);
              }
              if (counter === 2) {
                equal(node, 0);
              }
              if (counter === 3) {
                equal(node, null);
              }
              if (next != null) {
                return next();
              }
            });
            return equal(counter, 3);
          },
          "node with child from root": function() {
            var counter, instance;
            instance = construct({
              0: [1, null, 1],
              1: [2, null, null]
            }, 0, 0, 1);
            counter = 0;
            instance.unsafe.detach(0, [0, 1, null, 1], function(node, next) {
              counter++;
              if (counter === 1) {
                equal(node, [0, 1, null, 1]);
              }
              if (counter === 2) {
                equal(node, [0, 1, null, null]);
              }
              if (counter === 3) {
                equal(node, 0);
              }
              if (counter === 4) {
                equal(node, 1);
              }
              if (next != null) {
                return next();
              }
            });
            return equal(counter, 4);
          },
          "node with children from root": function() {
            var counter, instance;
            instance = construct({
              0: [2, 1, 2],
              1: [1, null, null],
              2: [3, null, null]
            }, 0, 0, 1);
            counter = 0;
            instance.unsafe.detach(0, [0, 2, 1, 2], function(node, next) {
              counter++;
              if (counter === 1) {
                equal(node, [0, 2, 1, 2]);
              }
              if (counter === 2) {
                equal(node, [0, 2, null, null]);
              }
              if (counter === 3) {
                equal(node, [1, 1, null, null]);
              }
              if (counter === 4) {
                equal(node, [1, 1, null, 2]);
              }
              if (counter === 5) {
                equal(node, 0);
              }
              if (counter === 6) {
                equal(node, 1);
              }
              if (next != null) {
                return next();
              }
            });
            return equal(counter, 6);
          },
          "empty node from node": function() {
            var counter, instance;
            instance = construct({
              0: [1, null, 1],
              1: [2, null, null]
            }, null, 0, 1);
            counter = 0;
            instance.unsafe.detach([0, 1, null, 1], [1, 2, null, null], function(node, next) {
              counter++;
              if (counter === 1) {
                equal(node, [1, 2, null, null]);
              }
              if (counter === 2) {
                equal(node, [0, 1, null, 1]);
              }
              if (counter === 3) {
                equal(node, [0, 1, null, null]);
              }
              if (next != null) {
                return next();
              }
            });
            return equal(counter, 3);
          },
          "node with child from node": function() {
            var counter, instance;
            instance = construct({
              0: [3, 1, null],
              1: [1, null, 2],
              2: [3, null, null]
            }, 0, 0, 1);
            counter = 0;
            instance.unsafe.detach([0, 3, 1, null], [1, 1, null, 2], function(node, next) {
              counter++;
              if (counter === 1) {
                equal(node, [1, 1, null, 2]);
              }
              if (counter === 2) {
                equal(node, [1, 1, null, null]);
              }
              if (counter === 3) {
                equal(node, [0, 3, 1, null]);
              }
              if (counter === 4) {
                equal(node, [0, 3, 2, null]);
              }
              if (next != null) {
                return next();
              }
            });
            return equal(counter, 4);
          },
          "node with children from node": function() {
            var counter, instance;
            instance = construct({
              0: [1, null, 1],
              1: [3, 2, 3],
              2: [2, null, null],
              3: [3, null, null]
            }, 0, 0, 1);
            counter = 0;
            instance.unsafe.detach([0, 1, null, 1], [1, 3, 2, 3], function(node, next) {
              counter++;
              if (counter === 1) {
                equal(node, [1, 3, 2, 3]);
              }
              if (counter === 2) {
                equal(node, [1, 3, null, null]);
              }
              if (counter === 3) {
                equal(node, [2, 2, null, null]);
              }
              if (counter === 4) {
                equal(node, [2, 2, null, 3]);
              }
              if (counter === 5) {
                equal(node, [0, 1, null, 1]);
              }
              if (counter === 6) {
                equal(node, [0, 1, null, 2]);
              }
              if (next != null) {
                return next();
              }
            });
            return equal(counter, 6);
          },
          "left duplicating": {
            "detach duplicate": function() {
              var counter, instance;
              instance = construct({
                0: [1, 1, null],
                1: [1, null, 2],
                2: [2, null, null]
              }, 0, 1, 1);
              counter = 0;
              instance.unsafe.detach([0, 1, 1, null], [1, 1, null, 2], function(node, next) {
                counter++;
                if (counter === 1) {
                  equal(node, [1, 1, null, 2]);
                }
                if (counter === 2) {
                  equal(node, [1, 1, null, null]);
                }
                if (counter === 3) {
                  equal(node, [0, 1, 1, null]);
                }
                if (counter === 4) {
                  equal(node, [0, 1, null, 2]);
                }
                if (next != null) {
                  return next();
                }
              });
              return equal(counter, 4);
            }
          },
          "right duplicating": {
            "detach duplicate": function() {
              var counter, instance;
              instance = construct({
                0: [2, null, 1],
                1: [2, 2, null],
                2: [1, null, null]
              }, 0, 2, 1);
              counter = 0;
              instance.unsafe.detach([0, 2, null, 1], [1, 2, 2, null], function(node, next) {
                counter++;
                if (counter === 1) {
                  equal(node, [1, 2, 2, null]);
                }
                if (counter === 2) {
                  equal(node, [1, 2, null, null]);
                }
                if (counter === 3) {
                  equal(node, [0, 2, null, 1]);
                }
                if (counter === 4) {
                  equal(node, [0, 2, 2, null]);
                }
                if (next != null) {
                  return next();
                }
              });
              return equal(counter, 4);
            }
          }
        }
      },
      "safe": {
        "is object": function() {
          var instance;
          instance = construct();
          return assert.isObject(instance.safe);
        },
        "search": function() {
          var counter, instance;
          instance = construct({
            0: [3, 1, null],
            1: [1, null, 2],
            2: [2, 3, null],
            3: [2, null, null]
          }, 0, 1, 1);
          counter = 0;
          instance.safe.search([3, 2, null, null], function(node, next) {
            counter++;
            if (counter === 1) {
              equal(node, [0, 3, 1, null]);
            }
            if (counter === 2) {
              equal(node, [1, 1, null, 2]);
            }
            if (counter === 3) {
              equal(node, [2, 2, 3, null]);
            }
            if (counter === 4) {
              equal(node, [3, 2, null, null]);
            }
            if (next != null) {
              return next();
            }
          });
          return equal(counter, 4);
        },
        "attach": {
          "to root": function() {
            var counter, instance;
            instance = construct({
              0: [1, null, null]
            }, null, 0, 1);
            counter = 0;
            instance.safe.attach([0, 1, null, null], function(node, next) {
              counter++;
              if (counter === 1) {
                equal(node, null);
              }
              if (counter === 2) {
                equal(node, 0);
              }
              if (counter === 3) {
                equal(node, [0, 1, null, null]);
              }
              if (next != null) {
                return next();
              }
            });
            return equal(counter, 3);
          },
          "to node": function() {
            var counter, instance;
            instance = construct({
              0: [1, null, null],
              1: [2, null, null]
            }, 0, 0, 1);
            counter = 0;
            instance.safe.attach([1, 2, null, null], function(node, next) {
              counter++;
              if (counter === 1) {
                equal(node, [0, 1, null, null]);
              }
              if (counter === 2) {
                equal(node, [0, 1, null, 1]);
              }
              if (counter === 3) {
                equal(node, [1, 2, null, null]);
              }
              if (next != null) {
                return next();
              }
            });
            return equal(counter, 3);
          },
          "to duplicate": function() {
            var counter, instance;
            instance = construct({
              0: [2, 2, null],
              1: [2, null, null],
              2: [1, null, null]
            }, 0, 2, 1);
            counter = 0;
            instance.safe.attach([1, 2, null, null], function(node, next) {
              counter++;
              if (counter === 1) {
                equal(node, [0, 2, 2, null]);
              }
              if (counter === 2) {
                equal(node, [0, 2, null, 1]);
              }
              if (counter === 3) {
                equal(node, [1, 2, null, null]);
              }
              if (counter === 4) {
                equal(node, [1, 2, 2, null]);
              }
              if (next != null) {
                return next();
              }
            });
            return equal(counter, 4);
          }
        },
        "detach": {
          "from root": function() {
            var counter, instance;
            instance = construct({
              0: [1, null, null]
            }, 0, 0, 1);
            counter = 0;
            instance.safe.detach([0, 1, null, null], function(node, next) {
              counter++;
              if (counter === 1) {
                equal(node, [0, 1, null, null]);
              }
              if (counter === 2) {
                equal(node, 0);
              }
              if (counter === 3) {
                equal(node, null);
              }
              if (next != null) {
                return next();
              }
            });
            return equal(counter, 3);
          },
          "from deep tree": function() {
            var counter, instance;
            instance = construct({
              0: [4, 1, null],
              1: [1, null, 2],
              2: [3, null, 3],
              3: [3, 4, null],
              4: [2, null, null]
            }, 0, 2, 1);
            counter = 0;
            instance.safe.detach([3, 3, 4, null], function(node, next) {
              counter++;
              if (counter === 1) {
                equal(node, [0, 4, 1, null]);
              }
              if (counter === 2) {
                equal(node, [1, 1, null, 2]);
              }
              if (counter === 3) {
                equal(node, [2, 3, null, 3]);
              }
              if (counter === 4) {
                equal(node, [3, 3, 4, null]);
              }
              if (counter === 5) {
                equal(node, [3, 3, null, null]);
              }
              if (counter === 6) {
                equal(node, [2, 3, null, 3]);
              }
              if (counter === 7) {
                equal(node, [2, 3, 4, null]);
              }
              if (next != null) {
                return next();
              }
            });
            return equal(counter, 7);
          }
        }
      }
    }
  })["export"](module);

}).call(this);
