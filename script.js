const posts = document.querySelector('.posts');
const form = document.querySelector('form');

function createCommentForm() {
    const id = crypto.randomUUID();

    const commentForm = document.createElement('form');

    const commentTextLabel = document.createElement('label');
    commentTextLabel.htmlFor = `comment-${id}`;
    commentTextLabel.classList.add('sr-only');
    commentTextLabel.textContent = 'Comment';

    const commentText = document.createElement('input');
    commentText.id = commentTextLabel.htmlFor;
    commentText.name = 'text';
    commentText.placeholder = 'Comment Text';
    commentText.required = true;

    const commentNameLabel = document.createElement('label');
    commentNameLabel.htmlFor = `name-${id}`;
    commentNameLabel.classList.add('sr-only');
    commentNameLabel.textContent = 'Name';

    const commentName = document.createElement('input');
    commentName.id = commentNameLabel.htmlFor;
    commentName.name = 'name';
    commentName.placeholder = 'Your Name';
    commentName.required = true;

    const commentSubmit = document.createElement('button');
    commentSubmit.textContent = 'Submit Comment';

    commentForm.append(commentTextLabel, commentText, commentNameLabel, commentName, commentSubmit);
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
