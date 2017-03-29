/**
 * @file dropdown.js
 * @author simpart
 */
require('mofron-comp-text');
require('mofron-comp-form');
require('mofron-event-common');

/**
 * @class mofron.comp.DropDown
 * @brief DropDown Component class
 */
mofron.comp.DropDown = class extends mofron.comp.Form {
    /**
     * initialize DOM contents
     * 
     * @param prm (object) : Date object
     */
    initDomConts (prm) {
        try {
            this.name('DropDown');
            this.vdom().addChild(
                new mofron.Dom('select',this)
            );
            
            if ( (null !== prm) && (undefined !== prm[0]) ) {
                var set_chd = null;
                for (var idx in prm) {
                    if ('string' === typeof prm[idx]) {
                        set_chd = new mofron.comp.Text(prm[idx]);
                    } else if (true === mofron.func.isInclude(prm[idx], 'Component')) {
                        set_chd = prm[idx];
                    } else {
                        throw new Error('invalid parameter');
                    }
                    set_chd.target().tag('option');
                    this.addChild(set_chd);
                }
            } else {
                throw new Error('invalid paramter');
            }
            
            var evt_fnc = function (dd_obj) {
                              try {
                                  var chg_evt = dd_obj.changeEvent();
                                  if (null !== chg_evt) {
                                      chg_evt(dd_obj);
                                  }
                              } catch (e) {
                                  console.error(e.stack);
                                  throw e;
                              }
                          };
            this.addEvent(
                new mofron.event.Common({
                    handler   : new mofron.Param(evt_fnc,this),
                    eventName : 'onchange'
                })
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    changeEvent (fnc) {
        try {
            if (undefined === fnc) {
                /* getter */
                return (undefined === this.m_chgevt) ? null : this.m_chgevt;
            }
            /* setter */
            if ('function' !== typeof fnc) {
                throw new Error('invalid parameter');
            }
            this.m_chgevt = fnc;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    size (hei, wid) {
        try {
            if ((undefined === hei) && (undefined === wid)) {
                /* getter */
                return [this.style('height'), this.style('width')];
            }
            /* setter */
            var height = ('number' === typeof hei) ? (hei + 'px') : hei;
            var fontsz = ('number' === typeof hei) ? (hei - 10)   : hei;
            var width  = ('number' === typeof wid) ? (wid + 'px') : wid;
            if (undefined !== height) {
                this.style({'height' : height});
            }
            if (undefined !== width) {
                this.style({'width'  : width});
            }
            
            var chd = this.child();
            for (var idx in chd) {
                if (undefined !== fontsz) {
                    if ( ('number' === typeof fontsz) && (5 > fontsz) ) {
                        fontsz = 5;
                    }
                    chd[idx].style({
                        'font-size' : ('number' === typeof fontsz) ? fontsz + 'px' : fontsz
                    });
                }
                if (undefined !== width) {
                    chd[idx].style({'width'  : width});
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    select (idx) {
        try {
            if (undefined === idx) {
                /* getter */
                var ret_val = new Array();
                for (var loop=0; loop < this.child().length ;loop++) {
                    if (true === this.isSelect(loop)) {
                        return loop;
                    }
                }
                return ret_val;
            }
            /* setter */
            this.vdom();
            var chd = this.child();
            if (undefined === chd[idx]) {
                throw new Error('invalid parameter');
            }
            if (false === this.vdom().isPushed()) {
                chd[idx].target().attr('selected', null);
            } else {
                chd[idx].target().prop('selected', true);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    isSelect (idx) {
        try {
            var chd = this.child();
            if (undefined === chd[idx]) {
                throw new Error('invalid parameter');
            }
            var ret_val = chd[idx].target().prop('selected');
            return (null === ret_val) ? false : ret_val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    value () {
        try {
            return this.select();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
mofron.comp.dropdown = {};
module.exports = mofron.comp.DropDown;
