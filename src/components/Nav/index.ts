import {
  ShellHTML,
  createComponent,
  EventType,
  useGlobalState,
  setGlobalState,
} from '@Lib/shell-html';
import styleSheet from './style.scss';

class Nav extends ShellHTML {
  connectedCallback() {
    this.enrollObserving('page');
  }

  disconnectedCallback() {
    this.releaseObserving('page');
  }

  clickHandler(event: Event) {
    if (!event.target || !(event.target instanceof SVGElement)) {
      return;
    }

    const pageName = useGlobalState('page');
    const svgId = event.target.closest('svg')?.id;
    if (pageName !== svgId) {
      setGlobalState('page', svgId);
    }
  }

  render() {
    const pageName = useGlobalState('page');

    return {
      css: styleSheet,
      eventFuncs: [
        {
          className: 'nav__item',
          func: this.clickHandler,
          type: EventType.click,
        },
      ],
      html: `
      <nav class="nav">
        <div class="nav__item">
          <svg id="home" version="1.1" xmlns="http://www.w3.org/2000/svg" 
          width="3rem" height="3rem" viewBox="0 0 460.298 460.297" 
          style="opacity:${pageName === 'home' ? 1 : 0.4}">
            <g>
              <g>
                <path d="M230.149,120.939L65.986,256.274c0,0.191-0.048,0.472-0.144,0.855c-0.094,0.38-0.144,0.656-0.144,0.852v137.041
                  c0,4.948,1.809,9.236,5.426,12.847c3.616,3.613,7.898,5.431,12.847,5.431h109.63V303.664h73.097v109.64h109.629
                  c4.948,0,9.236-1.814,12.847-5.435c3.617-3.607,5.432-7.898,5.432-12.847V257.981c0-0.76-0.104-1.334-0.288-1.707L230.149,120.939
                  z"/>
                <path d="M457.122,225.438L394.6,173.476V56.989c0-2.663-0.856-4.853-2.574-6.567c-1.704-1.712-3.894-2.568-6.563-2.568h-54.816
                  c-2.666,0-4.855,0.856-6.57,2.568c-1.711,1.714-2.566,3.905-2.566,6.567v55.673l-69.662-58.245
                  c-6.084-4.949-13.318-7.423-21.694-7.423c-8.375,0-15.608,2.474-21.698,7.423L3.172,225.438c-1.903,1.52-2.946,3.566-3.14,6.136
                  c-0.193,2.568,0.472,4.811,1.997,6.713l17.701,21.128c1.525,1.712,3.521,2.759,5.996,3.142c2.285,0.192,4.57-0.476,6.855-1.998
                  L230.149,95.817l197.57,164.741c1.526,1.328,3.521,1.991,5.996,1.991h0.858c2.471-0.376,4.463-1.43,5.996-3.138l17.703-21.125
                  c1.522-1.906,2.189-4.145,1.991-6.716C460.068,229.007,459.021,226.961,457.122,225.438z"/>
              </g>
            </g>
          </svg>
        </div>
        <div class="nav__item">
          <svg id="calendar" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" 
          style="opacity:${pageName === 'calendar' ? 1 : 0.4}">
            <path d="M279,364c0,22.056,17.944,40,40,40h47c22.056,0,40-17.944,40-40v-47c0-22.056-17.944-40-40-40h-47
                c-22.056,0-40,17.944-40,40V364z M319,317h47l0.025,46.999c0,0-0.007,0.001-0.025,0.001h-47V317z"/>
            <circle cx="386" cy="210" r="20"/>
            <circle cx="299" cy="210" r="20"/>
            <path d="M492,352c11.046,0,20-8.954,20-20V120c0-44.112-35.888-80-80-80h-26V20c0-11.046-8.954-20-20-20
                c-11.046,0-20,8.954-20,20v20h-91V20c0-11.046-8.954-20-20-20s-20,8.954-20,20v20h-90V20c0-11.046-8.954-20-20-20
                s-20,8.954-20,20v20H80C35.888,40,0,75.888,0,120v312c0,44.112,35.888,80,80,80h352c44.112,0,80-35.888,80-80
                c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20c0,22.056-17.944,40-40,40H80c-22.056,0-40-17.944-40-40V120
                c0-22.056,17.944-40,40-40h25v20c0,11.046,8.954,20,20,20s20-8.954,20-20V80h90v20c0,11.046,8.954,20,20,20
                c11.046,0,20-8.954,20-20V80h91v20c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20V80h26c22.056,0,40,17.944,40,40v212
                C472,343.046,480.954,352,492,352z"/>
            <circle cx="125" cy="384" r="20"/>
            <circle cx="125" cy="210" r="20"/>
            <circle cx="125" cy="297" r="20"/>
            <circle cx="212" cy="297" r="20"/>
            <circle cx="212" cy="210" r="20"/>
            <circle cx="212" cy="384" r="20"/>
          </svg>     
        </div>
        <div class="nav__item">
          <svg id="check" version="1.1" xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 405.272 405.272" 
          style="opacity:${pageName === 'check' ? 1 : 0.4}">
            <path d="M393.401,124.425L179.603,338.208c-15.832,15.835-41.514,15.835-57.361,0L11.878,227.836
              c-15.838-15.835-15.838-41.52,0-57.358c15.841-15.841,41.521-15.841,57.355-0.006l81.698,81.699L336.037,67.064
              c15.841-15.841,41.523-15.829,57.358,0C409.23,82.902,409.23,108.578,393.401,124.425z"/>
          </svg>
        </div>
        <div class="nav__item">
          <svg id="note" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" 
          style="opacity:${pageName === 'note' ? 1 : 0.4}">
            <g>
              <path d="M352.459,220c0-11.046-8.954-20-20-20h-206c-11.046,0-20,8.954-20,20s8.954,20,20,20h206
                C343.505,240,352.459,231.046,352.459,220z"/>
              <path d="M126.459,280c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20H251.57c11.046,0,20-8.954,20-20c0-11.046-8.954-20-20-20
                H126.459z"/>
              <path d="M173.459,472H106.57c-22.056,0-40-17.944-40-40V80c0-22.056,17.944-40,40-40h245.889c22.056,0,40,17.944,40,40v123
                c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20V80c0-44.112-35.888-80-80-80H106.57c-44.112,0-80,35.888-80,80v352
                c0,44.112,35.888,80,80,80h66.889c11.046,0,20-8.954,20-20C193.459,480.954,184.505,472,173.459,472z"/>
              <path d="M467.884,289.572c-23.394-23.394-61.458-23.395-84.837-0.016l-109.803,109.56c-2.332,2.327-4.052,5.193-5.01,8.345
                l-23.913,78.725c-2.12,6.98-0.273,14.559,4.821,19.78c3.816,3.911,9,6.034,14.317,6.034c1.779,0,3.575-0.238,5.338-0.727
                l80.725-22.361c3.322-0.92,6.35-2.683,8.79-5.119l109.573-109.367C491.279,351.032,491.279,312.968,467.884,289.572z
                M333.776,451.768l-40.612,11.25l11.885-39.129l74.089-73.925l28.29,28.29L333.776,451.768z M439.615,346.13l-3.875,3.867
                l-28.285-28.285l3.862-3.854c7.798-7.798,20.486-7.798,28.284,0C447.399,325.656,447.399,338.344,439.615,346.13z"/>
              <path d="M332.459,120h-206c-11.046,0-20,8.954-20,20s8.954,20,20,20h206c11.046,0,20-8.954,20-20S343.505,120,332.459,120z"/>
            </g>
          </svg>    
        </div>
        <div class="nav__item nav__trash">
          <svg id="trash" viewBox="0 0 512 512" width="3.5rem" height="3.5rem" xmlns="http://www.w3.org/2000/svg" 
          style="opacity:${pageName === 'trash' ? 1 : 0.4}">
            <g>
              <path d="m424 64h-88v-16c0-26.467-21.533-48-48-48h-64c-26.467 0-48 21.533-48 48v16h-88c-22.056 0-40 17.944-40 40v56c0 8.836 7.164 16 16 16h8.744l13.823 290.283c1.221 25.636 22.281 45.717 47.945 45.717h242.976c25.665 0 46.725-20.081 47.945-45.717l13.823-290.283h8.744c8.836 0 16-7.164 16-16v-56c0-22.056-17.944-40-40-40zm-216-16c0-8.822 7.178-16 16-16h64c8.822 0 16 7.178 16 16v16h-96zm-128 56c0-4.411 3.589-8 8-8h336c4.411 0 8 3.589 8 8v40c-4.931 0-331.567 0-352 0zm313.469 360.761c-.407 8.545-7.427 15.239-15.981 15.239h-242.976c-8.555 0-15.575-6.694-15.981-15.239l-13.751-288.761h302.44z"/><path d="m256 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"/><path d="m336 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"/><path d="m176 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"/>
            </g>
          </svg>
        </div>
      </nav>
    `,
    };
  }
}

createComponent('layout-nav', Nav);
