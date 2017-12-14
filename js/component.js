class Component {
  /**
   * Generic constructor for all components
   * @constructor
   * @param {Element} el
   * @param {Object} options
   */
  constructor(classDef, el, options) {
    if (!(el instanceof Element)) {
      console.error( Error(el + ' is not an HTML Element'));
    }

    // If exists, destroy and reinitialize
    let ins = classDef.getInstance(el);
    if (!!ins) {
      console.log('destroy', ins);
      ins.destroy();
    }

  }


  /**
   * Initializes components
   * @param {class} classDef
   * @param {Element | NodeList | jQuery} els
   * @param {Object} options
   */
  static init(classDef, els, options) {
    let instances;
    if (els instanceof Element) {
      instances = new classDef(els, options);

    } else if (!!els.jquery || els instanceof NodeList) {
      let instancesArr = [];
      for (var i = 0; i < els.length; i++) {
        instancesArr.push(new classDef(els[i], options));
      }
      instances = instancesArr;
    }

    return instances;
  }
}
