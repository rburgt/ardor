/**
 * Ardor library, a html5 approach to the slider
 *
 *
 * @author  Rob van der Burgt <rburgt@gmail.com>
 */
(function(){
  var defaults = {
    slideSelector : '.slide',

    activeCls : 'active',
    inactiveCls : 'inactive',

    node : null,

    activeIndex : 0
  };

  window.ardor = function( config ){
    config = config || {};

    for ( var key in defaults ){
      if ( !config[key] ){
        this[ '_' + key ] = defaults[key];
      } else {
        this[ '_' + key ] = config[key];
      }
    }
  };

  ardor.prototype = {
    getSlide : function( index ){
      var slide = this._slides[ index ];
      return !!slide ? slide : null;
    },

    activateSlide : function( index ){
      var slide = this._slides[ index ];

      if ( !slide ){
        return false;
      }
      
      this._activeSlide = slide;
      this._activeIndex = index;
    },

    next : function(){
      var activeIndex = this._activeIndex;
    }
  };
})();