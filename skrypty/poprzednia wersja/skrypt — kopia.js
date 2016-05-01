//0 - wierzch stosu kart
//ki-kier ka-karo tr-trefl pi-pik

//talia wzorcowa
var talia = [];
//budowa talii
var i;
for(i=2;i<=10;i++){
	dodajkolor(i);
}
dodajkolor("W");
dodajkolor("D");
dodajkolor("K");
dodajkolor("A");
//tworz talie
function dodajkolor(i){
	var str;
	str = i+"ki";
	talia.push(str);
	str = i+"ka";
	talia.push(str);
	str = i+"tr";
	talia.push(str);
	str = i+"pi";
	talia.push(str);
}


//poczatek kodu wlasciwego

//zmienne gry
var money,minimum,aktualnyZaklad;
money = 1000;
minimum = 10;

var t1,rekaGracza,rekaKrupiera;
//rozmiar stołu skalowanego
var ratio;
//obiekt graficzny stołu
var stolik,style1;
//obrazki
var imgstolu,imgtali,imgkart,imgchipsow;
var sound1, sound2;
//obiekt dzwiekowy
var audio1;
window.onload=function(){
	//załadowanie elementów gry
	var ladujbox = document.getElementById("loadingbox");
	var pasek = document.getElementById("pasek").children[0];
	ladujbox.parentNode.className="laduje";
	imgstolu = new Image();
	imgkart = new Image();
	imgtali = new Image();
	imgchipsow = new Image();
	sound1 = new Audio();
	sound2 = new Audio();
	ladujbox.children[0].innerHTML = "przygotowuwanie talii";
	imgtali.src = "talia.png";
	imgtali.onload = function(){
		ladujbox.children[0].innerHTML = "liczenie kart";
		pasek.style.width = "16%";
		imgkart.src="cardsprite.png";
	}
	imgkart.onload=function(){
		ladujbox.children[0].innerHTML = "ustawianie stołu";
		pasek.style.width = "33%";
		imgstolu.src ="table.png";
	}
	imgstolu.onload = function(){
		ladujbox.children[0].innerHTML = "nasypuję czipsy";
		pasek.style.width = "48%";
		imgchipsow.src ="chipsprite.png";
	}
	imgchipsow.onload = function(){
		ladujbox.children[0].innerHTML = "muzyczka";
		pasek.style.width = "66%";
		sound1.src = "zapodaj.wav";
	}
	sound1.oncanplaythrough=function(){
		pasek.style.width = "83%";
		sound2.src = "chip.wav";
	}
	sound2.oncanplaythrough=function(){
		ladujbox.children[0].innerHTML = "gotowe";
		pasek.style.width = "100%";
		setTimeout(function(){
			start();
		},1000);
	}
}

//funkcje gry
var graj = function(){
	if(audio1.currentTime < audio1.duration){
		audio1.currentTime = 0.0;
		audio1.play();
	}else{
		audio1.play();
	}
}

//ustawienie okna początkowego
var start = function(){
	//ustaw okno
	var oknogry = document.getElementsByTagName("main")[0];
	oknogry.className="";
	oknogry.innerHTML = "<div id=\"stolik\"><div id=\"talia\"></div></div><audio id=\"as\"></audio>";
	//pobierz element stołu
	stolik = document.getElementById("stolik");
	//pobierz styl wewnętrzny
	stolik.style.height = window.innerHeight+"px";
	style1 = window.getComputedStyle(stolik);
	//oblicz skalę
	ratio = style1.height.slice(0,-2)/800;
	//ustaw rozmiar diva na rozmiar obrazka
	stolik.style.width = (1400*ratio)+"px";
	//przeskaluj talię
	money = 1000;
	document.getElementById("talia").style.transform = "scale("+ratio+","+ratio+")";
	var hajs = document.createElement("div");
	hajs.id="hajs";
	hajs.innerHTML = money+"$";
	stolik.appendChild(hajs);
	var zaklad = document.createElement("div");
	zaklad.id="zakład";
	zaklad2 = document.createElement("ul");
	var i;
	var zetony = [];
	var wartosc = []
	var minus = [];
	var plus = [];
	var obrazek = [];
	var ilosc = [];
	var wys = ((style1.height.slice(0,-2))/5)*0.75;
	wys = wys/200;
	zaklad2.id="zaklad2";
	zaklad2.style.transform = "scale("+wys+","+wys+")";
	for(i=0;i<=4;i++){
		zetony[i]= document.createElement("li");
		wartosc[i] = document.createElement("div");
		obrazek[i] = document.createElement("div");
		plus[i] = document.createElement("button");
		minus[i] = document.createElement("button");
		ilosc[i] = document.createElement("div");
		ilosc[i].className="ilosc";
		ilosc[i].id = "ilosc"+i;
		ilosc[i].innerHTML = "<span>0</span>";
		obrazek[i].className="zeton";
		plus[i].className="przycisk";
		plus[i].id="plus"+i;
		minus[i].className="przycisk";
		minus[i].id="minus"+i;
		plus[i].innerHTML="+";
		minus[i].innerHTML="-";
		plus[i].addEventListener("click",function(){zaklady(this.id);});
		minus[i].addEventListener("click",function(){zaklady(this.id);});
		wartosc[i].className="ilosc";
		switch(i){
			case 0:
			wartosc[i].innerHTML = "<span>1$</span>";
			break;
			case 1:
			wartosc[i].innerHTML = "<span>5$</span>";
			break;
			case 2:
			wartosc[i].innerHTML = "<span>25$</span>";
			break;
			case 3:
			wartosc[i].innerHTML = "<span>50$</span>";
			break;
			case 4:
			wartosc[i].innerHTML = "<span>100$</span>";
			break;
		}
		var x,y;
		if(i<3){
			y = "0px";
			x = ((-200)*i)+"px";
		}else{
			x = ((i-3)*(-200))+"px"
			y = "-200px";
		}
		obrazek[i].style.backgroundPosition=x+" "+y;
		//dodanie;
		zetony[i].appendChild(wartosc[i]);
		zetony[i].appendChild(minus[i]);
		zetony[i].appendChild(obrazek[i]);
		zetony[i].appendChild(plus[i]);
		zetony[i].appendChild(ilosc[i]);
		zaklad2.appendChild(zetony[i]);	
	}
	var suma2 = document.createElement("div");
	suma2.id ="suma";
	suma2.innerHTML = "";
	var postaw = document.createElement("div");
	postaw.id = "postaw";
	zaklad.appendChild(suma2);
	zaklad.appendChild(postaw);
	zaklad.appendChild(zaklad2);
	oknogry.appendChild(zaklad);
	//potasuj talie
	t1 = kopiuj(talia);
	t1 = tasuj(t1,5);
	//noweRozdanie();
};

//ekran do zakładu
var zaklady = function(index){
	audio1 = document.getElementById("as");
	audio1.src = sound2.src;
	var numero = index.slice(-1);
	var str = "ilosc"+numero;
	var obiekt = document.getElementById(str).children[0];
	var suma = document.getElementById("suma");
	var hajs = document.getElementById("hajs");
	var il = parseInt(obiekt.innerHTML);
	if(index.slice(0,-1)=="plus"){
		var znak = "+";
	}else if(index.slice(0,-1) == "minus"){
		var znak = "-";
	}
	var dodaj;
	if(numero == 0){
		dodaj = 1;
	}else if(numero == 1){
		dodaj = 5;
	}else if(numero == 2){
		dodaj = 25;
	}else if(numero == 3){
		dodaj = 50;
	}else if(numero == 4){
		dodaj = 100;
	}
	var postaw = document.getElementById("postaw");
	postaw.addEventListener("click",function(){postawZaklad();});
	if(suma.innerHTML == ""){
		if(znak=="+"){
			suma.innerHTML = dodaj + "$";
			money -= dodaj;
			hajs.innerHTML = money+"$";
			if(parseInt(suma.innerHTML) >= minimum){
				postaw.style.display = "block";
				postaw.innerHTML = "POSTAW!";
				postaw.addEventListener("click",function(){postawZaklad();});
			}
			if(obiekt.innerHTML == "0"){
				obiekt.innerHTML = "1";
				graj();
			}else{
				il++;
				obiekt.innerHTML = il;
				graj();
			}
		}
	}else{
		if(znak=="-"){
			if(parseInt(obiekt.innerHTML)>0){ 
				if(parseInt(suma.innerHTML) - dodaj >= 0){
					suma.innerHTML = parseInt(suma.innerHTML)-dodaj + "$";
					money += dodaj;
					hajs.innerHTML = money+"$";
					if(parseInt(suma.innerHTML)<minimum){
						if(postaw.innerHTML != ""){
							postaw.innerHTML = "";
							postaw.style.display = "none";
						}
					}
				}
				il--;
				if(il==0){
					obiekt.innerHTML = "0";
				}else{
					obiekt.innerHTML = il;
				}
			}
		}else if(znak=="+"){
			if(parseInt(hajs.innerHTML)-dodaj>=0){
				suma.innerHTML = parseInt(suma.innerHTML)+dodaj + "$";
				money -= dodaj;
				hajs.innerHTML = money+"$";
				if(parseInt(suma.innerHTML) >= minimum){
					postaw.style.display = "block";
					postaw.innerHTML = "POSTAW!";
				}
				if(obiekt.innerHTML == "0"){
					obiekt.innerHTML = "1";
					graj();
				}else{
					il++;
					obiekt.innerHTML = il;
					graj();
				}
			}
		}
	}
};
//postaw zaklad
var postawZaklad = function(){
	var suma1 = document.getElementById("suma");
	aktualnyZaklad = parseInt(suma1.innerHTML);
	var aktualny = document.createElement("div");
	aktualny.id = "aktualnyzaklad";
	aktualny.innerHTML = aktualnyZaklad+"$";
	stolik.appendChild(aktualny);
	
	var i,j;
	var stos = document.createElement("div");
	stos.id="stos";
	var zetony = [];
	var dol = 0;
	for(i=4;i>=0;i--){
		var str = "ilosc"+i;
		var ilosc = parseInt(document.getElementById(str).children[0].innerHTML);
		console.log(i);
		console.log(ilosc);
		for(j=0;j<ilosc;j++){
			zetony.push(document.createElement("div"));
			var x,y;
			if(i<3){
				y = "0px";
				x = ((-200)*i)+"px";
			}else{
				x = ((i-3)*(-200))+"px"
				y = "-200px";
			}
			zetony[zetony.length-1].style.backgroundPosition=x+" "+y;
			zetony[zetony.length-1].style.bottom=dol+"px";
			dol += 15;
			stos.appendChild(zetony[zetony.length-1]);
		}
	}
	var skala = (50*ratio)/200;
	stos.style.transform = "scale("+skala+","+skala+")";
	stolik.appendChild(stos);
	setTimeout(function(){
		stos.style.left = "33.8%";
		stos.style.bottom = "48%";
	},50);
	var zaklad = document.getElementById("zakład");
	zaklad.parentNode.removeChild(zaklad);
	noweRozdanie();
};

//ustaw 
var noweRozdanie = function(){
	//weź nową talie i potasuj
	audio1.src = sound1.src;
	var i,spr1;
	//przydzial karty graczowi
	rekaGracza=[];
	i = rekaGracza.push(t1.shift());
	zmniejsz(t1);
	spr1 = ustaw(rekaGracza[i-1])
	spawn("g1",spr1);
	graj();
	setTimeout(function(){
		i = rekaGracza.push(t1.shift());
		zmniejsz(t1);
		spawn("g2",ustaw(rekaGracza[i-1]));
		graj();
	},750);
	//przydziel karty krupierowi
	setTimeout(function(){
		rekaKrupiera = [];
		i = rekaKrupiera.push(t1.shift());
		zmniejsz(t1);
		spawn("k1");
		graj();
		setTimeout(function(){
			i = rekaKrupiera.push(t1.shift());
			zmniejsz(t1);
			spawn("k2",ustaw(rekaKrupiera[i-1]));
			graj();
			setTimeout(function(){
				if(rekaKrupiera[1].slice(0,-2)=="A"){
					var ubz = document.createElement("div");
					var nie = document.createElement("div");
					var kwota = document.createElement("div");
					ubz.id ="ubezpieczenie";
					nie.id="nie";
					kwota.id = "kwota";
					//kwota.innerHTML = 
					nie.innerHTML = "NIE UBEZPIECZAJ";
					stolik.appendChild(ubz);
					stolik.appendChild(nie);
					stolik.appendChild(kwota);
					ubz.addEventListener("click",function(){ubezpiecz("tak");});
					nie.addEventListener("click",function(){ubezpiecz("nie");});
				}else{
					checkbj();
				}
			},3000);
		},750);
	},3000);
};

//ubezpieczenie
var ubezpiecz = function(x){
	if(x == "tak"){
		console.log("ubezpieczam");
	}else if(x=="nie"){
		checkbj();
	}
}

//sprawdz blackjacka
var checkbj = function(){
	if(rekaGracza[0].slice(0,-2)=="A"){
		var tmp = rekaGracza[1].slice(0,-2);
		if(tmp == "10"||tmp=="W"||tmp=="D"||tmp=="K"){
			sprawdzKrupiera("bj");
		}
	}else if(rekaGracza[1].slice(0,-2)=="A"){
		var tmp = rekaGracza[0].slice(0,-2);
		if(tmp == "10"||tmp=="W"||tmp=="D"||tmp=="K"){
			sprawdzKrupiera("bj");
		}
	}else{
		
	}
};

//sprawdz czy krupier tez ma BJ
var sprawdzKrupiera = function(sp="none"){
	var karta = document.getElementById("zakryta");
	karta.style.boxShadow ="0px 10px 10px 2px";
	karta.style.top = karta.style.top.slice(0,-2)-10+"px";
	setTimeout(function(){
		karta.style.left="49.2%";
		setTimeout(function(){
			karta.style.transition += ",transform 0.5s ease 0s";
			karta.style.transform +="rotateY(90deg)";
			setTimeout(function(){
				karta.style.backgroundPosition= ustaw(rekaKrupiera[0]);
				karta.style.transform="rotateY(180deg)" + "scale("+ratio+","+ratio+")";
				setTimeout(function(){
					karta.style.top = parseFloat(karta.style.top.slice(0,-2))+10+"px";
					karta.style.boxShadow="none";
					//dalsza gra
					setTimeout(function(){
						if(sp="bj"){
							if(rekaKrupiera[0].slice(0,-2)=="A"){
								var tmp = rekaKrupiera[1].slice(0,-2);
								if(tmp == "10"||tmp=="W"||tmp=="D"||tmp=="K"){
									console.log("remis");
								}
							}else if(rekaKrupiera[1].slice(0,-2)=="A"){
								var tmp = rekaKrupiera[0].slice(0,-2);
								if(tmp == "10"||tmp=="W"||tmp=="D"||tmp=="K"){
									console.log("remis");
								}
							}else{
								console.log("wygrana 1.5");
							}
						}else{
							
						}
					},1000)
				},500);
			},499);
		},1000);
	},1000);
};

//zespawnuj karte
var spawn = function(dla,sprite="hide"){
	var nowa = document.createElement("div");
	var opoznienie;
	nowa.className = "karta";
	nowa.style.transform = "scale("+ratio+","+ratio+")";
	nowa.style.transition = "top 1s,left 1s,box-shadow 1s";
	nowa.style.boxShadow ="0px 10px 10px 2px";
	stolik.appendChild(nowa);
	var karta = stolik.children[stolik.children.length-1];
	karta.style.top = "7%";
	karta.style.left= "29%";
	var x,y,translatestr;
	opoznienie = 50;
	setTimeout(function(){
		if(dla.slice(0,1)=="k"){
			karta.style.top=(0.14*style1.height.slice(0,-2))-10+"px";
			h = (0.14*style1.height.slice(0,-2))-10;
		}else if(dla.slice(0,1)=="g"){
			karta.style.top=(0.4975*style1.height.slice(0,-2))-10+"px";
			h = (0.4975*style1.height.slice(0,-2))-10;
		}
		if(dla.slice(-1)=="1"){
			if(sprite == "hide"){
				karta.id="zakryta";
				karta.style.left="43.57%";
			}else{
				karta.style.left="49.25%";
			}
		}else if(dla.slice(-1)=="2"){
				karta.style.left="56.65%";
		}
	},50);
	setTimeout(function(){
		if(sprite=="hide"){
			setTimeout(function(){
				karta.style.top = h+10+"px";
				karta.style.boxShadow="none";
			},100);
		}else{
			karta.style.transition = "transform 0.5s";
			karta.style.transform +="rotateY(90deg)";
			setTimeout(function(){
				karta.style.backgroundPosition=sprite;
				karta.style.transform="rotateY(180deg)" + "scale("+ratio+","+ratio+")";
				setTimeout(function(){
					karta.style.transition = "top 1s,box-shadow 1s";
					karta.style.top = h+10+"px";
					karta.style.boxShadow="none";
				},500);
			},500);
		}
	},1000);
};

//funkcje kart

//zmmniejsz talie
function zmniejsz(tal){
	if(tal.length==0){
		t1 = kopiuj(talia);
		t1 = tasuj(t1,5);
		document.getElementById("talia").style.backgroundPosition = "-10px 0px";
	}
	if((tal.length-1)%10==0){
		if(tal.length >= 0){
			var mnoznik = (tal.length-1)/10;
			var str = -2*mnoznik+"px -"+(5-mnoznik)+"px";
			document.getElementById("talia").style.backgroundPosition=str;
		}
	}
}
//tasuj talie
function tasuj(tal,n=1){
	var c = 0;
	var tmp,tmp2,r,i;
	do{
		for(i=1;i<5;i++){
			//tasuj
			r = (Math.floor(Math.random()*10000)%16)+10;
			tmp = tal.splice(r,51);
			while(tmp.length>5){
				r = (Math.floor(Math.random()*10000)%3)+3;
				tmp2 = tmp.splice(0,r);		
				tal = tmp2.concat(tal);
			}
			tmp2 = tmp.splice(0,tmp.length);
			tal = tmp2.concat(tal);
			//przerzuc
			tmp = tal.splice(0,26);
			tal = tal.concat(tmp);
		}
		c++;
	}while(c<=n);
	return tal;
}

//ustaw obiekt karty
var ustaw = function(atr1){
	var kolor = atr1.slice(-2);
	var numer = atr1.slice(0,-2);
	var x,y;
	switch(kolor){
		case "ki":
		y = 369;
		break;
		case "ka":
		y = 492;
		break;
		case "tr":
		y = 615;
		break;
		case "pi":
		y = 246;
		break;
	}
	y+="px";
	if(!isNaN(parseInt(numer))){
		//numer -= 1;
		x= 79*numer;
	}else{
		switch(numer){
			case "A":
			x = 79;
			break ;
			case "W":
			x = -158;
			break ;
			case "D":
			x = -79;
			break ;
			case "K":
			x = 0;
			break ;
		}
	}
	x+="px"
	var position = x+" "+y;
	return position;
};

//funkcje tablic

//odwroc tablice
function odwroc(tab){
	var x,y,tmp;
	x = 0;
	y = tab.length-1;
	while(x<y){
		if(x == y){
			break;
		}else{
			tmp = tab[y];
			tab[y] = tab[x];
			tab[x] = tmp;
		}
		x++;
		y--;
	}
	return tab;
}

//kopiuj tablice
function kopiuj(tab){
	var n = tab.length;
	var tz = [];
	var i;
	for(i=0;i<n;i++){
		tz.push(tab[i]);
	}
	return tz;
}
