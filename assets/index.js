const headerWrapper = document.querySelector('.header-wrapper');
const scrollingWatch = {
    y:''
}
window.onload = () => {
    getScrollY()
    watchHeader()
}
window.addEventListener('scroll', ()=>{
    getScrollY()
    watchHeader()
})


function getScrollY(){
    scrollingWatch.y = document.scrollingElement.scrollTop
}
function watchHeader(){
    if (scrollingWatch.y > 100) {
        headerWrapper.classList.add('scrolled')
    }else{
        headerWrapper.classList.remove('scrolled')
    }
}


function faqEl(e){
    // console.log(e.parentElement.children[1].children[0].innerHTML.length);
    if (e.parentElement.children[1].children[0] && e.parentElement.children[1].children[0].scrollHeight > 0) {
        let faqElBoll = e.parentElement.classList.toggle("active")
        if(faqElBoll){
            e.parentElement.children[1].style.height = `${e.parentElement.children[1].children[0].scrollHeight}px`
        }else{
            e.parentElement.children[1].style.height = "0px"
        }
    }
    
}

function sandwich(e){
    e.classList.toggle("active");
    document.querySelector(".menu").classList.toggle("active");
    document.querySelector("body").classList.toggle("modal-open")
}