$('ul.tabs').each(function(){
  // For each set of tabs, we want to keep track of
  // which tab is active and it's associated content
  var $active, $content, $links = $(this).find('li.tab a');
  var $tabs_width = $(this).width();
  var $tab_width = $(this).find('li').first().outerWidth();
  var $index = 0;

  // If the location.hash matches one of the links, use that as the active tab.
  // If no match is found, use the first link as the initial active tab.
  $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
  $active.addClass('active');
  $index = $links.index($('.active'));

  $content = $($active[0].hash);
  


  // append indicator then set indicator width to tab width
  $(this).append('<div class="indicator"></div>');
  var $indicator = $('.indicator');
  $indicator.css({"right": $tabs_width - $tab_width});
  $indicator.css({"left": $index * $tab_width});

  // Hide the remaining content
  $links.not($active).each(function () {
    $(this.hash).hide();
  });
  
  // Bind the click event handler
  $(this).on('click', 'a', function(e){
    // Make the old tab inactive.
    $active.removeClass('active');
    $content.hide();
  
    // Update the variables with the new link and content
    $active = $(this);
    $content = $(this.hash);
  
    // Make the tab active.
    $active.addClass('active');
    var $prev_index = $index;
    $index = $links.index($('.active'));
    $content.show();

    // Update indicator
    if (($index - $prev_index) >= 0) {
      $indicator.animate({"right": $tabs_width - (($index + 1) * $tab_width)}, {duration: 200, queue: false, easing: 'easeOutCubic'});
      setTimeout(function(){
        $indicator.animate({"left": $index * $tab_width}, {duration: 200, queue: false, easing: 'easeOutCubic'});
      }, 70);
    }
    else {
      $indicator.animate({"left": $index * $tab_width}, {duration: 200, queue: false, easing: 'easeOutCubic'});
      setTimeout(function(){
        $indicator.animate({"right": $tabs_width - (($index + 1) * $tab_width)}, {duration: 200, queue: false, easing: 'easeOutCubic'});
      }, 70);
    }
  
    // Prevent the anchor's default click action
    e.preventDefault();
  });
});
