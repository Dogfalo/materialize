class Component {
  /**
   * Generic constructor for all components
   * @constructor
   * @param {Element} el
   * @param {Object} options
   */
  constructor(classDef, el, options) {
    // Display error if el is valid HTML Element
    if (!(el instanceof Element)) {
      
    }

    // If exists, destroy and reinitialize
    let ins = classDef.getInstance(el);
    if (!!ins) {
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
    let instances = null;
    if (els instanceof Element) {
      instances = new classDef(els, options);

    } else if (!!els.jquery || els instanceof NodeList) {
      let instancesArr = [];
      for (let i = 0; i < els.length; i++) {
        instancesArr.push(new classDef(els[i], options));
      }
      instances = instancesArr;
    }

    return instances;
  }
}
