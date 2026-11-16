const VIEWPORT_MARGIN_PX = 10;

function clampPopoverToViewport(popover: HTMLElement) {
  const rect = popover.getBoundingClientRect();
  const maxBottom = window.innerHeight - VIEWPORT_MARGIN_PX;
  if (rect.bottom <= maxBottom && rect.top >= VIEWPORT_MARGIN_PX) {
    return;
  }

  let nextTop = rect.top;
  if (rect.bottom > maxBottom) {
    nextTop = Math.max(VIEWPORT_MARGIN_PX, maxBottom - rect.height);
  }
  if (nextTop < VIEWPORT_MARGIN_PX) {
    nextTop = VIEWPORT_MARGIN_PX;
  }

  const offsetParent = popover.offsetParent;
  const top =
    !offsetParent || offsetParent === document.body
      ? nextTop + window.scrollY
      : nextTop -
        offsetParent.getBoundingClientRect().top +
        offsetParent.scrollTop;
  popover.style.top = `${top}px`;
}

function findSchedulePopover() {
  const popover = document.querySelector("[role='dialog'][data-date]");
  if (popover instanceof HTMLElement) {
    return popover;
  }
  return null;
}

function scheduleClamp() {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const popover = findSchedulePopover();
      if (popover) {
        clampPopoverToViewport(popover);
      }
    });
  });
}

export function keepPublicSchedulePopoverInViewport() {
  if (findSchedulePopover()) {
    scheduleClamp();
    return;
  }

  const observer = new MutationObserver(() => {
    if (!findSchedulePopover()) {
      return;
    }
    observer.disconnect();
    scheduleClamp();
  });
  observer.observe(document.body, { childList: true });
  window.setTimeout(() => observer.disconnect(), 1000);
}

export function handlePublicScheduleMoreLinkClick() {
  keepPublicSchedulePopoverInViewport();
}
