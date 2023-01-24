/**
 * @file mofron-comp-dropdown/index.js
 * @brief dropdown component for mofron
 * @license MIT
 */
const Text     = require('mofron-comp-text');
const Frame    = require('mofron-comp-frame');
const Click    = require('mofron-event-click');
const Hover    = require('mofron-event-hover');
const Focus    = require('mofron-event-clkfocus');
const FadePack = require('mofron-effect-fadepack');
const Border   = require('mofron-effect-border');
const ConfArg  = mofron.class.ConfArg;
const comutl   = mofron.util.common;

module.exports = class extends mofron.class.Component {
    /**
     * initialize component
     * 
     * @param (mixed) 
     *                key-value: component config
     * @short 
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname('dropdown');
            
	    /* init config */
            this.confmng().add('indexArrow',  { type:'array' });
	    this.confmng().add('frame',       { type:'function' });
            this.confmng().add('selectEvent', { type:'event', list:true });
            this.confmng().add('accentColor', { type:'color' });
            this.confmng().add('mainColor',   { type:'color' });
            this.m_extend = false;
            
	    if (0 < arguments.length) {
                this.config(p1);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    initDomConts () {
        try {
            super.initDomConts();
            
	    this.indexArrow([
                new Text({ text:'&#9660;', style: { 'margin-left':'0.2rem' }, size:'0.14rem' }),
		new Text({ text:'&#9650;', style: { 'margin-left':'0.2rem' }, size:'0.14rem', visible:false })
	    ]);
	    this.indexFrame().config({
                style: { 'display':'flex', 'align-items':'center' },
                child: new mofron.class.Component({
                           style: { 
			       'display':         'flex',
			       'justify-content': 'center',
			       'width':           '100%',
			       'align-items':     'center'
			   },
                           child: [this.indexText(),this.indexArrow()[0],this.indexArrow()[1]]
                       }),
                event: [
		    new Focus(new ConfArg(this.is_extend,this)),
		    new Click(new ConfArg(this.indexClick,this))
		]
	    });

	    this.frame(Frame);
            let conts_frm = new Frame({
	                        style:   { 'position':'fixed', 'margin-top':'-0.01rem' },
                                height:  null,
	                        effect:  new FadePack(300),
				borderWidth: new ConfArg('0.01rem','0.01rem','0rem','0.01rem'),
                                visible: false
                            });
	    this.child([this.indexFrame(),conts_frm]);
	    this.styleDom(this.childDom());
	    this.childDom(conts_frm.childDom());
            this.size('1.5rem','0.25rem');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    indexClick (p1,p2,p3) {
        try {
	    let set_extend = null;
            if (true === p3.indexArrow()[0].visible()) {
	        if ('no-drop' === p3.indexFrame().style('cursor')) {
                    return;
		}
                p3.indexArrow()[0].visible(false,() => { p3.indexArrow()[1].visible(true); });
                p3.childDom().component().visible(true);
		set_extend = true;
            } else {
                p3.indexArrow()[1].visible(false,() => { p3.indexArrow()[0].visible(true); });
		p3.childDom().component().visible(false);
		set_extend = false;
            }
	    setTimeout(
	        (s1) => { s1.m_extend=set_extend; }, 50, p3
            );
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    indexText (prm,cnf) {
        try {
            if ('string' == typeof prm) {
                this.indexText().text(prm);
                this.indexText().config(cnf);
                return;
            }
            return this.innerComp('indexText', prm, Text);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    indexArrow (prm) {
        return this.confmng('indexArrow', prm);
    }

    indexFrame (prm) {
        return this.innerComp('indexFrame', prm, Frame);
    }

    item (prm,cnf) {
        try {
	    if (undefined === prm) {
                return this.child();
	    } else if ('string' === typeof prm) {
                let dropd     = this;
		let frame     = this.frame();
                let itm_frame = new frame({});
                if (null !== this.accentColor()) {
                    itm_frame.event(new Hover((h1,h2) => {
                        if (true === h2) {
                            h1.baseColor(dropd.accentColor());
                        } else {
                            h1.baseColor(dropd.baseColor());
                        }
                    }));
                }
		itm_frame.effect({ 'modname':'Border', tag:'Frame' }).position('bottom');
		itm_frame.config({
		    width:'100%', height:'0.25rem',
		    //baseColor:'white',
		    style: {
		        'display':         'flex',
		        'justify-content': 'center',
			'align-items':     'center'
                    },
		    event: new Click((c1) => {
		               c1.id()
			       let dd_chd  = dropd.child();
			       let sel_idx = null;
			       for (let didx in dd_chd) {
                                   if (c1.id() === dd_chd[didx].id()) {
                                       sel_idx = parseInt(didx);
				       break;
				   }
			       }
                               let sel_evt = dropd.selectEvent();
                               for (let sidx in sel_evt) {
                                   sel_evt[sidx][0](c1,sel_idx,sel_evt[sidx][1]);
                               }
                           })
		});
		itm_frame.child(
                    new Text({ text:prm, size:'0.14rem', config:cnf })
		);
		this.child(itm_frame);
                return;
	    } else {
	        prm.config(cnf);
                this.child(prm);
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    frame (prm) {
        try {
            return this.confmng('frame',prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    width (prm,opt) {
        try {
            this.indexFrame().width(prm,opt);
            return this.childDom().component().width(prm,opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    height (prm,opt) {
        try {
            return this.indexFrame().height(prm,opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    baseColor (prm,opt) {
        try {
            return this.childDom().component().baseColor(prm,opt);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    mainColor (prm,opt) {
        try {
            this.indexFrame().baseColor(prm,opt);
	    return this.confmng('mainColor', prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    accentColor (prm) {
        try {
            let ret = this.confmng('accentColor',prm);
	    if (undefined === prm) {
                return ret;
	    }
            /* setter */
            let itm_lst = this.item();
            for (let itm_idx in itm_lst) {
                let dropd = this;
                itm_lst[itm_idx].event(
                    new Hover((h1,h2) => {
                        if (true === h2) {
                            h1.baseColor(dropd.accentColor());
                        } else {
                            h1.baseColor(dropd.baseColor());
                        }
                    })
                );
            }
            return this.confmng('accentColor',prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    is_extend () {
        try {
            if (0 === arguments.length) {
                /* getter */
                return this.m_extend;
            } else if (1 === arguments.length) {
                /* setter */
		if (this.is_extend() != arguments[0]) {
                    this.indexClick(undefined,undefined,this);
		}
            } else if (3 === arguments.length) {
                /* focus event */
                let idx_fcs = arguments[1];
                let dropd   = arguments[2];
                if ((true === dropd.is_extend()) && (true === idx_fcs)) {
                    dropd.is_extend(false);
		} else if (false === idx_fcs) {
                    dropd.is_extend(idx_fcs);
		}
            }
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    selectEvent (fnc,prm) {
        try {
            return this.confmng(
                       'selectEvent',
                       (undefined === fnc) ? undefined : [fnc,prm]
                   );
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    disabled (prm) {
        try {
	    let opt = { forced:true };
	    if (true === prm) {
                this.indexFrame().baseColor([240,240,240]);
		if (false === this.isExists()) {
                    opt.lock = true;
		}
                this.indexFrame().style({ 'cursor': 'no-drop' },opt);
	    } else {
                this.indexFrame().baseColor(
                    this.confmng('baseColor')
		);
		this.indexFrame().style({ 'cursor': 'pointer' },opt);
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
}
/* end of file */
