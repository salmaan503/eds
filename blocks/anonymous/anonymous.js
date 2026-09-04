export default function decorate(block) {
  // 1. Ek main wrapper banate hain apne design ke liye
  const wrapper = document.createElement('div');
  wrapper.classList.add('anonymous-wrapper');

  // 2. Author ne block ke andar jitni bhi rows banayi hain, unhe loop karo
  const rows = [...block.children];

  rows.forEach((row, rowIndex) => {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add(`anonymous-row-${rowIndex + 1}`);

    // 3. Har row ke andar jo columns (cells) hain unhe loop karo
    const cols = [...row.children];
    
    cols.forEach((col) => {
      const colDiv = document.createElement('div');
      colDiv.classList.add('anonymous-column');
      
      // Author ka asli content (text, image, link kuch bhi ho) yahan copy ho jayega
      colDiv.innerHTML = col.innerHTML;
      
      rowDiv.append(colDiv);
    });

    wrapper.append(rowDiv);
  });

  // 4. Block ka purana structure saaf karke apna dynamic wrapper daal do
  block.textContent = '';
  block.append(wrapper);
}