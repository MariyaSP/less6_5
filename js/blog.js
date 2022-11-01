const blog = document.querySelector('.blog');
const paginate = document.querySelector('.pagination');
const numbers = paginate.querySelector('.numbers');
let countPost = 0;


const getData = async (cb) => {
    const result = await fetch(`https://gorest.co.in/public-api/posts${window.location.search}`);
    const data = await result.json();
    const arr = data.data;
    cb(arr);
    countPost = data.meta.pagination.pages;
    const curentPage = window.location.search.split('=');
    pagePagination(countPost, curentPage[1]);
}

const renderCard = (data) => {
    blog.innerHTML = '';
    data.forEach(item => {
        const linkArticle = document.createElement('a');
        linkArticle.setAttribute('href', '#');
        linkArticle.setAttribute('id', item.id);
        linkArticle.classList.add('link__article');
        const blogCard = document.createElement('div');
        blogCard.classList.add('blog__card');
        blogCard.innerHTML = `<img src="./img/pic1.jpg" alt="pic">`;

        const blogCardText = document.createElement('div');
        blogCardText.classList.add('blog__card-text');

        const headCard = document.createElement('h2');
        headCard.classList.add('blog__card-header');
        headCard.textContent = item.title;

        const blogCardData =document.createElement('p');
        blogCardData.classList.add('blog__card-data');
        blogCardData.textContent = '22 октября 2021, 12:45';
        const blogCardInfo = document.createElement('div');
        blogCardInfo.classList.add('blog__card-info');
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
            blogCardInfo.append(view, chat);
            blogCardText.append(headCard, blogCardData, blogCardInfo);
            blogCard.append(blogCardText);
            linkArticle.append(blogCard)
        blog.append(linkArticle);
    });
};

const pagePagination = async (num, currentPage = 1) =>{

const active = currentPage;

    numbers.innerHTML = '';
    const arrPege = [];
    for(let i = 1; i <= num; i++ )
    {
        arrPege.push(i);
    }

  if(currentPage <= 4){
    currentPage = 1;
    arrPege.splice(4 + Number(currentPage), arrPege.length - ( 5 + Number(currentPage)));
  }
  else {
    arrPege.splice(3 + Number(currentPage), arrPege.length - ( 4 + Number(currentPage)));
  }
    if(currentPage > 4){
        arrPege.splice(1, Number(currentPage) - 2 );
    }
      arrPege.forEach((item, i) => {
          const number = document.createElement('a');
          number.classList.add('number');

          if(item === Number(active)){
            number.classList.add('active__link');
          }
          number.textContent = item;
          number.setAttribute('page', item)
          numbers.append(number);

            if(i === 4){
                const ellipsis = document.createElement('span');
                ellipsis.textContent = '. . .';
                ellipsis.style.cssText = 'align-self: flex-end;';
                numbers.append(ellipsis);
            }
      });
    }

paginate.addEventListener('click', (e) => {
  e.preventDefault();
    const target = e.target;
    let current = 1;
    if(target.closest('.number')){
        current = Number(target.textContent);
        }
    if(target.closest('.straight') || target.closest('.back')) {
        current = window.location.search.split('=');
        if(current[1] > 1 && target.closest('.straight')){
            current = current[1] - 1;
        }
        if(current[1] < countPost && target.closest('.back')){
            current = Number(current[1]) + 1;
        }
    }
        history.pushState({page:current}, '', `${window.location.pathname}?page=${current}`);
        getData(renderCard);

});

blog.addEventListener('click', (e) => {
    const target = e.target;
    if(target.closest('.link__article')){
        window.location.search = '';
        const pathStr = window.location.pathname.slice(0, -9) + `article.html?id=${target.closest('.link__article').getAttribute('id')}`;
        console.log(pathStr);
//      history.pushState({page:1}, '', pathStr);
      window.location.href = pathStr;
    }
})

getData(renderCard);


