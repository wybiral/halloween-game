(function(window) {

    function Events() {
        this.events = {};
    }

    Events.prototype.attach = function(obj) {
        var events = this;
        obj.on = function(type, callback) {
            events.on(type, callback);
            return obj;
        };
        obj.off = function(type, callback) {
            events.off(type, callback);
            return obj;
        };
        obj.trigger = function(type, data) {
            events.trigger(type, data);
            return obj;
        };
    };

    Events.prototype.on = function(type, callback) {
        var event = this.events[type];
        if (typeof event == 'undefined') {
            event = this.events[type] = [];
        }
        event.push(callback);
    };

    Events.prototype.off = function(type, callback) {
        var event = this.events[type];
        if (typeof event != 'undefined') {
            if (typeof callback == 'undefined') {
                event.splice(0, event.length);
            } else {
                event.splice(_.indexOf(event, callback), 1);
            }
        }
    };

    Events.prototype.trigger = function(type, data) {
        var event = this.events[type];
        if (typeof event != 'undefined') {
            _.each(event, function(callback) {
                callback(data);
            });
        }
    };


    function property(obj, name, type) {
        var value;
        var objs = [], condition = buildCondition(type, 'arguments[0]', objs);
        var test = (new Function('__objs__', 'return function() {return ' + condition + '}'))(objs);
        Object.defineProperty(obj, name, {
            get: function() {
                return value;
            },
            set: function(newValue) {
                if (test(newValue)) {
                    obj.trigger('change:' + name, newValue);
                    value = newValue;
                } else {
                    throw 'Property must be of type: ' + type.name;
                }
            }
        });
    }


    Vector = new Classy(function(cls) {
        cls.property('name', Array);
    });

    function Classy(define) {
        var properties = [],
            allowInit = true;

        var Class = (function() {
            if (this instanceof Class) {
                // Instantiated with "new"
                if (allowInit) {
                    this.__class__ = Class;
                    this.__events__ = new Events();
                    this.__events__.attach(this);
                    for (var i = 0; i < properties.length; i++) {
                        property(this, properties[i][0], properties[i][1]);
                    }
                    if (this.init != 'undefined') {
                        this.init.apply(this, arguments);
                    }
                }
            } else {
                // Instantiated without "new"
                var instance, temp = Class;
                Class = function(args) {
                    return temp.apply(this, args);
                };
                Class.prototype = temp.prototype;
                instance = new Class(arguments);
                Class = temp;
                return instance;
            }
        });

        Class.property = function(name, type) {
            properties.push([name, type]);
        };

        Class.method = function(name, args, func) {
            var method = Class.prototype[name];
            if (typeof method == 'undefined') {
                method = Class.prototype[name] = Classy.method(name);
            }
            if (typeof method.when != 'undefined') {
                method.when(args, func);
            } else {
                throw Error(name + ' is already defined and is not a Classy method');
            }
            return Class;
        };

        Class.subclass = function(defineSub) {
            var SubClass = new Classy();
            SubClass.__super__ = Class;
            allowInit = false;
            SubClass.prototype = new Class();
            allowInit = true;
            defineSub(SubClass);
            return SubClass;
        };

        if (define) {
            define(Class);
        }

        return Class;
    }

    Classy.getClass = ({}).toString;

    var basicTypes = [
        'Number',
        'Boolean',
        'String',
        'Function',
        'Array',
        'Date',
        'RegExp',
        'Element'
    ];

    var builtinTypes = {};

    _.each(basicTypes, function(type) {
        builtinTypes[eval(type)] = function(arg) {
            var typeString = '"[object ' + type + ']"'
            return 'Classy.getClass.call(' + arg + ') == ' + typeString;
        };
    });

    builtinTypes[undefined] = function(arg) {
        return 'typeof ' + arg + ' == "undefined"'
    };

    builtinTypes[null] = function(arg) {
        return arg + ' === null'
    };

    builtinTypes[Object] = function(arg) {
        return 'typeof ' + arg + ' != "undefined"';
    };

    function buildCondition(type, arg, objs) {
        if (type in builtinTypes) {
            return builtinTypes[type](arg);
        } else if (typeof type == 'string') {
            return type.replace(/@/g, arg);
        } else {
            var index = _.indexOf(objs, type);
            if (index == -1) {
                index = objs.length;
                objs.push(type);
            }
            return arg + ' instanceof __objs__[' + index + ']'
        }
    }

    /*
        Build type test out of obj.
        If a non-native type is used, the test generated will be
            "arguments[i] instanceof __objs__[j]"
        Where j is the index of that type in the "obj" parameter. If the type
        isn't found in the objs parameter, it will be appended to it with the
        push method and the new index will be used.
    */
    function buildTest(obj, objs) {
        if (obj instanceof Array) {
            var tests = ['arguments.length == ' + obj.length];
            for (var i = 0; i < obj.length; i++) {
                tests.push(buildCondition(obj[i], 'arguments[' + i + ']', objs));
            };
            return tests.join(' && ');
        } else {
            return buildCondition(obj, 'arguments[0]', objs);
        }
    }

    /*
        All Classy methods are created with this function.
    */
    Classy.method = function(name) {

        var objs = [];
        var definitions = [];

        var method = function() {
            var func = method.lookup.call(this, arguments);
            if (typeof func != 'undefined') {
                return func.apply(this, arguments);
            } else {
                throw TypeError(
                    name + ' has no implementation for arguments: ' +
                    Array.prototype.slice.call(arguments)
                );
            }
        };

        method.lookup = function(args) {
            var length = definitions.length, def;
            for (var i = 0; i < length; i++) {
                def = definitions[i];
                if (def.test.apply(this, args)) {
                    return def.func;
                }
            }
        };

        method.when = function(expr, func) {
            if (typeof func == 'undefined') {
                func = expr;
                expr = 'arguments.length == ' + func.length;
            } else {
                expr = buildTest(expr, objs);
            }
            definitions.unshift({
                expr: expr,
                test: (new Function(['__objs__'],
                    'return function() {return ' + expr + '}'
                ))(objs),
                func: func
            });
            return method;
        };

        return method;
    };

    window.Classy = Classy;


    var Task = new Classy(function(cls) {

        cls.property('fn', Function);
        cls.property('status', String);

        cls.method('init', [Function], function(fn) {
            this.fn = fn;
            this.error = null;
            this.status = 'new';
        });

        cls.method('start', function() {
            var task = this;
            if (this.status == 'working' || this.status == 'error') {
                return;
            }
            this.status = 'working';
            try {
                this.fn(function() {
                    task.status = 'done';
                });
            } catch (e) {
                this.error = e;
                this.status = 'error';
            }
        });

    });


    var Tasks = new Classy(function(cls) {
        /*
            An asynchronous task manager. Useful for things like asset loading
            or ensuring that a list of asynchronous tasks gets completed before
            doing something else.

            var completed = 0,
                tasks = new Tasks();

            tasks.add(function(done) {
                completed += 1;
                done();
            });

            tasks.add(function(done) {
                setTimeout(function() {
                    completed += 1;
                    done();
                }, 1000);
            });

            tasks.start(function() {
                console.log(completed);
            });
        */

        cls.method('init', function() {
            this.tasks = [];
            this.started = false;
        });

        cls.method('add', [Function], function(fn) {
            var task = new Task(fn);
            this.tasks.push(task);
            return task;
        });

        cls.method('broadcast', function() {
            _.each(this.tasks, function(task) {
                if (task.status == 'new') {
                    task.start()
                }
            });
        });

        cls.method('start', function() {
            var self = this,
                tasks = this.tasks;
            this.broadcast();
            if (this.started) {
                return;
            }
            this.started = true;
            this.trigger('start');
            (function loop() {
                var groups = _.groupBy(tasks, 'status');
                var done = groups.done || [];
                if (groups.error) {
                    self.trigger('error');
                    return;
                }
                self.trigger('progress', done.length / tasks.length);
                if (done.length < tasks.length) {
                    setTimeout(loop, 100);
                } else {
                    self.trigger('ready');
                }
            })();
        });

        cls.method('start', [Function], function(callback) {
            this.on('ready', callback);
            this.start();
        });

    });

    window.Tasks = Tasks;

})(window);
