import{a as S,i as g,S as M}from"./assets/vendor-b11e2a50.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))p(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&p(l)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function p(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();const q="https://pixabay.com/api/";async function y(e,o){return(await S(q,{params:{key:"44080035-ad15b59279a4b32b32cca2a53",q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:o,per_page:15}})).data}function v(e){return`<li class="img-item">
    <a class="img-link" href="${e.largeImageURL}">
    <img class="image" src ="${e.webformatURL}" alt ="${e.tags}">
    </a>
    <div class="img-info">
    <p class="info"><b>Likes</b>${e.likes}</p>
    <p class="info"><b>Views</b>${e.views}</p>
    <p class="info"><b>Comments</b>${e.comments}</p>
    <p class="info"><b>Downloads</b>${e.downloads}</p>
    </div>
    </li>`}function b(e){return e.map(v).join("")}const $=document.querySelector(".form"),u=document.querySelector(".gallery"),L=document.querySelector(".loader"),f=document.querySelector(".btn-load-more");$.addEventListener("submit",x);f.addEventListener("click",B);let s=1,i="",m;function O(){m=new M("gallery, a",{captionsData:"alt",captionDelay:250})}O();c();async function x(e){if(e.preventDefault(),u.innerHTML="",c(),w(),s=1,i=e.target.elements.query.value.trim(),!i){a(),d();return}try{const o=await y(i,s);if(o.hits.length===0)d();else{const n=b(o.hits);u.innerHTML=n,m.refresh(),o.hits.length<15?a():F()}}catch{d()}finally{e.target.reset(),a()}}async function B(){s+=1,w();try{const e=await y(i,s),o=Math.ceil(e.totalHits/15);s===o&&(c(),h());const n=b(e.hits);u.insertAdjacentHTML("beforeend",n),m.refresh(),H()}catch{h(),c()}finally{a()}}function w(){L.style.display="block"}function a(){L.style.display="none"}function F(){f.classList.remove("hidden")}function c(){f.classList.add("hidden")}function d(){g.error({message:"Sorry, there are no images matching your search query.",messageColor:"#FAFAFB",color:"#EF4040",position:"topRight"})}function h(){g.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}function H(){const o=document.querySelector(".img-item").getBoundingClientRect().height;window.scrollBy({left:0,top:o,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
