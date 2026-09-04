export default async function decorate(block) {
  // 1. Authoring table se Sheet JSON ka URL fetch karo
  const formLink = block.querySelector('a')?.href || block.textContent.trim();
  if (!formLink) return;

  // Loading indicator
  block.innerHTML = '<p class="form-loading">Loading Form...</p>';

  try {
    // 2. da.live dwara published Sheet JSON fetch karo
    const response = await fetch(formLink);
    const json = await response.json();
    const fields = json.data || json;

    // 3. Dynamic HTML Form create karo
    const form = document.createElement('form');
    form.className = 'eds-custom-form';

    fields.forEach((field) => {
      const fieldWrapper = document.createElement('div');
      fieldWrapper.className = `form-field-wrapper field-${field.Type}`;

      // Label
      if (field.Label && field.Type !== 'submit') {
        const label = document.createElement('label');
        label.textContent = field.Label;
        if (field.Mandatory === 'true') label.textContent += ' *';
        fieldWrapper.append(label);
      }

      // Input / Select / Textarea Handling
      let inputElement;

      if (field.Type === 'select') {
        inputElement = document.createElement('select');
        const options = field.Options ? field.Options.split(',') : [];
        options.forEach((opt) => {
          const optionEl = document.createElement('option');
          optionEl.value = opt.trim();
          optionEl.textContent = opt.trim();
          inputElement.append(optionEl);
        });
      } else if (field.Type === 'textarea') {
        inputElement = document.createElement('textarea');
        inputElement.placeholder = field.Placeholder || '';
      } else if (field.Type === 'submit') {
        inputElement = document.createElement('button');
        inputElement.type = 'submit';
        inputElement.textContent = field.Label || 'Submit';
        inputElement.className = 'button primary';
      } else {
        inputElement = document.createElement('input');
        inputElement.type = field.Type || 'text';
        inputElement.placeholder = field.Placeholder || '';
      }

      inputElement.name = field.Name;
      if (field.Mandatory === 'true') inputElement.required = true;

      fieldWrapper.append(inputElement);
      form.append(fieldWrapper);
    });

    // 4. Form Submit & POST Request Logic
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // Form Data Extract Karo
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      try {
        // PRODUCTION API POST ENDPOINT (Yahan apna backend API ya Webhook URL daalo)
        const postResponse = await fetch('http://localhost:9999/api/v2/test/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (postResponse.ok) {
          form.innerHTML = `<div class="form-success-msg">Thank you! Your form has been submitted successfully.</div>`;
        } else {
          throw new Error('Submission failed');
        }
      } catch (err) {
        console.error('POST Error:', err);
        alert('Form submit nahi ho paya. Kripya dubara try karein.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
      }
    });

    // Clean Replace
    block.replaceChildren(form);
  } catch (error) {
    console.error('Form load error:', error);
    block.innerHTML = `<p class="form-error">Form load karne me error aaya.</p>`;
  }
}