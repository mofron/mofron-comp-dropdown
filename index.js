/**
 * @file   mofron-comp-dropdown/index.js
 * @brief  dropdown component for mofron
 * @author simpart
 */
const mf       = require("mofron");
const FormItem = require("mofron-comp-formitem");
const Text     = require("mofron-comp-text");
const evCommon = require("mofron-event-oncommon");

mf.comp.DropDown = class extends FormItem {
    
    /**
     * initialize dropdown component
     * 
     * @param 'text' parameter
     * @type private
     */
    constructor (po) {
        try {
            super();
            this.name("DropDown");
            this.prmMap("text");
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @type private
     */
    initDomConts () {
        try {
            super.initDomConts();
            let sel = new mf.Dom("select", this);
            this.target().addChild(sel);
            this.target(sel);
            
            /* init change event */
            let chg_evt = (p1,p2,p3) => {
                try {
                    let cbx_evt = p1.changeEvent();
                    for (let cb_idx in cbx_evt) {
                        cbx_evt[cb_idx][0](p1, p1.select(), cbx_evt[cb_idx][1]);
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            this.event(new evCommon(chg_evt, "onchange"));
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set select index
     *
     * @type private 
     */
    beforeRender () {
        try {
            super.beforeRender();
            if (null !== this.select()) {
                this.select(this.select());
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * select text list
     *
     * @param (string/array) select text contents
     * @return (array) select text contents
     * @type tag parameter
     */
    text (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                let ret = [];
                let chd = this.target().child();
                for (let cidx in chd) {
                    ret.push(chd[cidx].text);
                }
                return (0 === ret.length) ? null : ret;
            }
            /* setter */
            if (true === Array.isArray(prm)) {
                for (let pidx in prm) {
                    this.text(prm[pidx]);
                }
                return;
            }
            if ("string" === typeof prm) {
                this.target().addChild(
                    new mf.Dom({
                        tag: "option", component: this, text: prm
                    })
                );
            } else {
                throw new Error("invalid parameter");
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * item value
     *
     * @param (number) selected index
     * @return (number) selected index
     * @type function
     */
    value (prm, flg) {
        try {
            let opts = this.target().child();
            if (undefined === prm) {
                if (false === this.adom().isPushed()) {
                    return this.member("value", "number");
                }
                /* getter */
                for (let oidx in opts) {
                    if (true === opts[oidx].prop("selected")) {
                        return parseInt(oidx);
                    }
                }
                return null;
            }
            /* setter */
            if ( (undefined === opts[prm]) && (true !== flg) ) {
                if (false === this.adom().isPushed()) {
                    this.member("value", "number", prm);
                    return;
                } else {
                    throw new Error("invalid parameter");
                }
            }
            opts[prm].prop("selected", true);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * item value
     *
     * @param (number) selected index
     * @return (number) selected index
     * @type tag parameter
     */
    select (prm) {
        try { return this.value(prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * clear item value
     *
     * @type function
     */
    clear () {
        try { this.select(0); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.DropDown;
/* end of file */
