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

        // Set location for clubos if it's present in the document.pathname
        if (document.location.pathname.indexOf('location') && typeof(tracker.clubos) == 'object') {
            var pathnames = document.location.pathname.split('/')
            tracker.clubos.location = pathnames[pathnames.length - 1]
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
        xhr.open('POST', tracker.endpoint + '/web/', true);
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
            if (typeof(tracker.clubos) == 'object' && tracker.clubos.location) {
                var xhr = new XMLHttpRequest()
                var clubLocationID = false
                for (i = 0; i < tracker.clubos.clubIDs.length ; i++) {
                    var location = tracker.clubos.clubIDs[i].location.toLowerCase()
                    var currentLocation = tracker.clubos.location.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase()

                    console.log(tracker.clubos.clubIDs[i], currentLocation)

                    if (location == currentLocation || location.indexOf(currentLocation) != -1) {
                        // check for clubos location defaults
                        clubLocationID = tracker.clubos.clubIDs[i].id
                        break
                    }

                }

                if (clubLocationID) {
                    // Prioritize ClubOS
                    xhr.open('POST', tracker.endpoint + '/forward/clubos/' + clubLocationID, false)
                    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')

                    var clubos_data = Object.assign([], record.elements)
                    var clubLocationSource = false


                    clubos_data.push({'source': document.location.pathname.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, ' ').trim()})
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
        xhr.open('POST', tracker.endpoint + '/web/', true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.send(JSON.stringify(tracker));

        return tracker
    }
} 