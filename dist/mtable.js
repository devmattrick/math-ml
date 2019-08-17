var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { html, customElement, property } from './mathml-element.js';
import { MathTableBaseElement } from './mtable-base.js';
let MathTableElement = class MathTableElement extends MathTableBaseElement {
    constructor() {
        super();
        this.columnlines = 'none';
        this.rowlines = 'none';
        this.frame = 'none';
        this.columnspacing = '0.8em';
        this.rowspacing = '0.8em';
        this.framespacing = '0.4em 0.5ex';
        this.columnalign = this.columnalign || 'center';
    }
    render() {
        return html `
    <style>
      :host {
        display: inline-table;
        border: var(--math-table-border, 'none');
        padding: var(--math-table-padding, 0.5ex 0.4em);
        width: var(--math-table-width);
        color: var(--math-color, inherit);
        background: var(--math-background, inherit);
      }
      slot::slotted(math-tr:last-child) {
        --math-table-row-border: none;
      }
    </style>
    <slot></slot>
    `;
    }
    updated(propVals) {
        super.updated(propVals);
        this.updateAlignment();
        const s = this.style;
        if (this.frame) {
            switch (this.frame) {
                case 'none':
                    s.setProperty('--math-table-border', 'none');
                    break;
                case 'solid':
                    s.setProperty('--math-table-border', 'solid thin');
                    break;
                case 'dashed':
                    s.setProperty('--math-table-border', 'dashed thin');
                    break;
                default:
                    s.removeProperty('--math-table-border');
                    break;
            }
        }
        if (this.rowlines) {
            switch (this.rowlines) {
                case 'none':
                    s.setProperty('--math-table-row-border', 'none');
                    break;
                case 'solid':
                    s.setProperty('--math-table-row-border', 'solid thin');
                    break;
                case 'dashed':
                    s.setProperty('--math-table-row-border', 'dashed thin');
                    break;
                default:
                    s.removeProperty('--math-table-row-border');
                    break;
            }
        }
        if (this.columnlines) {
            switch (this.columnlines) {
                case 'none':
                    s.setProperty('--math-table-column-border', 'none');
                    break;
                case 'solid':
                    s.setProperty('--math-table-column-border', 'solid thin');
                    break;
                case 'dashed':
                    s.setProperty('--math-table-column-border', 'dashed thin');
                    break;
                default:
                    s.removeProperty('--math-table-column-border');
                    break;
            }
        }
        if (this.framespacing) {
            const split = this.framespacing.split(' ').reverse();
            s.setProperty('--math-table-padding', split.join(' '));
        }
        else {
            s.removeProperty('--math-table-padding');
        }
        if (this.width) {
            s.setProperty('--math-table-width', this.width);
        }
        else {
            s.removeProperty('--math-table-width');
        }
        if (this.columnspacing) {
            s.setProperty('--math-table-columnspacing', this.columnspacing);
        }
        else {
            s.removeProperty('--math-table-columnspacing');
        }
        if (this.rowspacing) {
            s.setProperty('--math-table-rowspacing', this.columnspacing);
        }
        else {
            s.removeProperty('--math-table-rowspacing');
        }
        if (this.columnalign) {
            const split = this.columnalign.trim().split(' ').filter((d) => {
                if (d.trim()) {
                    return true;
                }
                return false;
            });
            if (split.length > 1) {
                const slot = this.shadowRoot.querySelector('slot');
                if (slot) {
                    slot.assignedNodes().filter((d) => d.nodeType === Node.ELEMENT_NODE).filter((d) => {
                        return d.tagName === 'MATH-TR' || d.tagName === 'MATH-LABELEDTR';
                    }).forEach((d) => {
                        const row = d;
                        row.columnalign = row.columnalign || (this.columnalign).trim();
                    });
                }
            }
        }
    }
};
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], MathTableElement.prototype, "columnlines", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], MathTableElement.prototype, "rowlines", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], MathTableElement.prototype, "frame", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], MathTableElement.prototype, "columnspacing", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], MathTableElement.prototype, "rowspacing", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], MathTableElement.prototype, "framespacing", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], MathTableElement.prototype, "width", void 0);
MathTableElement = __decorate([
    customElement('math-table'),
    __metadata("design:paramtypes", [])
], MathTableElement);
export { MathTableElement };
