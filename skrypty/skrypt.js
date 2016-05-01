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
//do splitu
var splity = [];
var zaklady = [];
var obslugiwanysplit = undefined;
//reszta
var money,minimum,aktualnyZaklad,ubezpieczony;
money = 1000;
minimum = 10;
ubezpieczony =false;
var hituje = false;
var interwal = undefined;
//reka gracza i krupiera
var t1,rekaGracza,rekaKrupiera,wysplitowana;
//rozmiar stołu skalowanego
var ratio;
//obiekt graficzny stołu
var stolik,style1;
//obrazki
var imgstolu,imgtali,imgkart,imgchipsow;
var sound1, sound2;
//obiekt dzwiekowy
var audio1;

//po zaladowaniu okna uruchom ladowanie elementow
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

//odpal dzwiek
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
	//ustaw poczatkowy hajs
	money = 1000;
	var hajs = document.createElement("div");
	hajs.id="hajs";
	hajs.innerHTML = money+"$";
	stolik.appendChild(hajs);
	//przeskaluj talię
	document.getElementById("talia").style.transform = "scale("+ratio+","+ratio+")";
	//ustaw okno zakladow
	var zaklad = document.createElement("div");
	zaklad.id="zaklad";
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
	suma2.innerHTML = "<p></p>";
	var postaw = document.createElement("div");
	postaw.id = "postaw";
	postaw.addEventListener("click",function(){postawZaklad();});
	zaklad.appendChild(suma2);
	zaklad.appendChild(postaw);
	zaklad.appendChild(zaklad2);
	oknogry.appendChild(zaklad);
	//utworzenie przyciskow
	var h = document.createElement("div");
	h.className = "wtd";
	h.id="hit";
	h.innerHTML = "<span>HIT</span>";
	h.addEventListener("click",hit);
	var s = document.createElement("div");
	s.className="wtd";
	s.id="stand";
	s.innerHTML = "<span>STAND</span>";
	s.addEventListener("click",stand);
	var dd = document.createElement("div");
	dd.className="wtd";
	dd.id="ddown";
	dd.innerHTML = "<span>DOUBLE DOWN</span>";
	dd.addEventListener("click",ddown);
	var spl = document.createElement("div");
	spl.className="wtd";
	spl.id="split";
	spl.innerHTML = "<span>SPLIT</span>";
	spl.addEventListener("click",split);
	stolik.appendChild(h);
	stolik.appendChild(s);
	stolik.appendChild(dd);
	stolik.appendChild(spl);
	//elementy do ubezpieczenia
	var ubz = document.createElement("div");
	var nie = document.createElement("div");
	var kwota = document.createElement("div");
	ubz.id ="ubezpieczenie";
	nie.id="nie";
	kwota.id = "kwota";
	nie.innerHTML = "DO NOTHING";
	ubz.addEventListener("click",function(){ubezpiecz("tak");});
	nie.addEventListener("click",function(){ubezpiecz("nie");});
	stolik.appendChild(ubz);
	stolik.appendChild(nie);
	stolik.appendChild(kwota);
	//sumy
	var sumagr = document.createElement("div");
	var sumakr = document.createElement("div");
	sumagr.className="sumy";
	sumakr.className="sumy";
	sumagr.id="sumagr";
	sumakr.id="sumakr";
	sumagr.innerHTML = "<span></span>";
	sumakr.innerHTML = "<span></span>";
	stolik.appendChild(sumagr);
	stolik.appendChild(sumakr);
	//aktualny zaklad
	var aktualny = document.createElement("div");
	aktualny.id = "aktualnyzaklad";
	stolik.appendChild(aktualny);
	//sumy dla splitow
	var sumaspl = [];
	for(var i = 0;i<3;i++){
		sumaspl.push(document.createElement("div"));
		sumaspl[i].id="sumaspl"+(i+1);
		sumaspl[i].innerHTML = "<span></span>";
		sumaspl[i].className="sumy";
		sumaspl[i].style.left="65%";
		sumaspl[i].style.top=1+(i*16)+"%";
		sumaspl[i].style.display="none";
		stolik.appendChild(sumaspl[i]);
	}
	//potasuj talie
	t1 = kopiuj(talia);
	t1 = tasuj(t1,5);
};

//ekran do zakładu
var zaklady = function(index){
	audio1 = document.getElementById("as");
	audio1.src = sound2.src;
	var numero = index.slice(-1);
	var str = "ilosc"+numero;
	var obiekt = document.getElementById(str).children[0];
	var suma = document.getElementById("suma").children[0];
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
	if(suma.innerHTML == ""){
		if(znak=="+"){
			suma.innerHTML = dodaj + "$";
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
	var suma1 = document.getElementById("suma").children[0];
	aktualnyZaklad = parseInt(suma1.innerHTML);
	var aktualny = document.getElementById("aktualnyzaklad");
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
	var zaklad = document.getElementById("zaklad");
	
	//przygotuj do nastepnego zakladu
	var i;
	for(i=0;i<5;i++){
		document.getElementById("ilosc"+i).children[0].innerHTML = "0";
	}
	suma1.innerHTML = "";
	document.getElementById("postaw").style.display="none";
	zaklad.style.display="none";
	//nowe rozdanie
	noweRozdanie();
};

//2 etap gry

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
				checkbj();
			},3000);
		},750);
	},3000);
};

//ubezpieczenie
var ubezpiecz = function(x){
	var ubz = document.getElementById("ubezpieczenie");
	var nie = document.getElementById("nie");
	var kwota = document.getElementById("kwota");
	ubz.style.display="none";
	nie.style.display="none";
	//kwota.style.display="none";
	if(x == "tak"){
		if(ubz.innerHTML != ""){
			//take even money
			kwota.innerHTML = "";
			kwota.style.display="none";
			ubz.innerHTML = "";
			kuniec("w");
		}else{
			var ile = parseInt(kwota.innerHTML);
			money= parseInt(money)-ile;
			document.getElementById("hajs").innerHTML = money+"$";
			var ubz = document.createElement("div");
			ubz = tworzStos(ile,ubz);
			ubz.id="ubz";
			stolik.appendChild(ubz);
			setTimeout(function(){
				ubz.style.left="40.5%";
				ubz.style.bottom="58%";
			},50);
			sprawdzKrupiera("none","ubz");
		}
	}else if(x=="nie"){
		ubz.innerHTML = "";
		kwota.innerHTML = "";
		kwota.style.display="none";
		sprawdzKrupiera("none");
	}
}

//sprawdz blackjacka
var checkbj = function(){
	var maszbja = false;
	if((rekaGracza[0].slice(0,-2)=="A")||(rekaGracza[1].slice(0,-2)=="A")){
		var tmp;
		if(rekaGracza[0].slice(0,-2)=="A"){
			tmp= rekaGracza[1].slice(0,-2);
		}else if(rekaGracza[1].slice(0,-2)=="A"){
			tmp= rekaGracza[0].slice(0,-2);
		}
		if(tmp == "10"||tmp=="W"||tmp=="D"||tmp=="K"){
			maszbja = true;
			document.getElementById("sumagr").children[0].innerHTML = "BJ";
		}
	}
	if(maszbja){
		if(rekaKrupiera[1].slice(0,-2)=="A"){
			//zrob even money
			var ubz = document.getElementById("ubezpieczenie");
			var nie = document.getElementById("nie");
			var kwota = document.getElementById("kwota");
			ubz.className="ubzevenmoney";
			ubz.innerHTML = "<p>TAKE EVEN MONEY</p>";
			kwota.innerHTML = Math.floor(aktualnyZaklad*2)+"$";
			ubz.style.display="block";
			nie.style.display="block";
			kwota.style.display="block";
		}else{
			var tmp = rekaKrupiera[1].slice(0,-2);
			if(tmp == "10"||tmp=="W"||tmp=="D"||tmp=="K"){
				sprawdzKrupiera("bj");
			}else{
				kuniec("bj");
			}
		}
	}else{
		//nie masz blackjacka
		if(rekaKrupiera[1].slice(0,-2)=="A"){
			//ubezpieczonko
			var ubz = document.getElementById("ubezpieczenie");
			var nie = document.getElementById("nie");
			var kwota = document.getElementById("kwota");
			ubz.className="ubzzwykle";
			kwota.innerHTML = Math.floor(aktualnyZaklad/2)+"$";
			ubz.style.display="block";
			nie.style.display="block";
			kwota.style.display="block";
		}else{
			document.getElementById("sumagr").children[0].innerHTML = sumuj("g");
			var h = document.getElementById("hit");
			h.style.display="block";
			var s = document.getElementById("stand");
			s.style.display="block";
			var dd = document.getElementById("ddown");
			dd.style.display="block";
			if(rekaGracza[0].slice(0,-2)==rekaGracza[1].slice(0,-2)){
			var spl = document.getElementById("split");
				spl.style.display="block";
			}
		}
	}
};

//sprawdz czy krupier tez ma BJ
var sprawdzKrupiera = function(sp,ubz="brak"){
	var karta = document.getElementById("zakryta");
	if(karta!=undefined){
		karta.style.boxShadow ="0px 10px 10px 2px";
		karta.style.top = karta.style.top.slice(0,-2)-10+"px";
		karta.style.zIndex="10";
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
						karta.style.zIndex="";
						//dalsza gra
						setTimeout(function(){
							karta.id="odkryta";
							if(sp=="bj"){
								var krupiermabj = false;
								if(rekaKrupiera[0].slice(0,-2)=="A"){
									var tmp = rekaKrupiera[1].slice(0,-2);
									if(tmp == "10"||tmp=="W"||tmp=="D"||tmp=="K"){
										krupiermabj = true;
									}
								}
								if(krupiermabj){
									document.getElementById("sumakr").children[0].innerHTML = "BJ";
									kuniec("r");
								}else{
									//wygrana: zaklad + 3/2 zakladu
									document.getElementById("sumakr").children[0].innerHTML = sumuj("k");
									kuniec("bj");
								}
							}else if(sp=="none"){
								document.getElementById("sumakr").children[0].innerHTML = sumuj("k");
								if(ubz == "ubz"){
									//ubezpieczenie
									var tmp = rekaKrupiera[0].slice(0,-2);
									if(tmp == "10"||tmp=="W"||tmp=="D"||tmp=="K"){
										//wygrywasz ubezpieczenie x2
										return kuniec("ubz");
									}else{
										//tracisz ubezpieczenie i gra toczy sie dalej
										var kwota = document.getElementById("kwota");
										kwota.innerHTML = "";
										kwota.style.display="none";
										var zetonyubz =document.getElementById("ubz");
										zetonyubz.style.left="47%";
										zetonyubz.style.bottom="110%";
										var h = document.getElementById("hit");
										h.style.display="block";
										var s = document.getElementById("stand");
										s.style.display="block";
										var dd = document.getElementById("ddown");
										dd.style.display="block";
										if(rekaGracza[0].slice(0,-2)==rekaGracza[1].slice(0,-2)){
										var spl = document.getElementById("split");
											spl.style.display="block";
										}
										document.getElementById("sumagr").children[0].innerHTML = sumuj("g");
										setTimeout(function(){
											zetonyubz.parentNode.removeChild(zetonyubz);
										},1050);
									}
								}else{
									var tmp = rekaKrupiera[0].slice(0,-2);
									if(tmp == "10"||tmp=="W"||tmp=="D"||tmp=="K"){
										return kuniec("p");
									}else{
										var h = document.getElementById("hit");
										h.style.display="block";
										var s = document.getElementById("stand");
										s.style.display="block";
										var dd = document.getElementById("ddown");
										dd.style.display="block";
										if(rekaGracza[0].slice(0,-2)==rekaGracza[1].slice(0,-2)){
											var spl = document.getElementById("split");
											spl.style.display="block";
										}
										document.getElementById("sumagr").children[0].innerHTML = sumuj("g");
									}
								}
							}else if(sp=="stand"){
								document.getElementById("sumakr").children[0].innerHTML = sumuj("k");
								botkrupiera();
							}
						},1000)
					},500);
				},499);
			},1000);
		},1000);
	}else if(sp=="stand"){
		botkrupiera();
	}
};

var botkrupiera = function(){
	var suma = sumuj("k");
	document.getElementById("sumakr").children[0].innerHTML = suma;
	if(suma<17){
		var i;
		//dodaj karte
		i = rekaKrupiera.push(t1.shift());
		zmniejsz(t1);
		spawn("k+",ustaw(rekaKrupiera[i-1]));
		graj();
		suma = sumuj("k");
		setTimeout(function(){
			if(suma >21){
				document.getElementById("sumakr").children[0].innerHTML = "BUST!";
			}else{
				document.getElementById("sumakr").children[0].innerHTML = suma;
			}
		},2500);
		if(suma<17){
			interwal = setInterval(function(){
				if(suma)
				i = rekaKrupiera.push(t1.shift());
				zmniejsz(t1);
				spawn("k+",ustaw(rekaKrupiera[i-1]));
				graj();
				suma = sumuj("k");
				setTimeout(function(){
					if(suma >21){
						document.getElementById("sumakr").children[0].innerHTML = "BUST!";
					}else{
						document.getElementById("sumakr").children[0].innerHTML = suma;
					}
				},2500);
				if(suma>=17){
					clearInterval(interwal);
					interwal = undefined;
					//sprawdzktowygral
					setTimeout(function(){
						if(splity.length>0){
							sprawdzeniesplitow();
						}else{
							ktowygral();
						}
					},3000);
				}
			},3000);
		}else{
			if(suma == 21){
				document.getElementById("sumakr").children[0].innerHTML = "BJ";
			}
			setTimeout(function(){
				if(splity.length>0){
					sprawdzeniesplitow();
				}else{
					ktowygral();
				}
			},3000);
		}
	}else{
		if(splity.length>0){
			sprawdzeniesplitow();
		}else{
			ktowygral();
		}
	}
};

var ktowygral = function(){
	var suma = sumuj("k");
	if(suma>21){
		if(splity.length==0){
			var sumagr = String(sumuj("g"));
		}else{
			var tmp3 = rekaGracza;
			rekaGracza = splity[obslugiwanysplit-1].karty;
			var sumagr = String(sumuj("g"));
			rekaGracza = tmp3;			
		}
		if(sumagr.length>2){
			if(parseInt(sumagr)<=10){
				sumagr = parseInt(sumagr)+11;
			}else{
				sumagr = parseInt(sumagr)+1;
			}
		}else{
			sumagr = parseInt(sumagr);
		}
		if(sumagr<=21){
			setTimeout(function(){
				kuniec("w");
			},1000);
		}else{
			setTimeout(function(){
				kuniec("p");
			},1000);
		}
	}else{
		if(splity.length>0){
			var tmp3 = rekaGracza;
			rekaGracza = splity[obslugiwanysplit-1].karty;
			var sumagr = String(sumuj("g"));
			rekaGracza = tmp3;
			if(sumagr.length>2){
				if(parseInt(sumagr)<=10){
					sumagr = parseInt(sumagr)+11;
				}else{
					sumagr = parseInt(sumagr)+1;
				}
				var tmpname= "sumaspl"+obslugiwanysplit;
				document.getElementById(tmpname).children[0].innerHTML = sumagr;
			}else{
				sumagr = parseInt(sumagr);
			}
			if(sumagr>suma){
				setTimeout(function(){
					kuniec("w");
				},1000);
			}else if(sumagr==suma){
				setTimeout(function(){
					kuniec("r");
				},1000);
			}else if(sumagr<suma){
				setTimeout(function(){
					kuniec("p");
				},1000);
			}
		}else{
			var sumagr = String(sumuj("g"));
			if(sumagr.length>2){
				if(parseInt(sumagr)<=10){
					sumagr = parseInt(sumagr)+11;
				}else{
					sumagr = parseInt(sumagr)+1;
				}
				document.getElementById("sumagr").children[0].innerHTML = sumagr;
			}else{
				sumagr = parseInt(sumagr);
			}
			if(sumagr>suma){
				setTimeout(function(){
					kuniec("w");
				},1000);
			}else if(sumagr==suma){
				setTimeout(function(){
					kuniec("r");
				},1000);
			}else if(sumagr<suma){
				setTimeout(function(){
					kuniec("p");
				},1000);
			}
		}
	}
};

//hituj
var hit=function(dubluje=false){
	if(rekaGracza.length==2){
		if(rekaGracza[0].slice(0,-2)==rekaGracza[1].slice(0,-2)){
			var spl = document.getElementById("split");
			spl.style.display="none";
		}
	}
	if(hituje == false){
		document.getElementById("ddown").style.display="none";
		document.getElementById("hit").className="disabled";
		document.getElementById("stand").className="disabled";
		hituje = true;
		var i;
		i = rekaGracza.push(t1.shift());
		zmniejsz(t1);
		spawn("g+",ustaw(rekaGracza[i-1]));
		graj();
		var suma = String(sumuj("g"));
		setTimeout(function(){
			if(suma.length<3){
				if(parseInt(suma)>21){
					if(splity.length>0){
						hituje=false;
						document.getElementById("sumagr").children[0].innerHTML = "BUST!";
						if(dubluje != true){
							stand();
						}
					}else{
						document.getElementById("sumagr").children[0].innerHTML = "BUST!";
						var h = document.getElementById("hit");
						h.style.display="none";
						var s = document.getElementById("stand");
						s.style.display="none";
						var dd = document.getElementById("ddown");
						dd.style.display="none";
						setTimeout(function(){
							kuniec("p");
						},1000);
						hituje = false;
						document.getElementById("hit").className="wtd";
						document.getElementById("stand").className="wtd";
						return "busted";
					}
				}else{
					document.getElementById("sumagr").children[0].innerHTML = suma;
					if(parseInt(suma)==21){
						stand();
					}
				}
			}else{
				if(parseInt(suma)>20){
					if(splity.length>0){
						hituje=false;
						document.getElementById("sumagr").children[0].innerHTML = "BUST!";
						if(!dubluje){
							stand();
						}
					}else{
						document.getElementById("sumagr").children[0].innerHTML = "BUST!";
						var h = document.getElementById("hit");
						h.style.display="none";
						var s = document.getElementById("stand");
						s.style.display="none";
						var dd = document.getElementById("ddown");
						dd.style.display="none";
						setTimeout(function(){
							kuniec("p");
						},1000);
						hituje = false;
						document.getElementById("hit").className="wtd";
						document.getElementById("stand").className="wtd";
						return "busted";
					}
				}else{
					document.getElementById("sumagr").children[0].innerHTML = suma;
				}
			}
			hituje = false;
			document.getElementById("hit").className="wtd";
			document.getElementById("stand").className="wtd";
		},3000);
	}
};
//standuj
var stand = function(zbustowal="nie"){
	if(rekaGracza[0].slice(0,-2)==rekaGracza[1].slice(0,-2)){
		var spl = document.getElementById("split");
		spl.style.display="none";
	}
	if(hituje==false){
		hituje=true;
		var h = document.getElementById("hit");
		var s = document.getElementById("stand");
		var dd = document.getElementById("ddown");
		if(splity.length>0){
			h.style.display="block";
			s.style.display="block";
			dd.style.display="block";
			if(obslugiwanysplit==undefined||obslugiwanysplit<splity.length){
				if(obslugiwanysplit==undefined){
					obslugiwanysplit=1;
				}else{
					obslugiwanysplit++;
				}
				var tmpid = "spl"+obslugiwanysplit+"1";
				var karta = document.getElementById(tmpid);
				karta.id="g1";
				karta.style.transition = "top 1s,left 1s,box-shadow 1s";
				karta.style.top = parseInt(karta.style.top)- 10 + "px";
				karta.style.boxShadow ="0px 10px 10px 2px";
				var reka = [];
				var noweid = "spl"+obslugiwanysplit;
				for(var i = 1;i<=rekaGracza.length;i++){
					var tmpid= "g"+i;
					reka[i]= document.getElementById(tmpid);
					reka[i].id=noweid+i;
					reka[i].style.transition = "top 1s,left 1s,box-shadow 1s";
					reka[i].style.top = parseInt(reka[i].style.top) - 10 + "px";
					reka[i].style.boxShadow ="0px 10px 10px 2px";
					reka[i].style.zIndex = String(21+i);
				}
				setTimeout(function(){
					karta.style.zIndex="30";
					karta.style.left = "49.15%";
					karta.style.top = 0.4975*style1.height.slice(0,-2) - 10 + "px";
					var procenttop = (1+((obslugiwanysplit-1)*16))/100;
					for(var i in reka){
						reka[i].style.top = procenttop*style1.height.slice(0,-2)-10+"px";
						reka[i].style.left = 76+parseInt(i)+"%";
					}
					setTimeout(function(){
						karta.style.zIndex="";
						for(var i in reka){
							reka[i].style.zIndex = "";
						}
						karta.style.top = 0.4975*style1.height.slice(0,-2) + "px";
						for(var i in reka){
							reka[i].style.top = procenttop*style1.height.slice(0,-2)+"px";
						}
						karta.style.boxShadow="";
						for(var i in reka){
							reka[i].style.boxShadow="";
						}
						setTimeout(function(){
							var tmpid = "sumaspl"+obslugiwanysplit;
							document.getElementById(tmpid).children[0].innerHTML = sumuj("g");
							document.getElementById("sumagr").children[0].innerHTML = "";
							var tmp = splity[obslugiwanysplit-1].karty[0];
							splity[obslugiwanysplit-1].karty=rekaGracza;
							rekaGracza = [];
							rekaGracza[0] = tmp;
							i = rekaGracza.push(t1.shift());
							zmniejsz(t1);
							spawn("g2",ustaw(rekaGracza[i-1]));
							graj();
							setTimeout(function(){
								var suma3 = document.getElementById("sumagr").children[0];
								if(sumuj("g")!=parseInt(sumuj("g"))){
									suma3.innerHTML = parseInt(sumuj("g"))+11;
								}else{
									suma3.innerHTML = sumuj("g");
								}
								h.className="wtd";
								s.className="wtd";
								dd.className="wtd";
								hituje=false;
							},2550);
						},1050);
					},1050);
				},1050);
				h.className="disabled";
				s.className="disabled";
				dd.className="disabled";
			}else if(obslugiwanysplit==splity.length){
				h.style.display="none";
				s.style.display="none";
				dd.style.display="none";
				//koniec obslugi splitow
				obslugiwanysplit=1;
				sprawdzKrupiera("stand");
			}
		}else{
			hituje=false;
			h.style.display="none";
			s.style.display="none";
			dd.style.display="none";
			if(zbustowal !="busted"){
				sprawdzKrupiera("stand");
			}
		}
	}
};

var sprawdzeniesplitow = function(){
	obslugiwanysplit=1;
	ktowygral();
	interwal = setInterval(function(){
		if(obslugiwanysplit>=splity.length){
			for(x in splity){
				var szukaneid = "sumaspl"+(parseInt(x)+1);
				document.getElementById(szukaneid).children[0].innerHTML = "";
				document.getElementById(szukaneid).style.display="none";
			}
			splity=[];
			obslugiwanysplit= undefined;
			clearInterval(interwal);
			interwal = undefined;
			ktowygral();
		}else{
			obslugiwanysplit++;
			ktowygral();
		}
	},3050);
}
//double down
var ddown = function(){
	if(hituje == false){
		if(rekaGracza[0].slice(0,-2)==rekaGracza[1].slice(0,-2)){
			var spl = document.getElementById("split");
			spl.style.display="none";
		}
		var h = document.getElementById("hit");
		var s = document.getElementById("stand");
		var dd = document.getElementById("ddown");
		h.style.display="none";
		s.style.display="none";
		dd.style.display="none";
		//podwoj zaklad
		var stosik = document.getElementById("stos");
		setTimeout(function(){
			stosik.style.left="6.8%";
			stosik.style.bottom="-10%";
			setTimeout(function(){
				money-=aktualnyZaklad;
				document.getElementById("hajs").innerHTML = money+"$";
				aktualnyZaklad *=2;
				stosik.innerHTML = "";
				stosik = tworzStos(aktualnyZaklad,stosik);
				stosik.style.left="33.8%";
				stosik.style.bottom="48%";
				setTimeout(function(){
					document.getElementById("aktualnyzaklad").innerHTML = aktualnyZaklad+"$";
					var czyzbustowal = hit(true);
					setTimeout(function(){
						if(splity.length>0){
							if(obslugiwanysplit==undefined||obslugiwanysplit<splity.length){
								var index1;
								if(obslugiwanysplit==undefined){
									index1 = 1;
								}else{
									index1 = obslugiwanysplit+1;
								}
								var tmpid2 = "splitstos"+index1;
								var stosik2 = document.getElementById(tmpid2);
								var tmp = stosik2.style.left;
								stosik2.id="stos";
								stosik2.className="";
								stosik.id = tmpid2;
								stosik.className="stos2";
								splity[index1-1].zaklad = aktualnyZaklad;
								stosik2.style.left = stosik.style.left;
								stosik.style.left = tmp;
								tmp = stosik2.style.bottom;
								stosik2.style.bottom = stosik.style.bottom;
								stosik.style.bottom = tmp;
								setTimeout(function(){
									aktualnyZaklad /= 2;
									document.getElementById("aktualnyzaklad").innerHTML = aktualnyZaklad+"$";
									if(czyzbustowal == "busted"){
										stand("busted");
									}else{
										stand();
									}
								},1050);
							}else{
								if(czyzbustowal == "busted"){
									stand("busted");
								}else{
									stand();
								}
							}
						}else{
							if(czyzbustowal == "busted"){
								stand("busted");
							}else{
								stand();
							}
						}
					},3000);
				},1050);
			},1500);
		},50);
	}
};

var split = function(){
	//usuń przycisk
	if(hituje == false){
		hituje = true;
		var nowy = splity.length;
		//zablokuj przyciski
		var spl = document.getElementById("split");
		spl.style.display="none";
		document.getElementById("ddown").className="disabled";
		document.getElementById("hit").className="disabled";
		document.getElementById("stand").className="disabled";
		//przenies karte na jej nowe miejsce
		splity[nowy] = {};
		splity[nowy].zaklad = aktualnyZaklad;
		splity[nowy].karty = []
		splity[nowy].karty.push(rekaGracza[1]);
		var g2 = document.getElementById("g2");
		g2.style.transition = "left 1s, top 1s,box-shadow 1s";
		g2.style.boxShadow ="0px 10px 10px 2px";
		g2.style.top = parseInt(g2.style.top)-10+"px";
		setTimeout(function(){
			g2.style.zIndex="25";
			g2.style.left = "76%";
			switch(nowy){
				case 0:
				g2.style.top = 0.01*style1.height.slice(0,-2)-10+"px";
				g2.id="spl11";
				break;
				case 1:
				g2.style.top = 0.17*style1.height.slice(0,-2)-10+"px";
				g2.id="spl21";
				break;
				case 2:
				g2.style.top = 0.33*style1.height.slice(0,-2)-10+"px";
				g2.id="spl31";
				break;
			}
			setTimeout(function(){
				g2.style.boxShadow = "";
				g2.style.top = parseInt(g2.style.top)+10+"px";
				g2.style.zIndex="";
				//dodaj nowa karte do aktualnej reki
				setTimeout(function(){
					rekaGracza[1]=(t1.shift());
					zmniejsz(t1);
					spawn("g2",ustaw(rekaGracza[1]));
					graj();
					setTimeout(function(){
						document.getElementById("sumagr").innerHTML = "<span>"+sumuj("g")+"</span>";
						if(rekaGracza[0].slice(0,-2)==rekaGracza[1].slice(0,-2)){
							//max 3 splity
							if(nowy<2){
								spl.style.display="block";
							}
						}
						document.getElementById("ddown").className="wtd";
						document.getElementById("hit").className="wtd";
						document.getElementById("stand").className="wtd";
						hituje = false;
					},2500);
				},1500);
			},1050);
		},1050);
		//usun hajs
		money -= aktualnyZaklad;
		document.getElementById("hajs").innerHTML = money+"$";
		//skopiuj zaklad
		var splitstos = document.createElement("div");
		splitstos=kopiujStos(document.getElementById("stos"));
		splitstos.className="stos2";
		splitstos.id="splitstos"+(nowy+1);
		splitstos.style.left="6.8%";
		splitstos.style.bottom="0%";
		var skala = (50*ratio)/200;
		splitstos.style.transform = "scale("+skala+","+skala+")";
		stolik.appendChild(splitstos);
		setTimeout(function(){
			splitstos.style.left="65%";
			switch(nowy){
				case 0:
				splitstos.style.bottom="86%";
				break;
				case 1:
				splitstos.style.bottom="70%";
				break;
				case 2:
				splitstos.style.bottom="54%";
				break;
			}
		},50);
		//druga suma
		var tmpid = "sumaspl"+(nowy+1);
		var sumagr2 = document.getElementById(tmpid);
		sumagr2.style.display="block";
	}
};

var kuniec = function(stan){
	if(splity.length>0){
		var tmpid = "splitstos"+obslugiwanysplit;
		var karty = [];
		for(x in splity[obslugiwanysplit-1].karty){
			var tmpid2 = "spl"+obslugiwanysplit+(parseInt(x)+1);
			karty.push(document.getElementById(tmpid2));
		}
		var ostatniZaklad = splity[obslugiwanysplit-1].zaklad;
	}else{
		var tmpid = "stos";
		var karty = document.getElementsByClassName("karta");
		document.getElementById("sumagr").children[0].innerHTML = "";
		document.getElementById("sumakr").children[0].innerHTML = "";
		document.getElementById("aktualnyzaklad").innerHTML = "";
		var ostatniZaklad = aktualnyZaklad;
		aktualnyZaklad=0;
		rekaGracza = [];
		rekaKrupiera = [];
	}
	var stosik = document.getElementById(tmpid);
	if(stan == "p"){
		stosik.style.left = "47%";
		stosik.style.bottom = "110%";
	}else if(stan == "r"){
		stosik.style.left = "6.8%";
		stosik.style.bottom = "0%";
		money += (ostatniZaklad);
		document.getElementById("hajs").innerHTML = money+"$";
	}else if(stan == "w"||stan=="bj"){
		//wyplac podwojnie
		stosik.style.left = "6.8%";
		stosik.style.bottom = "0%";
		var drugi = document.createElement("div");
		drugi = kopiujStos(stosik);
		drugi.className="stos2";
		var skala = (50*ratio)/200;
		drugi.style.transform = "scale("+skala+","+skala+")";
		stolik.appendChild(drugi);
		setTimeout(function(){
			drugi.style.left = "6.8%";
			drugi.style.bottom = "0%";
			setTimeout(function(){
				money += (2*ostatniZaklad);
				document.getElementById("hajs").innerHTML = money+"$";
				setTimeout(function(){
					drugi.parentNode.removeChild(drugi);
				},200);
			},1000);
		},50);
	}
	if(stan=="bj"){
		//utworz stos polowiczny
		var wartoscjacka = Math.floor(ostatniZaklad/2);
		var czarnyjacek = document.createElement("div");
		var czarnyjacek = tworzStos(wartoscjacka,czarnyjacek);
		czarnyjacek.className="stos2";
		stolik.appendChild(czarnyjacek);
		//dodaj go do puli gracza
		setTimeout(function(){
			czarnyjacek.style.left = "6.8%";
			czarnyjacek.style.bottom = "0%";
			setTimeout(function(){
				money += Math.floor(ostatniZaklad/2);
				document.getElementById("hajs").innerHTML = money+"$";
				czarnyjacek.parentNode.removeChild(czarnyjacek);
			},1000);
		},500);
	}
	if(stan=="ubz"){
		var ubz = document.getElementById("ubz");
		var stos = document.getElementById("stos")
		var dod = kopiujStos(ubz);
		dod.className="stos2";
		var skala = (50*ratio)/200;
		dod.style.transform = "scale("+skala+","+skala+")";
		stolik.appendChild(dod);
		stos.style.left="47%";
		stos.style.bottom="110%";
		ubz.style.left="6.8%";
		ubz.style.bottom="0%";
		setTimeout(function(){
			ubz.parentNode.removeChild(ubz);
		},1050)
		setTimeout(function(){
			dod.style.left="6.8%";
			dod.style.bottom="0%";
			setTimeout(function(){
				dod.parentNode.removeChild(dod);
				var kwota = document.getElementById("kwota");
				money += parseInt(kwota.innerHTML)*2;
				document.getElementById("hajs").innerHTML = money+"$";
				kwota.innerHTML = "";
				kwota.style.display="none";
			},1050)
		},500);
	}
	for(var i = 0;i<karty.length;i++){
		karty[i].style.left = "47%";
		karty[i].style.top = "-20%";
		karty[i].style.transition = "top 1s,left 1s";
	}
	hituje = false;
	setTimeout(function(){
		stosik.parentNode.removeChild(stosik);
		var ilerazy = Number(karty.length);
		for(var i = 0;i<ilerazy;i++){
			karty[0].parentNode.removeChild(karty[0]);
		}
		if(splity.length==0){
			document.getElementById("zaklad").style.display = "block";
		}
	},1500)
}


//funkcje kart

//utworz nowy stos
var tworzStos = function(wartosc,nowyStos){
	var chipy = [];
	var len = 0;
	var skala = (50*ratio)/200;
	while(wartosc/100 >= 1){
		chipy[len] =  document.createElement("div");
		chipy[len].className="zeton";
		chipy[len].style.backgroundPosition = "-200px -200px";
		chipy[len].style.position="absolute";
		chipy[len].style.bottom = len*15+"px";
		chipy[len].style.zIndex=len+1;
		nowyStos.appendChild(chipy[len]);
		len++;
		wartosc -= 100;
	}
	while(wartosc/50 >= 1){
		chipy[len] =  document.createElement("div");
		chipy[len].className="zeton";
		chipy[len].style.backgroundPosition = "0px -200px";
		chipy[len].style.position="absolute";
		chipy[len].style.bottom = len*15+"px";
		chipy[len].style.zIndex=len+1;
		nowyStos.appendChild(chipy[len]);
		len++;
		wartosc -= 50;
	}
	while(wartosc/25 >= 1){
		chipy[len] =  document.createElement("div");
		chipy[len].className="zeton";
		chipy[len].style.backgroundPosition = "-400px 0px";
		chipy[len].style.position="absolute";
		chipy[len].style.bottom = len*15+"px";
		chipy[len].style.zIndex=len+1;
		nowyStos.appendChild(chipy[len]);
		len++;
		wartosc -= 25;
	}
	while(wartosc/5 >= 1){
		chipy[len] =  document.createElement("div");
		chipy[len].className="zeton";
		chipy[len].style.backgroundPosition = "-200px 0px";
		chipy[len].style.position="absolute";
		chipy[len].style.bottom = len*15+"px";
		chipy[len].style.zIndex=len+1;
		nowyStos.appendChild(chipy[len]);
		len++;
		wartosc -= 5;
	}
	while(wartosc/1 >= 1){
		chipy[len] =  document.createElement("div");
		chipy[len].className="zeton";
		chipy[len].style.backgroundPosition = "0px 0px";
		chipy[len].style.position="absolute";
		chipy[len].style.bottom = len*15+"px";
		chipy[len].style.zIndex=len+1;
		nowyStos.appendChild(chipy[len]);
		len++;
		wartosc -= 1;
	}
	nowyStos.style.transform = "scale("+skala+","+skala+")";
	return nowyStos;
};

var kopiujStos = function(zrodlo){
	var tmp = document.createElement("div");
	for(var i = 0;i<zrodlo.children.length;i++){
		tmp.appendChild(zrodlo.children[i].cloneNode());
	}
	return tmp;
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
	var poprzednizi;
	poprzednizi=karta.style.zIndex;
	if(dla.slice(0,1)=="g"){
		karta.id="g"+rekaGracza.length;
	}
	setTimeout(function(){
		if(dla.slice(0,1)=="k"){
			karta.style.top=(0.14*style1.height.slice(0,-2))-10+"px";
			h = (0.14*style1.height.slice(0,-2))-10;
		}else if(dla.slice(0,1)=="g"){
			karta.style.top=(0.4975*style1.height.slice(0,-2))-10+"px";
			h = (0.4975*style1.height.slice(0,-2))-10;
		}
		if(dla.slice(-1)=="1"){
			karta.style.zIndex = 5;
			if(sprite == "hide"){
				karta.id="zakryta";
				karta.style.left="43.57%";
			}else{
				karta.style.left="49.25%";
			}
		}else if(dla.slice(-1)=="2"){
			karta.style.zIndex = 10;
			karta.style.left="56.65%";
		}else if(dla.slice(-1)=="+"){
			karta.style.zIndex = 20;
			//dodatkowe karty dla hitu
			var l;
			if(dla.slice(0,1)=="g"){
				l = rekaGracza.length-3;
			}else if(dla.slice(0,1)=="k"){
				l = rekaKrupiera.length-3;
			}
			karta.style.left=63+l+"%";
			karta.style.zIndex=(10+l+1);
		}
	},50);
	setTimeout(function(){
		if(sprite=="hide"){
			setTimeout(function(){
				karta.style.top = h+10+"px";
				karta.style.boxShadow="none";
				karta.style.zIndex=poprzednizi;
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
					karta.style.zIndex=poprzednizi;
				},500);
			},500);
		}
	},1000);
};

var sumuj = function(kto){
	var reka,dl;
	var suma=0;
	var asy=0;
	if(kto == "g"){
		reka = rekaGracza;
		dl = rekaGracza.length;
	}else if(kto== "k"){
		reka = rekaKrupiera;
		dl = rekaKrupiera.length;
	}
	for(var i = 0;i<dl;i++){
		var fig = reka[i].slice(0,-2);
		if(isNaN(fig)){
			if(fig=="A"){
				asy++;
			}else{
				suma += 10;
			}
		}else{
			suma += parseInt(fig);
		}
	}
	if(asy == 0){
		return suma;
	}else if(asy >0){
		if(kto=="g"){
			suma += (asy-1);
			if(suma>10){
				suma += 1;
				return suma;
			}else if(suma == 10){
				suma += 11;
				return suma;
			}else{
				return suma  + "+AS";
			}
		}else if(kto="k"){
			if(suma+(asy-1)<=10){
				suma+=11;
				suma+=(asy-1);
				return suma;
			}else{
				suma+=asy;
				return suma;
			}
		}
	}
};

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
