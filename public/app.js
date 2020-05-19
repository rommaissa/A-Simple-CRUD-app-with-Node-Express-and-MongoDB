const update = document.getElementById('update-button');
const deleteQuote = document.getElementById('delete-button');
const dispalyMessage = document.getElementById('message');

update.addEventListener('click', (_) => {
  fetch('/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Darth Vadar',
      quote: 'I find your lack of faith disturbing.',
    }),
  }).then((res) => {
    if (res.ok) window.location.reload(true);
  });
});

deleteQuote.addEventListener('click', (_) => {
  console.log('work');
  fetch('/quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Darth Vadar',
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      if (response === 'No quote to delete') {
        dispalyMessage.textContent = 'No Darth Vadar quote to delete';
      } else {
        window.location.reload();
      }
    })
    .catch(console.error);
});
