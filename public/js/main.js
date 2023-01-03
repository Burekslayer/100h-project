const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deletePost)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

async function deletePost(){
    const postId = this.parentNode.dataset.id
    try{
        const responsePost = await fetch('post/deletePost', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'postIdFromJSFile': postId
            })
        })
        const data = await responsePost.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}


//__________drzave i servisi reset___________//

const els = document.querySelector('select[name="countries"] option[value=""]');
if(els){
    els.selected = true;
}
const els2 = document.querySelector('select[name="service-type"] option[value=""]');
if(els2){
    els2.selected = true;
}




//____________BACK TO TOP DUGMADIJA____________//

const showOnPx = 1;
const backToTopButton = document.querySelector(".back-to-top")
const headerBackground = document.querySelector(".header")



const scrollContainer = () => {
  return document.documentElement || document.body;
};

document.addEventListener("scroll", () => {
  if (scrollContainer().scrollTop > showOnPx) {
    backToTopButton.classList.remove("hidden")
    headerBackground.style.backgroundColor = 'white'
    headerBackground.style.boxShadow = '0 0 5px 5px rgba(0, 0, 0, 0.114)'
    
  } else {
    backToTopButton.classList.add("hidden")
    headerBackground.style.backgroundColor = 'transparent'
    headerBackground.style.boxShadow = 'none'
  }
})


backToTopButton.addEventListener("click", goToTop)

function goToTop(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

//___________FAQ DUGMADIJA____________//

const faqBtn = document.querySelectorAll(".spanClick")

faqBtn.forEach(span => span.addEventListener('click', () => {
    if(span.parentNode.nextElementSibling.className == 'hidden'){
        span.parentNode.nextElementSibling.className = ''
        span.parentNode.style.color = '#207792'
        span.innerText = '-'
    }else{
        span.parentNode.nextElementSibling.className = 'hidden'
        span.parentNode.style.color = 'black'
        span.innerText = '+'
    }
}))

//______________CAROUSEL_________________//

/* var index = 0,
    amount = 0,
    currTransl = [],
    translationComplete = true,
    moveOffset = 0;

var transitionCompleted = function(){
    translationComplete = true;
}

document.addEventListener("DOMContentLoaded", function(event) 
{
    var carousel = document.getElementById('carousel');

    amount = document.getElementsByClassName("slide").length;
    // get the width of the container
    moveOffset = parseInt(window.getComputedStyle(document.getElementById('carousel-container')).width, 10);
    // calcuate the width of the carousel
    document.getElementById('carousel').style.width = (amount * moveOffset) + 'px';
    // prevent multiple click when transition
    for(var i = 0; i < amount; i++)
    {
        currTransl[i] = -moveOffset;
        document.getElementsByClassName("slide")[i].addEventListener("transitionend", transitionCompleted, true);                    
        document.getElementsByClassName("slide")[i].addEventListener("webkitTransitionEnd", transitionCompleted, true);                    
        document.getElementsByClassName("slide")[i].addEventListener("oTransitionEnd", transitionCompleted, true);                    
        document.getElementsByClassName("slide")[i].addEventListener("MSTransitionEnd", transitionCompleted, true);                  
    }
    // add the last item to the start so that translateX(-moveOffset) works (In case the first click is the previous button)
    document.getElementById('carousel').insertBefore(document.getElementById('carousel').children[2], document.getElementById('carousel').children[0])
    // add click events to control arrows
    document.getElementById('prev').addEventListener('click', prev, true);
    document.getElementById('next').addEventListener('click', next, true);
});

function prev()
{
    if (translationComplete === true)
    {
        translationComplete = false;
        index--;
        if (index == -1)
        {
            index = amount-1;
        }
        var outerIndex = (index) % amount;
        for (var i = 0; i < amount; i++)
        {
            var slide = document.getElementsByClassName("slide")[i];    
            slide.style.opacity = '1';    
            slide.style.transform = 'translateX('+(currTransl[i]+moveOffset)+'px)';
            currTransl[i] = currTransl[i]+moveOffset;
        }
        var outerSlide = document.getElementsByClassName("slide")[outerIndex];
        outerSlide.style.transform = 'translateX('+(currTransl[outerIndex]-(moveOffset*amount))+'px)';
        outerSlide.style.opacity = '0';
        currTransl[outerIndex] = currTransl[outerIndex]-moveOffset*(amount);
    }
}

function next()
{
    if (translationComplete === true)
    {
        translationComplete = false;
        var outerIndex = (index) % amount;
        index++;
        for(var i = 0; i < amount; i++)
        {
            var slide = document.getElementsByClassName("slide")[i];    
            slide.style.opacity = '1';    
            slide.style.transform = 'translateX('+(currTransl[i]-moveOffset)+'px)';
            currTransl[i] = currTransl[i]-moveOffset;
        }
        var outerSlide = document.getElementsByClassName("slide")[outerIndex];
        outerSlide.style.transform = 'translateX('+(currTransl[outerIndex]+(moveOffset*amount))+'px)';
        // outerSlide.style.opacity = '0';
        currTransl[outerIndex] = currTransl[outerIndex]+moveOffset*(amount);
    }
}

let ul = document.querySelector('#carousel').children.length
console.log(ul)

const menu = document.querySelector('.carousel-numbers');

function createMenuItem(name) {
    let li = document.createElement('li');
    li.textContent = name;
    return li;
}

for (i=0; i<ul; i++){
    menu.appendChild(createMenuItem(`${i + 1}`));
} */