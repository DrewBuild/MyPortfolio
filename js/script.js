/* =========================================================
GLOBAL SCRIPT
- Safe for Safari, Chrome, Mobile
- All DOM access guarded
- No external dependencies
========================================================= */
document.addEventListener("DOMContentLoaded",()=>{
/* =====================================
SCROLL INDICATOR
- Hides after slight scroll
- Mobile-safe (passive scroll)
===================================== */
const scrollIndicator=document.querySelector(".scroll-indicator");
if(scrollIndicator){
window.addEventListener("scroll",()=>{
if(window.scrollY>50){scrollIndicator.classList.add("hide");}
},{passive:true});
}
/* =====================================
HERO BLOB PARALLAX
- Mouse-based movement
- Disabled automatically if blob not present
===================================== */
const blob=document.querySelector(".hero-blue");
if(blob){
document.addEventListener("mousemove",(e)=>{
const x=(e.clientX-window.innerWidth/2)*0.02;
const y=(e.clientY-window.innerHeight/2)*0.02;
blob.style.transform=`translate(${x}px,${y}px)`;
});
}
/* =====================================
TYPING EFFECT (HOME PAGE)
- Looping type/delete animation
===================================== */
const textEl=document.getElementById("typing-text");
if(textEl){
const phrases=["Drew Jones","Greenville, SC","DrewBuilds.com"];
let currentPhrase=0;
let currentChar=0;
let isDeleting=false;
function typeLoop(){
const phrase=phrases[currentPhrase];
if(!isDeleting){
textEl.textContent=phrase.substring(0,currentChar+1);
currentChar++;
if(currentChar===phrase.length){
isDeleting=true;
setTimeout(typeLoop,2500);
return;
}
}else{
textEl.textContent=phrase.substring(0,currentChar-1);
currentChar--;
if(currentChar===0){
isDeleting=false;
currentPhrase=(currentPhrase+1)%phrases.length;
}
}
setTimeout(typeLoop,isDeleting?60:90);
}
typeLoop();
}
});