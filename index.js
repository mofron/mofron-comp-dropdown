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
    constructor (po, lst, idx) {
        try {
            super();
            this.name('DropDown');
            this.prmOpt(po, lst, idx);
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
    initDomConts (lbl, lst, idx) {
        try {
            super.initDomConts(lbl);
            let sel = new mf.Dom('select',this);
            this.target().addChild(sel);
            this.target(sel);
            this.styleTgt(sel);
            
            /* set default */
            if (undefined !== lst) { 
                this.addList(lst);
                this.select((undefined === idx) ? 0 : idx);
            }
            
            /* init change event */
            let evt_fnc = (dd_obj) => {
                try {
                    let chg_evt = dd_obj.changeEvent();
                    if (null !== chg_evt) {
                        for (let eidx in chg_evt) {
                            chg_evt[eidx][0](dd_obj, chg_evt[eidx][1]);
                        }
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
            this.adom();
            var chd = this.child();
            if ('string' === typeof idx) {
                idx = parseInt(idx);
            }
            if (undefined === chd[idx+1]) {
                throw new Error('invalid parameter');
            }
            
            /* clear selected */
            for (let cidx in chd) {
                if (0 == cidx) {
                    continue;
                }
                chd[cidx].target().attr('selected', null);
            }
            if (true === this.target().isPushed()) {
                this.target().getRawDom().selectedIndex = idx;
            } else {
                chd[idx+1].target().attr('selected', "");
            }
            
            /* execute change event */
            let chg_evt = this.changeEvent();
            if (null !== chg_evt) {
                for (let eidx in chg_evt) {
                    chg_evt[eidx][0](this, chg_evt[eidx][1]);
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    isSelect (idx) {
        try {
            var chd = this.child();
            if ('string' === typeof idx) {
                idx = parseInt(idx);
            }
            
            if (undefined === chd[idx+1]) {
                throw new Error('invalid parameter');
            }
            var ret_val = chd[idx+1].target().prop('selected');
            return (null === ret_val) ? false : ret_val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    value (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return this.select();
            }
            /* setter */
            this.select(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addList (prm) {
        try {
            if (true !== Array.isArray(prm)) {
                throw new Error('invalid parameter');
            }
            for (let pidx in prm) {
                if ('string' === typeof prm[pidx]) {
                    this.addChild(new Text(prm[pidx]));
                }else if (true === mf.func.isInclude(prm[pidx], 'Component')) {
                    this.addChild(prm[pidx]);
                } else {
                    throw new Error('invalid parameter');
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    color (prm) {
        try {
            let ret = super.color(prm);
            if (undefined === ret) {
                /* setter */
                let rgb = prm.rgba();
                rgb[0] = (0 > (rgb[0]-30)) ? 0 : rgb[0]-30;
                rgb[1] = (0 > (rgb[1]-30)) ? 0 : rgb[1]-30;
                rgb[2] = (0 > (rgb[2]-30)) ? 0 : rgb[2]-30;
                this.style({
                    'border-color' : new mf.Color(rgb[0], rgb[1], rgb[2]).getStyle()
                });
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    clear () {
        try {
            this.select(0);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.comp.DropDown;
/* end of file */
