import './counter-basic.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import { DataReceiverMixin } from '../mixins/data-receiver-mixin.js';
import { FontAwesomeMixin } from '../mixins/font-awesome-mixin.js';
import { PolymerElement, html } from '@polymer/polymer';


/**
 * ## `score-card`
 *
 * This is a basic component for a score card displaying a single numeric value.
 *
 * @polymer
 * @customElement
 * @demo demo/visualizations/score_card_demo.html
 */
class ScoreCard extends FontAwesomeMixin(DataReceiverMixin(PolymerElement)) {
    static get template() {
        return html`
        <style>
            :host {
                display: block;
            }

            #container {
                display: flex;
                width: 100%;
            }

            #icon-container {
                display: flex;
                flex-grow: 0;
                flex-shrink: 0;
                align-items: center;
                justify-content: center;
                min-width: 50px;
                min-height: 50px;
                border-radius: 2px 0px 0px 2px;
            }

            #content-container {
                position: relative;
                width: 100%;
                padding: 5px 10px;
                overflow: hidden;
            }

            #name {
                display: block;
                font-size: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-bottom: 3px;
            }

            #value {
                display: block;
                font-weight: bold;
                font-size: 18px;
            }

            #link-container {
                position: absolute;
                bottom: 5px;
                font-size: 14px;
            }

            #link-icon {
                margin-right: 3px;
            }
        </style>

        <div id="container">
            <div id="icon-container" style\$="background-color: [[primarycolor]]; height: [[height]]px; flex-basis: [[height]]px;">
                <span id="icon" class\$="[[iconClasses]]" style\$="font-size: [[iconSize]]px"></span>
            </div>
            <div id="content-container">
                <span id="name">[[name]]</span>
                <counter-basic id="value" data="[[data]]" prefix="[[prefix]]" suffix="[[suffix]]" decimals="[[decimals]]" default-value="[[defaultValue]]" value-formatter="[[valueFormatter]]" animation-duration="[[animationDuration]]" hide-spinner="[[hideSpinner]]"></counter-basic>
                <div id="link-container">
                    <template is="dom-if" if="[[link]]">
                        <a href="[[link]]">
                            <i id="link-icon" class="fas fa-arrow-circle-right"></i>[[linkText]]
                        </a>
                    </template>
                </div>
            </div>
        </div>`;
    }

    static get is() {
        return 'score-card';
    }

    static get properties() {
        return {
            /** Height of the control */
            height: {
                type: Number,
                value: 100
            },
            /** Font size of the icon (px). */
            iconSize: {
                type: Number,
                value: 50
            },
            /** Primary color of the control. */
            primarycolor: String,
            /** Classes of the icon that should be displayed. */
            iconClasses: {
                type: String,
                observer: 'iconChanged'
            },
            /** Name of the metric that is displayed. */
            name: String,
            /** Optional text before the number. */
            prefix: String,
            /** Optional text after the number. */
            suffix: String,
            /** Number of decimals to show. */
            decimals: {
                type: Number,
                value: 0
            },
            /** The default value that is shown if data is `null`. */
            defaultValue: {
                type: String,
                value: 'n/a'
            },
            /** Animation duration in seconds. */
            animationDuration: {
                type: Number,
                value: 1
            },
            /** Determines whether the loading spinner should be hidden. */
            hideSpinner: {
                type: Boolean,
                value: false
            },
            /** A link to a page showing related information (optional). */
            link: String,
            /** The text of the link (optional). */
            linkText: String,
            /** Custom formatter function for displaying the value */
            valueFormatter: Object
        };
    }

    static get observers() {
        return [];
    }

    /**
     *  Observe changes to the `iconClasses` and add FontAwesome family prefix "fa-" for proper icon replacement
     *  @return  {void}
     */
    iconChanged() {
        if (!this.iconClasses.includes('xikolo'))
            return;

        let requestedClasses = this.iconClasses.split(' ');
        requestedClasses = requestedClasses.map(iconClass =>
            iconClass.startsWith('icon-') ? `${this.FontAwesomeConfig().familyPrefix}-${iconClass}` : iconClass);
        this.iconClasses = requestedClasses.join(' ');
    }
}

// Register custom element definition using standard platform API
customElements.define(ScoreCard.is, ScoreCard);
