(function($){

  $.fn.tabController = function(options) {
    var settings = $.extend({
      beforeChange: function() { },
      afterChange: function() { },
      activeTabClass: 'active',
      activeContentClass: 'active',
      useContentHide: true,
      defaultOpenedTab: null,
      useUrlChange: false
    },options);
     
    var _this = $(this);
    var tabs = [];
    var tabIds = [];

    var init = function() {
      _this.find('a').each(function(index, value) {
        var tabId = removeHash($(this).attr('href'));
        tabIds.push(tabId);
        tabs.push($('#' + tabId));
      })

      if(!settings.defaultOpenedTab) defaultOpenedTab = tabIds[0];

      hideTabs(defaultOpenedTab);
      _this.find('a[href="#' + tabIds[0] + '"]').parent().addClass(settings.activeTabClass);

      _this.find('a').on('click', null, function(e) {
        
        change(removeHash($(this).attr('href')));

        if(settings.useUrlChange) {

        }
        else {
          e.preventDefault();
        }
      });
    }

    var hideTabs = function(except) {
      for(var i=0;i<tabIds.length;i++) {
        if(tabIds[i] !== except) {
          var tab = $('#' + tabIds[i]);
          if(settings.useContentHide) tab.hide();
          tab.removeClass(settings.activeContentClass);
        }
        else {
          var tab = $('#' + tabIds[i]);
          if(settings.useContentHide) tab.show();
          tab.addClass(settings.activeContentClass);
        }
      }
    }

    var removeHash = function(href) {
      return href.substring(1);
    }

    var change = function(tabId) {
        settings.beforeChange();
        hideTabs(tabId);

        var link = _this.find('a[href="#' + tabId + '"]');
        var linkParent = link.parent();
        linkParent.siblings().removeClass(settings.activeTabClass);
        linkParent.addClass(settings.activeTabClass);

        settings.afterChange();
    }

    var changeByUser = function(tabId) {
      change(tabId);

      if(settings.useUrlChange) {
        window.location.hash = tabId;
      }
    }

    init();

    return {
      change: changeByUser
    }
  }
  
}(jQuery));