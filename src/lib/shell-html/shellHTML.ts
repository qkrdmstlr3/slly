import { RenderType, EventFuncType } from './type';
import { observe, disObserve } from './state';

class ShellHTML extends HTMLElement {
  state: unknown;

  constructor(state: unknown = null) {
    super();
    this.state = state; // TODO: 불변성 보장해야됨

    this.attachShadow({ mode: 'open' });
    const element = this.render();

    if (element && this.shadowRoot) {
      this.renderFirst(element, this.shadowRoot);
    }
  }

  /**
   * DOM Tree
   */
  /**
   * FIXME:
   * reflow or repaint may occur
   * need to change the way which compare each node of the tree.
   */
  compareAndReplaceNodeTree(
    oldDOM: ShadowRoot,
    newDOM: HTMLDivElement,
    newDOMChilds: NodeListOf<ChildNode>
  ): void {
    if (!newDOMChilds.length) return;

    for (let i = 0; i < newDOMChilds.length; i += 1) {
      const newDOMChild = newDOMChilds[i] as HTMLElement;

      if (newDOMChild.nodeName.includes('-')) {
        const oldDOMElement = oldDOM.getElementById(newDOMChild.id);
        if (oldDOMElement) {
          newDOMChild.replaceWith(oldDOMElement);
        }
      }

      this.compareAndReplaceNodeTree(oldDOM, newDOM, newDOMChild.childNodes);
    }
  }

  /**
   * state
   */
  setState(state: unknown): void {
    if (this.state !== state) {
      this.state = state;

      this.rerender();
    }
  }

  getElement(id: string): HTMLElement | null {
    if (this.shadowRoot) {
      return this.shadowRoot.getElementById(id);
    }
    return null;
  }

  enrollObserving(key: string): void {
    observe(key, this, this.rerender);
  }

  releaseObserving(key: string): void {
    disObserve(key, this);
  }

  /**
   * Rendering
   */
  render(): RenderType | void {
    // overriding
  }

  renderFirst(
    { html = '', eventFuncs = [], css }: RenderType,
    dom: ShadowRoot
  ): void {
    // FIXME: applying sanitize html
    dom.innerHTML = html.trim().replace(/>[ |\n]*</g, '><');

    if (css) {
      this.renderCSS(css, dom);
    }

    // ShadowRoot Event Delegation
    eventFuncs.forEach((eventFunc) => this.eventDelegation(eventFunc, dom));
  }

  renderCSS(css: string, dom: ShadowRoot): void {
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    dom.appendChild(style);
  }

  eventDelegation(
    { className, func, type }: EventFuncType,
    dom: ShadowRoot
  ): void {
    dom.addEventListener(type, (event: Event) => {
      event.stopPropagation();
      const isCorrectElement =
        (event.target instanceof HTMLElement ||
          event.target instanceof SVGElement) &&
        event.target.closest(`.${className}`);

      if (isCorrectElement) {
        func.call(this, event);
      }
    });
  }

  rerender(): void {
    const element = this.render();

    if (element && element.html) {
      const oldDOM = this.shadowRoot;
      const newDOM = document.createElement('div');
      newDOM.innerHTML = element.html.trim().replace(/>[ |\n]*</g, '><');

      if (!oldDOM || oldDOM.textContent == newDOM.textContent) return;
      this.compareAndReplaceNodeTree(oldDOM, newDOM, newDOM.childNodes);
      oldDOM.childNodes[0]?.replaceWith(newDOM.childNodes[0]);
    }
  }
}

export default ShellHTML;
