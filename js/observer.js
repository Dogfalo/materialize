var observeDOM = (function() {
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
  eventListenerSupported = window.addEventListener;

  return function(obj, callback) {
    if ( MutationObserver ) {
      // define a new observer
      var obs = new MutationObserver(function(mutations, observer){
        if ( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
          callback(mutations);
      });
      // have the observer observe foo for changes in children
      obs.observe( obj, { childList:true, subtree:true });
    }
    else if ( eventListenerSupported ) {
      obj.addEventListener('DOMNodeInserted', callback, false);
      obj.addEventListener('DOMNodeRemoved', callback, false);
    }
     }
    })();

// Observe a specific DOM element:
observeDOM( document.body ,function(mutations){ 
  for (var i = 0; i < mutations.length; i++) {
    var $inserted_obj = $(mutations[i].addedNodes[0]);
    if ($inserted_obj.hasClass('dropdown-button'))
      $inserted_obj.dropdown();
    if ($inserted_obj.hasClass('collapsible'))
      $inserted_obj.collapsible();
    if ($inserted_obj.hasClass('tooltipped'))
      $('.tooltipped').tooltip();
    if ($inserted_obj.hasClass('materialboxed'))
      $inserted_obj.materialbox();
  }
});