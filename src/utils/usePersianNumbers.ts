import { useEffect } from "react";

function toPersianDigits(str: string): string {
  const enToFa = (d: string) =>
    d.replace(/\d/g, (digit) =>
      "۰۱۲۳۴۵۶۷۸۹"[parseInt(digit, 10)] ?? digit
    );

  return enToFa(str);
}

const usePersianNumbers = () => {
  useEffect(() => {
    const elements = document.body.getElementsByTagName('*');
    Array.from(elements).forEach((el) => {
      if (el.hasChildNodes()) {
        Array.from(el.childNodes).forEach((childNode) => {
          if (childNode.nodeType === Node.TEXT_NODE) {
            const newText = toPersianDigits(childNode.textContent || "");
            if (newText !== childNode.textContent) {
              childNode.textContent = newText;
            }
          }
        });
      }
    });
  }, []);
};

export default usePersianNumbers;
