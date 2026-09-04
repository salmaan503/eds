export default function decorate(block){
  const ul = document.createElement('ul');
  ul.className ='invoice-list';
  
        [...block.children].forEach((row)=>{
          const rows=row.children;
          [...rows].forEach((colms)=>{
           const li = document.createElement('li');
                li.className = 'invoice-item';
                
                console.log(colms,'coll')        
          })
        //    ul.append(li);
                

        })

       block.replaceChildren(li);

[...block.children].forEach((row)=>{

})
}

// export default function decorate(block) {
//   // 1. Main container setup
//   const rowsWrapper = document.createElement('div');
//   rowsWrapper.className = 'testing-wrapper';

//   // 2. Loop through each row in authoring table
//   [...block.children].forEach((row) => {
//     // Edge case check: empty row ignore karo
//     if (!row.children.length) return;

//     const rowDiv = document.createElement('div');
//     rowDiv.className = 'testing-row';

//     // 3. Loop through each column inside the current row
//     [...row.children].forEach((col) => {
//       const colDiv = document.createElement('div');
//       colDiv.className = 'testing-col';

//       // Move cell content without losing inner markup/formatting
//       while (col.firstElementChild) {
//         colDiv.append(col.firstElementChild);
//       }
//       if (!colDiv.children.length) {
//         colDiv.textContent = col.textContent;
//       }
//       rowDiv.append(colDiv);
//     });
    
//     console.log(rowDiv,'coldiv')
//     rowsWrapper.append(rowDiv);
//   });

//   // 4. Clean Replace: Purana Helix DOM hatakar naya clean structure swap karo
//   block.replaceChildren(rowsWrapper);
// }



