import{S as p}from"./assets/vendor-874053e3.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const a=document.querySelector("form"),u=document.querySelector("input"),l=document.querySelector(".gallery"),s=document.querySelector(".loader");s.style.display="none";a.addEventListener("submit",function(c){c.preventDefault();const n=u.value.trim();n?(s.style.display="block",fetch(`https://pixabay.com/api/?key=42259333-3fd7a9af9caf7b06e8f99497c&q=${n}&image_type=photo&orientation=horizontal&safesearch=true`).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()}).then(r=>{if(s.style.display="none",r.hits.length>0){l.innerHTML="";const i=r.hits.map(o=>`<li class="gallery-item"><a href="${o.webformatURL}">
                                <img class="gallery-image" src="${o.webformatURL}" alt="${o.tags}"></a>
                                <p><b>Likes: </b>${o.likes}</p>
                                <p><b>Views: </b>${o.views}</p>
                                <p><b>Comments: </b>${o.comments}</p>
                                <p><b>Downloads: </b>${o.downloads}</p>
                                </li>`).join("");l.insertAdjacentHTML("afterbegin",i);const e={captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",animation:250},t=new p(".gallery a",e);t.on("show.simplelightbox",()=>{}),t.refresh(),a.reset()}}).catch(r=>{console.error("Помилка при отриманні даних:",r),s.style.display="none"})):l.innerHTML="Вибачте, немає зображень, що відповідають вашому запиту. Спробуйте ще раз!",u.value=""});
//# sourceMappingURL=commonHelpers.js.map