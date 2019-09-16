function addListener(element: Element | Document, type: string, callback: any, capture: boolean = false) {
  element.addEventListener(type, callback, capture);
}

// @ts-ignore
export function draggable(element: Element, handle: Element) {
  let dragging: any = null;

  // @ts-ignore
  addListener(handle, 'mousedown', function(e: MouseEvent) {
    // @ts-ignore
    e = window.event || e;
    // @ts-ignore
    const left = element.style.left || element.offsetLeft || 0;
    // @ts-ignore
    const top = element.style.top || element.offsetTop || 0;
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

  addListener(handle, 'losecapture', function() {
    dragging = null;
  });

  addListener(document, 'mouseup', function() {
    dragging = null;
    // @ts-ignore
    if (document.releaseCapture) document.releaseCapture();
  }, true);

  // @ts-ignore
  const dragTarget = element.setCapture ? element : document;

  addListener(dragTarget, 'mousemove', function(e: MouseEvent) {
    if (!dragging) return;
    // @ts-ignore
    e = window.event || e;
    const top = dragging.startY + (e.clientY - dragging.mouseY);
    const left = dragging.startX + (e.clientX - dragging.mouseX);
    // @ts-ignore
    element.style.top = (Math.max(0, top)) + 'px';
    // @ts-ignore
    element.style.left = (Math.max(0, left)) + 'px';
  }, true);
}
