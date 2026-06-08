const posts = document.querySelector('.posts');
const form = document.querySelector('form');

function createCommentInput(labelText, inputName) {
    const id = crypto.randomUUID();

    const label = document.createElement('label');
    label.htmlFor = id;
    label.classList.add('sr-only');
    label.textContent = labelText;

    const input = document.createElement('input');
    input.id = id;
    input.name = inputName;
    input.placeholder = labelText;
    input.required = true;

    return {label, input};
}

function createCommentForm() {
    const commentForm = document.createElement('form');

    const commentText = createCommentInput('Comment Text', 'text');

    const commentName = createCommentInput('Your Name', 'name');

    const commentSubmit = document.createElement('button');
    commentSubmit.textContent = 'Submit Comment';

    commentForm.append(commentText.label, commentText.input, commentName.label, commentName.input, commentSubmit);
    return commentForm;
}

function createPost(text, name) {
    const li = document.createElement('li');

    const remove = document.createElement('button');
    remove.textContent = 'remove';

    const comments = document.createElement('button');
    comments.textContent = 'comments';

    const post = document.createElement('span');
    post.textContent = `${text} - Posted By: ${name}`;

    const commentsDiv = document.createElement('div');
    commentsDiv.classList.add('hidden');

    const commentsList = document.createElement('ul');

    const commentForm = createCommentForm();

    commentsDiv.append(commentsList, commentForm);
    li.append(remove, comments, post, commentsDiv);
    return li;
}

function createCommentPost(text, name) {
    const li = document.createElement('li');
    li.textContent = `${text} - Posted By: ${name}`;

    const remove = document.createElement('button');
    remove.textContent = 'remove';

    li.prepend(remove);
    return li;
}

function getFormData(form) {
    const data = new FormData(form);
    const text = data.get('text')?.trim();
    const name = data.get('name')?.trim();
    return {text, name};
}

function handlePostClick(event) {
    const button = event.target.closest('button');
    if (!button) return;
    const post = button.closest('li');
    if (button.textContent === 'remove') return post.remove();
    if (button.textContent === 'comments') post.querySelector('div').classList.toggle('hidden');
}

function handleCommentSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const {text, name} = getFormData(form);
    if (!text || !name) return alert('Fields cannot be empty.');
    const comments = form.previousElementSibling;
    const comment = createCommentPost(text, name);
    comments.append(comment);
    form.reset();
}

function handlePostSubmit(event) {
    event.preventDefault();
    const {text, name} = getFormData(form);
    if (!text || !name) return alert('Fields cannot be empty.');
    const post = createPost(text, name);
    posts.append(post);
    form.reset();
}

posts.addEventListener('click', handlePostClick);
posts.addEventListener('submit', handleCommentSubmit);
form.addEventListener('submit', handlePostSubmit);
