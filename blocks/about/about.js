// CORRECT: Semantic structure transformation with dynamic icon injection
export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'about-pills-list';

  // Authored table ki pehli row ke saare columns (cells) extract karo
  const row = block.firstElementChild;
  if (row) {
    [...row.children].forEach((cell) => {
      const li = document.createElement('li');
      li.className = 'about-pill-item';

      // Text/Link content extraction
      const textSpan = document.createElement('span');
      textSpan.className = 'about-pill-text';
      textSpan.innerHTML = cell.innerHTML;

      // Circular Arrow Icon SVG
      const iconSpan = document.createElement('span');
      iconSpan.className = 'about-pill-icon';
      iconSpan.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;

      li.append(textSpan, iconSpan);
      ul.append(li);
    });
  }

  // Purana table DOM clear karke semantic structure append karo
  block.textContent = '';
  block.append(ul);
}