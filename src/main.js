import { searchImg } from './js/pixabay-api.js'
import { imgTemplate, imgCreated } from "./js/render-function.js";


import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const btnLoadMore = document.querySelector(".btn-load-more");

form.addEventListener("submit", handleSubmit);
btnLoadMore.addEventListener("click", onLoadMore);

let page = 1;
let query = '';
let lightbox;

 function initializeLightbox() {
    lightbox = new SimpleLightbox('gallery, a', {
        captionsData: 'alt',
        captionDelay: 250
    });
   }
initializeLightbox();

hideBtnLoadMore(); 


async function handleSubmit(event) {
    event.preventDefault();
    gallery.innerHTML = "";
    hideBtnLoadMore();
    showLoader();

    page = 1;
    query = event.target.elements.query.value.trim();

    if (!query) {
        hideLoader();
        errNoMatchImg();
        return;
    }
   
    try {
      
        const data = await searchImg(query, page);
       
        if (data.hits.length === 0) {
            errNoMatchImg();
        }
        else {
            const markup = imgTemplate(data.hits);
            gallery.innerHTML = markup;
            lightbox.refresh();
            if (data.hits.length < 15) {
              hideLoader();
            } else {
              showBtnLoadMore();
            }
        }
    }
   
    catch {
        errNoMatchImg();
         }
           
    finally {
        event.target.reset();
        hideLoader();
    }
}

 
async function onLoadMore() {
    page += 1;
    showLoader();
   
    try {
        const data = await searchImg(query, page);
        const lastPage = Math.ceil(data.totalHits / 15);

        if (page === lastPage) {
           hideBtnLoadMore();
            noMoreImg();
        }
        
        const markup = imgTemplate(data.hits);
        gallery.insertAdjacentHTML("beforeend", markup);
        lightbox.refresh();
        SmoothScroll();

        
}
    catch (error) {
        noMoreImg();
        hideBtnLoadMore();
    }
    finally {
        hideLoader();
    }
};

function showLoader() {
    loader.style.display = "block";
}

function hideLoader() {
    loader.style.display = "none"
}

function showBtnLoadMore() {
    btnLoadMore.classList.remove('hidden');
}

function hideBtnLoadMore() {
    btnLoadMore.classList.add('hidden');
}


function errNoMatchImg() {
    iziToast.error({
                message: `Sorry, there are no images matching your search query.`,
                messageColor: '#FAFAFB',
                color: '#EF4040',
                position: 'topRight'
            });
}

function noMoreImg() {
iziToast.info({
            message: `We're sorry, but you've reached the end of search results.`,
            position: 'topRight'
        });
}


function SmoothScroll() {
     const card = document.querySelector(".img-item");
        const cardHeight = card.getBoundingClientRect().height;
        window.scrollBy({
            left: 0,
            top: cardHeight,
            behavior: "smooth"
        })
}

