(function ($) {
    
  $.fn.tabs = function () {

    return this.each(function() {

    // For each set of tabs, we want to keep track of
    // which tab is active and its associated content
    var $this = $(this);
    var window_width = $(window).width();

    if (window_width > 480) {
      $this.width('100%');
      // Set Tab Width for each tab
      var $num_tabs = $(this).children('li').length;
      $this.children('li').each(function() {
        $(this).width((100/$num_tabs)+'%');
      });
      var $active, $content, $links = $this.find('li.tab a');
      var $tabs_width = $this.width();
      var $tab_width = $this.find('li').first().outerWidth();
      var $index = 0;
      
      // If the location.hash matches one of the links, use that as the active tab.
      // If no match is found, use the first link as the initial active tab.
      $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
      $active.addClass('active');
      $index = $links.index($('.active'));
      if ($index < 0) {
        $index = 0;
      }

      $content = $($active[0].hash);
      
      // append indicator then set indicator width to tab width
      $this.append('<div class="indicator"></div>');
      var $indicator = $this.find('.indicator');
      if ($tab_width !== 0 && $tabs_width !== 0) {
        $indicator.css({"right": $tabs_width - (($index + 1) * $tab_width)});
        $indicator.css({"left": $index * $tab_width});
      }
      $(window).resize(function () {
        $tabs_width = $this.width();
        $tab_width = $this.find('li').first().outerWidth();    
        $index = $links.index($('.active'));
        if ($index < 0) {
          $index = 0;
        }  
        if ($tab_width !== 0 && $tabs_width !== 0) {
          $indicator.css({"right": $tabs_width - (($index + 1) * $tab_width)});
          $indicator.css({"left": $index * $tab_width});
        }
      });

      // Hide the remaining content
      $links.not($active).each(function () {
        $(this.hash).hide();
      });
      
      // Bind the click event handler
      $this.on('click', 'a', function(e){
        $tabs_width = $this.width();
        $tab_width = $this.find('li').first().outerWidth();

        // Make the old tab inactive.
        $active.removeClass('active');
        $content.hide();
      
        // Update the variables with the new link and content
        $active = $(this);
        $content = $(this.hash);
        $links = $this.find('li.tab a');
      
        // Make the tab active.
        $active.addClass('active');
        var $prev_index = $index;
        $index = $links.index($(this));
        if ($index < 0) {
          $index = 0;
        }
        // Change url to current tab
        window.location.hash = $active.attr('href');
        if (location.hash) {
          window.scrollTo(0, 0);
        }
        
        $content.show();

        // Update indicator
        if (($index - $prev_index) >= 0) {
          $indicator.animate({"right": $tabs_width - (($index + 1) * $tab_width)}, {duration: 325, queue: false, easing: 'easeOutQuad'});
          setTimeout(function(){
            $indicator.animate({"left": $index * $tab_width}, {duration: 300, queue: false, easing: 'easeOutQuad'});
          }, 50);
        }
        else {
          $indicator.animate({"left": $index * $tab_width}, {duration: 325, queue: false, easing: 'easeOutQuad'});
          setTimeout(function(){
            $indicator.animate({"right": $tabs_width - (($index + 1) * $tab_width)}, {duration: 300, queue: false, easing: 'easeOutQuad'});
          }, 20);
        }
      
        // Prevent the anchor's default click action
        e.preventDefault();
      });
    }
    else {
      $this.hide();
    }
  });

  };
}( jQuery ));