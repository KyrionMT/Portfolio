import { useEffect, useRef } from "react";

export default function useDialog(onClose) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const previousFocus = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const dialog = ref.current;
    const selector = 'button, a[href], input, textarea, select, [tabindex="0"]';
    const focusable = () =>
      [...dialog.querySelectorAll(selector)].filter(
        (el) => !el.disabled && el.getClientRects().length,
      );
    (
      dialog.querySelector("[data-autofocus]") ||
      focusable()[0] ||
      dialog
    ).focus();
    const onKey = (event) => {
      if (event.key === "Escape") closeRef.current();
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) {
        event.preventDefault();
        return;
      }
      if (!dialog.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? items.at(-1) : items[0]).focus();
        return;
      }
      if (
        event.shiftKey &&
        (document.activeElement === items[0] ||
          document.activeElement === dialog)
      ) {
        event.preventDefault();
        items.at(-1).focus();
      } else if (!event.shiftKey && document.activeElement === items.at(-1)) {
        event.preventDefault();
        items[0].focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);
  return ref;
}
