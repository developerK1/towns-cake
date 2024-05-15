//updating the copyright year
(function(){
	const currentYear = document.querySelector(".year" );

	let thisYear = new Date();
	let newYear = thisYear.getFullYear();

	currentYear.textContent = newYear ;
	currentYear.innerText = newYear;
}());
/* =============================================================== */
/* ========================= HOVER POP FORWARDS ============================= */
/* =============================================================== */
const popForward  = checkUp(document.querySelectorAll(".pop-forwards"));

if(popForward !== null){
  popForward.forEach((item) => {
    item.addEventListener("mouseover", function(){
      item.classList.add("y-zindex");
    });

    item.addEventListener("mouseout", function(){
      item.classList.remove("y-zindex");
    })
  });
}

/* =============================================================== */
/* ========================= Read More  ============================= */
/* =============================================================== */
let statusShowRead = false;

if(checkSingle(document.querySelector("#about-us button")) != undefined){
  let content = document.querySelector("#about-us aside .content");

  document.querySelector("#about-us button").addEventListener("click", (e)=>{
    if(statusShowRead === false){
      content.classList.add("opening-modal");
      e.target.textContent = "Read Less";

      statusShowRead = true;
    }else if (statusShowRead === true) {
      content.classList.remove("opening-modal");
      e.target.textContent = "Read More";

      statusShowRead = false;
    }
  })
}
/* =============================================================== */
/* ========================= SHARE BUTTON ============================= */
/* =============================================================== */

// const shareBtn = document.querySelector("footer button a");
// const shareLink = "https://rebangwefunerals.co.za";
// shareBtn.href = `https://www.facebook.com/share.php?u=${shareLink}`;

function functionalityModal(stats){
  let funModal = document.querySelector("#functional")
  let main = document.querySelector("main")

  if(stats === 'open'){
    funModal.className = "reveal-up";
    main.style.height = "100vh";
    main.style.overflow = "hidden";
  }else{
    funModal.className = "hide-up";
    main.style.minheight = "100vh";
    main.style.overflow = "inherit"; 
    setTimeout(()=> {
      funModal.style.display = "none";
    }, 2500);
  }
}

/* =============================================================== */
/* ========================= HAMBURGER ============================= */
/* =============================================================== */
const hamburger = document.querySelector("#hamburger");
const hamburgerLines = Array.from(document.querySelectorAll("#hamburger .lines"));
const navLinks = document.querySelector("header article ul")
const navLinkItems = document.querySelectorAll("header article ul li")
let mainDiv = document.querySelector("main")
let hamburgerStatus = false;


hamburger.addEventListener("click", function(){
	
	
  if(!hamburgerStatus){
    navLinks.classList.add("show-ul");
    setTimeout(()=> navLinks.classList.add("open-hamburder"), 500);

    hamburgerLines[0].classList.add("upperline");
    hamburgerLines[1].classList.add("middleline");
    hamburgerLines[2].classList.add("lowerline");

	  mainDiv.style.display = "none";

    hamburgerStatus = true;

  }else if(hamburgerStatus){
   closeSetUP();
  }
})


navLinkItems.forEach( link =>{
  link.addEventListener("click", function(){
    if(navLinks.className == "show-ul open-hamburder"){
      closeSetUP();
    }
  })
})


function closeSetUP(){
  setTimeout(()=> navLinks.classList.remove("open-hamburder"), 500);
console.log("closed set up ran")
  hamburgerLines[0].classList.remove("upperline");
  hamburgerLines[1].classList.remove("middleline");
  hamburgerLines[2].classList.remove("lowerline");

  navLinks.classList.remove("show-ul");

  mainDiv.style.display = "block";
  hamburgerStatus = false;

}
/* =============================================================== */
/* ========================= ORDER MODAL ============================= */
/* =============================================================== */
const orders =checkUp(document.querySelectorAll("#our-flavours form button"));

if(orders !== null){
  let flavour;

  orders.forEach(order => {
    order.addEventListener("click", function(e){
      e.preventDefault();
      let parent = this.parentElement;
      flavour = parent.firstElementChild;
      setModal(flavour, parent)
    })
  })
}

function setModal(flavour, parent){
  let imgParent = parent.parentElement.parentElement;
  // let img = imgParent.firstElementChild;

  let modalContainer = document.querySelector("#cust-modal");
 
  let template = `
    <div class="cust-modal flexy-col">
      <div class="cust-header" onclick="closeOrderModal()"><h3> X </h3></div>
      <aside>
        <h3>PLACING AN ORDER</h3>
        <div>
          <img src="assests/gallery/flavours/${flavour.value}.png" />  
        </div>
        <div class="flexy-cen">
          <div>
            <h6>${flavour.value} Cake</h6>
            <h4>PRICE : R450</h4>
          </div>
          <div>
            <button class="buy" onclick="paymentGate()">Buy</button>
          </div>
        </div>
      </aside>
      <div class="cust-footer" onclick="closeOrderModal()"><h3> X </h3></div>
    </div>
  `;

  modalContainer.classList.add("force-show");
  modalContainer.innerHTML = template;
}

function closeOrderModal(){
  document.querySelector("#cust-modal").classList.remove("force-show")
}
function paymentGate(){
  let count = 5;

  document.querySelector("#cust-modal").innerHTML = `
  <div class="cust-modal flexy-col" id="buyModal">
    <div class="cust-header" onclick="closeOrderModal()"><h3> X </h3></div>
    <aside>
      <h4>Thanks For Trying out</h4>
      <p>This Sample</p>
      <h6>FOR FULL DEMO</h6>
      <p>076 176 2729</p>
      <p>REDIRECTING YOU <span>${count}</span>
    </aside>
    <div class="cust-footer" onclick="closeOrderModal()"><h3> X </h3></div>
  </div>
`;
 
setInterval(countDown,1000);

  function countDown(){
    if(count == 0){
      window.location.reload();
    }else{
      count = count -1;
      document.querySelector("#buyModal span").innerText = count;
    }
    
  }
}
/* =============================================================== */
/* ========================= HOME HERO FUNCS ===================== */
/* =============================================================== */
const heroCont = checkSingle(document.querySelector("#home-hero"));

//BACKGROUND IMAGE SOURCE
const bgImg = ["assests/carousels/fresh.jpg", "assests/carousels/mixen.jpg", "assests/carousels/crafts.jpg"];
//ARTICLE COLORS ARRAY
const artColors = ["#e2bf3f8f", "#000000b0", "#ffffff69"];

let counter = 0;


if(heroCont !== null){ //CHECKING IF ELEMENT EXIST
  let heroArt = document.querySelector("#home-hero article");

  //TIME FRAME
  setInterval(()=>{
    if(counter == 2){
      counter = 0;
      renderBg(counter)
    }else {
      counter++;
      renderBg(counter)
    }
  },7000)


  //GETTING NEXT DOM BUTTOM
  document.querySelector("#home-hero #next").addEventListener("click", function(){

    if(counter === 2){
      counter = 0;
      renderBg(counter);
    }else{
      counter++;
      renderBg(counter)
    }
  
  })

  //GETTING PREV DOM BUTTOM
  document.querySelector("#home-hero #prev").addEventListener("click", function(){
  
    if(counter === 0){
      counter = 2;
      renderBg(counter);
    }else{
      counter--;
      renderBg(counter)
    }
    
  })


  //DOM UPDATING FUNCTION
  function renderBg(counter){
    heroCont.style.background = `url(${bgImg[counter]}) no-repeat`;
    heroCont.style.backgroundSize = `cover`;
    heroCont.style.backgroundPosition = `center`;
    // heroCont.className = "multiply-bg";
    heroArt.style.backgroundColor = artColors[counter];
  }
}

/* =============================================================== */
/* ========================= MODALS COSTUMIZED ============================= */
/* =============================================================== */
const modalBtns = document.querySelectorAll("main .modal-btn");
const menuLinks = document.querySelectorAll(".menu-links")
const formBtn = document.querySelectorAll("#form form button")



//ATTACHING EVENTS
formBtn.forEach(btn => btn.addEventListener("click", (e)=> {
  e.preventDefault();
  showModalFunc("functionality");
}))
menuLinks.forEach(link => link.addEventListener("click", (e)=>showModalFunc("functionality")));
modalBtns.forEach(btn => btn.addEventListener("click", (e)=>showModalFunc("functionality")));


//DISPLAY MODAL FUNC
function showModalFunc(id){
  document.querySelector(`#${id}`).classList.add("force-show")
}


//CLOSE MOFAL FUNC
function closeModal(id){
  document.querySelector(`#${id}`).classList.remove("force-show")
}

/* =============================================================== */
/* ========================= CHECK IF DOCUEMNET HAS AN ITEM ============================= */
/* =============================================================== */
function checkUp(item){

 if(item.length === 0) {
   return null;
 }
   return item;
}

function checkSingle(elem){
  if(elem !== null){
    return elem;
  }
}
