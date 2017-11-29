describe("Tabs Plugin", function () {
  beforeEach(function() {
    loadFixtures('tabs/tabsFixture.html');
    $('ul.tabs').tabs();
  });

  describe("Tabs", function () {
    var normalTabs;

    beforeEach(function() {
      normalTabs = $('.tabs.normal');
      window.location.hash = "";
    });

    it("should open to active tab", function () {
      var activeTab = normalTabs.find('.active');
      var activeTabHash = activeTab.attr('href');
      normalTabs.find('.tab a').each(function() {
        var tabHash = $(this).attr('href');
        if (tabHash === activeTabHash) {
          expect($(tabHash)).toBeVisible('active tab content should be visible by default');
        } else {
          expect($(tabHash)).toBeHidden('Tab content should be hidden by default');
        }
      });

      var indicator = normalTabs.find('.indicator');
      expect(indicator).toExist('Indicator should be generated');
      // expect(Math.abs(indicator.offset().left - activeTab.offset().left)).toBeLessThan(1, 'Indicator should be at active tab by default.');
    });

    it("should switch to clicked tab", function (done) {
      var activeTab = normalTabs.find('.active');
      var activeTabHash = activeTab.attr('href');
      var disabledTab = normalTabs.find('.disabled a');
      var disabledTabHash = disabledTab.attr('href');
      var firstTab = normalTabs.find('.tab a').first();
      var firstTabHash = firstTab.attr('href');
      var indicator = normalTabs.find('.indicator');

      expect(indicator).toExist('Indicator should be generated');
      // expect(Math.abs(indicator.offset().left - activeTab.offset().left)).toBeLessThan(1, 'Indicator should be at active tab by default.');

      click(disabledTab[0]);

      setTimeout(function() {
        expect($(activeTabHash)).toBeVisible('Clicking disabled should not change tabs.');
        expect($(disabledTabHash)).toBeHidden('Clicking disabled should not change tabs.');


        click(firstTab[0]);

        setTimeout(function() {
          expect($(activeTabHash)).toBeHidden('Clicking tab should switch to that tab.');
          expect($(firstTabHash)).toBeVisible('Clicking tab should switch to that tab.');
          expect(indicator.offset().left).toEqual(firstTab.offset().left, 'Indicator should move to clicked tab.');
          done();
        }, 400);
      }, 400);
    });

    it("shouldn't hide active tab if clicked while active", function (done) {
      var activeTab = normalTabs.find('.active');
      var activeTabHash = activeTab.attr('href');
      var indicator = normalTabs.find('.indicator');

      expect(indicator).toExist('Indicator should be generated');

      click(activeTab[0]);

      setTimeout(function() {
        expect($(activeTabHash)).toBeVisible('Clicking active tab while active should not hide it.');
        done();
      }, 400);
    });


    it("should horizontally scroll when too many tabs", function (done) {
      var tabsScrollWidth = 0;
      normalTabs.parent().css('width', '400px');
      normalTabs.find('.tab').each(function() {
        setTimeout(function() {
          tabsScrollWidth += $(this).width();
        }, 0);
      });

      setTimeout(function() {
        expect(tabsScrollWidth).toBeGreaterThan(normalTabs.width(), 'Scroll width should exceed tabs width');
        done();
      }, 400);
    });

    it("should programmatically switch tabs", function (done) {
      var activeTab = normalTabs.find('.active');
      var activeTabHash = activeTab.attr('href');
      var firstTab = normalTabs.find('li a').first();
      var firstTabHash = firstTab.attr('href');
      var indicator = normalTabs.find('.indicator');

      normalTabs.find('.tab a').each(function() {
        var tabHash = $(this).attr('href');
        if (tabHash === activeTabHash) {
          expect($(tabHash)).toBeVisible('active tab content should be visible by default');
        } else {
          expect($(tabHash)).toBeHidden('Tab content should be hidden by default');
        }
      });

      normalTabs.tabs('select', 'test1');

      setTimeout(function() {
        expect($(activeTabHash)).toBeHidden('Clicking tab should switch to that tab.');
        expect($(firstTabHash)).toBeVisible('Clicking tab should switch to that tab.');
        expect(indicator.offset().left).toEqual(firstTab.offset().left, 'Indicator should move to clicked tab.');
        done();
      }, 400);
    });

    it("shouldn't error if tab has no associated content", function (done) {
      $('#test8').remove();
      var tabNoContent = $('[href="#test8"]').first();
      expect(tabNoContent.hasClass('active')).toEqual(false, 'Tab should not be selected');
      click($('[href="#test8"]')[0]);

      setTimeout(function() {
        expect(tabNoContent.hasClass('active')).toEqual(true, 'Tab should be selected even with no content');
        done();
      }, 400);
    });

  });
});
