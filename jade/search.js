(function ($) {
  $(document).ready(function() {
    window.index = lunr(function () {
      this.field('title', {boost: 10});
      this.field('body');
      this.ref('href');
    });
    window.index.pipeline.reset();

    window.index.add({
      href: 'http://materializecss.com/about.html',
      title: 'About',
      body: 'Created and designed by Google, Material Design is a design language that combines the classic principles of successful design along with innovation and technology. Google"s goal is to develop a system of design that allows for a unified user experience across all their products on any platform.'
    });

    window.index.add({
      href: 'http://materializecss.com/badges.html',
      title: 'Badges',
      body: 'Badges can notify you that there are new or unread messages or notifications.'
    });

    window.index.add({
      href: 'http://materializecss.com/buttons.html',
      title: 'Buttons',
      body: 'There are 3 main button types described in material design. The raised button is a standard button that signify actions and seek to give depth to a mostly flat page. The floating circular action button is meant for very important functions. Flat buttons are usually used within elements that already have depth like cards or modals.'
    });

    window.index.add({
      href: 'http://materializecss.com/breadcrumbs.html',
      title: 'Breadcrumbs',
      body: 'There are 3 main button types described in material design. The raised button is a standard button that signify actions and seek to give depth to a mostly flat page. The floating circular action button is meant for very important functions. Flat buttons are usually used within elements that already have depth like cards or modals.'
    });

    window.index.add({
      href: 'http://materializecss.com/cards.html',
      title: 'Cards',
      body: 'Breadcrumbs are a good way to display your current location. This is usually used when you have multiple layers of content.'
    });

    window.index.add({
      href: 'http://materializecss.com/chips.html',
      title: 'Chips',
      body: 'Chips can be used to represent small blocks of information. They are most commonly used either for contacts or for tags.'
    });

    window.index.add({
      href: 'http://materializecss.com/collapsible.html',
      title: 'Collapsible',
      body: 'Collapsibles are accordion elements that expand when clicked on. They allow you to hide content that is not immediately relevant to the user.'
    });

    window.index.add({
      href: 'http://materializecss.com/collections.html',
      title: 'Collections',
      body: 'Collections allow you to group list objects together.'
    });

    window.index.add({
      href: 'http://materializecss.com/color.html',
      title: 'Color',
      body: 'Here is a color palette based on the material design base colors. Each of these colors is defined with a base color class and an optional lighten or darken class.'
    });

    window.index.add({
      href: 'http://materializecss.com/dialogs.html',
      title: 'dialogs tooltips toasts',
      body: 'Dialogs are content that are not original visible on a page but show up with extra information if needed. The transitions should make the appearance of the dialog make sense and not jarring to the user.'
    });

    window.index.add({
      href: 'http://materializecss.com/dropdown.html',
      title: 'dropdown',
      body: 'Add a dropdown list to any button.'
    });

    window.index.add({
      href: 'http://materializecss.com/footer.html',
      title: 'footer',
      body: 'Footers are a great way to organize a lot of site navigation and information at the end of a page. This is where the user will look once hes finished scrolling through the current page or is looking for additional information about your website.'
    });

    window.index.add({
      href: 'http://materializecss.com/forms.html',
      title: 'forms select radio checkbox switch range textarea',
      body: 'Forms are the standard way to receive user inputted data. The transitions and smoothness of these elements are very important because of the inherent user interaction associated with forms.'
    });

    window.index.add({
      href: 'http://materializecss.com/fullscreen-slider-demo.html',
      title: 'Fullscreen slider demo',
      body: 'Fullscreen slider demo'
    });

    window.index.add({
      href: 'http://materializecss.com/getting-started.html',
      title: 'Getting Started',
      body: 'Learn how to easily start using Materialize in your website.'
    });

    window.index.add({
      href: 'http://materializecss.com/grid.html',
      title: 'Grid',
      body: 'We are using a standard 12 column fluid responsive grid system. The grid helps you layout your page in an ordered, easy fashion.'
    });

    window.index.add({
      href: 'http://materializecss.com/helpers.html',
      title: 'Helpers',
      body: 'helper classes'
    });

    window.index.add({
      href: 'http://materializecss.com/icons.html',
      title: 'icons',
      body: 'We have included 740 Material Design Icons courtesy of Google'
    });

    window.index.add({
      href: 'http://materializecss.com/media-css.html',
      title: 'Media CSS',
      body: 'Media CSS classes'
    });

    window.index.add({
      href: 'http://materializecss.com/media.html',
      title: 'Media JavaScript slider materialbox',
      body: 'Media components include things that have to do with large media objects like Images, Video, Audio, etc.'
    });

    window.index.add({
      href: 'http://materializecss.com/mobile.html',
      title: 'Mobile',
      body: 'Mobile only interactive components.'
    });

    window.index.add({
      href: 'http://materializecss.com/modals.html',
      title: 'modals',
      body: 'Use a modal for dialog boxes, confirmation messages, or other content that can be called up.'
    });

    window.index.add({
      href: 'http://materializecss.com/navbar.html',
      title: 'navbar',
      body: 'The navbar is fully contained by an HTML5 Nav tag. Inside a recommended container div, there are 2 main parts of the navbar. A logo or brand link, and the navigations links. You can align these links to the left or right.'
    });

    window.index.add({
      href: 'http://materializecss.com/pagination.html',
      title: 'pagination',
      body: 'Add pagination links to help split up your long content into shorter, easier to understand blocks.'
    });

    window.index.add({
      href: 'http://materializecss.com/parallax.html',
      title: 'parallax',
      body: 'Parallax is an effect where the background content or image in this case, is moved at a different speed than the foreground content while scrolling.'
    });

    window.index.add({
      href: 'http://materializecss.com/preloader.html',
      title: 'preloader',
      body: 'If you have content that will take a long time to load, you should give the user feedback. For this reason we provide a number activity + progress indicators.'
    });

    window.index.add({
      href: 'http://materializecss.com/pushpin.html',
      title: 'Pushpin',
      body: 'Pushpin is our fixed positioning plugin. You can check out our live examples: the fixed Table of Contents on the right.'
    });

    window.index.add({
      href: 'http://materializecss.com/sass.html',
      title: 'Sass',
      body: 'When using Sass, you can change the color scheme of your site extremely quickly.'
    });

    window.index.add({
      href: 'http://materializecss.com/scrollfire.html',
      title: 'scrollFire',
      body: 'ScrollFire is a jQuery Plugin that executes callback functions depending on how far into the page you"ve scrolled.'
    });

    window.index.add({
      href: 'http://materializecss.com/scrollspy.html',
      title: 'scrollspy',
      body: 'Scrollspy is a jQuery plugin that tracks certain elements and which element the users screen is currently centered on.'
    });

    window.index.add({
      href: 'http://materializecss.com/shadow.html',
      title: 'shadow',
      body: 'In material design, everything should have a certain z-depth that determines how far raised or close to the page the element is.'
    });

    window.index.add({
      href: 'http://materializecss.com/showcase.html',
      title: 'showcase',
      body: 'Here is our showcase of websites that use materialize.'
    });

    window.index.add({
      href: 'http://materializecss.com/side-nav.html',
      title: 'sideNav side Nav',
      body: 'This is a slide out menu. You can add a dropdown to your sidebar by using our collapsible component.'
    });

    window.index.add({
      href: 'http://materializecss.com/table.html',
      title: 'table',
      body: 'Tables are a nice way to organize a lot of data. We provide a few utility classes to help you style your table as easily as possible.'
    });

    window.index.add({
      href: 'http://materializecss.com/tabs.html',
      title: 'tabs',
      body: 'The tabs structure consists of an unordered list of tabs that have hashes corresponding to tab ids. Then when you click on each tab, only the container with the corresponding tab id will become visible.'
    });

    window.index.add({
      href: 'http://materializecss.com/transitions.html',
      title: 'transitions animation',
      body: 'Weve made some custom animation functions that will transition your content.'
    });

    window.index.add({
      href: 'http://materializecss.com/typography.html',
      title: 'Typography',
      body: 'font, headers, blockquotes, flow text.'
    });

    window.index.add({
      href: 'http://materializecss.com/waves.html',
      title: 'waves',
      body: 'Waves is an external library that weve included in Materialize to allow us to create the ink effect outlined in Material Design'
    });

    // icon click
    $('ul#nav-mobile li.search .search-wrapper i.material-icons').click(function() {
      if ($('.search-results .focused').length) {
        $('.search-results .focused').first()[0].click();
      } else if ($('.search-results').children().length) {
        $('.search-results').children().first()[0].click();
      }
    });

    var renderResults = function(results) {
      var resultsContainer = $('.search-results');
      resultsContainer.empty();
      Array.prototype.forEach.call(results, function(result) {
        var resultDiv = $('<a href=' + result[1] + '>' + result[0] + '</a>');
        resultsContainer.append(resultDiv);
      });
    };

    var debounce = function (fn) {
      var timeout;
      return function () {
        var args = Array.prototype.slice.call(arguments),
            ctx = this;

        clearTimeout(timeout);
        timeout = setTimeout(function () {
          fn.apply(ctx, args);
        }, 100);
      };
    };

    $('input#search').focus(function() { $(this).parent().addClass('focused'); });
    $('input#search').blur(function() {
      if (!$(this).val()) {
        $(this).parent().removeClass('focused');
      }
    });

    $('input#search').bind('keyup', debounce(function (e) {
      if ($(this).val() < 2) {
        renderResults([]);
        return;
      }

      if (e.which === 38 || e.which === 40 || e.keyCode === 13) return;

      var query = $(this).val();
      var results = window.index.search(query).slice(0, 6).map(function (result) {
        var href = result.ref.split('http://materializecss.com/')[1];
        return [href.charAt(0).toUpperCase() + href.slice(1), result.ref];
      });
      renderResults(results);
    }));


    $('input#search').bind('keydown', debounce(function (e) {
      // Escape.
      if (e.keyCode === 27) {
        $(this).val('');
        $(this).blur();
        renderResults([]);
        return;
      } else if (e.keyCode === 13) {
        // enter
        if ($('.search-results .focused').length) {
          $('.search-results .focused').first()[0].click();
        } else if ($('.search-results').children().length) {
          $('.search-results').children().first()[0].click();
        }
        return;
      }

      // Arrow keys.
      var focused;
      switch(e.which) {
        case 38: // up
          if ($('.search-results .focused').length) {
            focused = $('.search-results .focused');
            focused.removeClass('focused');
            focused.prev().addClass('focused');
          }
          break;

        case 40: // down
          if (!$('.search-results .focused').length) {
            focused = $('.search-results').children().first();
            focused.addClass('focused');
          } else {
            focused = $('.search-results .focused');
            if (focused.next().length) {
              focused.removeClass('focused');
              focused.next().addClass('focused');
            }
          }
          break;

        default: return; // exit this handler for other keys
      }
      e.preventDefault();
    }));



  });
}( jQuery ));