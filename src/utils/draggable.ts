function addListener(element: Element | Document, type: string, callback: any, capture: boolean = false) {
  element.addEventListener(type, callback, capture);
}

export type OnMoveResult = boolean | {
  v: boolean,
  h: boolean
};

export interface IDraggableOptions {
  direction?: 'vertical' | 'horizontal' | 'both';
  initFromStyle?: boolean,
  onRelease?: (e: MouseEvent) => void;
  onMove?: (e: MouseEvent, x: number, y: number) => OnMoveResult;
}

// @ts-ignore
export function draggable(element: Element, handle: Element, opts: IDraggableOptions = {direction: 'both', initFromStyle: true}) {
  let dragging: any = null;

  // @ts-ignore
  addListener(handle, 'mousedown', function(e: MouseEvent) {
    // @ts-ignore
    e = window.event || e;
    // @ts-ignore
    const left = opts.initFromStyle ? element.style.left || element.offsetLeft || 0 : element.offsetLeft;
    // @ts-ignore
    const top = opts.initFromStyle ? element.style.top || element.offsetTop || 0 : element.offsetTop;
    dragging = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      // @ts-ignore
      startX: parseInt(left || 0, 10),
      // @ts-ignore
      startY: parseInt(top || 0, 10)
    };
    // @ts-ignore
    if (handle.setCapture) handle.setCapture();
  });

  addListener(handle, 'losecapture', function () {
    dragging = null;
  });

  addListener(document, 'mouseup', function (e: MouseEvent) {
    dragging = null;
    // @ts-ignore
    if (document.releaseCapture) document.releaseCapture();
    if (opts.onRelease) {
      opts.onRelease(e)
    }
  }, true);

  // @ts-ignore
  const dragTarget = element.setCapture ? element : document;

  addListener(dragTarget, 'mousemove', function(e: MouseEvent) {
    if (!dragging) return;
    // @ts-ignore
    e = window.event || e;
    const top = dragging.startY + (e.clientY - dragging.mouseY);
    const left = dragging.startX + (e.clientX - dragging.mouseX);
    let set: OnMoveResult = {v: true, h: true};
    if (opts.onMove) {
      set = opts.onMove(e, left, top);
    }
    // @ts-ignore
    if (set && (set.v || set === true) && (opts.direction == 'both' || opts.direction === 'vertical')) element.style.top = (Math.max(0, top)) + 'px';
    // @ts-ignore
    if (set && (set.h || set === true) && (opts.direction == 'both' || opts.direction === 'horizontal')) element.style.left = (Math.max(0, left)) + 'px';


  }, true);
}
