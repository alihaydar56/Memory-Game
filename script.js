const cards = document.querySelectorAll(".memory-card");
const btn = document.querySelector(".btnStart");
const btnShowAll=document.querySelector(".btnShowAll");
let hasFlippedCard = false;
let lockBoard = false;
let firstcard, secondcard;
let value = 60;
let value2=0;
let score=0;
let degişken;


btnShowAll.addEventListener("click",btnClick);
function btnClick(){
   setTimeout(kartlarıHepsiniDöndür,2000);
   cards.forEach(card => card.classList.toggle("flip"));
    // setTimeOut 2 saniye çalıştıktan sonra kartlara veridigimiz toggle özelligi ile flip classını remove ettim
}
function kartlarıHepsiniDöndür(){
    cards.forEach(card => card.classList.toggle("flip"));
    // her bir kartın classlist ine toggle ı kullanarak flip(kartı döndür) classını ekledik.
    // ve bunu btnClick fonkisyonun daki setTimeOut a gönderdik.
}
btn.addEventListener("click", function () {
    degişken = setInterval(timer, 1000);
    // degişken kullanmamın sebebi: value degeri 0 olursa clearInterval(degişken) i kullanarak setInterval() methodunu sona ermesini saglamak.


});
console.log(lockBoard);
function timer() {

    document.querySelector(".timer").innerHTML ="time :"+value;
    value--;
    if (value == -2) {
        lockBoard = true;
        document.querySelector(".timer").innerHTML = "Süreniz doldu!!!"
        alert("Oyunu Kaybettiniz!!!")
        clearInterval(degişken); // value degeri 0 oldugunda clearInterval() methodu ile setInterval() methodu durdurulacak.
        value = 60; // kullanıcı tekrardan start butonuna bastıgında timerın yeniden 30 olması için.
    }


}






function flipCard() {
    //console.log("it work");
    //console.log(this);// bu bize o objeniin hangisi oldugunu verir yanii >>> this=memory-card
    // toggle = eger bir obje o classa sahipse o classı siler,eger sahip degilse o classı ekler.
    if (lockBoard) return; // eger tahta kilitli ise kartlara kıtlaansa bile kartlar dönmiyecek
    this.classList.toggle("flip");
    if (!hasFlippedCard) {
        // user click the first card yet.
        hasFlippedCard = true;
        firstcard = this;

    } else {
        // user click the second card
        hasFlippedCard = false;
        secondcard = this;

        kartlarEsleniyormu();

    }
}

function kartlarEsleniyormu() {
    if (firstcard.dataset.framework === secondcard.dataset.framework) {
        // iki resimde aynı
        kartlarıKapatma();
    } else {
        // kartlar eşleşmiyorsa
        kartlarıKapat();

    }
}

function kartlarıKapatma() {
    // eger kartlar aynı ise card lardaki click eventini siliyoruz
    firstcard.removeEventListener("click", flipCard);
    secondcard.removeEventListener("click", flipCard);
    score+=10;
   document.querySelector(".score").innerHTML="score :"+score;
    if(score==80){
        alert("Tebrikler kazandınız!!!")
    }

}

function kartlarıKapat() {
    lockBoard = true; // eger resimler eşleşmezse kullanıcı diger resme tıklamasın diye kartları kilitlemek için
    setTimeout(() => {
        firstcard.classList.remove("flip");
        secondcard.classList.remove("flip");

        lockBoard = false; // açılıp eşlemneyen kartlar kapatıldıktan sonra kartların kilidini açmak için
    }, 1500);
}


(function randomYerlestir() {
  cards.forEach(card => {
    let randomSayı = Math.floor(Math.random() * 16);
    card.style.order = randomSayı;
  });
})();

cards.forEach(card => card.addEventListener("click", flipCard));
