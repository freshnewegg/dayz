(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('prop-types'), require('moment'), require('moment-range'), require('react-dom')) :
	typeof define === 'function' && define.amd ? define(['react', 'prop-types', 'moment', 'moment-range', 'react-dom'], factory) :
	(global.dayz = factory(global.React,global.PropTypes,global.moment,global.momentRange,global.reactDOM));
}(this, (function (React,PropTypes,Moment,momentRange,ReactDOM) { 'use strict';

React = React && React.hasOwnProperty('default') ? React['default'] : React;
PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
Moment = Moment && Moment.hasOwnProperty('default') ? Moment['default'] : Moment;
ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

var moment = momentRange.extendMoment(Moment);

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var moment$2 = require('moment');

// an event layout describes how an event is displayed.
// A event may be split into one or more layouts in order to be split across week boundaries

var EventLayout = function () {
    function EventLayout(layout, event, displayRange) {
        classCallCheck(this, EventLayout);

        this.layout = layout;
        this.event = event;
        this.stack = 0;
        this.displayRange = displayRange;
        this.startsBefore = event.start().isBefore(displayRange.start);
        this.endsAfter = event.end().isAfter(displayRange.end);
        this.range = moment$2.range(moment$2.max(displayRange.start, event.start()), moment$2.min(displayRange.end, event.end()));
        var latest = moment$2.min(displayRange.end, event.end());
        this.span = Math.max(1, Math.round(latest.diff(displayRange.start, 'day', true)));
    }

    createClass(EventLayout, [{
        key: 'isEditing',
        value: function isEditing() {
            return this.first && this.event.isEditing();
        }
    }, {
        key: 'startsOnWeek',
        value: function startsOnWeek() {
            return 0 === this.event.start().day();
        }
    }, {
        key: 'adjustEventTime',
        value: function adjustEventTime(startOrEnd, position, height) {
            if (position < 0 || position > height) {
                return;
            }
            var time = this.event[startOrEnd]().startOf('day').add(this.layout.displayHours[0], 'hours').add(this.layout.minutesInDay() * (position / height), 'minutes');

            var _event$get = this.event.get('resizable'),
                step = _event$get.step;

            if (step) {
                var rounded = Math.round(time.minute() / step) * step;
                time.minute(rounded).second(0);
            }
            this.event.emit('change');
        }
    }, {
        key: 'inlineStyles',
        value: function inlineStyles() {
            if ('month' === this.layout.displayingAs() || !this.event.isSingleDay()) {
                return {};
            }

            var _event$daysMinuteRang = this.event.daysMinuteRange(),
                start = _event$daysMinuteRang.start,
                end = _event$daysMinuteRang.end;

            var startOffset = this.layout.displayHours[0] * 60;
            start -= startOffset;
            end -= startOffset;
            var inday = this.layout.minutesInDay();
            var top = (start / inday * 100).toFixed(2) + '%';
            var bottom = (100 - end / inday * 100).toFixed(2) + '%';
            return { top: top, bottom: bottom };
        }
    }, {
        key: 'isResizable',
        value: function isResizable() {
            return this.layout.displayingAs() !== 'month' && this.event.get('resizable');
        }
    }, {
        key: 'key',
        value: function key() {
            return this.displayRange.start.format('YYYYMMDD') + this.event.key;
        }
    }, {
        key: 'setIsResizing',
        value: function setIsResizing(val) {
            this.isResizing = val;
        }
    }, {
        key: 'classNames',
        value: function classNames() {
            var classes = ['event', 'span-' + this.span, 'color-' + this.event.colorIndex()];
            if (this.isResizing) classes.push('is-resizing');
            if (this.startsBefore) classes.push('is-continuation');
            if (this.endsAfter) classes.push('is-continued');
            if (this.stack) classes.push('stack-' + this.stack);
            if (this.isEditing()) classes.push('is-editing');
            if (this.isResizable()) classes.push('is-resizable');
            return classes.join(' ');
        }
    }]);
    return EventLayout;
}();

var C = {

    eventHeight: 20 // px

};

var Emitter$1 = require('tiny-emitter');

var EVENT_COUNTER = 1;

var Event = function () {
    function Event(attributes) {
        classCallCheck(this, Event);

        this.attributes = attributes;
        this.isEvent = true;
        EVENT_COUNTER += 1;
        this.key = EVENT_COUNTER;
        if (!this.attributes.range) {
            throw new Error('Must provide range');
        }
    }

    createClass(Event, [{
        key: 'render',
        value: function render(date, layout) {
            if (this.attributes.render) {
                return this.attributes.render(date, layout);
            }
            return this.defaultRenderImplementation(date, layout);
        }
    }, {
        key: 'defaultRenderImplementation',
        value: function defaultRenderImplementation() {
            return React.createElement('div', {}, this.attributes.content || this.attributes.range.start.format('MMM DD YYYY'));
        }
    }, {
        key: 'get',
        value: function get$$1(key) {
            return this.attributes[key];
        }
    }, {
        key: 'set',
        value: function set$$1(attributes, options) {
            var changed = false;
            for (var key in attributes) {
                // eslint-disable-line no-restricted-syntax
                if (this.attributes[key] !== attributes[key]) {
                    changed = true;
                    break;
                }
            }
            if (!changed) {
                return;
            }

            Object.assign(this.attributes, attributes);
            this.emitChangeEvent(options);
        }
    }, {
        key: 'isEditing',
        value: function isEditing() {
            return !!this.attributes.editing;
        }
    }, {
        key: 'setEditing',
        value: function setEditing(isEditing) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (isEditing !== this.isEditing()) {
                this.attributes.editing = isEditing;
            }
            this.emitChangeEvent(options);
        }
    }, {
        key: 'emitChangeEvent',
        value: function emitChangeEvent() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            if (this.collection) {
                this.collection.emit('change', this);
            }
            if (!options || !options.silent) {
                this.emit('change', this);
            }
        }
    }, {
        key: 'range',
        value: function range() {
            return this.attributes.range.clone();
        }
    }, {
        key: 'isSingleDay',
        value: function isSingleDay() {
            return 24 > this.attributes.range.end.diff(this.attributes.range.start, 'hours');
        }
    }, {
        key: 'daysMinuteRange',
        value: function daysMinuteRange() {
            var startOfDay = this.attributes.range.start.clone().startOf('day');
            return {
                start: this.attributes.range.start.diff(startOfDay, 'minute'),
                end: this.attributes.range.end.diff(startOfDay, 'minute')
            };
        }
    }, {
        key: 'content',
        value: function content() {
            return this.attributes.content;
        }
    }, {
        key: 'start',
        value: function start() {
            return this.attributes.range.start;
        }
    }, {
        key: 'end',
        value: function end() {
            return this.attributes.range.end;
        }
    }, {
        key: 'colorIndex',
        value: function colorIndex() {
            return this.attributes.colorIndex;
        }
    }, {
        key: 'remove',
        value: function remove() {
            this.collection.remove(this);
            this.isDeleted = true;
            this.emit('change');
        }
    }]);
    return Event;
}();

Object.assign(Event.prototype, Emitter$1.prototype);

var Emitter = require('tiny-emitter');

var lc = function lc(event) {
    return event.attributes.range.start.diff(event.attributes.range.end);
};

var sortEvents = function sortEvents(eventA, eventB) {
    var a = lc(eventA);
    var b = lc(eventB);
    return a < b ? -1 : a > b ? 1 : 0; // eslint-disable-line no-nested-ternary
};

var EventsCollection = function () {
    function EventsCollection() {
        var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        classCallCheck(this, EventsCollection);

        this.events = [];
        for (var i = 0, length = events.length; i < length; i += 1) {
            this.add(events[i], { silent: true });
        }
    }

    createClass(EventsCollection, [{
        key: 'add',
        value: function add(eventAttrs) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var event = eventAttrs instanceof Event ? eventAttrs : new Event(eventAttrs);
            event.collection = this;
            this.events.push(event);
            if (!options.silent) {
                this.emit('change');
            }
            return event;
        }
    }, {
        key: 'forEach',
        value: function forEach(fn) {
            this.events.sort(sortEvents).forEach(fn);
        }
    }, {
        key: 'length',
        value: function length() {
            return this.events.length;
        }
    }, {
        key: 'remove',
        value: function remove(event) {
            var index = this.events.indexOf(event);
            if (-1 !== index) {
                this.events.splice(index, 1);
                this.emit('change');
            }
        }
    }]);
    return EventsCollection;
}();

EventsCollection.Event = Event;
Object.assign(EventsCollection.prototype, Emitter.prototype);

function cacheKey(day) {
    return day.format('YYYYMMDD');
}

// a layout describes how the calendar is displayed.

var Layout = function () {
    function Layout(options) {
        var _this = this;

        classCallCheck(this, Layout);

        Object.assign(this, options);
        this.cache = Object.create(null);

        var multiDayCount = 0;
        var cacheMethod = 'day' === this.display ? 'addtoDaysCache' : 'calculateSpanningLayout';
        if (!this.events) {
            this.events = new EventsCollection();
        }
        var range = this.range;


        this.events.forEach(function (event) {
            // we only care about events that are in the range we were provided
            if (range.overlaps(event.range())) {
                _this[cacheMethod](event);
                if (!event.isSingleDay()) {
                    multiDayCount += 1;
                }
            }
        });
        this.multiDayCount = multiDayCount;
        this.calculateStacking();
        if (!this.isDisplayingAsMonth() && !this.displayHours) {
            this.displayHours = this.hourRange();
        } else {
            this.displayHours = this.displayHours || [0, 24];
        }
    }

    createClass(Layout, [{
        key: 'minutesInDay',
        value: function minutesInDay() {
            return (this.displayHours[1] - this.displayHours[0]) * 60;
        }
    }, {
        key: 'propsForDayContainer',
        value: function propsForDayContainer(props) {
            var classes = ['day'];
            if (this.isDateOutsideRange(props.day)) {
                classes.push('outside');
            }
            return { className: classes.join(' '), style: { order: props.position } };
        }
    }, {
        key: 'propsForAllDayEventContainer',
        value: function propsForAllDayEventContainer() {
            var style = this.multiDayCount ? { flexBasis: this.multiDayCount * C.eventHeight } : { display: 'none' };
            return { className: 'all-day', style: style };
        }
    }, {
        key: 'hourRange',
        value: function hourRange() {
            var _this2 = this;

            var range = [7, 19];
            Array.from(this.range.by('days')).forEach(function (day) {
                _this2.forDay(day).forEach(function (layout) {
                    range[0] = Math.min(layout.event.start().hour(), range[0]);
                    range[1] = Math.max(layout.event.end().hour(), range[1]);
                });
            });
            range[1] += 1;
            return range;
        }
    }, {
        key: 'getEventsForWeek',
        value: function getEventsForWeek(start) {
            var day = start.clone();
            var weeklyEvents = [];
            for (var i = 0; i < 7; i++) {
                var layouts = this.forDay(day);
                for (var li = 0, length = layouts.length; li < length; li += 1) {
                    weeklyEvents.push(layouts[li]);
                }
                day.add(1, 'day');
            }
            var minLong = function minLong(range) {
                return moment.max(start, range.start).diff(moment.min(day, range.end), 'minutes');
            };
            return weeklyEvents.sort(function (al, bl) {
                var a = minLong(al.event.range());
                var b = minLong(bl.event.range());
                return a === b ? 0 : a > b ? 1 : -1; // eslint-disable-line no-nested-ternary
            });
        }
    }, {
        key: 'calculateStacking',
        value: function calculateStacking() {
            var firstOfWeek = this.range.start.clone().startOf('week');
            do {
                var weeklyEvents = this.getEventsForWeek(firstOfWeek);
                for (var layoutIndex = 0; layoutIndex < weeklyEvents.length; layoutIndex++) {
                    var layout = weeklyEvents[layoutIndex];
                    // loop through each layout that is before this one
                    var ceilingIndex = 0;
                    for (var pi = layoutIndex - 1; pi >= 0; pi--) {
                        var prevLayout = weeklyEvents[pi];
                        if (prevLayout.range.start.isSame(layout.range.start, 'd')) {
                            ceilingIndex = pi + 1;
                            break;
                        }
                    }
                    for (var _pi = ceilingIndex; _pi < layoutIndex; _pi++) {
                        var _prevLayout = weeklyEvents[_pi];
                        if (layout.range.overlaps(_prevLayout.range)) {
                            layout.stack += 1;
                        }
                    }
                }
                firstOfWeek.add(7, 'day');
            } while (!firstOfWeek.isAfter(this.range.end));
        }
    }, {
        key: 'isDateOutsideRange',
        value: function isDateOutsideRange(date) {
            return this.isDisplayingAsMonth() && this.date.month() !== date.month();
        }
    }, {
        key: 'forDay',
        value: function forDay(day) {
            return this.cache[cacheKey(day)] || [];
        }

        // a single day is easy, just add the event to that day

    }, {
        key: 'addtoDaysCache',
        value: function addtoDaysCache(event) {
            var layout = new EventLayout(this, event, this.range);
            this.addToCache(this.range.start, layout);
        }

        // other layouts must break at week boundaries, with indicators if they were/are continuing

    }, {
        key: 'calculateSpanningLayout',
        value: function calculateSpanningLayout(event) {
            var end = moment.min(this.range.end, event.range().end);
            var start = moment.max(this.range.start, event.range().start).clone();
            do {
                var range = moment.range(start, start.clone().endOf('week'));
                var layout = new EventLayout(this, event, range);
                this.addToCache(start, layout);
                // go to first day of next week
                start.add(7 - start.day(), 'day');
            } while (!start.isAfter(end));
        }
    }, {
        key: 'addToCache',
        value: function addToCache(date, eventLayout) {
            var found = false;
            for (var key in this.cache) {
                // eslint-disable-line no-restricted-syntax
                if (this.cache[key].event === eventLayout.event) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                eventLayout.first = true; // eslint-disable-line no-param-reassign
            }
            var dayCache = this.cache[cacheKey(date)] || (this.cache[cacheKey(date)] = []);
            dayCache.push(eventLayout);
        }
    }, {
        key: 'displayingAs',
        value: function displayingAs() {
            return this.display;
        }
    }, {
        key: 'isDisplayingAsMonth',
        value: function isDisplayingAsMonth() {
            return 'month' === this.display;
        }
    }]);
    return Layout;
}();

var IsResizeClass = new RegExp('(\\s|^)event(\\s|$)');

var Event$2 = function (_React$Component) {
    inherits(Event, _React$Component);

    function Event(props) {
        classCallCheck(this, Event);

        var _this = possibleConstructorReturn(this, (Event.__proto__ || Object.getPrototypeOf(Event)).call(this, props));

        ['onClick', 'onDoubleClick', 'onDoubleClick', 'onDragStart'].forEach(function (ev) {
            _this[ev] = _this[ev].bind(_this);
        });
        return _this;
    }

    createClass(Event, [{
        key: 'onClick',
        value: function onClick(ev) {
            if (!this.props.onClick) {
                return;
            }
            this.props.onClick(ev, this.props.layout.event);
            ev.stopPropagation();
        }
    }, {
        key: 'onDoubleClick',
        value: function onDoubleClick(ev) {
            if (!this.props.onDoubleClick) {
                return;
            }
            this.props.onDoubleClick(ev, this.props.layout.event);
            ev.stopPropagation();
        }
    }, {
        key: 'onDragStart',
        value: function onDragStart(ev) {
            if (!IsResizeClass.test(ev.target.className)) {
                return;
            }
            var bounds = ReactDOM.findDOMNode(this.refs.element).getBoundingClientRect();
            var resize = void 0;
            if (ev.clientY - bounds.top < 10) {
                resize = { type: 'start' };
            } else if (bounds.bottom - ev.clientY < 10) {
                resize = { type: 'end' };
            } else {
                return;
            }
            this.props.onDragStart(resize, this.props.layout);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var body = React.createElement(
                'div',
                { className: 'evbody', onClick: this.onClick },
                this.props.layout.event.render()
            );
            var Edit = this.props.editComponent;
            var children = this.props.layout.isEditing() ? React.createElement(
                Edit,
                { event: this.props.layout.event },
                body
            ) : body;
            return React.createElement(
                'div',
                {
                    ref: 'element',
                    onMouseDown: this.onDragStart,
                    style: this.props.layout.inlineStyles(),
                    className: this.props.layout.classNames() },
                React.createElement(
                    'span',
                    { id: 'close', style: {
                            float: 'right',
                            display: 'inline-block',
                            padding: '2',
                            background: '#ccc',
                            height: 'auto'
                        }, onClick: function onClick() {
                            return _this2.props.onCloseClick(_this2.props.layout.event.id);
                        } },
                    'X'
                ),
                children
            );
        }
    }]);
    return Event;
}(React.Component);

Event$2.propTypes = {
    layout: PropTypes.instanceOf(EventLayout),
    editComponent: PropTypes.func,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
    onCloseClick: PropTypes.func
};

var Label = function Label(_ref) {
    var day = _ref.day;
    return React.createElement(
        'div',
        { className: 'label' },
        day.format('D')
    );
};

Label.propTypes = {
    day: PropTypes.object.isRequired
};

var IsDayClass = new RegExp('(\\s|^)(events|day|label)(\\s|$)');

var Day = function (_React$PureComponent) {
    inherits(Day, _React$PureComponent);

    function Day() {
        classCallCheck(this, Day);

        var _this = possibleConstructorReturn(this, (Day.__proto__ || Object.getPrototypeOf(Day)).call(this));

        _this.state = { resize: false };
        ['onClick', 'onDoubleClick', 'onMouseMove', 'onMouseUp', 'onDragStart'].forEach(function (ev) {
            _this[ev] = _this[ev].bind(_this);
        });
        return _this;
    }

    createClass(Day, [{
        key: 'onClickHandler',
        value: function onClickHandler(ev, handler) {
            if (!handler || !IsDayClass.test(ev.target.className) || this.lastMouseUp && this.lastMouseUp < new Date().getMilliseconds() + 100) {
                return;
            }
            this.lastMouseUp = 0;
            var bounds = this.boundingBox;
            var perc = (ev.clientY - bounds.top) / ev.target.offsetHeight;
            var hours = this.props.layout.displayHours[0] + this.props.layout.minutesInDay() * perc / 60;
            handler.call(this, ev, this.props.day.clone().startOf('day').add(hours, 'hour'));
        }
    }, {
        key: 'onClick',
        value: function onClick(ev) {
            this.onClickHandler(ev, this.props.onClick);
        }
    }, {
        key: 'onDoubleClick',
        value: function onDoubleClick(ev) {
            this.onClickHandler(ev, this.props.onDoubleClick);
        }
    }, {
        key: 'onDragStart',
        value: function onDragStart(resize, eventLayout) {
            eventLayout.setIsResizing(true);
            var bounds = this.boundingBox;
            Object.assign(resize, { eventLayout: eventLayout, height: bounds.height, top: bounds.top });
            this.setState({ resize: resize });
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(ev) {
            if (!this.state.resize) {
                return;
            }
            var coord = ev.clientY - this.state.resize.top;
            this.state.resize.eventLayout.adjustEventTime(this.state.resize.type, coord, this.state.resize.height);
            this.forceUpdate();
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp(ev) {
            var _this2 = this;

            if (!this.state.resize) {
                return;
            }
            this.state.resize.eventLayout.setIsResizing(false);
            setTimeout(function () {
                return _this2.setState({ resize: false });
            }, 1);
            if (this.props.onEventResize) {
                this.props.onEventResize(ev, this.state.resize.eventLayout.event);
            }
            this.lastMouseUp = new Date().getMilliseconds();
        }
    }, {
        key: 'renderEvents',
        value: function renderEvents() {
            var _this3 = this;

            var asMonth = this.props.layout.isDisplayingAsMonth();
            var singleDayEvents = [];
            var allDayEvents = [];
            var onMouseMove = asMonth ? null : this.onMouseMove;
            this.props.layout.forDay(this.props.day).forEach(function (layout) {
                var event = React.createElement(Event$2, {
                    layout: layout,
                    key: layout.key(),
                    day: _this3.props.day,
                    parent: _this3,
                    onDragStart: _this3.onDragStart,
                    onClick: _this3.props.onEventClick,
                    editComponent: _this3.props.editComponent,
                    onDoubleClick: _this3.props.onEventDoubleClick,
                    onCloseClick: _this3.props.onCloseClick
                });
                (layout.event.isSingleDay() ? singleDayEvents : allDayEvents).push(event);
            });
            var events = [];
            if (allDayEvents.length || !asMonth) {
                events.push(React.createElement(
                    'div',
                    _extends({ key: 'allday' }, this.props.layout.propsForAllDayEventContainer()),
                    allDayEvents
                ));
            }
            if (singleDayEvents.length) {
                events.push(React.createElement(
                    'div',
                    {
                        key: 'events', ref: 'events', className: 'events',
                        onMouseMove: onMouseMove, onMouseUp: this.onMouseUp
                    },
                    singleDayEvents
                ));
            }
            return events;
        }
    }, {
        key: 'render',
        value: function render() {
            var props = this.props.layout.propsForDayContainer(this.props);

            return React.createElement(
                'div',
                _extends({
                    ref: 'root'
                }, props, {
                    onClick: this.onClick,
                    onDoubleClick: this.onDoubleClick
                }),
                React.createElement(
                    Label,
                    { day: this.props.day, className: 'label' },
                    this.props.day.format('D')
                ),
                this.renderEvents()
            );
        }
    }, {
        key: 'boundingBox',
        get: function get$$1() {
            return ReactDOM.findDOMNode(this.refs.events || this.refs.root).getBoundingClientRect();
        }
    }]);
    return Day;
}(React.PureComponent);

Day.propTypes = {
    day: PropTypes.object.isRequired,
    layout: PropTypes.instanceOf(Layout).isRequired,
    position: PropTypes.number.isRequired,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
    onEventClick: PropTypes.func,
    onEventResize: PropTypes.func,
    editComponent: PropTypes.func,
    onEventDoubleClick: PropTypes.func,
    onCloseClick: PropTypes.func
};

var XLabels = function (_React$PureComponent) {
    inherits(XLabels, _React$PureComponent);

    function XLabels() {
        classCallCheck(this, XLabels);
        return possibleConstructorReturn(this, (XLabels.__proto__ || Object.getPrototypeOf(XLabels)).apply(this, arguments));
    }

    createClass(XLabels, [{
        key: 'render',
        value: function render() {
            var format = 'month' === this.props.display ? 'dddd' : 'ddd, MMM Do';

            return React.createElement(
                'div',
                { className: 'x-labels' },
                this.days.map(function (day) {
                    return React.createElement(
                        'div',
                        { key: day.format('YYYYMMDD'), className: 'day-label' },
                        day.format(format)
                    );
                })
            );
        }
    }, {
        key: 'days',
        get: function get$$1() {
            var days = [];
            if ('day' === this.props.display) {
                days.push(this.props.date);
            } else {
                var day = this.props.date.clone().startOf('week');
                for (var i = 0; i < 7; i += 1) {
                    days.push(day.clone().add(i, 'day'));
                }
            }
            return days;
        }
    }]);
    return XLabels;
}(React.PureComponent);

XLabels.propTypes = {
    display: PropTypes.oneOf(['month', 'week', 'day']),
    date: PropTypes.object.isRequired
};

var YLabels = function (_React$PureComponent) {
    inherits(YLabels, _React$PureComponent);

    function YLabels() {
        classCallCheck(this, YLabels);
        return possibleConstructorReturn(this, (YLabels.__proto__ || Object.getPrototypeOf(YLabels)).apply(this, arguments));
    }

    createClass(YLabels, [{
        key: 'renderLabels',
        value: function renderLabels() {
            var _this2 = this;

            var day = moment();
            return this.hours.map(function (hour) {
                return React.createElement(
                    'div',
                    { key: hour, className: 'hour' },
                    day.hour(hour).format(_this2.props.timeFormat)
                );
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if ('month' === this.props.display) {
                return null;
            }
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'y-labels' },
                    React.createElement(
                        'div',
                        this.props.layout.propsForAllDayEventContainer(),
                        'All Day'
                    ),
                    this.renderLabels()
                )
            );
        }
    }, {
        key: 'hours',
        get: function get$$1() {
            var _props$layout$display = slicedToArray(this.props.layout.displayHours, 2),
                start = _props$layout$display[0],
                end = _props$layout$display[1];

            return Array(end - start).fill().map(function (_, i) {
                return i + start;
            });
        }
    }]);
    return YLabels;
}(React.PureComponent);

YLabels.propTypes = {
    display: PropTypes.oneOf(['month', 'week', 'day']).isRequired,
    date: PropTypes.object.isRequired,
    layout: PropTypes.instanceOf(Layout).isRequired,
    timeFormat: PropTypes.string
};
YLabels.defaultProps = {
    timeFormat: 'ha'
};

var Dayz = function (_React$PureComponent) {
    inherits(Dayz, _React$PureComponent);

    function Dayz() {
        classCallCheck(this, Dayz);
        return possibleConstructorReturn(this, (Dayz.__proto__ || Object.getPrototypeOf(Dayz)).apply(this, arguments));
    }

    createClass(Dayz, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.calculateLayout(this.props);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.detachEventBindings();
        }
    }, {
        key: 'detachEventBindings',
        value: function detachEventBindings() {
            if (this.props.events) {
                this.props.events.off('change', this.onEventAdd);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.calculateLayout(nextProps);
        }
    }, {
        key: 'onEventsChange',
        value: function onEventsChange() {
            this.calculateLayout(this.props);
        }
    }, {
        key: 'calculateLayout',
        value: function calculateLayout(props) {
            var range = moment.range(props.date.clone().startOf(props.display), props.date.clone().endOf(props.display));
            if (props.events) {
                this.detachEventBindings();
                props.events.on('change', this.onEventsChange, this);
            }
            if ('month' === props.display) {
                range.start.subtract(range.start.weekday(), 'days');
                range.end.add(6 - range.end.weekday(), 'days');
            }
            var layout = new Layout(_extends({}, props, { range: range }));
            this.setState({ range: range, layout: layout });
        }
    }, {
        key: 'renderDays',
        value: function renderDays() {
            var _this2 = this;

            return Array.from(this.state.range.by('days')).map(function (day, index) {
                return React.createElement(Day, {
                    key: day.format('YYYYMMDD'),
                    day: day,
                    position: index,
                    layout: _this2.state.layout,
                    editComponent: _this2.props.editComponent,
                    onClick: _this2.props.onDayClick,
                    onDoubleClick: _this2.props.onDayDoubleClick,
                    onEventClick: _this2.props.onEventClick,
                    onEventResize: _this2.props.onEventResize,
                    onCloseClick: _this2.props.onCloseClick
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var classes = ['dayz', this.props.display];
            return React.createElement(
                'div',
                { className: classes.join(' ') },
                React.createElement(XLabels, { date: this.props.date, display: this.props.display }),
                React.createElement(
                    'div',
                    { className: 'body' },
                    React.createElement(YLabels, {
                        layout: this.state.layout,
                        display: this.props.display,
                        date: this.props.date,
                        timeFormat: this.props.timeFormat
                    }),
                    React.createElement(
                        'div',
                        { className: 'days' },
                        this.renderDays(),
                        this.props.children
                    )
                )
            );
        }
    }]);
    return Dayz;
}(React.PureComponent);

Dayz.EventsCollection = EventsCollection;
Dayz.propTypes = {
    editComponent: PropTypes.func,
    date: PropTypes.object.isRequired,
    displayHours: PropTypes.array,
    display: PropTypes.oneOf(['month', 'week', 'day']),
    events: PropTypes.instanceOf(EventsCollection),
    onDayClick: PropTypes.func,
    onDayDoubleClick: PropTypes.func,
    onEventClick: PropTypes.func,
    onEventResize: PropTypes.func,
    onCloseClick: PropTypes.func,
    timeFormat: PropTypes.string
};
Dayz.defaultProps = {
    display: 'month'
};

return Dayz;

})));
//# sourceMappingURL=dayz.js.map
