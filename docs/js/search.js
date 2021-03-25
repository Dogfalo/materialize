(function ($) {
  $(document).ready(function() {
    window.index = lunr(function () {
      this.field('tags', {boost: 10});
      this.field('body');
      this.ref('id');
    });
    window.index.pipeline.reset();

    window.indexStore = [
      {
        href: 'about.html',
        title: 'About',
        tags: 'about',
        body: 'Created and designed by Google, Material Design is a design language that combines the classic principles of successful design along with innovation and technology. Google"s goal is to develop a system of design that allows for a unified user experience across all their products on any platform.'
      }, {
        href: 'badges.html',
        title: 'Components > Badges',
        tags: 'badge components',
        body: 'Badges can notify you that there are new or unread messages or notifications.'
      }, {
        href: 'breadcrumbs.html',
        title: 'Components > Breadcrumbs',
        tags: 'breadcrumb components',
        body: 'Breadcrumbs are a good way to display your current location. This is usually used when you have multiple layers of content.'
      }, {
        href: 'buttons.html',
        title: 'Components > Buttons',
        tags: 'button components',
        body: 'There are 3 main button types described in material design. The raised button is a standard button that signify actions and seek to give depth to a mostly flat page. The floating circular action button is meant for very important functions. Flat buttons are usually used within elements that already have depth like cards or modals.'
      }, {
        href: 'cards.html',
        title: 'Components > Cards',
        tags: 'card components',
        body: 'Cards are a convenient means of displaying content composed of different types of objects. They’re also well-suited for presenting similar objects whose size or supported actions can vary considerably, like photos with captions of variable length.'
      }, {
        href: 'collections.html',
        title: 'Components > Collections',
        tags: 'collection components',
        body: 'Collections allow you to group list objects together.'
      }, {
        href: 'floating-action-button.html',
        title: 'Components > Floating Action Button',
        tags: 'floating action button fab component',
        body: 'If you want a fixed floating action button, you can add multiple actions that will appear on hover.'
      }, {
        href: 'footer.html',
        title: 'Components > Footer',
        tags: 'footer components',
        body: 'Footers are a great way to organize a lot of site navigation and information at the end of a page. This is where the user will look once hes finished scrolling through the current page or is looking for additional information about your website.'
      }, {
        href: 'icons.html',
        title: 'Components > Icons',
        tags: 'icon components',
        body: 'We have included 740 Material Design Icons courtesy of Google'
      }, {
        href: 'navbar.html',
        title: 'Components > Navbar',
        tags: 'navbar components',
        body: 'The navbar is fully contained by an HTML5 Nav tag. Inside a recommended container div, there are 2 main parts of the navbar. A logo or brand link, and the navigations links. You can align these links to the left or right.'
      }, {
        href: 'pagination.html',
        title: 'Components > Pagination',
        tags: 'pagination components',
        body: 'Add pagination links to help split up your long content into shorter, easier to understand blocks.'
      }, {
        href: 'preloader.html',
        title: 'Components > Preloader',
        tags: 'preloader components progress bar circle',
        body: 'If you have content that will take a long time to load, you should give the user feedback. For this reason we provide a number activity + progress indicators.'
      }, {
        href: 'color.html',
        title: 'CSS > Color',
        tags: 'color css',
        body: 'Here is a color palette based on the material design base colors. Each of these colors is defined with a base color class and an optional lighten or darken class.'
      }, {
        href: 'grid.html',
        title: 'CSS > Grid',
        tags: 'grid css',
        body: 'We are using a standard 12 column fluid responsive grid system. The grid helps you layout your page in an ordered, easy fashion.'
      }, {
        href: 'helpers.html',
        title: 'CSS > Helpers',
        tags: 'helper css align float hide show format formatting',
        body: 'helper classes'
      }, {
        href: 'media-css.html',
        title: 'CSS > Media',
        tags: 'media css responsive',
        body: 'Media CSS classes'
      }, {
        href: 'pulse.html',
        title: 'CSS > Pulse',
        tags: 'pulse css',
        body: 'Draw attention to your buttons with this subtle but captivating effect.'
      }, {
        href: 'sass.html',
        title: 'CSS > Sass',
        tags: 'sass css',
        body: 'When using Sass, you can change the color scheme of your site extremely quickly.'
      }, {
        href: 'shadow.html',
        title: 'CSS > Shadow',
        tags: 'shadow css',
        body: 'In material design, everything should have a certain z-depth that determines how far raised or close to the page the element is.'
      }, {
        href: 'table.html',
        title: 'CSS > Table',
        tags: 'table css',
        body: 'Tables are a nice way to organize a lot of data. We provide a few utility classes to help you style your table as easily as possible.'
      }, {
        href: 'css-transitions.html',
        title: 'CSS > Transitions',
        tags: 'transition css',
        body: 'We\'ve made some custom animation classes that will transition your content with only CSS. Each CSS transition consists of a base class that applies the necessary styles and additional classes that control the state of the transition.'
      }, {
        href: 'typography.html',
        title: 'CSS > Typography',
        tags: 'typography css',
        body: 'font, headers, blockquotes, flow text.'
      }, {
        href: 'autocomplete.html',
        title: 'Forms > Autocomplete',
        tags: 'autocomplete forms',
        body: 'Add an autocomplete dropdown below your input to suggest possible values in your form. You can populate the list of autocomplete options dynamically as well.'
      }, {
        href: 'checkboxes.html',
        title: 'Forms > Checkboxes',
        tags: 'checkbox forms',
        body: 'Use checkboxes when looking for yes or no answers. The for attribute is necessary to bind our custom checkbox with the input. Add the input\'s id as the value of the for attribute of the label.'
      }, {
        href: 'chips.html',
        title: 'Forms > Chips',
        tags: 'chip forms',
        body: 'Chips can be used to represent small blocks of information. They are most commonly used either for contacts or for tags.'
      }, {
        href: 'pickers.html',
        title: 'Forms > Pickers',
        tags: 'date time picker forms',
        body: 'Pickers provide a simple way to select a date or time.'
      }, {
        href: 'radio-buttons.html',
        title: 'Forms > Radio Buttons',
        tags: 'radio button forms',
        body: 'Radio Buttons are used when the user must make only one selection out of a group of items.'
      }, {
        href: 'range.html',
        title: 'Forms > Range',
        tags: 'range forms slider',
        body: 'Add a range slider for values with a wide range.'
      }, {
        href: 'select.html',
        title: 'Forms > Select',
        tags: 'select forms',
        body: 'Select allows user input through specified options.'
      }, {
        href: 'switches.html',
        title: 'Forms > Switches',
        tags: 'switch forms',
        body: 'Switches are special checkboxes used for binary states such as on / off'
      }, {
        href: 'text-inputs.html',
        title: 'Forms > Text Inputs',
        tags: 'text input forms field',
        body: 'Text fields allow user input. The border should light up simply and clearly indicating which field the user is currently editing.'
      }, {
        href: 'fullscreen-slider-demo.html',
        title: 'Fullscreen Slider Demo',
        tags: 'fullscreen slider demo',
        body: 'Fullscreen slider demo'
      }, {
        href: 'getting-started.html',
        title: 'Getting Started',
        tags: 'getting started install installation cdn download setup',
        body: 'Learn how to easily start using Materialize in your website.'
      }, {
        href: 'auto-init.html',
        title: 'JavaScript > Auto Init',
        tags: 'auto init javascript js',
        body: 'Auto Init allows you to initialize all of the Materialize Components with a single function call. It is important to note that you cannot pass in options using this method.'
      }, {
        href: 'carousel.html',
        title: 'JavaScript > Carousel',
        tags: 'carousel javascript js',
        body: 'Our Carousel is a robust and versatile component that can be an image slider, to an item carousel, to an onboarding experience.'
      }, {
        href: 'collapsible.html',
        title: 'JavaScript > Collapsible',
        tags: 'collapsible javascript js',
        body: 'Collapsibles are accordion elements that expand when clicked on. They allow you to hide content that is not immediately relevant to the user.'
      }, {
        href: 'dropdown.html',
        title: 'JavaScript > Dropdown',
        tags: 'dropdown javascript js',
        body: 'Add a dropdown list to any button.'
      }, {
        href: 'feature-discovery.html',
        title: 'JavaScript > Feature Discovery',
        tags: 'feature discovery javascript js',
        body: 'Provide value and encourage return visits by introducing users to new features and functionality at contextually relevant moments.'
      }, {
        href: 'media.html',
        title: 'JavaScript > Media',
        tags: 'media javascript js slider materialbox',
        body: 'Media components include things that have to do with large media objects like Images, Video, Audio, etc.'
      }, {
        href: 'modals.html',
        title: 'JavaScript > Modals',
        tags: 'modal javascript js',
        body: 'Use a modal for dialog boxes, confirmation messages, or other content that can be called up.'
      }, {
        href: 'parallax.html',
        title: 'JavaScript > Parallax',
        tags: 'parallax javascript js',
        body: 'Parallax is an effect where the background content or image in this case, is moved at a different speed than the foreground content while scrolling.'
      }, {
        href: 'pushpin.html',
        title: 'JavaScript > Pushpin',
        tags: 'pushpin javascript js',
        body: 'Pushpin is our fixed positioning plugin. You can check out our live examples: the fixed Table of Contents on the right.'
      }, {
        href: 'scrollspy.html',
        title: 'JavaScript > Scrollspy',
        tags: 'scrollspy javascript js',
        body: 'Scrollspy is a jQuery plugin that tracks certain elements and which element the users screen is currently centered on.'
      }, {
        href: 'sidenav.html',
        title: 'JavaScript > Sidenav',
        tags: 'sidenav javascript js side nav',
        body: 'This is a slide out menu. You can add a dropdown to your sidebar by using our collapsible component.'
      }, {
        href: 'tabs.html',
        title: 'JavaScript > Tabs',
        tags: 'tab javascript js',
        body: 'The tabs structure consists of an unordered list of tabs that have hashes corresponding to tab ids. Then when you click on each tab, only the container with the corresponding tab id will become visible.'
      }, {
        href: 'toasts.html',
        title: 'JavaScript > Toasts',
        tags: 'toast javascript js',
        body: 'Materialize provides an easy way for you to send unobtrusive alerts to your users through toasts. These toasts are also placed and sized responsively, try it out by clicking the button below on different device sizes.'
      }, {
        href: 'tooltips.html',
        title: 'Javascript > Tooltips',
        tags: 'tooltip javascript js',
        body: 'Tooltips are small, interactive, textual hints for mainly graphical elements. When using icons for actions you can use a tooltip to give people clarification on its function.'
      }, {
        href: 'waves.html',
        title: 'JavaScript > Waves',
        tags: 'wave javascript js',
        body: 'Waves is an external library that weve included in Materialize to allow us to create the ink effect outlined in Material Design'
      }, {
        href: 'mobile.html',
        title: 'Mobile',
        tags: 'mobile',
        body: 'Mobile only interactive components.'
      }
    ];

    window.indexStore.forEach(function(index, id) {
      index.id = id;
      window.index.add(index);
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

    $('input#search').on('keyup', debounce(function (e) {
      if ($(this).val() < 2) {
        renderResults([]);
        return;
      }

      if (e.which === 38 || e.which === 40 || e.keyCode === 13) return;

      var query = $(this).val();
      var results = window.index.search(query).slice(0, 6).map(function (result) {
        result = window.indexStore[result.ref];
        return [result.title, result.href];
      });
      renderResults(results);
    }));


    $('input#search').on('keydown', debounce(function (e) {
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
