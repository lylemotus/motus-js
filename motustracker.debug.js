/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!this.json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));

/**
 * [doNotTrack - Checks if use has declared Do Not Track (DNT) in their browser]
 * @return {[type]} [description]
 */
function doNotTrack () {
    if (!window.navigator.userAgent.match(/MSIE\s10\.0|trident\/6\.0/i)) {
      return window.navigator.doNotTrack || window.navigator.msDoNotTrack;
    }
};


/**
 * [generateID - Generates a random ID]
 * @param  {[string]} separator [description]
 * @return {[string]}           [random ID]
 */
function generateID(separator) {
    var delim = separator || "-";

    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(
            1);
    }

    return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() +
        delim + S4() + S4() + S4());
};

/**
* @function MotusTracker
* @description Mobile detection
* @returns boolean
*/
window.ismobile = function() {
    var mobile = false;
    (function(a) {
        if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i
            .test(a) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
            .test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return mobile;
};

/**
 * [showPosition callback used in navigator.geolocation.getCurrentPosition]
 * @param  {[type]} position [description]
 * @return {[object]} latitude and longitude coordinates
 */
function showPosition(position) {
    return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    }
}

/**
* @function MotusTracker
* @description Initializes the MotusTracker object
*/
function MotusTracker(settings) {this.__init__(settings);};

/**
 * [MotusTracker Methods and Properties]
 * @type {Object}
 */
MotusTracker.prototype = {
    /**
     * [__init__ initialize the object]
     * @return {[Object]} [this]
     */
    __init__: function (settings) {

        /**
         * [defaultSettings settings]
         * @type {Object}
         */
        
        var defaultSettings = {
            interactionEvents   : ['mouseup', 'touchend'],
            interactionElements : ['INPUT', 'BUTTON', 'A'],
            interactionCustom    : [],

            conversionEvents    : ['submit'],
            conversionElements  : [],
            interactionCustom     : [],
        }

        var tracker = this


        tracker.clubos = typeof(settings.clubos) == 'object' ? settings.clubos : false

        /**
         * [tracker.interactionEvents contains all the events that will be tracked
         * during user interaction]
         * @type {Array}
         */
        
        tracker.interactionEvents   = typeof(settings.interactionEvents)   == 'string' ? settings.interactionEvents   : defaultSettings.interactionEvents

        /**
         * [tracker.interactionElements contains all the elements that will be tracked
         * during user interaction]
         * @type {Array}
         */
        tracker.interactionElements = typeof(settings.interactionElements) == 'string' ? settings.interactionElements : defaultSettings.interactionElements

        /**
         * [tracker.interactionCustom contains all the elements that will be tracked
         * during user interaction using classes]
         * @type {Array}
         */
        tracker.interactionCustom    = typeof(settings.interactionCustom)    == 'string' ? settings.interactionCustom    : defaultSettings.interactionCustom


        /**
         * [tracker.conversionEvents contains all the events that will be tracked
         * during a possible user conversion]
         * @type {Array}
         */
        tracker.conversionEvents    = typeof(settings.conversionEvents)    == 'string' ? settings.conversionEvents    : defaultSettings.conversionEvents

        /**
         * [tracker.conversionElements contains all the elements that will be tracked
         * during a possible user conversion]
         * @type {Array}
         */
        tracker.conversionElements  = typeof(settings.conversionElements)  == 'string' ? settings.conversionElements  : defaultSettings.conversionElements

        /**
         * [tracker.interactionCustom contains all the elements that will be tracked
         * during a possible user conversion using classes]
         * @type {Array}
         */
        tracker.interactionCustom     = typeof(settings.interactionCustom)     == 'string' ? settings.interactionCustom     : defaultSettings.interactionCustom
        
        /**
         * Toggles async mode
         * @type {Boolean}
         */
        tracker.async    = true

        /**
         * Toogles debug mode 
         * @type {Boolean}
         */
        tracker.debug    = typeof(settings.debug) == 'boolean' ? settings.debug : false

        tracker.web  = {}
        tracker.session = {}
        tracker.records = []
        tracker.conversions = []


        if (tracker.debug) {
            console.log('MotusTracker Initialized:', tracker)
        }
        /**
         * Endpoint used to send the data
         * @type {String}
         */
        
        tracker.endpoint = 'https://motusapi.herokuapp.com'

        // Change endpoint if debug mode is on
        if (tracker.debug) {tracker.endpoint = 'http://localhost:5000'}

        tracker.__initializeSession__()
        tracker.__bindEvents__()

        return tracker
    },


    /**
     * [__initializeSession__ initialize a new session
     * for the visitor]
     * @return {[Object]} [this]
     */
    __initializeSession__: function () {
        var tracker = this

        var visitor_id = Cookies.get('motus_t')
        
        /* if cookine does not exists create a new one */
        if (typeof(visitor_id) !== 'string') {
            visitor_id = generateID()
            Cookies.set('motus_t', visitor_id)
        }

        tracker.web = {
            origin   : window.location.origin,
        }

        /**
         * [tracker.session contains all the data that shows
         * who, what, when, where and how the user started to access the page
         * and other page and user meta]
         * @type {Object}
         */
        tracker.session = {

            /**
             * WHO
             * [user_id description]
             * @type {[type]}
             */
            visitor_id : visitor_id,

            /**
             * WHEN
             * [load_start_time when the user accessed the page]
             * [load_end_time   when the user closed the page]
             * @type {[date]}
             */
            load_start_time : new Date().toISOString(),
            load_end_time   : new Date().toISOString(),

            /**
             * WHERE
             * [reffer where the user started to access the page]
             * [location where the user is located defaultSettings: False]
             * @type {[string]}
             */
            referrer : document.referrer,
            position : navigator.geolocation ? navigator.geolocation.getCurrentPosition(showPosition) : false,
            location : window.location.pathname,
            href     : window.location.href,
            origin   : window.location.origin,
            title    : document.title,


            /**
             * WHAT
             * [language]
             * [platform]
             * [browser]
             * [user_agent]
             * @type {[type]}
             */
            language   : window.navigator.language,
            platform   : window.navigator.platform,
            user_agent : window.navigator.userAgent,

            inner_width      : window.innerWidth,
            inner_height     : window.innerHeight,
            outer_width      : window.outerWidth,
            outer_height     : window.outerHeight,

        };

        if (tracker.debug) {
            console.log('MotusTracker Session Initialized: ', tracker.session)
        }


        var xhr = new XMLHttpRequest()
        var tracker = this

        // Send data to Motus API /web
        xhr.open('POST', tracker.endpoint + '/web/', false);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.send(JSON.stringify(tracker));

        return tracker

    },


    /**
     * __bindEvents__ starts all the event listeners to track
     * elements and activities
     * @return {object} tracker
     */
    __bindEvents__: function() {

        var tracker = this


        if (tracker.interactionEvents) {
            for (i=0; i < tracker.interactionEvents.length; i++) {
                document.querySelector('body').addEventListener(tracker.interactionEvents[i], function(e) {

                    /**
                     * On IE 6-8 the event model is different. Event listeners are attached 
                     * with the non-standard EventTarget.attachEvent() method. 
                     * In this model, the event object has a Event.srcElement property, 
                     * instead of the target property, and it has the same semantics as Event.target.
                     * @param {object} [target]
                     */
                    var target = e.target || e.srcElement 

                    // Record tracker.interactionElements
                    // Record tracker.interactionCustom

                    if (tracker.interactionElements.indexOf(target.tagName) > -1 ||
                        tracker.interactionCustom.indexOf(target.className)  > -1 ) {

                        if (tracker.debug) {console.log('Captured Interaction Event: ', e.type)};

                        e.stopPropagation()
                        tracker.__recordInteraction__(e)
                    }
                })
            }
        }


        for ( var i = 0; i < tracker.conversionEvents.length; i++ ) {
            document.querySelector('body').addEventListener(tracker.conversionEvents[i], function(e) {
                /**
                 * On IE 6-8 the event model is different. Event listeners are attached 
                 * with the non-standard EventTarget.attachEvent() method. 
                 * In this model, the event object has a Event.srcElement property, 
                 * instead of the target property, and it has the same semantics as Event.target.
                 * @param {object} [target]
                 */
                var target = e.target || e.srcElement 

                if (tracker.debug) {console.log('Captured Conversion Event: ', e.type)}

                e.stopPropagation()
                tracker.__recordConversion__(e)

            })
        }

        /**
         * Finishes the sesison and sends the data
         */
        window.onbeforeunload = function (e) {
            tracker.__finishSession__();
        };

        return tracker

    },

    /**
     * Adds an interaction activity to the current session
     * @param  {object} event 
     * @return {object} self
     */
    __recordInteraction__: function(event) {
        
        var tracker = this

        /**
         * On IE 6-8 the event model is different. Event listeners are attached 
         * with the non-standard EventTarget.attachEvent() method. 
         * In this model, the event object has a Event.srcElement property, 
         * instead of the target property, and it has the same semantics as Event.target.
         * @param {object} [target]
         */
        var target = event.target || event.srcElement 
        
        var record = {
            event_type       : event.type,
            
            inner_content    : target.innerText,
            outer_content    : target.outerText,

            id_name          : target.id,
            class_name       : target.className,
            node_name        : target.nodeName,
            tag_name         : target.tagName,

            content_name     : target.name,
            content          : target.innerText,

            date : new Date().toISOString()
        }

        tracker.records.push(record)


        if (tracker.debug) {
            console.log('New Interaction Record: ', record)
        }

        return tracker
    },

    /**
     * Adds a conversion activity to the current session
     * @param  {object} event 
     * @return {object} self
     */
    __recordConversion__: function(event) {

        var tracker = this 

        /**
         * On IE 6-8 the event model is different. Event listeners are attached 
         * with the non-standard EventTarget.attachEvent() method. 
         * In this model, the event object has a Event.srcElement property, 
         * instead of the target property, and it has the same semantics as Event.target.
         * @param {object} [target]
         */
        var target = event.target || event.srcElement 


        if (event.type == 'submit') {
            console.log(event)
            /**
             *  Collect the necessary data of the parent element or form
             */
            var record = {

                event_type       : event.type,

                submit_action    : target.action,
                submit_method    : target.method,

                id_name          : target.id,
                class_name       : target.className,
                node_name        : target.nodeName,
                tag_name         : target.tagName,
                content_name     : target.name,

                elements     : [],

                date : new Date().toISOString()
            }


            if (tracker.debug) {
                console.log('New Submit Record: ', record)
            }


            /** @type {iterable} all child elements of the form */
            var elements = target.elements

            /**
             * Loop throug each element and capture only the input
             * fields then add them to the parent's record
             */
            for (i = 0; i < elements.length; i++) {
                var r_element = elements[i]

                var element = {
                    inner_content    : r_element.innerText,
                    outer_content    : r_element.outerText,

                    id_name          : r_element.id,
                    class_name       : r_element.className,
                    node_name        : r_element.nodeName,
                    tag_name         : r_element.tagName,
                    content_name     : r_element.name,
                    value            : r_element.value,
                }
                
                if (r_element.id == 'location') {tracker.clubos.location = r_element.value};
                if (r_element.name == 'location') {tracker.clubos.location = r_element.value};
                record.elements.push(element);

            }

            // ClubOS
            if (typeof(tracker.clubos) == 'object') {
                var xhr = new XMLHttpRequest()
                var clubLocationID = false
                for (i = 0; tracker.clubos.clubIDs.length > i; i++) {
                    clubos_id = tracker.clubos.clubIDs[i]

                    if (clubos_id.location == tracker.clubos.location) {
                        clubLocationID = clubos_id.id
                        break
                    }

                    if (clubos_id.location.toLowerCase() == tracker.clubos.location.toLowerCase()) {
                        clubLocationID = clubos_id.id
                        break
                    }
                }

                if (clubLocationID) {
                    xhr.open('POST', tracker.endpoint + '/forward/clubos/' + clubLocationID, false)
                    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')

                    clubos_data = Object.assign([], record.elements)
                    clubos_data.push({'source': tracker.session.referrer})
                    clubos_data.push({'visitor_id': tracker.session.visitor_id})

                    xhr.send(JSON.stringify(clubos_data))
                }
            }


            tracker.records.push(record)
        }

        return tracker
    },

    /**
     * Inserts last session data when a user
     * exits the page
     * @return {object} self
     */
    __closeSession__: function () {

        var tracker = this

        tracker.session.load_end_time =  new Date().toISOString()
        tracker.session.position = navigator.geolocation ? navigator.geolocation.getCurrentPosition(showPosition) : false
        
        return tracker
    },

    /**
     * Sends the data to the API
     * @return {object} self
     */
    __finishSession__: function () {

        var xhr = new XMLHttpRequest()
        var tracker = this

        tracker.__closeSession__()

        // Send data to Motus API /web
        xhr.open('POST', tracker.endpoint + '/web/', false);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.send(JSON.stringify(tracker));

        return tracker
    }
} 
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzLmNvb2tpZS5qcyIsIm1vdHVzdHJhY2tlci5kZXYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibW90dXN0cmFja2VyLmRlYnVnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBKYXZhU2NyaXB0IENvb2tpZSB2Mi4yLjBcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9qcy1jb29raWUvanMtY29va2llXG4gKlxuICogQ29weXJpZ2h0IDIwMDYsIDIwMTUgS2xhdXMgSGFydGwgJiBGYWduZXIgQnJhY2tcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG47KGZ1bmN0aW9uIChmYWN0b3J5KSB7XG5cdHZhciByZWdpc3RlcmVkSW5Nb2R1bGVMb2FkZXIgPSBmYWxzZTtcblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShmYWN0b3J5KTtcblx0XHRyZWdpc3RlcmVkSW5Nb2R1bGVMb2FkZXIgPSB0cnVlO1xuXHR9XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0XHRyZWdpc3RlcmVkSW5Nb2R1bGVMb2FkZXIgPSB0cnVlO1xuXHR9XG5cdGlmICghcmVnaXN0ZXJlZEluTW9kdWxlTG9hZGVyKSB7XG5cdFx0dmFyIE9sZENvb2tpZXMgPSB3aW5kb3cuQ29va2llcztcblx0XHR2YXIgYXBpID0gd2luZG93LkNvb2tpZXMgPSBmYWN0b3J5KCk7XG5cdFx0YXBpLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR3aW5kb3cuQ29va2llcyA9IE9sZENvb2tpZXM7XG5cdFx0XHRyZXR1cm4gYXBpO1xuXHRcdH07XG5cdH1cbn0oZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiBleHRlbmQgKCkge1xuXHRcdHZhciBpID0gMDtcblx0XHR2YXIgcmVzdWx0ID0ge307XG5cdFx0Zm9yICg7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhdHRyaWJ1dGVzID0gYXJndW1lbnRzWyBpIF07XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYXR0cmlidXRlcykge1xuXHRcdFx0XHRyZXN1bHRba2V5XSA9IGF0dHJpYnV0ZXNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGZ1bmN0aW9uIGluaXQgKGNvbnZlcnRlcikge1xuXHRcdGZ1bmN0aW9uIGFwaSAoa2V5LCB2YWx1ZSwgYXR0cmlidXRlcykge1xuXHRcdFx0dmFyIHJlc3VsdDtcblx0XHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gV3JpdGVcblxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdGF0dHJpYnV0ZXMgPSBleHRlbmQoe1xuXHRcdFx0XHRcdHBhdGg6ICcvJ1xuXHRcdFx0XHR9LCBhcGkuZGVmYXVsdHMsIGF0dHJpYnV0ZXMpO1xuXG5cdFx0XHRcdGlmICh0eXBlb2YgYXR0cmlidXRlcy5leHBpcmVzID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRcdHZhciBleHBpcmVzID0gbmV3IERhdGUoKTtcblx0XHRcdFx0XHRleHBpcmVzLnNldE1pbGxpc2Vjb25kcyhleHBpcmVzLmdldE1pbGxpc2Vjb25kcygpICsgYXR0cmlidXRlcy5leHBpcmVzICogODY0ZSs1KTtcblx0XHRcdFx0XHRhdHRyaWJ1dGVzLmV4cGlyZXMgPSBleHBpcmVzO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gV2UncmUgdXNpbmcgXCJleHBpcmVzXCIgYmVjYXVzZSBcIm1heC1hZ2VcIiBpcyBub3Qgc3VwcG9ydGVkIGJ5IElFXG5cdFx0XHRcdGF0dHJpYnV0ZXMuZXhwaXJlcyA9IGF0dHJpYnV0ZXMuZXhwaXJlcyA/IGF0dHJpYnV0ZXMuZXhwaXJlcy50b1VUQ1N0cmluZygpIDogJyc7XG5cblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRyZXN1bHQgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG5cdFx0XHRcdFx0aWYgKC9eW1xce1xcW10vLnRlc3QocmVzdWx0KSkge1xuXHRcdFx0XHRcdFx0dmFsdWUgPSByZXN1bHQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoIChlKSB7fVxuXG5cdFx0XHRcdGlmICghY29udmVydGVyLndyaXRlKSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKHZhbHVlKSlcblx0XHRcdFx0XHRcdC5yZXBsYWNlKC8lKDIzfDI0fDI2fDJCfDNBfDNDfDNFfDNEfDJGfDNGfDQwfDVCfDVEfDVFfDYwfDdCfDdEfDdDKS9nLCBkZWNvZGVVUklDb21wb25lbnQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhbHVlID0gY29udmVydGVyLndyaXRlKHZhbHVlLCBrZXkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0a2V5ID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhrZXkpKTtcblx0XHRcdFx0a2V5ID0ga2V5LnJlcGxhY2UoLyUoMjN8MjR8MjZ8MkJ8NUV8NjB8N0MpL2csIGRlY29kZVVSSUNvbXBvbmVudCk7XG5cdFx0XHRcdGtleSA9IGtleS5yZXBsYWNlKC9bXFwoXFwpXS9nLCBlc2NhcGUpO1xuXG5cdFx0XHRcdHZhciBzdHJpbmdpZmllZEF0dHJpYnV0ZXMgPSAnJztcblxuXHRcdFx0XHRmb3IgKHZhciBhdHRyaWJ1dGVOYW1lIGluIGF0dHJpYnV0ZXMpIHtcblx0XHRcdFx0XHRpZiAoIWF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0pIHtcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRzdHJpbmdpZmllZEF0dHJpYnV0ZXMgKz0gJzsgJyArIGF0dHJpYnV0ZU5hbWU7XG5cdFx0XHRcdFx0aWYgKGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0gPT09IHRydWUpIHtcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRzdHJpbmdpZmllZEF0dHJpYnV0ZXMgKz0gJz0nICsgYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gKGRvY3VtZW50LmNvb2tpZSA9IGtleSArICc9JyArIHZhbHVlICsgc3RyaW5naWZpZWRBdHRyaWJ1dGVzKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVhZFxuXG5cdFx0XHRpZiAoIWtleSkge1xuXHRcdFx0XHRyZXN1bHQgPSB7fTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gVG8gcHJldmVudCB0aGUgZm9yIGxvb3AgaW4gdGhlIGZpcnN0IHBsYWNlIGFzc2lnbiBhbiBlbXB0eSBhcnJheVxuXHRcdFx0Ly8gaW4gY2FzZSB0aGVyZSBhcmUgbm8gY29va2llcyBhdCBhbGwuIEFsc28gcHJldmVudHMgb2RkIHJlc3VsdCB3aGVuXG5cdFx0XHQvLyBjYWxsaW5nIFwiZ2V0KClcIlxuXHRcdFx0dmFyIGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUgPyBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsgJykgOiBbXTtcblx0XHRcdHZhciByZGVjb2RlID0gLyglWzAtOUEtWl17Mn0pKy9nO1xuXHRcdFx0dmFyIGkgPSAwO1xuXG5cdFx0XHRmb3IgKDsgaSA8IGNvb2tpZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIHBhcnRzID0gY29va2llc1tpXS5zcGxpdCgnPScpO1xuXHRcdFx0XHR2YXIgY29va2llID0gcGFydHMuc2xpY2UoMSkuam9pbignPScpO1xuXG5cdFx0XHRcdGlmICghdGhpcy5qc29uICYmIGNvb2tpZS5jaGFyQXQoMCkgPT09ICdcIicpIHtcblx0XHRcdFx0XHRjb29raWUgPSBjb29raWUuc2xpY2UoMSwgLTEpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHR2YXIgbmFtZSA9IHBhcnRzWzBdLnJlcGxhY2UocmRlY29kZSwgZGVjb2RlVVJJQ29tcG9uZW50KTtcblx0XHRcdFx0XHRjb29raWUgPSBjb252ZXJ0ZXIucmVhZCA/XG5cdFx0XHRcdFx0XHRjb252ZXJ0ZXIucmVhZChjb29raWUsIG5hbWUpIDogY29udmVydGVyKGNvb2tpZSwgbmFtZSkgfHxcblx0XHRcdFx0XHRcdGNvb2tpZS5yZXBsYWNlKHJkZWNvZGUsIGRlY29kZVVSSUNvbXBvbmVudCk7XG5cblx0XHRcdFx0XHRpZiAodGhpcy5qc29uKSB7XG5cdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRjb29raWUgPSBKU09OLnBhcnNlKGNvb2tpZSk7XG5cdFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChrZXkgPT09IG5hbWUpIHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IGNvb2tpZTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICgha2V5KSB7XG5cdFx0XHRcdFx0XHRyZXN1bHRbbmFtZV0gPSBjb29raWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoIChlKSB7fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXHRcdGFwaS5zZXQgPSBhcGk7XG5cdFx0YXBpLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdHJldHVybiBhcGkuY2FsbChhcGksIGtleSk7XG5cdFx0fTtcblx0XHRhcGkuZ2V0SlNPTiA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBhcGkuYXBwbHkoe1xuXHRcdFx0XHRqc29uOiB0cnVlXG5cdFx0XHR9LCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuXHRcdH07XG5cdFx0YXBpLmRlZmF1bHRzID0ge307XG5cblx0XHRhcGkucmVtb3ZlID0gZnVuY3Rpb24gKGtleSwgYXR0cmlidXRlcykge1xuXHRcdFx0YXBpKGtleSwgJycsIGV4dGVuZChhdHRyaWJ1dGVzLCB7XG5cdFx0XHRcdGV4cGlyZXM6IC0xXG5cdFx0XHR9KSk7XG5cdFx0fTtcblxuXHRcdGFwaS53aXRoQ29udmVydGVyID0gaW5pdDtcblxuXHRcdHJldHVybiBhcGk7XG5cdH1cblxuXHRyZXR1cm4gaW5pdChmdW5jdGlvbiAoKSB7fSk7XG59KSk7XG4iLCIvKipcclxuICogW2RvTm90VHJhY2sgLSBDaGVja3MgaWYgdXNlIGhhcyBkZWNsYXJlZCBEbyBOb3QgVHJhY2sgKEROVCkgaW4gdGhlaXIgYnJvd3Nlcl1cclxuICogQHJldHVybiB7W3R5cGVdfSBbZGVzY3JpcHRpb25dXHJcbiAqL1xyXG5mdW5jdGlvbiBkb05vdFRyYWNrICgpIHtcclxuICAgIGlmICghd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL01TSUVcXHMxMFxcLjB8dHJpZGVudFxcLzZcXC4wL2kpKSB7XHJcbiAgICAgIHJldHVybiB3aW5kb3cubmF2aWdhdG9yLmRvTm90VHJhY2sgfHwgd2luZG93Lm5hdmlnYXRvci5tc0RvTm90VHJhY2s7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIFtnZW5lcmF0ZUlEIC0gR2VuZXJhdGVzIGEgcmFuZG9tIElEXVxyXG4gKiBAcGFyYW0gIHtbc3RyaW5nXX0gc2VwYXJhdG9yIFtkZXNjcmlwdGlvbl1cclxuICogQHJldHVybiB7W3N0cmluZ119ICAgICAgICAgICBbcmFuZG9tIElEXVxyXG4gKi9cclxuZnVuY3Rpb24gZ2VuZXJhdGVJRChzZXBhcmF0b3IpIHtcclxuICAgIHZhciBkZWxpbSA9IHNlcGFyYXRvciB8fCBcIi1cIjtcclxuXHJcbiAgICBmdW5jdGlvbiBTNCgpIHtcclxuICAgICAgICByZXR1cm4gKCgoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMCkgfCAwKS50b1N0cmluZygxNikuc3Vic3RyaW5nKFxyXG4gICAgICAgICAgICAxKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFM0KCkgKyBTNCgpICsgZGVsaW0gKyBTNCgpICsgZGVsaW0gKyBTNCgpICsgZGVsaW0gKyBTNCgpICtcclxuICAgICAgICBkZWxpbSArIFM0KCkgKyBTNCgpICsgUzQoKSk7XHJcbn07XHJcblxyXG4vKipcclxuKiBAZnVuY3Rpb24gTW90dXNUcmFja2VyXHJcbiogQGRlc2NyaXB0aW9uIE1vYmlsZSBkZXRlY3Rpb25cclxuKiBAcmV0dXJucyBib29sZWFuXHJcbiovXHJcbndpbmRvdy5pc21vYmlsZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIG1vYmlsZSA9IGZhbHNlO1xyXG4gICAgKGZ1bmN0aW9uKGEpIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIC8oYW5kcm9pZHxiYlxcZCt8bWVlZ28pLittb2JpbGV8YXZhbnRnb3xiYWRhXFwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG1vYmlsZS4rZmlyZWZveHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyBjZXx4ZGF8eGlpbm8vaVxyXG4gICAgICAgICAgICAudGVzdChhKSB8fFxyXG4gICAgICAgICAgICAvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaVxyXG4gICAgICAgICAgICAudGVzdChhLnN1YnN0cigwLCA0KSkpIGNoZWNrID0gdHJ1ZTtcclxuICAgIH0pKG5hdmlnYXRvci51c2VyQWdlbnQgfHwgbmF2aWdhdG9yLnZlbmRvciB8fCB3aW5kb3cub3BlcmEpO1xyXG4gICAgcmV0dXJuIG1vYmlsZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBbc2hvd1Bvc2l0aW9uIGNhbGxiYWNrIHVzZWQgaW4gbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbl1cclxuICogQHBhcmFtICB7W3R5cGVdfSBwb3NpdGlvbiBbZGVzY3JpcHRpb25dXHJcbiAqIEByZXR1cm4ge1tvYmplY3RdfSBsYXRpdHVkZSBhbmQgbG9uZ2l0dWRlIGNvb3JkaW5hdGVzXHJcbiAqL1xyXG5mdW5jdGlvbiBzaG93UG9zaXRpb24ocG9zaXRpb24pIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbGF0aXR1ZGU6IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSxcclxuICAgICAgICBsb25naXR1ZGU6IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGVcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiogQGZ1bmN0aW9uIE1vdHVzVHJhY2tlclxyXG4qIEBkZXNjcmlwdGlvbiBJbml0aWFsaXplcyB0aGUgTW90dXNUcmFja2VyIG9iamVjdFxyXG4qL1xyXG5mdW5jdGlvbiBNb3R1c1RyYWNrZXIoc2V0dGluZ3MpIHt0aGlzLl9faW5pdF9fKHNldHRpbmdzKTt9O1xyXG5cclxuLyoqXHJcbiAqIFtNb3R1c1RyYWNrZXIgTWV0aG9kcyBhbmQgUHJvcGVydGllc11cclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbk1vdHVzVHJhY2tlci5wcm90b3R5cGUgPSB7XHJcbiAgICAvKipcclxuICAgICAqIFtfX2luaXRfXyBpbml0aWFsaXplIHRoZSBvYmplY3RdXHJcbiAgICAgKiBAcmV0dXJuIHtbT2JqZWN0XX0gW3RoaXNdXHJcbiAgICAgKi9cclxuICAgIF9faW5pdF9fOiBmdW5jdGlvbiAoc2V0dGluZ3MpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogW2RlZmF1bHRTZXR0aW5ncyBzZXR0aW5nc11cclxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBkZWZhdWx0U2V0dGluZ3MgPSB7XHJcbiAgICAgICAgICAgIGludGVyYWN0aW9uRXZlbnRzICAgOiBbJ21vdXNldXAnLCAndG91Y2hlbmQnXSxcclxuICAgICAgICAgICAgaW50ZXJhY3Rpb25FbGVtZW50cyA6IFsnSU5QVVQnLCAnQlVUVE9OJywgJ0EnXSxcclxuICAgICAgICAgICAgaW50ZXJhY3Rpb25DdXN0b20gICAgOiBbXSxcclxuXHJcbiAgICAgICAgICAgIGNvbnZlcnNpb25FdmVudHMgICAgOiBbJ3N1Ym1pdCddLFxyXG4gICAgICAgICAgICBjb252ZXJzaW9uRWxlbWVudHMgIDogW10sXHJcbiAgICAgICAgICAgIGludGVyYWN0aW9uQ3VzdG9tICAgICA6IFtdLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHRyYWNrZXIgPSB0aGlzXHJcblxyXG5cclxuICAgICAgICB0cmFja2VyLmNsdWJvcyA9IHR5cGVvZihzZXR0aW5ncy5jbHVib3MpID09ICdvYmplY3QnID8gc2V0dGluZ3MuY2x1Ym9zIDogZmFsc2VcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogW3RyYWNrZXIuaW50ZXJhY3Rpb25FdmVudHMgY29udGFpbnMgYWxsIHRoZSBldmVudHMgdGhhdCB3aWxsIGJlIHRyYWNrZWRcclxuICAgICAgICAgKiBkdXJpbmcgdXNlciBpbnRlcmFjdGlvbl1cclxuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgXHJcbiAgICAgICAgdHJhY2tlci5pbnRlcmFjdGlvbkV2ZW50cyAgID0gdHlwZW9mKHNldHRpbmdzLmludGVyYWN0aW9uRXZlbnRzKSAgID09ICdzdHJpbmcnID8gc2V0dGluZ3MuaW50ZXJhY3Rpb25FdmVudHMgICA6IGRlZmF1bHRTZXR0aW5ncy5pbnRlcmFjdGlvbkV2ZW50c1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBbdHJhY2tlci5pbnRlcmFjdGlvbkVsZW1lbnRzIGNvbnRhaW5zIGFsbCB0aGUgZWxlbWVudHMgdGhhdCB3aWxsIGJlIHRyYWNrZWRcclxuICAgICAgICAgKiBkdXJpbmcgdXNlciBpbnRlcmFjdGlvbl1cclxuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdHJhY2tlci5pbnRlcmFjdGlvbkVsZW1lbnRzID0gdHlwZW9mKHNldHRpbmdzLmludGVyYWN0aW9uRWxlbWVudHMpID09ICdzdHJpbmcnID8gc2V0dGluZ3MuaW50ZXJhY3Rpb25FbGVtZW50cyA6IGRlZmF1bHRTZXR0aW5ncy5pbnRlcmFjdGlvbkVsZW1lbnRzXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFt0cmFja2VyLmludGVyYWN0aW9uQ3VzdG9tIGNvbnRhaW5zIGFsbCB0aGUgZWxlbWVudHMgdGhhdCB3aWxsIGJlIHRyYWNrZWRcclxuICAgICAgICAgKiBkdXJpbmcgdXNlciBpbnRlcmFjdGlvbiB1c2luZyBjbGFzc2VzXVxyXG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0cmFja2VyLmludGVyYWN0aW9uQ3VzdG9tICAgID0gdHlwZW9mKHNldHRpbmdzLmludGVyYWN0aW9uQ3VzdG9tKSAgICA9PSAnc3RyaW5nJyA/IHNldHRpbmdzLmludGVyYWN0aW9uQ3VzdG9tICAgIDogZGVmYXVsdFNldHRpbmdzLmludGVyYWN0aW9uQ3VzdG9tXHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBbdHJhY2tlci5jb252ZXJzaW9uRXZlbnRzIGNvbnRhaW5zIGFsbCB0aGUgZXZlbnRzIHRoYXQgd2lsbCBiZSB0cmFja2VkXHJcbiAgICAgICAgICogZHVyaW5nIGEgcG9zc2libGUgdXNlciBjb252ZXJzaW9uXVxyXG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0cmFja2VyLmNvbnZlcnNpb25FdmVudHMgICAgPSB0eXBlb2Yoc2V0dGluZ3MuY29udmVyc2lvbkV2ZW50cykgICAgPT0gJ3N0cmluZycgPyBzZXR0aW5ncy5jb252ZXJzaW9uRXZlbnRzICAgIDogZGVmYXVsdFNldHRpbmdzLmNvbnZlcnNpb25FdmVudHNcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogW3RyYWNrZXIuY29udmVyc2lvbkVsZW1lbnRzIGNvbnRhaW5zIGFsbCB0aGUgZWxlbWVudHMgdGhhdCB3aWxsIGJlIHRyYWNrZWRcclxuICAgICAgICAgKiBkdXJpbmcgYSBwb3NzaWJsZSB1c2VyIGNvbnZlcnNpb25dXHJcbiAgICAgICAgICogQHR5cGUge0FycmF5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRyYWNrZXIuY29udmVyc2lvbkVsZW1lbnRzICA9IHR5cGVvZihzZXR0aW5ncy5jb252ZXJzaW9uRWxlbWVudHMpICA9PSAnc3RyaW5nJyA/IHNldHRpbmdzLmNvbnZlcnNpb25FbGVtZW50cyAgOiBkZWZhdWx0U2V0dGluZ3MuY29udmVyc2lvbkVsZW1lbnRzXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFt0cmFja2VyLmludGVyYWN0aW9uQ3VzdG9tIGNvbnRhaW5zIGFsbCB0aGUgZWxlbWVudHMgdGhhdCB3aWxsIGJlIHRyYWNrZWRcclxuICAgICAgICAgKiBkdXJpbmcgYSBwb3NzaWJsZSB1c2VyIGNvbnZlcnNpb24gdXNpbmcgY2xhc3Nlc11cclxuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdHJhY2tlci5pbnRlcmFjdGlvbkN1c3RvbSAgICAgPSB0eXBlb2Yoc2V0dGluZ3MuaW50ZXJhY3Rpb25DdXN0b20pICAgICA9PSAnc3RyaW5nJyA/IHNldHRpbmdzLmludGVyYWN0aW9uQ3VzdG9tICAgICA6IGRlZmF1bHRTZXR0aW5ncy5pbnRlcmFjdGlvbkN1c3RvbVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRvZ2dsZXMgYXN5bmMgbW9kZVxyXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRyYWNrZXIuYXN5bmMgICAgPSB0cnVlXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRvb2dsZXMgZGVidWcgbW9kZSBcclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0cmFja2VyLmRlYnVnICAgID0gdHlwZW9mKHNldHRpbmdzLmRlYnVnKSA9PSAnYm9vbGVhbicgPyBzZXR0aW5ncy5kZWJ1ZyA6IGZhbHNlXHJcblxyXG4gICAgICAgIHRyYWNrZXIud2ViICA9IHt9XHJcbiAgICAgICAgdHJhY2tlci5zZXNzaW9uID0ge31cclxuICAgICAgICB0cmFja2VyLnJlY29yZHMgPSBbXVxyXG4gICAgICAgIHRyYWNrZXIuY29udmVyc2lvbnMgPSBbXVxyXG5cclxuXHJcbiAgICAgICAgaWYgKHRyYWNrZXIuZGVidWcpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ01vdHVzVHJhY2tlciBJbml0aWFsaXplZDonLCB0cmFja2VyKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbmRwb2ludCB1c2VkIHRvIHNlbmQgdGhlIGRhdGFcclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRyYWNrZXIuZW5kcG9pbnQgPSAnaHR0cHM6Ly9tb3R1c2FwaS5oZXJva3VhcHAuY29tJ1xyXG5cclxuICAgICAgICAvLyBDaGFuZ2UgZW5kcG9pbnQgaWYgZGVidWcgbW9kZSBpcyBvblxyXG4gICAgICAgIGlmICh0cmFja2VyLmRlYnVnKSB7dHJhY2tlci5lbmRwb2ludCA9ICdodHRwOi8vbG9jYWxob3N0OjUwMDAnfVxyXG5cclxuICAgICAgICB0cmFja2VyLl9faW5pdGlhbGl6ZVNlc3Npb25fXygpXHJcbiAgICAgICAgdHJhY2tlci5fX2JpbmRFdmVudHNfXygpXHJcblxyXG4gICAgICAgIHJldHVybiB0cmFja2VyXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFtfX2luaXRpYWxpemVTZXNzaW9uX18gaW5pdGlhbGl6ZSBhIG5ldyBzZXNzaW9uXHJcbiAgICAgKiBmb3IgdGhlIHZpc2l0b3JdXHJcbiAgICAgKiBAcmV0dXJuIHtbT2JqZWN0XX0gW3RoaXNdXHJcbiAgICAgKi9cclxuICAgIF9faW5pdGlhbGl6ZVNlc3Npb25fXzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB0cmFja2VyID0gdGhpc1xyXG5cclxuICAgICAgICB2YXIgdmlzaXRvcl9pZCA9IENvb2tpZXMuZ2V0KCdtb3R1c190JylcclxuICAgICAgICBcclxuICAgICAgICAvKiBpZiBjb29raW5lIGRvZXMgbm90IGV4aXN0cyBjcmVhdGUgYSBuZXcgb25lICovXHJcbiAgICAgICAgaWYgKHR5cGVvZih2aXNpdG9yX2lkKSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdmlzaXRvcl9pZCA9IGdlbmVyYXRlSUQoKVxyXG4gICAgICAgICAgICBDb29raWVzLnNldCgnbW90dXNfdCcsIHZpc2l0b3JfaWQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cmFja2VyLndlYiA9IHtcclxuICAgICAgICAgICAgb3JpZ2luICAgOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogW3RyYWNrZXIuc2Vzc2lvbiBjb250YWlucyBhbGwgdGhlIGRhdGEgdGhhdCBzaG93c1xyXG4gICAgICAgICAqIHdobywgd2hhdCwgd2hlbiwgd2hlcmUgYW5kIGhvdyB0aGUgdXNlciBzdGFydGVkIHRvIGFjY2VzcyB0aGUgcGFnZVxyXG4gICAgICAgICAqIGFuZCBvdGhlciBwYWdlIGFuZCB1c2VyIG1ldGFdXHJcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0cmFja2VyLnNlc3Npb24gPSB7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogV0hPXHJcbiAgICAgICAgICAgICAqIFt1c2VyX2lkIGRlc2NyaXB0aW9uXVxyXG4gICAgICAgICAgICAgKiBAdHlwZSB7W3R5cGVdfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdmlzaXRvcl9pZCA6IHZpc2l0b3JfaWQsXHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogV0hFTlxyXG4gICAgICAgICAgICAgKiBbbG9hZF9zdGFydF90aW1lIHdoZW4gdGhlIHVzZXIgYWNjZXNzZWQgdGhlIHBhZ2VdXHJcbiAgICAgICAgICAgICAqIFtsb2FkX2VuZF90aW1lICAgd2hlbiB0aGUgdXNlciBjbG9zZWQgdGhlIHBhZ2VdXHJcbiAgICAgICAgICAgICAqIEB0eXBlIHtbZGF0ZV19XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBsb2FkX3N0YXJ0X3RpbWUgOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXHJcbiAgICAgICAgICAgIGxvYWRfZW5kX3RpbWUgICA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBXSEVSRVxyXG4gICAgICAgICAgICAgKiBbcmVmZmVyIHdoZXJlIHRoZSB1c2VyIHN0YXJ0ZWQgdG8gYWNjZXNzIHRoZSBwYWdlXVxyXG4gICAgICAgICAgICAgKiBbbG9jYXRpb24gd2hlcmUgdGhlIHVzZXIgaXMgbG9jYXRlZCBkZWZhdWx0U2V0dGluZ3M6IEZhbHNlXVxyXG4gICAgICAgICAgICAgKiBAdHlwZSB7W3N0cmluZ119XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICByZWZlcnJlciA6IGRvY3VtZW50LnJlZmVycmVyLFxyXG4gICAgICAgICAgICBwb3NpdGlvbiA6IG5hdmlnYXRvci5nZW9sb2NhdGlvbiA/IG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oc2hvd1Bvc2l0aW9uKSA6IGZhbHNlLFxyXG4gICAgICAgICAgICBsb2NhdGlvbiA6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSxcclxuICAgICAgICAgICAgaHJlZiAgICAgOiB3aW5kb3cubG9jYXRpb24uaHJlZixcclxuICAgICAgICAgICAgb3JpZ2luICAgOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luLFxyXG4gICAgICAgICAgICB0aXRsZSAgICA6IGRvY3VtZW50LnRpdGxlLFxyXG5cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBXSEFUXHJcbiAgICAgICAgICAgICAqIFtsYW5ndWFnZV1cclxuICAgICAgICAgICAgICogW3BsYXRmb3JtXVxyXG4gICAgICAgICAgICAgKiBbYnJvd3Nlcl1cclxuICAgICAgICAgICAgICogW3VzZXJfYWdlbnRdXHJcbiAgICAgICAgICAgICAqIEB0eXBlIHtbdHlwZV19XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBsYW5ndWFnZSAgIDogd2luZG93Lm5hdmlnYXRvci5sYW5ndWFnZSxcclxuICAgICAgICAgICAgcGxhdGZvcm0gICA6IHdpbmRvdy5uYXZpZ2F0b3IucGxhdGZvcm0sXHJcbiAgICAgICAgICAgIHVzZXJfYWdlbnQgOiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCxcclxuXHJcbiAgICAgICAgICAgIGlubmVyX3dpZHRoICAgICAgOiB3aW5kb3cuaW5uZXJXaWR0aCxcclxuICAgICAgICAgICAgaW5uZXJfaGVpZ2h0ICAgICA6IHdpbmRvdy5pbm5lckhlaWdodCxcclxuICAgICAgICAgICAgb3V0ZXJfd2lkdGggICAgICA6IHdpbmRvdy5vdXRlcldpZHRoLFxyXG4gICAgICAgICAgICBvdXRlcl9oZWlnaHQgICAgIDogd2luZG93Lm91dGVySGVpZ2h0LFxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAodHJhY2tlci5kZWJ1Zykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTW90dXNUcmFja2VyIFNlc3Npb24gSW5pdGlhbGl6ZWQ6ICcsIHRyYWNrZXIuc2Vzc2lvbilcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcclxuICAgICAgICB2YXIgdHJhY2tlciA9IHRoaXNcclxuXHJcbiAgICAgICAgLy8gU2VuZCBkYXRhIHRvIE1vdHVzIEFQSSAvd2ViXHJcbiAgICAgICAgeGhyLm9wZW4oJ1BPU1QnLCB0cmFja2VyLmVuZHBvaW50ICsgJy93ZWIvJywgZmFsc2UpO1xyXG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOCcpO1xyXG4gICAgICAgIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KHRyYWNrZXIpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRyYWNrZXJcclxuXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIF9fYmluZEV2ZW50c19fIHN0YXJ0cyBhbGwgdGhlIGV2ZW50IGxpc3RlbmVycyB0byB0cmFja1xyXG4gICAgICogZWxlbWVudHMgYW5kIGFjdGl2aXRpZXNcclxuICAgICAqIEByZXR1cm4ge29iamVjdH0gdHJhY2tlclxyXG4gICAgICovXHJcbiAgICBfX2JpbmRFdmVudHNfXzogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhciB0cmFja2VyID0gdGhpc1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHRyYWNrZXIuaW50ZXJhY3Rpb25FdmVudHMpIHtcclxuICAgICAgICAgICAgZm9yIChpPTA7IGkgPCB0cmFja2VyLmludGVyYWN0aW9uRXZlbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYWRkRXZlbnRMaXN0ZW5lcih0cmFja2VyLmludGVyYWN0aW9uRXZlbnRzW2ldLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICAgICAqIE9uIElFIDYtOCB0aGUgZXZlbnQgbW9kZWwgaXMgZGlmZmVyZW50LiBFdmVudCBsaXN0ZW5lcnMgYXJlIGF0dGFjaGVkIFxyXG4gICAgICAgICAgICAgICAgICAgICAqIHdpdGggdGhlIG5vbi1zdGFuZGFyZCBFdmVudFRhcmdldC5hdHRhY2hFdmVudCgpIG1ldGhvZC4gXHJcbiAgICAgICAgICAgICAgICAgICAgICogSW4gdGhpcyBtb2RlbCwgdGhlIGV2ZW50IG9iamVjdCBoYXMgYSBFdmVudC5zcmNFbGVtZW50IHByb3BlcnR5LCBcclxuICAgICAgICAgICAgICAgICAgICAgKiBpbnN0ZWFkIG9mIHRoZSB0YXJnZXQgcHJvcGVydHksIGFuZCBpdCBoYXMgdGhlIHNhbWUgc2VtYW50aWNzIGFzIEV2ZW50LnRhcmdldC5cclxuICAgICAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gW3RhcmdldF1cclxuICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50IFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBSZWNvcmQgdHJhY2tlci5pbnRlcmFjdGlvbkVsZW1lbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVjb3JkIHRyYWNrZXIuaW50ZXJhY3Rpb25DdXN0b21cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyYWNrZXIuaW50ZXJhY3Rpb25FbGVtZW50cy5pbmRleE9mKHRhcmdldC50YWdOYW1lKSA+IC0xIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNrZXIuaW50ZXJhY3Rpb25DdXN0b20uaW5kZXhPZih0YXJnZXQuY2xhc3NOYW1lKSAgPiAtMSApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmFja2VyLmRlYnVnKSB7Y29uc29sZS5sb2coJ0NhcHR1cmVkIEludGVyYWN0aW9uIEV2ZW50OiAnLCBlLnR5cGUpfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2tlci5fX3JlY29yZEludGVyYWN0aW9uX18oZSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgdHJhY2tlci5jb252ZXJzaW9uRXZlbnRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYWRkRXZlbnRMaXN0ZW5lcih0cmFja2VyLmNvbnZlcnNpb25FdmVudHNbaV0sIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICogT24gSUUgNi04IHRoZSBldmVudCBtb2RlbCBpcyBkaWZmZXJlbnQuIEV2ZW50IGxpc3RlbmVycyBhcmUgYXR0YWNoZWQgXHJcbiAgICAgICAgICAgICAgICAgKiB3aXRoIHRoZSBub24tc3RhbmRhcmQgRXZlbnRUYXJnZXQuYXR0YWNoRXZlbnQoKSBtZXRob2QuIFxyXG4gICAgICAgICAgICAgICAgICogSW4gdGhpcyBtb2RlbCwgdGhlIGV2ZW50IG9iamVjdCBoYXMgYSBFdmVudC5zcmNFbGVtZW50IHByb3BlcnR5LCBcclxuICAgICAgICAgICAgICAgICAqIGluc3RlYWQgb2YgdGhlIHRhcmdldCBwcm9wZXJ0eSwgYW5kIGl0IGhhcyB0aGUgc2FtZSBzZW1hbnRpY3MgYXMgRXZlbnQudGFyZ2V0LlxyXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IFt0YXJnZXRdXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQgXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRyYWNrZXIuZGVidWcpIHtjb25zb2xlLmxvZygnQ2FwdHVyZWQgQ29udmVyc2lvbiBFdmVudDogJywgZS50eXBlKX1cclxuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgICAgICAgICB0cmFja2VyLl9fcmVjb3JkQ29udmVyc2lvbl9fKGUpXHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRmluaXNoZXMgdGhlIHNlc2lzb24gYW5kIHNlbmRzIHRoZSBkYXRhXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgd2luZG93Lm9uYmVmb3JldW5sb2FkID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgdHJhY2tlci5fX2ZpbmlzaFNlc3Npb25fXygpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiB0cmFja2VyXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYW4gaW50ZXJhY3Rpb24gYWN0aXZpdHkgdG8gdGhlIGN1cnJlbnQgc2Vzc2lvblxyXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBldmVudCBcclxuICAgICAqIEByZXR1cm4ge29iamVjdH0gc2VsZlxyXG4gICAgICovXHJcbiAgICBfX3JlY29yZEludGVyYWN0aW9uX186IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHRyYWNrZXIgPSB0aGlzXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9uIElFIDYtOCB0aGUgZXZlbnQgbW9kZWwgaXMgZGlmZmVyZW50LiBFdmVudCBsaXN0ZW5lcnMgYXJlIGF0dGFjaGVkIFxyXG4gICAgICAgICAqIHdpdGggdGhlIG5vbi1zdGFuZGFyZCBFdmVudFRhcmdldC5hdHRhY2hFdmVudCgpIG1ldGhvZC4gXHJcbiAgICAgICAgICogSW4gdGhpcyBtb2RlbCwgdGhlIGV2ZW50IG9iamVjdCBoYXMgYSBFdmVudC5zcmNFbGVtZW50IHByb3BlcnR5LCBcclxuICAgICAgICAgKiBpbnN0ZWFkIG9mIHRoZSB0YXJnZXQgcHJvcGVydHksIGFuZCBpdCBoYXMgdGhlIHNhbWUgc2VtYW50aWNzIGFzIEV2ZW50LnRhcmdldC5cclxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gW3RhcmdldF1cclxuICAgICAgICAgKi9cclxuICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IHx8IGV2ZW50LnNyY0VsZW1lbnQgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHJlY29yZCA9IHtcclxuICAgICAgICAgICAgZXZlbnRfdHlwZSAgICAgICA6IGV2ZW50LnR5cGUsXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpbm5lcl9jb250ZW50ICAgIDogdGFyZ2V0LmlubmVyVGV4dCxcclxuICAgICAgICAgICAgb3V0ZXJfY29udGVudCAgICA6IHRhcmdldC5vdXRlclRleHQsXHJcblxyXG4gICAgICAgICAgICBpZF9uYW1lICAgICAgICAgIDogdGFyZ2V0LmlkLFxyXG4gICAgICAgICAgICBjbGFzc19uYW1lICAgICAgIDogdGFyZ2V0LmNsYXNzTmFtZSxcclxuICAgICAgICAgICAgbm9kZV9uYW1lICAgICAgICA6IHRhcmdldC5ub2RlTmFtZSxcclxuICAgICAgICAgICAgdGFnX25hbWUgICAgICAgICA6IHRhcmdldC50YWdOYW1lLFxyXG5cclxuICAgICAgICAgICAgY29udGVudF9uYW1lICAgICA6IHRhcmdldC5uYW1lLFxyXG4gICAgICAgICAgICBjb250ZW50ICAgICAgICAgIDogdGFyZ2V0LmlubmVyVGV4dCxcclxuXHJcbiAgICAgICAgICAgIGRhdGUgOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyYWNrZXIucmVjb3Jkcy5wdXNoKHJlY29yZClcclxuXHJcblxyXG4gICAgICAgIGlmICh0cmFja2VyLmRlYnVnKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdOZXcgSW50ZXJhY3Rpb24gUmVjb3JkOiAnLCByZWNvcmQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJhY2tlclxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBjb252ZXJzaW9uIGFjdGl2aXR5IHRvIHRoZSBjdXJyZW50IHNlc3Npb25cclxuICAgICAqIEBwYXJhbSAge29iamVjdH0gZXZlbnQgXHJcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IHNlbGZcclxuICAgICAqL1xyXG4gICAgX19yZWNvcmRDb252ZXJzaW9uX186IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIHZhciB0cmFja2VyID0gdGhpcyBcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT24gSUUgNi04IHRoZSBldmVudCBtb2RlbCBpcyBkaWZmZXJlbnQuIEV2ZW50IGxpc3RlbmVycyBhcmUgYXR0YWNoZWQgXHJcbiAgICAgICAgICogd2l0aCB0aGUgbm9uLXN0YW5kYXJkIEV2ZW50VGFyZ2V0LmF0dGFjaEV2ZW50KCkgbWV0aG9kLiBcclxuICAgICAgICAgKiBJbiB0aGlzIG1vZGVsLCB0aGUgZXZlbnQgb2JqZWN0IGhhcyBhIEV2ZW50LnNyY0VsZW1lbnQgcHJvcGVydHksIFxyXG4gICAgICAgICAqIGluc3RlYWQgb2YgdGhlIHRhcmdldCBwcm9wZXJ0eSwgYW5kIGl0IGhhcyB0aGUgc2FtZSBzZW1hbnRpY3MgYXMgRXZlbnQudGFyZ2V0LlxyXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbdGFyZ2V0XVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQgfHwgZXZlbnQuc3JjRWxlbWVudCBcclxuXHJcblxyXG4gICAgICAgIGlmIChldmVudC50eXBlID09ICdzdWJtaXQnKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50KVxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogIENvbGxlY3QgdGhlIG5lY2Vzc2FyeSBkYXRhIG9mIHRoZSBwYXJlbnQgZWxlbWVudCBvciBmb3JtXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB2YXIgcmVjb3JkID0ge1xyXG5cclxuICAgICAgICAgICAgICAgIGV2ZW50X3R5cGUgICAgICAgOiBldmVudC50eXBlLFxyXG5cclxuICAgICAgICAgICAgICAgIHN1Ym1pdF9hY3Rpb24gICAgOiB0YXJnZXQuYWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgc3VibWl0X21ldGhvZCAgICA6IHRhcmdldC5tZXRob2QsXHJcblxyXG4gICAgICAgICAgICAgICAgaWRfbmFtZSAgICAgICAgICA6IHRhcmdldC5pZCxcclxuICAgICAgICAgICAgICAgIGNsYXNzX25hbWUgICAgICAgOiB0YXJnZXQuY2xhc3NOYW1lLFxyXG4gICAgICAgICAgICAgICAgbm9kZV9uYW1lICAgICAgICA6IHRhcmdldC5ub2RlTmFtZSxcclxuICAgICAgICAgICAgICAgIHRhZ19uYW1lICAgICAgICAgOiB0YXJnZXQudGFnTmFtZSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRfbmFtZSAgICAgOiB0YXJnZXQubmFtZSxcclxuXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cyAgICAgOiBbXSxcclxuXHJcbiAgICAgICAgICAgICAgICBkYXRlIDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAodHJhY2tlci5kZWJ1Zykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05ldyBTdWJtaXQgUmVjb3JkOiAnLCByZWNvcmQpXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAvKiogQHR5cGUge2l0ZXJhYmxlfSBhbGwgY2hpbGQgZWxlbWVudHMgb2YgdGhlIGZvcm0gKi9cclxuICAgICAgICAgICAgdmFyIGVsZW1lbnRzID0gdGFyZ2V0LmVsZW1lbnRzXHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogTG9vcCB0aHJvdWcgZWFjaCBlbGVtZW50IGFuZCBjYXB0dXJlIG9ubHkgdGhlIGlucHV0XHJcbiAgICAgICAgICAgICAqIGZpZWxkcyB0aGVuIGFkZCB0aGVtIHRvIHRoZSBwYXJlbnQncyByZWNvcmRcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJfZWxlbWVudCA9IGVsZW1lbnRzW2ldXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5uZXJfY29udGVudCAgICA6IHJfZWxlbWVudC5pbm5lclRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgb3V0ZXJfY29udGVudCAgICA6IHJfZWxlbWVudC5vdXRlclRleHQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlkX25hbWUgICAgICAgICAgOiByX2VsZW1lbnQuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NfbmFtZSAgICAgICA6IHJfZWxlbWVudC5jbGFzc05hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZV9uYW1lICAgICAgICA6IHJfZWxlbWVudC5ub2RlTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICB0YWdfbmFtZSAgICAgICAgIDogcl9lbGVtZW50LnRhZ05hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudF9uYW1lICAgICA6IHJfZWxlbWVudC5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgICAgOiByX2VsZW1lbnQudmFsdWUsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChyX2VsZW1lbnQuaWQgPT0gJ2xvY2F0aW9uJykge3RyYWNrZXIuY2x1Ym9zLmxvY2F0aW9uID0gcl9lbGVtZW50LnZhbHVlfTtcclxuICAgICAgICAgICAgICAgIGlmIChyX2VsZW1lbnQubmFtZSA9PSAnbG9jYXRpb24nKSB7dHJhY2tlci5jbHVib3MubG9jYXRpb24gPSByX2VsZW1lbnQudmFsdWV9O1xyXG4gICAgICAgICAgICAgICAgcmVjb3JkLmVsZW1lbnRzLnB1c2goZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDbHViT1NcclxuICAgICAgICAgICAgaWYgKHR5cGVvZih0cmFja2VyLmNsdWJvcykgPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxyXG4gICAgICAgICAgICAgICAgdmFyIGNsdWJMb2NhdGlvbklEID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IHRyYWNrZXIuY2x1Ym9zLmNsdWJJRHMubGVuZ3RoID4gaTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2x1Ym9zX2lkID0gdHJhY2tlci5jbHVib3MuY2x1YklEc1tpXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2x1Ym9zX2lkLmxvY2F0aW9uID09IHRyYWNrZXIuY2x1Ym9zLmxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsdWJMb2NhdGlvbklEID0gY2x1Ym9zX2lkLmlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2x1Ym9zX2lkLmxvY2F0aW9uLnRvTG93ZXJDYXNlKCkgPT0gdHJhY2tlci5jbHVib3MubG9jYXRpb24udG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbHViTG9jYXRpb25JRCA9IGNsdWJvc19pZC5pZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2x1YkxvY2F0aW9uSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICB4aHIub3BlbignUE9TVCcsIHRyYWNrZXIuZW5kcG9pbnQgKyAnL2ZvcndhcmQvY2x1Ym9zLycgKyBjbHViTG9jYXRpb25JRCwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbHVib3NfZGF0YSA9IE9iamVjdC5hc3NpZ24oW10sIHJlY29yZC5lbGVtZW50cylcclxuICAgICAgICAgICAgICAgICAgICBjbHVib3NfZGF0YS5wdXNoKHsnc291cmNlJzogdHJhY2tlci5zZXNzaW9uLnJlZmVycmVyfSlcclxuICAgICAgICAgICAgICAgICAgICBjbHVib3NfZGF0YS5wdXNoKHsndmlzaXRvcl9pZCc6IHRyYWNrZXIuc2Vzc2lvbi52aXNpdG9yX2lkfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoY2x1Ym9zX2RhdGEpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgdHJhY2tlci5yZWNvcmRzLnB1c2gocmVjb3JkKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRyYWNrZXJcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnNlcnRzIGxhc3Qgc2Vzc2lvbiBkYXRhIHdoZW4gYSB1c2VyXHJcbiAgICAgKiBleGl0cyB0aGUgcGFnZVxyXG4gICAgICogQHJldHVybiB7b2JqZWN0fSBzZWxmXHJcbiAgICAgKi9cclxuICAgIF9fY2xvc2VTZXNzaW9uX186IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyIHRyYWNrZXIgPSB0aGlzXHJcblxyXG4gICAgICAgIHRyYWNrZXIuc2Vzc2lvbi5sb2FkX2VuZF90aW1lID0gIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxyXG4gICAgICAgIHRyYWNrZXIuc2Vzc2lvbi5wb3NpdGlvbiA9IG5hdmlnYXRvci5nZW9sb2NhdGlvbiA/IG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oc2hvd1Bvc2l0aW9uKSA6IGZhbHNlXHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRyYWNrZXJcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kcyB0aGUgZGF0YSB0byB0aGUgQVBJXHJcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IHNlbGZcclxuICAgICAqL1xyXG4gICAgX19maW5pc2hTZXNzaW9uX186IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXHJcbiAgICAgICAgdmFyIHRyYWNrZXIgPSB0aGlzXHJcblxyXG4gICAgICAgIHRyYWNrZXIuX19jbG9zZVNlc3Npb25fXygpXHJcblxyXG4gICAgICAgIC8vIFNlbmQgZGF0YSB0byBNb3R1cyBBUEkgL3dlYlxyXG4gICAgICAgIHhoci5vcGVuKCdQT1NUJywgdHJhY2tlci5lbmRwb2ludCArICcvd2ViLycsIGZhbHNlKTtcclxuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLTgnKTtcclxuICAgICAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeSh0cmFja2VyKSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0cmFja2VyXHJcbiAgICB9XHJcbn0gIl19