const posts = document.querySelector('.posts');
const form = document.querySelector('form');

form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const text = data.get('text');
    const name = data.get('name');
    const li = document.createElement('li');
    li.textContent = `${text} - Posted By: ${name}`;
    posts.append(li);
    form.reset();
});
