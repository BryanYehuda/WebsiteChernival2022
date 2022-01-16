/**
 * Support Plugin
 *
 * @version 2.3.4
 * @author Vivid Planet Software GmbH
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
(function ($, window, document, undefined) {
  const { style } = $('<support>').get(0);
  const prefixes = 'Webkit Moz O ms'.split(' ');
  const events = {
    transition: {
      end: {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'oTransitionEnd',
        transition: 'transitionend',
      },
    },
    animation: {
      end: {
        WebkitAnimation: 'webkitAnimationEnd',
        MozAnimation: 'animationend',
        OAnimation: 'oAnimationEnd',
        animation: 'animationend',
      },
    },
  };
  const tests = {
    csstransforms() {
      return !!test('transform');
    },
    csstransforms3d() {
      return !!test('perspective');
    },
    csstransitions() {
      return !!test('transition');
    },
    cssanimations() {
      return !!test('animation');
    },
  };

  function test(property, prefixed) {
    let result = false;
    const upper = property.charAt(0).toUpperCase() + property.slice(1);

    $.each((`${property} ${prefixes.join(`${upper} `)}${upper}`).split(' '), (i, property) => {
      if (style[property] !== undefined) {
        result = prefixed ? property : true;
        return false;
      }
    });

    return result;
  }

  function prefixed(property) {
    return test(property, true);
  }

  if (tests.csstransitions()) {
    /* jshint -W053 */
    $.support.transition = new String(prefixed('transition'));
    $.support.transition.end = events.transition.end[$.support.transition];
  }

  if (tests.cssanimations()) {
    /* jshint -W053 */
    $.support.animation = new String(prefixed('animation'));
    $.support.animation.end = events.animation.end[$.support.animation];
  }

  if (tests.csstransforms()) {
    /* jshint -W053 */
    $.support.transform = new String(prefixed('transform'));
    $.support.transform3d = tests.csstransforms3d();
  }
}(window.Zepto || window.jQuery, window, document));
