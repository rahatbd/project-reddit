const posts = document.querySelector('.posts');
const form = document.querySelector('form');

form.addEventListener('submit', event => {
    event.preventDefault();

    const data = new FormData(form);
    const text = data.get('text');
    const name = data.get('name');

    const li = document.createElement('li');

    const remove = document.createElement('button');
    remove.textContent = 'remove';

    const comments = document.createElement('button');
    comments.textContent = 'comments';

    const post = document.createElement('span');
    post.textContent = `${text} - Posted By: ${name}`;

    const commentDiv = document.createElement('div');
    commentDiv.classList.add('hidden');

    const commentList = document.createElement('ul');

    const commentForm = document.createElement('form');

    const id = crypto.randomUUID();

    const commentLabel = document.createElement('label');
    commentLabel.htmlFor = `comment-${id}`;
    commentLabel.classList.add('sr-only');
    commentLabel.textContent = 'Comment Text';

    const comment = document.createElement('input');
    comment.id = commentLabel.htmlFor;
    comment.name = 'comment';
    comment.placeholder = commentLabel.textContent;
    comment.required = true;

    const nameLabel = document.createElement('label');
    nameLabel.htmlFor = `name-${id}`;
    nameLabel.classList.add('sr-only');
    nameLabel.textContent = 'Your Name';

    const commentName = document.createElement('input');
    commentName.id = nameLabel.htmlFor;
    commentName.name = 'comment-name';
    commentName.placeholder = nameLabel.textContent;
    commentName.required = true;

    const commentSubmit = document.createElement('button');
    commentSubmit.textContent = 'Submit Comment';

    commentForm.append(commentLabel, comment, nameLabel, commentName, commentSubmit);
    commentDiv.append(commentList, commentForm);

    remove.addEventListener('click', () => li.remove());
    comments.addEventListener('click', () => commentDiv.classList.toggle('hidden'));

    commentForm.addEventListener('submit', event => {
        event.preventDefault();
        const data = new FormData(commentForm);
        const comment = data.get('comment');
        const name = data.get('comment-name');
        const li = document.createElement('li');
        li.textContent = `${comment} - Posted By: ${name}`;
        const remove = document.createElement('button');
        remove.textContent = 'remove';
        remove.addEventListener('click', () => li.remove());
        li.prepend(remove);
        commentList.append(li);
        commentForm.reset();
    });

    li.append(remove, comments, post, commentDiv);
    posts.append(li);

    form.reset();
});
