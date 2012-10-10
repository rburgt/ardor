/**
 * Ardor library, a html5 approach to the carousel
 *
 * required polyfills for browser support
 * - document.querySelectorAll && Element.prototype.querySelectorAll
 * - Element.prototype.classList
 *
 * @author  Rob van der Burgt <rburgt@gmail.com>
 */ 
(function(){
  var defaultConfig = {
    slideSelector : '.slide',

    activeCls : 'active',
    inactiveCls : 'inactive',

    node : document.body
  };

  var Ardor = function( config ){
    this.resetConfig( config );
  };

  Ardor.prototype = {
    /**
     * resets the ardor configuration, when config key is not
     * set default configuration value will be applied
     *
     * @param  {Object} config
     */
    resetConfig : function( config ){
      config = config || {};

      for ( var key in defaultConfig ){
        this[ '_' + key ] = !config[key] ? defaultConfig[key] : config[key];
      }

      this.detectSlideElements();
    },

    detectSlideElements : function(){
      var slideElements = this._node.querySelectorAll( this._slideSelector );
      
      slideElements = (function(){
        var results = [];
        for (var i = 0, l = slideElements.length; i < l; i++) {
          results.push(slideElements[i]);
        }
        return results;
      })();

      var activateSlideClass = this._activeCls,
        slideCount = slideElements.length,
        activeSlideElement;

      for ( var i = 0; i < slideCount; i++ ){
        slideElement = slideElements[ i ];
        if ( slideElement.classList.contains( activateSlideClass ) ){
          activeSlideElement = slideElement;
          break;
        }
      }

      this._slideCount = slideCount;
      this._slideElements = slideElements;

      if ( activeSlideElement ){
        this._activeIndex = i;
        this._activeSlideElement = activeSlideElement;
      } else if ( slideCount > 0 ) {
        this.activateSlide( 0 );
      }
    },

    getSlideElement : function( index ){
      var slideElement = this._slideElements[ index ];
      return !!slideElement ? slideElement : null;
    },

    activateSlide : function( index ){
      var slideElement = this.getSlideElement( index );

      if ( !slideElement ){
        return false;
      }

      var activeSlideElement = this._activeSlideElement,
        activeCls = this._activeCls,
        inactiveCls = this._inactiveCls;
      
      if ( activeSlideElement ){
        activeSlideElement.classList.remove( activeCls );
        activeSlideElement.classList.add( inactiveCls );
      }

      slideElement.classList.remove( inactiveCls );
      slideElement.classList.add( activeCls );

      this._activeSlideElement = slideElement;
      this._activeIndex = index;
    },

    next : function(){
      this.activateSlide( (this._activeIndex + 1) % this._slideCount );
    },

    previous : function(){
      this.activateSlide( (this._activeIndex - 1) % this._slideCount );
    }
  };

  if (typeof define === "function" && define.amd) {
    define(function() {
        return Ardor;
    });
  } else {
    window.Ardor = Ardor;
  }
})();