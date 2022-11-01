'use strict';

const idArr = window.location.search.split('=');
const idPost = idArr[1];
const arrowBack = document.querySelector('.articles__list');
const blogBack = document.querySelector('.back');
const getPost = async (cb) => {
    const resultPost = await fetch(`https://gorest.co.in/public-api/posts/${idPost}`);
    const data = await resultPost.json();
    const post = data.data;
    const breadTitle = document.querySelector('.bread__title');
    breadTitle.textContent = post.title;
    cb(post);
    const resultAuthor = await fetch(`https://gorest.co.in/public-api/users/${post.user_id}`);
    const dataAuthor = await resultAuthor.json();
    const userName = dataAuthor.data.name;
    const authorName = document.querySelector('.article__author-name');
    authorName.textContent = userName;

}

const renderArticle = (data) => {
  const article = document.querySelector('.article');
  //  const blogArticle = document.createElement('div');
   // blogArticle.classList.add('blog__article');
 //   blogArticle.textContent = data.title
    const articleHeader = document.createElement('h1');
    articleHeader.classList.add('article__header');
    articleHeader.textContent = data.title;
    const articleText = document.createElement('div');
    articleText.classList.add('article__text');
    articleText.textContent = data.body;
    article.append(articleHeader, articleText);

    const authorInfo = document.querySelector('.article__author-info');
     const view = document.createElement('div');
    view.classList.add('view');
    const imgView = document.createElement('img');
    imgView.src = './img/icons/eye.svg';
    const countView = document.createElement('span');
    countView.textContent = '1.2K';
    const chat = document.createElement('div');
    chat.classList.add('chat');
    const imgChat = document.createElement('img');
    imgChat.src = './img/icons/chat.svg';
    const countChat = document.createElement('span');
    countChat.textContent = '0';
  view.append(imgView, countView);
  chat.append(imgChat, countChat);
  authorInfo.append(view, chat);
}

arrowBack.addEventListener('click', () => {
  window.history.back();
})

blogBack.addEventListener('click', () => {
  window.location.search = '';
  const pathStr1 = window.location.pathname.slice(0, -12) + `blog.html`;
  window.location.href = pathStr1;

});
getPost(renderArticle);



