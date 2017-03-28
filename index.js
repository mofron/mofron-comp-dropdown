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
    
    addChild (comp, disp) {
        try {
            if (false === mofron.func.isInclude(comp, 'Text')) {
                throw new Error('invalid parameter');
            }
            comp.target().tag('option');
            super.addChild(comp, disp);
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
            this.name('DropDown');
            this.vdom().addChild(
                new mofron.Dom('select',this)
            );
            
            if ( (null !== prm) && (undefined !== prm[0]) ) {
                for (var idx in prm) {
                    if ('string' === typeof prm[idx]) {
                        this.addChild(new mofron.comp.Text(prm[idx]));
                    } else if (true === mofron.func.isInclude(prm[idx], 'Component')) {
                        this.addChild(prm[idx]);
                    } else {
                        throw new Error('invalid parameter');
                    }
                }
            } else {
                throw new Error('invalid paramter');
            }
            
            if (null !== this.changeEvent()) {
                this.addEvent(
                    new mofron.event.Common({
                        param     : new mofron.Param(this.chgangeEvent(), this),
                        eventName : 'onchange'
                    })
                );
            }
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
            this.style({
                'height' : ('number' === typeof hei) ? (hei + 'px') : hei,
                'width'  : ('number' === typeof wid) ? (wid + 'px') : wid
            });
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
                    ret_val.push(this.isSelect(loop));
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
    
    getOptionTag () {
        try {
            return class extends mofron.Component {
                initDomConts (prm) {
                    try {
                        this.name('DropDown');
                        this.vdom().addChild(
                            new mofron.Dom('option', this)
                        );
                              
                        if (null === prm) {
                            throw new Error('invalid parameter');
                        }
                        this.addChild(prm);
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
mofron.comp.dropdown = {};
module.exports = mofron.comp.DropDown;
