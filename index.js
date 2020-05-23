/**
 * @file   mofron-comp-dropdown/index.js
 * @brief  dropdown component for mofron
 * @license MIT
 */
const FormItem = require("mofron-comp-formitem");
const Text     = require("mofron-comp-text");
const onCommon = require("mofron-event-oncommon");
const comutl   = mofron.util.common;

module.exports = class extends FormItem {
    /**
     * initialize dropdown component
     * 
     * @param (mixed) 'text' parameter
     *                key-value: component config
     * @short text
     * @type private
     */
    constructor (prm) {
        try {
            super();
            this.name("DropDown");
            this.shortForm("text");
	    /* init config */
	    this.confmng().add("select", { type: "number", init: 0 });
	    /* set config */
	    if (undefined !== prm) {
                this.config(prm);
            }
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
            let sel = new mofron.class.Dom("select", this);
            this.childDom().child(sel);
            this.childDom(sel);
            
	    let rdom = this.rootDom()[0];
	    sel.style().listener("width", (w1,w2,w3) => {
	        rdom.style({ "width" : w2[0] });
	    });
	    sel.style().listener("height", (h1,h2,h3) => {
                rdom.style({ "height" : h2[0] });
            });
            
            /* init change event */
            let cevt = (p1,p2,p3) => {
                try {
                    let chg_evt = p1.changeEvent();
                    for (let cidx in chg_evt) {
                        chg_evt[cidx].exec(p1, p1.select());
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            this.event(new onCommon(cevt,"onchange"));
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
    afterRender () {
        try {
            super.afterRender();
	    this.select((null === this.select()) ? 0 : this.confmng("select"));
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * select text list setter/getter
     *
     * @param (mixed) string:  select text contents
     *                array: select text contents list
     *                undefined: call as getter
     * @return (array) select text contents [string,..]
     *                 null: not set
     * @type parameter
     */
    text (prm, cnf) {
        try {
            if (undefined === prm) {
                /* getter */
		return this.child();
	    }
	    /* setter */
            if (true === Array.isArray(prm)) {
                for (let pidx in prm) {
                    this.text(prm[pidx],cnf);
                }
                return;
	    }
            let buf  = this.childDom();
	    let odom = new mofron.class.Dom("option", this);
            this.childDom().child(odom);
            this.childDom(odom);
	    if ("string" === typeof prm) {
                prm = new Text(prm);
	    }
	    if (undefined !== cnf) {
                prm.config(cnf);
	    }
            this.child(prm);
            this.childDom(buf);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * select index setter/getter
     *
     * @param (number) selected index
     *                 undefined: call as getter
     * @return (mixed) number: selected index
     *                 null: not selected
     * @type parameter
     */
    select (prm) {
        try {
            let opts = this.childDom().child();
            if (undefined === prm) {
	        /* getter */
                if (false === this.isExists()) {
                    return this.confmng("select");
		} else {
                    for (let oidx in opts) {
                        if (true === opts[oidx].props("selected")) {
                            return parseInt(oidx);
                        }
                    }
		}
                return null;
            }
            /* setter */
            if (false === this.isExists()) {
                this.confmng("select", prm);
	    } else {
                if (undefined === opts[prm]) {
                    throw new Error("invalid parameter");
		}
		opts[prm].props({ "selected" : true });
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * item value
     *
     * @param (number) the same as select parameter
     * @return (mixed) the same as select parameter
     * @type parameter
     */
    value (prm) {
        try {
	    return this.select(prm);
	} catch (e) {
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
        try {
	    this.select(0);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
