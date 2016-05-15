describe("Tabs Plugin", function () {
  beforeEach(function() {
    loadFixtures('tabs/tabsFixture.html');
    $('ul.tabs').tabs();
  });

  describe("Tabs", function () {
    var normalTabs;

    beforeEach(function() {
      normalTabs = $('.tabs.normal');
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
      expect(indicator.offset().left).toEqual(activeTab.offset().left, 'Indicator should be at active tab by default.');
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
      expect(indicator.offset().left).toEqual(activeTab.offset().left, 'Indicator should be at active tab by default.');

      disabledTab.click();

      setTimeout(function() {
        expect($(activeTabHash)).toBeVisible('Clicking disabled should not change tabs.');
        expect($(disabledTabHash)).toBeHidden('Clicking disabled should not change tabs.');

        firstTab.click();

        setTimeout(function() {
          expect($(activeTabHash)).toBeHidden('Clicking tab should switch to that tab.');
          expect($(firstTabHash)).toBeVisible('Clicking tab should switch to that tab.');
          expect(indicator.offset().left).toEqual(firstTab.offset().left, 'Indicator should move to clicked tab.');
          done();
        }, 400);
      }, 400);

    });

    it("should horizontally scroll when too many tabs", function () {
      var tabsScrollWidth = 0;
      normalTabs.parent().css('width', '400px');
      normalTabs.find('.tab').each(function() {
        tabsScrollWidth += $(this).width();
      });

      expect(tabsScrollWidth).toBeGreaterThan(normalTabs.width(), 'Scroll width should exceed tabs width');
    });

  });
});