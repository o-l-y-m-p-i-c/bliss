const headerWrapper = document.querySelector('.header-wrapper');
const scrollingWatch = {
    addClassScroll: 50,
    mobileWidthEnd: 1024,
    scrollingFlag: false,
    heightHeader: 0,
    y:''
}
window.onload = () => {
    getScrollY()
    onLoadWatchHeader(scrollingWatch.mobileWidthEnd)
}
window.addEventListener('scroll', ()=>{
    getScrollY()
    watchHeader()
})
window.addEventListener('resize', ()=>{
    // if (document.querySelector("body").scrollWidth > scrollingWatch.mobileWidthEnd) {
        // document.querySelector("body").style.marginTop = `0px`
    // }else{
        onLoadWatchHeader(scrollingWatch.mobileWidthEnd)
    // }
})

function getScrollY(){
    scrollingWatch.y = document.scrollingElement.scrollTop
}

function onLoadWatchHeader(width){
    if (document.querySelector("body").scrollWidth <= width) {
        if (scrollingWatch.y > scrollingWatch.addClassScroll) {
            let firstPromise = new Promise((resolve, reject) =>{
                scrollingWatch.scrollingFlag = true;
                scrollingWatch.heightHeader =document.querySelector('.cc-announcement').scrollHeight + document.querySelector('.header').scrollHeight;
                resolve(scrollingWatch.heightHeader)
            })
            firstPromise.then(
                resolve =>{
                    if(resolve){
                        document.querySelector('body').style.marginTop = `${resolve}px`
                        headerWrapper.classList.add('scrolled')
                    }
                    
                }
            )
            
        }
        else{
            let firstPromise = new Promise((resolve, reject)=>{
                scrollingWatch.scrollingFlag = false
                scrollingWatch.heightHeader=document.querySelector('.cc-announcement').scrollHeight + document.querySelector('.header').scrollHeight
                resolve(scrollingWatch.heightHeader)
            })
            firstPromise.then(
                resolve =>{
                    if (resolve && !scrollingWatch.scrollingFlag) {
                        console.log(resolve)
                        document.querySelector('body').style.marginTop = `${resolve}px`
                        headerWrapper.classList.remove('scrolled')
                    }
                }
            )
        
        }
    }
    else{
        let top = 0
        if (document.querySelector('.cc-announcement').scrollHeight) {
            top = document.querySelector('.cc-announcement').scrollHeight
        }
        document.querySelector("body").style.marginTop = `${top}px`
        watchHeader()
    }
}
function watchHeader(){
    if (scrollingWatch.y > scrollingWatch.addClassScroll) {
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