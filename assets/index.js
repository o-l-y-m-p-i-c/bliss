const headerWrapper = document.querySelector('.header-wrapper');
const scrollingWatch = {
    addClassScroll: 50,
    mobileWidthEnd: 1024,
    scrollingFlag: false,
    maxChildHight:0,
    heightHeader: 0,
    paddingBeforeScrolling:30*2,
    mobilePaddings:0,
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
        onLoadWatchHeader(scrollingWatch.mobileWidthEnd)
})

function getScrollY(){
    scrollingWatch.y = document.scrollingElement.scrollTop
}

function onLoadWatchHeader(width){
    if (document.querySelector("body").scrollWidth <= width) {
        document.querySelector('body').classList.add("mobile")
        if (scrollingWatch.y > scrollingWatch.addClassScroll) {
            let firstPromise = new Promise((resolve, reject) =>{
                scrollingWatch.scrollingFlag = true;
                scrollingWatch.heightHeader = document.querySelector('.cc-announcement').scrollHeight + document.querySelector('.header').scrollHeight;
                // scrollingWatch.maxChildHight = document.querySelector('.header').
                let childrensOfHeader = document.querySelector('.header').children
                let childreScrollHight = []
                for (let i = 0; i < childrensOfHeader.length; i++) {
                    childreScrollHight.push(childrensOfHeader[i].scrollHeight)
                    
                }
                childreScrollHight = getMaxOfArray(childreScrollHight)
                function getMaxOfArray(numArray) {
                    return Math.max.apply(null, numArray);
                  }
                resolve([scrollingWatch.heightHeader,childreScrollHight])
            })
            firstPromise.then(
                resolve =>{
                    
                    if(resolve){
                        if (!scrollingWatch.scrollingFlag) {
                            console.log(resolve[0], "top")
                            document.querySelector('body').style.marginTop = `${resolve[0]}px`
                        }else{
                            scrollingWatch.heightHeader = resolve[1] + document.querySelector('.cc-announcement').scrollHeight + scrollingWatch.paddingBeforeScrolling
                            
                            document.querySelector('body').style.marginTop = `${scrollingWatch.heightHeader}px`
                        }
                        
                        headerWrapper.classList.add('scrolled')
                    }
                    
                }
            )
            
        }
        else{
            let firstPromise = new Promise((resolve, reject) =>{
                scrollingWatch.scrollingFlag = false;
                scrollingWatch.heightHeader = document.querySelector('.cc-announcement').scrollHeight + document.querySelector('.header').scrollHeight;
                let childrensOfHeader = document.querySelector('.header').children
                let childreScrollHight = []
                for (let i = 0; i < childrensOfHeader.length; i++) {
                    childreScrollHight.push(childrensOfHeader[i].scrollHeight)
                }
                childreScrollHight = getMaxOfArray(childreScrollHight)
                function getMaxOfArray(numArray) {
                    return Math.max.apply(null, numArray);
                  }
                resolve([scrollingWatch.heightHeader,childreScrollHight])
            })
            firstPromise.then(
                resolve =>{
                    if(resolve){
                        if (scrollingWatch.scrollingFlag) {
                            document.querySelector('body').style.marginTop = `${resolve[0]}px`
                        }else{
                            scrollingWatch.heightHeader = resolve[1] + document.querySelector('.cc-announcement').scrollHeight + scrollingWatch.paddingBeforeScrolling
                            document.querySelector('body').style.marginTop = `${scrollingWatch.heightHeader}px`
                        }
                        headerWrapper.classList.remove('scrolled')
                    }
                }
            )

        }
    }
    else{
        document.querySelector('body').classList.remove("mobile")
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
        scrollingWatch.scrollingFlag= true
        headerWrapper.classList.add('scrolled')
    }else{
        scrollingWatch.scrollingFlag= false
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