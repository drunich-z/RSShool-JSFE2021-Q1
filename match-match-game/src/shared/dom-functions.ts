export function createDOMElement(
           tag: keyof HTMLElementTagNameMap = 'div'
         , styles: string[] = []
         , innerText: string = ''
  ){
    
  const element = document.createElement(tag);
  element.classList.add(...styles);
  element.innerHTML = innerText;
  return element;
}