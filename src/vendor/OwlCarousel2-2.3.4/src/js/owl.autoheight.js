/**
 * AutoHeight Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
(function ($, window, document, undefined) {
  /**
	 * Creates the auto height plugin.
	 * @class The Auto Height Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
  var AutoHeight = function (carousel) {
    /**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
    this._core = carousel;

    this._previousHeight = null;

    /**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
    this._handlers = {
      'initialized.owl.carousel refreshed.owl.carousel': $.proxy(function (e) {
        if (e.namespace && this._core.settings.autoHeight) {
          this.update();
        }
      }, this),
      'changed.owl.carousel': $.proxy(function (e) {
        if (e.namespace && this._core.settings.autoHeight && e.property.name === 'position') {
          this.update();
        }
      }, this),
      'loaded.owl.lazy': $.proxy(function (e) {
        if (e.namespace && this._core.settings.autoHeight
					&& e.element.closest(`.${this._core.settings.itemClass}`).index() === this._core.current()) {
          this.update();
        }
      }, this),
    };

    // set default options
    this._core.options = $.extend({}, AutoHeight.Defaults, this._core.options);

    // register event handlers
    this._core.$element.on(this._handlers);
    this._intervalId = null;
    const refThis = this;

    // These changes have been taken from a PR by gavrochelegnou proposed in #1575
    // and have been made compatible with the latest jQuery version
    $(window).on('load', () => {
      if (refThis._core.settings.autoHeight) {
        refThis.update();
      }
    });

    // Autoresize the height of the carousel when window is resized
    // When carousel has images, the height is dependent on the width
    // and should also change on resize
    $(window).resize(() => {
      if (refThis._core.settings.autoHeight) {
        if (refThis._intervalId != null) {
          clearTimeout(refThis._intervalId);
        }

        refThis._intervalId = setTimeout(() => {
          refThis.update();
        }, 250);
      }
    });
  };

  /**
	 * Default options.
	 * @public
	 */
  AutoHeight.Defaults = {
    autoHeight: false,
    autoHeightClass: 'owl-height',
  };

  /**
	 * Updates the view.
	 */
  AutoHeight.prototype.update = function () {
    const start = this._core._current;
    const end = start + this._core.settings.items;
    const lazyLoadEnabled = this._core.settings.lazyLoad;
    const visible = this._core.$stage.children().toArray().slice(start, end);
    const heights = [];
    let maxheight = 0;

    $.each(visible, (index, item) => {
      heights.push($(item).height());
    });

    maxheight = Math.max.apply(null, heights);

    if (maxheight <= 1 && lazyLoadEnabled && this._previousHeight) {
      maxheight = this._previousHeight;
    }

    this._previousHeight = maxheight;

    this._core.$stage.parent()
      .height(maxheight)
      .addClass(this._core.settings.autoHeightClass);
  };

  AutoHeight.prototype.destroy = function () {
    let handler; let
      property;

    for (handler in this._handlers) {
      this._core.$element.off(handler, this._handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] !== 'function' && (this[property] = null);
    }
  };

  $.fn.owlCarousel.Constructor.Plugins.AutoHeight = AutoHeight;
}(window.Zepto || window.jQuery, window, document));
