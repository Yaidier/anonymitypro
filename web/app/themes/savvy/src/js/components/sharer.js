/**
 * @preserve
 * Sharer.js
 *
 * @description Create your own social share buttons
 * @version 0.5.1
 * @author Ellison Leao <ellisonleao@gmail.com>
 * @license MIT
 *
 */

/**
 * @constructor
 */
 var Sharer = function (elem) {
    this.elem = elem;
};

/**
 *  @function init
 *  @description bind the events for multiple sharer elements
 *  @returns {Empty}
 */
Sharer.init = function () {
    var elems = document.querySelectorAll('[data-sharer]'),
    i,
    l = elems.length;

    for (i = 0; i < l; i++) {
    elems[i].addEventListener('click', Sharer.add);
    }
};

/**
 *  @function add
 *  @description bind the share event for a single dom element
 *  @returns {Empty}
 */
Sharer.add = function (elem) {
    var target = elem.currentTarget || elem.srcElement;
    var sharer = new Sharer(target);
    sharer.share();
};

// instance methods
Sharer.prototype = {
    constructor: Sharer,
    /**
     *  @function getValue
     *  @description Helper to get the attribute of a DOM element
     *  @param {String} attr DOM element attribute
     *  @returns {String|Empty} returns the attr value or empty string
     */
    getValue: function (attr) {
    var val = this.elem.getAttribute('data-' + attr);
    // handing facebook hashtag attribute
    if (val && attr === 'hashtag') {
        if (!val.startsWith('#')) {
        val = '#' + val;
        }
    }
    return val === null ? '' : val;
    },

    /**
     * @event share
     * @description Main share event. Will pop a window or redirect to a link
     * based on the data-sharer attribute.
     */
    share: function () {
    var sharer = this.getValue('sharer').toLowerCase(),
        sharers = {
        facebook: {
            shareUrl: 'https://www.facebook.com/sharer/sharer.php',
            params: {
            u: this.getValue('url'),
            hashtag: this.getValue('hashtag'),
            quote: this.getValue('quote'),
            },
        },
        linkedin: {
            shareUrl: 'https://www.linkedin.com/shareArticle',
            params: {
            url: this.getValue('url'),
            mini: true,
            },
        },
        twitter: {
            shareUrl: 'https://twitter.com/intent/tweet/',
            params: {
            text: this.getValue('title'),
            url: this.getValue('url'),
            hashtags: this.getValue('hashtags'),
            via: this.getValue('via'),
            },
        },
        email: {
            shareUrl: 'mailto:' + this.getValue('to'),
            params: {
            subject: this.getValue('subject'),
            body: this.getValue('title') + '\n' + this.getValue('url'),
            },
        },
        whatsapp: {
            shareUrl: this.getValue('web') === 'true' ? 'https://web.whatsapp.com/send' : 'https://wa.me/',
            params: {
            phone: this.getValue('to'),
            text: this.getValue('title') + ' ' + this.getValue('url'),
            },
        },
        telegram: {
            shareUrl: 'https://t.me/share',
            params: {
            text: this.getValue('title'),
            url: this.getValue('url'),
            },
        },
        reddit: {
            shareUrl: 'https://www.reddit.com/submit',
            params: { url: this.getValue('url'), title: this.getValue('title') },
        },
        },
        s = sharers[sharer];

    // custom popups sizes
    if (s) {
        s.width = this.getValue('width');
        s.height = this.getValue('height');
    }
    return s !== undefined ? this.urlSharer(s) : false;
    },
    /**
     * @event urlSharer
     * @param {Object} sharer
     */
    urlSharer: function (sharer) {
    var p = sharer.params || {},
        keys = Object.keys(p),
        i,
        str = keys.length > 0 ? '?' : '';
    for (i = 0; i < keys.length; i++) {
        if (str !== '?') {
        str += '&';
        }
        if (p[keys[i]]) {
        str += keys[i] + '=' + encodeURIComponent(p[keys[i]]);
        }
    }
    sharer.shareUrl += str;

    var isLink = this.getValue('link') === 'true';
    var isBlank = this.getValue('blank') === 'true';

    if (isLink) {
        if (isBlank) {
        window.open(sharer.shareUrl, '_blank');
        } else {
        window.location.href = sharer.shareUrl;
        }
    } else {
        // defaults to popup if no data-link is provided
        var popWidth = sharer.width || 600,
        popHeight = sharer.height || 480,
        left = window.innerWidth / 2 - popWidth / 2 + window.screenX,
        top = window.innerHeight / 2 - popHeight / 2 + window.screenY,
        popParams = 'scrollbars=no, width=' + popWidth + ', height=' + popHeight + ', top=' + top + ', left=' + left,
        newWindow = window.open(sharer.shareUrl, '', popParams);

        if (window.focus) {
        newWindow.focus();
        }
    }
    },
};

class SavvySharer {
    constructor() {
        if (document.readyState != "loading") {
            Sharer.init();
        }
        else {
            document.addEventListener("DOMContentLoaded", () => {
                Sharer.init();
            });
        }

        /**
         * exporting sharer for external usage
         */
        window.Sharer = Sharer;
    }
}

export default SavvySharer;