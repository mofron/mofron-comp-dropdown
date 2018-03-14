/**
 * @file dropdown.js
 * @author simpart
 */
let mf       = require('mofron');
let Text     = require('mofron-comp-text');
let FormItem = require('mofron-comp-formitem');
let eCom     = require('mofron-event-common');

/**
 * @class mofron.comp.DropDown
 * @brief DropDown Component class
 */
mf.comp.DropDown = class extends FormItem {
    
    /**
     * initialize inputtext component
     * 
     * @param po : (array) contents
     * @param po : (object) option
     */
    constructor (po) {
        try {
            super();
            this.name('DropDown');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    /**
     * initialize DOM contents
     * 
     * @param prm (object) : Date object
     */
    initDomConts (prm) {
        try {
            super.initDomConts();
            let sel = new mf.Dom('select',this);
            this.target().addChild(sel);
            this.target(sel);
            this.styleTgt(sel);
            
            if (undefined != prm) {
                for (let pidx in prm) {
                    if ('string' === typeof prm[pidx]) {
                        this.addChild(new Text(prm[pidx]));
                    }else if (true === mf.func.isInclude(prm[pidx], 'Component')) {
                        this.addChild(prm[pidx]);
                    } else {
                        throw new Error('invalid parameter');
                    }
                }
            }
            
            let evt_fnc = (dd_obj) => {
                try {
                    let chg_evt = dd_obj.changeEvent();
                    if (null !== chg_evt) {
                        chg_evt(dd_obj);
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            };
            this.addEvent(
                new eCom({
                    handler   : new mf.Param(evt_fnc, this),
                    eventName : 'onchange'
                })
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild (chd, idx) {
        try {
            if (null !== this.height()) {
                if (true === mf.func.isInclude(chd, 'Text')) {
                    chd.size(this.height());
                }
            }
            if (0 !== this.child().length) {
                chd.target().tag('option');
            }
            super.addChild(chd, idx);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    size (x, y) {
        try {
            let ret = super.size(x, y);
            if (undefined !== y) {
                /* setter */
                let chd = this.child();
                for (let idx in chd) {
                    if (true === mf.func.isInclude(chd[idx], 'Text')) {
                        chd[idx].size(y);
                    } else {
                        chd[idx].height(y);
                    }
                }
            }
            return ret;
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
module.exports = mofron.comp.DropDown;
/* end of file */
