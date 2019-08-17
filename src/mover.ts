import { MathMLElement, PropertyValues, html, TemplateResult, customElement, property, MathAlignType } from './mathml-element.js';
import { VertFlex } from './styles/common-styles.js';

@customElement('math-over')
export class MathOverElement extends MathMLElement {
  @property({ type: Boolean, reflect: true }) accent = false;
  @property() align: MathAlignType = 'center';

  render(): TemplateResult {
    return html`
    <style>
      ${VertFlex}
      :host {
        display: inline-block;
        margin: 0 0.16em;
        color: var(--math-color, inherit);
        background: var(--math-background, inherit);
      }
      .vertical.layout.reverse {
        -ms-flex-direction: column-reverse;
        -webkit-flex-direction: column-reverse;
        flex-direction: column-reverse;
      }
      ::slotted(:not(:first-child)) {
        width: 100%;
        line-height: 1;
        margin: 0;
        text-align: var(--math-over-align, center);
        --math-style-level: sub;
        font-size: var(--math-over-font-size, 0.8em);
        --math-style-stretchy: true;
      }
    </style>
    <div class="vertical layout reverse">
      <slot></slot>
    </div>
    `;
  }

  updated(propVals: PropertyValues) {
    super.updated(propVals);
    const s = this.style;
    switch (this.align) {
      case 'right':
        s.setProperty('--math-over-align', 'right');
        break;
      case 'left':
        s.setProperty('--math-over-align', 'left');
        break;
      default:
        s.setProperty('--math-over-align', 'center');
        break;
    }
    s.setProperty('--math-over-font-size', this.accent ? '1em' : '0.8em');
  }
}