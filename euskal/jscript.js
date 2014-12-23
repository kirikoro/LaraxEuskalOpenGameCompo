var momento=0;
	var velocidad=5;
	var paso=1;
	var movLeft = 0;
	var movRight = 0;
	var movUp = 0;
	var movDown = 0;
	var fondoposicion=-1319;
	var vidaLeonidas=700;
	var vidaLeonidas2=700;
	var vidaTrololo=700;
	var vidaTrololo2=700;
	var vidaNyan=700;
	var vidaNyan2=700;
	var vidaPeluchito=700;
	var vidaPeluchito2=700;
	var vidaJugador=5000;
	var vidaJugador2=5000;
	var anchobarramalo=180;
	var anchobarrajugador=180;
	var tocamalo=1;

var score = 0;
		$( document ).ready(function() {
			//alert($("#divcontenido").height());
			jQuery.preloadImages = function() {
				for(var i = 0; i<arguments.length; i++){
				jQuery("<img>").attr("src", arguments[i]);
			}
			}
			$.preloadImages("img/dentrobec.png","img/entradabec.png","img/intro01.png","img/intro02.png","img/jugador.png","img/enemigo.png");
			$( "#start" ).click(function() {
				toIntro1();
			 
			});
			$( "#intro01" ).click(function() {
				toIntro2();
			 
			});
			$( "#intro02" ).click(function() {
				toEntradaBec();
			 
			});
			$( "#btnstart" ).click(function() {
				switch (momento)
				 {
					case 0:
						toIntro1();
						break;
					case 1:
						toIntro2();
						break;
					case 2:
						toEntradaBec();
						break; 
					}
			 
			});
			$( "#texto1" ).click(function() {
				toTexto2();
			 
			});
			$( "#texto2" ).click(function() {
				Empezarbatalla();
			 
			});
			$( "#texto3" ).click(function() {
				BatallaTrololo();
			 
			});
			$( "#texto4" ).click(function() {
				BatallaNyan();
			 
			});
			$( "#texto5" ).click(function() {
				BatallaPeluchito();
			 
			});
			$( "#btnup" ).mousedown(function() {
				//ParaArriba();
				movUp=1;
			 
			});
			$( "#btnup" ).mouseup(function() {
				//ParaArriba();
				movUp=0;
			 
			});
			$( "#btndown" ).mousedown(function() {
				movDown=1;
			 
			});	
			$( "#btndown" ).mouseup(function() {
				movDown=0;
			 
			});
			$( "#btnleft" ).mousedown(function() {
				movLeft=1;
			 
			});		
			$( "#btnleft" ).mouseup(function() {
				movLeft=0;
			 
			});	
			$( "#btnright" ).mousedown(function() {
				movRight=1;
			 
			});		
			$( "#btnright" ).mouseup(function() {
				movRight=0;
			 
			});				
			/*$(window).keypress(function(e) {
			 var key = e.which;
			 if (key==13){
				 switch (momento)
				 {
					case 0:
						toIntro1();
						break;
					case 1:
						toIntro2();
						break;
					case 2:
						toEntradaBec();
						break;
					}
				}
				if (key==100){
					ParaDerecha();
				
				}
				if (key==97){
					ParaIzquierda();
				
				}
				if (key==115){
					ParaAbajo();
				
				}
				if (key==119){
					ParaArriba();
				
				}
		 });
		 
			$("body").keydown(function(e) {
				ek = e.keyCode;
				
				if (ek==38){
					ParaArriba();
				};
			
			});
			$("body").keyup(function(e) {
				$("#personaje").stop(true);
			});*/
			
			 $("body").keydown(function(e) {
				
				ek = e.keyCode;
				if (ek==37) movLeft=1;
				if (ek==65) movLeft=1;
				if (ek==39) movRight=1;
				if (ek==68) movRight=1;
				if (ek==38) movUp=1;
				if (ek==87) movUp=1;
				if (ek==40) movDown=1;
				if (ek==83) movDown=1;
				
				
			});
			// Keyuo listener
			$("body").keyup(function(e) {
				
				ek = e.keyCode;
				if (ek==37) movLeft=0;
				if (ek==65) movLeft=0;
				if (ek==39) movRight=0;
				if (ek==68) movRight=0;
				if (ek==38) movUp=0;
				if (ek==87) movUp=0;
				if (ek==40) movDown=0;
				if (ek==83) movDown=0;
				
			});
			setup(); // Do setup
			
			
			
		});
		function setup() {
			var x = $("#personaje").css("left");
			var y = $("#personaje").css("top");
			var width = $("#personaje").width();
			var height = $("#personaje").height();
			$("#divtotal").prepend("<div class='tempMov' style='position: absolute; left:"+x+"; top:"+y+"; width:"+width+"px; height:"+height+"px;'></div>");
			setInterval("movTick()", 10); // Setup interval. Delay controlls tickrate.			
		}
		function divOverlap(a, b) {
			var aPos = a.position();
			var bPos = b.position();
			
			var aLeft = aPos.left;
			var aRight = aPos.left + a.width();
			var aTop = aPos.top;
			var aBottom = aPos.top + a.height();
			
			var bLeft = bPos.left;
			var bRight = bPos.left + b.width();
			var bTop = bPos.top;
			var bBottom = bPos.top + b.height();
			
			return !( bLeft > aRight || bRight < aLeft || bTop > aBottom || bBottom < aTop);
		}
		function movTick() {
			var moved = 0;
			if (movUp) { $(".tempMov").css({"top": "-=1"}); moved=1;dentro();}
			if (movDown) { $(".tempMov").css({"top": "+=1"}); moved=1;}
			if (movLeft) { $(".tempMov").css({"left": "-=1"}); moved=1;}
			if (movRight) { $(".tempMov").css({"left": "+=1"}); moved=1;}
			
			if (!moved) return false;
			var moveAllowed = 1;
			
			 $(".solid").each(function(index) {
			if (divOverlap($(".tempMov"), $(".solid:eq("+index+")"))) moveAllowed=0;  // Checks if there is any overlap on a solid object.
			});
			 
				
			if (moveAllowed==1 && momento<6) {
			
				if (momento<5){
				$("#personaje").css({"left": $(".tempMov").css("left"), "top": $(".tempMov").css("top")}); // Apply the move to the player
				}
				
				interactua();
						if (paso<20){
							//$("#personaje").css("background-image", "url(img/persAtras1.png)");
							if (movUp){$("#personaje").css("background-position", "-34px -43px");}
							if (movDown){$("#personaje").css("background-position", "0 -43px");}
							if (movLeft){$("#personaje").css("background-position", "-68px -43px");}
							if (movRight){$("#personaje").css("background-position", "-102px -43px");}
						
						}else if(paso<40){
							if (movUp){$("#personaje").css("background-position", "-34px 0");}
							if (movDown){$("#personaje").css("background-position", "0 0");}
							if (movLeft){$("#personaje").css("background-position", "-68px 0px");}
							if (movRight){$("#personaje").css("background-position", "-102px 0px");}
						
						}
						if (paso>40){
							paso=0;
						}
						paso++;
				
			} else {
				$(".tempMov").css({"left": $("#personaje").css("left"), "top": $("#personaje").css("top")}); // Reset the tempMov to last location
			}
		}
		
		function toIntro1(){
			$("#start").hide();
			$("#intro01").show();
			momento=1;
			$("#divtotal").css("background-image","url(img/scl1.png), url(img/scl4.png), url(img/scld.png), url(img/scli.png)");
			
		}
		function toIntro2(){
			$("#intro01").hide();
			$("#intro02").show();
			momento=2;
		}
		function toEntradaBec(){
			$("#intro02").hide();
			$("#entradabec").show();
			$("#divtotal").css("background-image","url(img/scl1.png), url(img/scl4.png), url(img/scld.png), url(img/scli.gif)");
			momento=3;
		}
		function toTexto2(){
			$("#texto1").hide();
			$("#texto2").show();
		
		}
		function interactua(){
		
						var p = $( ".tempMov" );
						var position = p.position();
						if (momento==3){
							if (position.top<169){
								$(".tempMov").css({"top": "285px"}); moved=1;
								$("#entradabec").css("background-image","url(img/dentrobec.png)");
								$("#entradabec").css("background-position","175px -1319px");
								momento++;
							}
						}else if (momento==4){
							if (position.top<169){
								momento=5;
							}
							if (position.top>295){
								$(".tempMov").css({"top": "175px"}); moved=1;
								$("#entradabec").css("background-image","url(img/entradabec.png)");
								$("#entradabec").css("background-position","175px 0");
								momento=3;
							
							}
							
						
						}else if (momento==5){
							if (fondoposicion>-170){
								momento=6;
								$("#entradabec").animate({'background-position-y': '0'},5000);
								$("#personaje").animate({'top': '330px'},5000, function(){
										$("#cortinilla").show();
										var intervalcorti=setInterval(function(){
										
											$("#cortinilla").hide();
											$("#entradabec").hide();
											$("#batalla").show();
											$("#jugador").show();
											$("#malo").show();
											$("#jugador").animate({'left': '280'},2000, 
											function(){
												$("#jugador").css("background-image","url(img/jugador.png)");										
											});
											$("#malo").animate({'left': '655'},2000, 
											function(){
											$("#malo").css("background-image","url(img/enemigo.png)");	
											$("#texto1").show();
											$("#vidasenemigo").show();
											clearTimeout(intervalcorti);
											
											});
											
										},3000);
								
								});
							}
						
						}
		}
		function dentro(){
			if (momento>4 && momento<6){
			fondoposicion=fondoposicion+2;
				//$("#entradabec").css({"background-position-y": fondoposicion});
				$("#entradabec").css("background-position", "175px " +fondoposicion + "px");
				
			}
		
		}
		function Empezarbatalla(){
			$("#texto2").hide();
			
			$("#malo").animate({'left': '935'},2000, 
				function(){
					
					$("#vidasenemigo").hide();
					$("#vidaenemigo").show();
					$("#vidajugador").show();
					$("#malo").hide();
						var audio = $("audio");      
						$("#audio").attr("src", "music/sparta300.mp3");
					
						audio[0].pause();
						audio[0].load();
						audio[0].play();
					$("#leonidas").fadeIn(1500,function(){
						$("#ataquesjugador").show();
						
					} );
					
											
			});
		
		}
		function TerminarBatalla1(){
			$("#textoAtaques").html("¡LEONIDAS HA SIDO DERROTADO!");
			tocamalo=2;
			
			
			$("#leonidas").fadeOut(1500,function(){
						
			$("#ataquesjugador").hide();
			$("#textoAtaques").hide();
			$("#malo").show();
			$("#vidaenemigo").hide();
			$("#vidajugador").hide();
			$("#malo").animate({'left': '655'},2000, 
								function(){
								$("#texto3").show();
								
								$("#vidasenemigo").show();
								
								
								});
			} );
		
		}
		function TerminarBatalla2(){
			$("#textoAtaques").html("¡ENEMIGO TROLOLO HA SIDO DERROTADO!");
			tocamalo=3;
			
			$("#trololo").fadeOut(1500,function(){
						
			$("#ataquesjugador").hide();
			$("#textoAtaques").hide();
			$("#malo").show();
			$("#vidaenemigo").hide();
			$("#vidajugador").hide();
			$("#malo").animate({'left': '655'},2000, 
								function(){
								$("#texto4").show();
								
								$("#vidasenemigo").show();
								
								
								});
			} );
		
		}
		function TerminarBatalla3(){
			$("#textoAtaques").html("¡ENEMIGO NYAN CAT HA SIDO DERROTADO!");
			tocamalo=4;
			
			$("#nyan").fadeOut(1500,function(){
						
			$("#ataquesjugador").hide();
			$("#textoAtaques").hide();
			$("#malo").show();
			$("#vidaenemigo").hide();
			$("#vidajugador").hide();
			$("#malo").animate({'left': '655'},2000, 
								function(){
								$("#texto5").show();
								
								$("#vidasenemigo").show();
								
								
								});
			} );
		
		}
		function TerminarBatalla4(){
			$("#textoAtaques").html("¡ENEMIGO PELUCHITO HA SIDO DERROTADO!");
			tocamalo=5;
			
			$("#peluchito").fadeOut(1500,function(){
						
			$("#ataquesjugador").hide();
			$("#textoAtaques").hide();
			$("#malo").show();
			$("#vidaenemigo").hide();
			$("#vidajugador").hide();
			$("#malo").animate({'left': '655'},2000, 
								function(){
								$("#texto6").show();
								
								$("#vidasenemigo").show();
								
								
								});
			} );
		
		}
		function BatallaTrololo(){
			$("#barravidaenemigo").css("background-color","#00f312");
			$("#barravidaenemigo").width(anchobarramalo);
			$("#nombreenemigo").text("TROLOLO");
			$("#texto3").hide();
			
			$("#malo").animate({'left': '935'},2000, 
				function(){
					$("#vidasenemigo").hide();
					$("#vidaenemigo").show();
					$("#vidajugador").show();
					$("#malo").hide();
					var audio = $("audio");      
						$("#audio").attr("src", "audio/trololo.mp3");
					
						audio[0].pause();
						audio[0].load();
						audio[0].play();
					$("#trololo").fadeIn(1500,function(){
						$("#ataquesjugador").show();
					} );
					
											
			});
		
		
		}
		
		function BatallaNyan(){
			$("#barravidaenemigo").css("background-color","#00f312");
			$("#barravidaenemigo").width(anchobarramalo);
			$("#nombreenemigo").text("NYAN CAT");
			$("#texto4").hide();
			
			$("#malo").animate({'left': '935'},2000, 
				function(){
					$("#vidasenemigo").hide();
					$("#vidaenemigo").show();
					$("#vidajugador").show();
					$("#malo").hide();
					var audio = $("audio");      
						$("#audio").attr("src", "audio/nyan.mp3");
					
						audio[0].pause();
						audio[0].load();
						audio[0].play();
					$("#nyan").fadeIn(1500,function(){
						$("#ataquesjugador").show();
					} );
					
											
			});
		
		
		}
		function BatallaPeluchito(){
			$("#barravidaenemigo").css("background-color","#00f312");
			$("#barravidaenemigo").width(anchobarramalo);
			$("#nombreenemigo").text("PELUCHITO");
			$("#texto5").hide();
			
			$("#malo").animate({'left': '935'},2000, 
				function(){
					$("#vidasenemigo").hide();
					$("#vidaenemigo").show();
					$("#vidajugador").show();
					$("#malo").hide();
					var audio = $("audio");      
						$("#audio").attr("src", "audio/peluchito.mp3");
					
						audio[0].pause();
						audio[0].load();
						audio[0].play();
					$("#peluchito").fadeIn(1500,function(){
						$("#ataquesjugador").show();
					} );
					
											
			});
		
		
		}
		function ataqueSillas(){
			$("#jugador").hide();
			
			$("#sillas").show();
			$("#textoAtaques").show();
			$("#ataquesjugador").hide();
			
			$("#textoAtaques").html("¡JUGADOR usó 'LEVANTAMIENTO DE SILLAS'");
			var intervalcorti=setInterval(function(){
					$("#sillas").hide();	
					$("#jugador").show();
					
					//$( "#barravidaenemigo" ).animate({width: "20px" }, 1500 );
					//TerminarBatalla1();
					golpeJugador(1);
					clearTimeout(intervalcorti);
											
			},4000);
		
		}
		function ataquePatxi(){
			$("#jugador").hide();
			var apatxi=$("#audioPatxi");
			apatxi[0].play();
			$("#patxi").show();
			$("#textoAtaques").show();
			$("#ataquesjugador").hide();
			
			$("#textoAtaques").html("¡JUGADOR usó 'LLAMADA PATXI'!");
			var intervalcorti=setInterval(function(){
					$("#patxi").hide();	
					$("#jugador").show();
					
					
					golpeJugador(2);
					clearTimeout(intervalcorti);
											
			},6000);
										
			
		
		}
		function ataqueBukkake(){
			
			$("#jugador").hide();
			$("#bukkake").show();
			$("#textoAtaques").show();
			$("#ataquesjugador").hide();
			
			$("#textoAtaques").html("¡JUGADOR usó UKKAKE BUKKAKE'!");
			var $div = $("#bukkake");

			if (0==0) {

				
				var img = document.createElement('img');
				img.src = "img/bukkake.gif?p" + new Date().getTime();

			
				$div.css({backgroundImage: "url("+img.src+")"});
				

			
			} else {
                            $div.css({backgroundImage: "none"}); 
			}
						
			
			var intervalcorti=setInterval(function(){
			
					$("#bukkake").hide();	
					
					$("#jugador").show();
					
					golpeJugador(3);
								

					clearTimeout(intervalcorti);
											
			},7000);
		
		}
		function ataquePelos(){
			
			$("#jugador").hide();
			$("#pelos").show();
			$("#textoAtaques").show();
			$("#ataquesjugador").hide();
			$("#textoAtaques").html("¡JUGADOR usó 'PELOS DEL VATER'!");
			var $div = $("#pelos");
			if (0==0) {
				var img = document.createElement('img');
				img.src = "img/pelos.gif?p" + new Date().getTime();
				$div.css({backgroundImage: "url("+img.src+")"});
			} else {
                            $div.css({backgroundImage: "none"}); 
			}
			var intervalcorti=setInterval(function(){			
					$("#pelos").hide();						
					$("#jugador").show();				
					golpeJugador(4);
					clearTimeout(intervalcorti);
											
			},7000);
		
		}
		function golpeJugador(cual){
			if (cual==1){
				
				//anchobarramalo
				if (tocamalo==1){
					$("#textoAtaques").html("¡NO ES MUY EFECTIVO!");
					var danio=Math.floor(Math.random() * (100-40+1)) + 40;
					var resta=(danio*anchobarramalo)/vidaLeonidas;
					vidaLeonidas2=vidaLeonidas2-danio;
				}else if (tocamalo==2){
					var danio=Math.floor(Math.random() * (250-120+1)) + 120 ;				
					var resta=(danio*anchobarramalo)/vidaTrololo;
					vidaTrololo2=vidaTrololo2-danio;
				}else if (tocamalo==3){
					var danio=Math.floor(Math.random() * (190-80+1)) + 80;			
					var resta=(danio*anchobarramalo)/vidaNyan;
					vidaNyan2=vidaNyan2-danio;
				}else if (tocamalo==4){
					var danio=Math.floor(Math.random() * (190-80+1)) + 80;
					var resta=(danio*anchobarramalo)/vidaPeluchito;
					vidaPeluchito2=vidaPeluchito2-danio;
				}				
				
				//alert(resta);
				
				$( "#barravidaenemigo" ).animate({width: $( "#barravidaenemigo" ).width()-resta }, 1500, function(){
					if (tocamalo==1){
						if (vidaLeonidas2<=0){
							TerminarBatalla1();
				
						}else if((vidaLeonidas/2)>vidaLeonidas2){
							$( "#barravidaenemigo" ).css("background-color","red");
							turnoMalo();
						
						}else if(((vidaLeonidas*0.75))>vidaLeonidas2){
							$( "#barravidaenemigo" ).css("background-color","orange");
							turnoMalo();
						}else{
							turnoMalo();
						
						}
					}else if(tocamalo==2){
						if (vidaTrololo2<=0){
							TerminarBatalla2();
					
						}else if((vidaTrololo/2)>vidaTrololo2){
							$( "#barravidaenemigo" ).css("background-color","red");
							turnoMalo();
						
						}else if(((vidaTrololo*0.75))>vidaTrololo2){
							$( "#barravidaenemigo" ).css("background-color","orange");
							turnoMalo();
						}else{
							turnoMalo();
						
						}
					
					}else if(tocamalo==3){
						if (vidaNyan2<=0){
							TerminarBatalla3();
					
						}else if((vidaNyan/2)>vidaNyan2){
							$( "#barravidaenemigo" ).css("background-color","red");
							turnoMalo();
						
						}else if(((vidaNyan*0.75))>vidaNyan2){
							$( "#barravidaenemigo" ).css("background-color","orange");
							turnoMalo();
						}else{
							turnoMalo();
						
						}
					
					}else if(tocamalo==4){
						if (vidaPeluchito2<=0){
							TerminarBatalla4();
					
						}else if((vidaPeluchito/2)>vidaPeluchito2){
							$( "#barravidaenemigo" ).css("background-color","red");
							turnoMalo();
						
						}else if(((vidaPeluchito*0.75))>vidaPeluchito2){
							$( "#barravidaenemigo" ).css("background-color","orange");
							turnoMalo();
						}else{
							turnoMalo();
						
						}
					
					}
					
					
				
				} );
				
			}else if(cual==2){
				//anchobarramalo
				if (tocamalo==1){
					var danio=Math.floor(Math.random() * (190-80+1)) + 80;
					var resta=(danio*anchobarramalo)/vidaLeonidas;
					vidaLeonidas2=vidaLeonidas2-danio;
				}else if (tocamalo==2){
					var danio=Math.floor(Math.random() * (190-80+1)) + 80;				
					var resta=(danio*anchobarramalo)/vidaTrololo;
					vidaTrololo2=vidaTrololo2-danio;
				}else if (tocamalo==3){
					var danio=Math.floor(Math.random() * (190-80+1)) + 80;			
					var resta=(danio*anchobarramalo)/vidaNyan;
					vidaNyan2=vidaNyan2-danio;
				}else if (tocamalo==4){
					var danio=Math.floor(Math.random() * (190-80+1)) + 80;
					var resta=(danio*anchobarramalo)/vidaPeluchito;
					vidaPeluchito2=vidaPeluchito2-danio;
				}				
				
				//alert(resta);
				$( "#barravidaenemigo" ).animate({width: $( "#barravidaenemigo" ).width()-resta }, 1500, function(){
					if (tocamalo==1){
						if (vidaLeonidas2<=0){
							TerminarBatalla1();
				
						}else if((vidaLeonidas/2)>vidaLeonidas2){
							$( "#barravidaenemigo" ).css("background-color","red");
							turnoMalo();
						
						}else if(((vidaLeonidas*0.75))>vidaLeonidas2){
							$( "#barravidaenemigo" ).css("background-color","orange");
							turnoMalo();
						}else{
							turnoMalo();
						
						}
					}else if(tocamalo==2){
						if (vidaTrololo2<=0){
							TerminarBatalla2();
					
						}else if((vidaTrololo/2)>vidaTrololo2){
							$( "#barravidaenemigo" ).css("background-color","red");
							turnoMalo();
						
						}else if(((vidaTrololo*0.75))>vidaTrololo2){
							$( "#barravidaenemigo" ).css("background-color","orange");
							turnoMalo();
						}else{
							turnoMalo();
						
						}
					
					}else if(tocamalo==3){
						if (vidaNyan2<=0){
							TerminarBatalla3();
					
						}else if((vidaNyan/2)>vidaNyan2){
							$( "#barravidaenemigo" ).css("background-color","red");
							turnoMalo();
						
						}else if(((vidaNyan*0.75))>vidaNyan2){
							$( "#barravidaenemigo" ).css("background-color","orange");
							turnoMalo();
						}else{
							turnoMalo();
						
						}
					
					}else if(tocamalo==4){
						if (vidaPeluchito2<=0){
							TerminarBatalla4();
					
						}else if((vidaPeluchito/2)>vidaPeluchito2){
							$( "#barravidaenemigo" ).css("background-color","red");
							turnoMalo();
						
						}else if(((vidaPeluchito*0.75))>vidaPeluchito2){
							$( "#barravidaenemigo" ).css("background-color","orange");
							turnoMalo();
						}else{
							turnoMalo();
						
						}
					
					}
					
					
				
				} );

			}else if(cual==3){
				//anchobarramalo
				if (tocamalo==1){
					var danio=Math.floor(Math.random() * (190-80+1)) + 80;
					var resta=(danio*anchobarramalo)/vidaLeonidas;
					vidaLeonidas2=vidaLeonidas2-danio;
				}else if (tocamalo==2){
					var danio=Math.floor(Math.random() * (190-80+1)) + 80;				
					var resta=(danio*anchobarramalo)/vidaTrololo;
					vidaTrololo2=vidaTrololo2-danio;
				}else if (tocamalo==3){
					var danio=Math.floor(Math.random() * (190-80+1)) + 80;			
					var resta=(danio*anchobarramalo)/vidaNyan;
					vidaNyan2=vidaNyan2-danio;
				}else if (tocamalo==4){
					var danio=Math.floor(Math.random() * (190-80+1)) + 80;
					var resta=(danio*anchobarramalo)/vidaPeluchito;
					vidaPeluchito2=vidaPeluchito2-danio;
				}				
				
				//alert(resta);
				$( "#barravidaenemigo" ).animate({width: $( "#barravidaenemigo" ).width()-resta }, 1500, function(){
					if (tocamalo==1){
						if (vidaLeonidas2<=0){
							TerminarBatalla1();
				
						}else if((vidaLeonidas/2)>vidaLeonidas2){
							$( "#barravidaenemigo" ).css("background-color","red");
							turnoMalo();
						
						}else if(((vidaLeonidas*0.75))>vidaLeonidas2){
							$( "#barravidaenemigo" ).css("background-color","orange");
							turnoMalo();
						}else{
							turnoMalo();
						
						}
					}else if(tocamalo==2){
						if (vidaTrololo2<=0){
							TerminarBatalla2();
					
						}else if((vidaTrololo/2)>vidaTrololo2){
							$( "#barravidaenemigo" ).css("background-color","red");
							turnoMalo();
						
						}else if(((vidaTrololo*0.75))>vidaTrololo2){
							$( "#barravidaenemigo" ).css("background-color","orange");
							turnoMalo();
						}else{
							turnoMalo();
						
						}
					
					}else if(tocamalo==3){
						if (vidaNyan2<=0){
							TerminarBatalla3();
					
						}else if((vidaNyan/2)>vidaNyan2){
							$( "#barravidaenemigo" ).css("background-color","red");
							turnoMalo();
						
						}else if(((vidaNyan*0.75))>vidaNyan2){
							$( "#barravidaenemigo" ).css("background-color","orange");
							turnoMalo();
						}else{
							turnoMalo();
						
						}
					
					}else if(tocamalo==4){
						if (vidaPeluchito2<=0){
							TerminarBatalla4();
					
						}else if((vidaPeluchito/2)>vidaPeluchito2){
							$( "#barravidaenemigo" ).css("background-color","red");
							turnoMalo();
						
						}else if(((vidaPeluchito*0.75))>vidaPeluchito2){
							$( "#barravidaenemigo" ).css("background-color","orange");
							turnoMalo();
						}else{
							turnoMalo();
						
						}
					
					}
					
					
				
				} );
		
		
			}else if(cual==4){
				//anchobarramalo
				if (tocamalo==1){
					var danio=Math.floor(Math.random() * (190-80+1)) + 80;
					var resta=(danio*anchobarramalo)/vidaLeonidas;
					vidaLeonidas2=vidaLeonidas2-danio;
				}else if (tocamalo==2){
					var danio=Math.floor(Math.random() * (190-80+1)) + 80;				
					var resta=(danio*anchobarramalo)/vidaTrololo;
					vidaTrololo2=vidaTrololo2-danio;
				}else if (tocamalo==3){
					var danio=Math.floor(Math.random() * (190-80+1)) + 80;			
					var resta=(danio*anchobarramalo)/vidaNyan;
					vidaNyan2=vidaNyan2-danio;
				}else if (tocamalo==4){
					var danio=Math.floor(Math.random() * (190-80+1)) + 80;
					var resta=(danio*anchobarramalo)/vidaPeluchito;
					vidaPeluchito2=vidaPeluchito2-danio;
				}				
				
				//alert(resta);
				$( "#barravidaenemigo" ).animate({width: $( "#barravidaenemigo" ).width()-resta }, 1500, function(){
					if (tocamalo==1){
						if (vidaLeonidas2<=0){
							TerminarBatalla1();
				
						}else if((vidaLeonidas/2)>vidaLeonidas2){
							$( "#barravidaenemigo" ).css("background-color","red");
							turnoMalo();
						
						}else if(((vidaLeonidas*0.75))>vidaLeonidas2){
							$( "#barravidaenemigo" ).css("background-color","orange");
							turnoMalo();
						}else{
							turnoMalo();
						
						}
					}else if(tocamalo==2){
						if (vidaTrololo2<=0){
							TerminarBatalla2();
					
						}else if((vidaTrololo/2)>vidaTrololo2){
							$( "#barravidaenemigo" ).css("background-color","red");
							turnoMalo();
						
						}else if(((vidaTrololo*0.75))>vidaTrololo2){
							$( "#barravidaenemigo" ).css("background-color","orange");
							turnoMalo();
						}else{
							turnoMalo();
						
						}
					
					}else if(tocamalo==3){
						if (vidaNyan2<=0){
							TerminarBatalla3();
					
						}else if((vidaNyan/2)>vidaNyan2){
							$( "#barravidaenemigo" ).css("background-color","red");
							turnoMalo();
						
						}else if(((vidaNyan*0.75))>vidaNyan2){
							$( "#barravidaenemigo" ).css("background-color","orange");
							turnoMalo();
						}else{
							turnoMalo();
						
						}
					
					}else if(tocamalo==4){
						if (vidaPeluchito2<=0){
							TerminarBatalla4();
					
						}else if((vidaPeluchito/2)>vidaPeluchito2){
							$( "#barravidaenemigo" ).css("background-color","red");
							turnoMalo();
						
						}else if(((vidaPeluchito*0.75))>vidaPeluchito2){
							$( "#barravidaenemigo" ).css("background-color","orange");
							turnoMalo();
						}else{
							turnoMalo();
						
						}
					
					}
					
					
				
				} );
		
		
			}
		}
		function turnoMalo(){
			if (tocamalo==1){
				golpe=Math.floor((Math.random() * 2) + 1);
				if (golpe==1){
					$("#textoAtaques").html("¡LEONIDAS usó 'ESTO ES LA EUSKAL!'");
					$("#leonidas").hide();
					$("#leonidasLaeuskal").show();
					var $div = $("#leonidasLaeuskal");
					if (0==0) {
						var img = document.createElement('img');
						img.src = "img/laeuskal.gif?p" + new Date().getTime();			
						$div.css({backgroundImage: "url("+img.src+")"});				
					} else {
						$div.css({backgroundImage: "none"}); 
					}
					var intervalcorti=setInterval(function(){
							$("#leonidasLaeuskal").hide();							
							$("#leonidas").show();	
							
							var daniomalo=Math.floor(Math.random() * (100-20+1)) + 50;
							var resta=(daniomalo*anchobarrajugador)/vidaJugador;
							vidaJugador2=vidaJugador2-daniomalo;
							$( "#barravidajugador" ).animate({width: $( "#barravidajugador" ).width()-resta }, 1500 );	
							$("#textoAtaques").hide();
							$("#ataquesjugador").show();
							clearTimeout(intervalcorti);											
					},4000);
				
				
				}else if(golpe==2){
					$("#textoAtaques").html("!LEONIDAS usó 'NO HOMO'!");
					$("#leonidas").hide();
					$("#leonidasNohomo").show();
					
					
					var intervalcorti=setInterval(function(){
							$("#leonidasNohomo").hide();							
							$("#leonidas").show();		
							
							var daniomalo=Math.floor(Math.random() * (100-50+1)) + 50;
							var resta=(daniomalo*anchobarrajugador)/vidaJugador;
							vidaJugador2=vidaJugador2-daniomalo;
							$( "#barravidajugador" ).animate({width: $( "#barravidajugador" ).width()-resta }, 1500 );		
							$("#textoAtaques").hide();
							$("#ataquesjugador").show();							
							clearTimeout(intervalcorti);											
					},4000);
				
				
				}
			}else if(tocamalo==2){
					$("#textoAtaques").html("TROLOLO usó 'MULTI TROLOLO'");
					$("#trololo").hide();
					$("#trololomulti").show();
					var $div = $("#trololomulti");
					if (0==0) {
						var img = document.createElement('img');
						img.src = "img/trololomulti.gif?p" + new Date().getTime();			
						$div.css({backgroundImage: "url("+img.src+")"});				
					} else {
						$div.css({backgroundImage: "none"}); 
					}
					var intervalcorti=setInterval(function(){
							$("#trololomulti").hide();							
							$("#trololo").show();	
							
							var daniomalo=Math.floor(Math.random() * (100-30+1)) + 30;
							var resta=(daniomalo*anchobarrajugador)/vidaJugador;
							vidaJugador2=vidaJugador2-daniomalo;
							$( "#barravidajugador" ).animate({width: $( "#barravidajugador" ).width()-resta }, 1500 );	
							$("#textoAtaques").hide();
							$("#ataquesjugador").show();
							clearTimeout(intervalcorti);											
					},4000);
			
			}else if(tocamalo==3){
					$("#textoAtaques").html("NYAN usó 'IMPACTRUENO'");
					$("#nyan").hide();
					$("#nyanpikatxu").show();
					var $div = $("#nyanpikatxu");
					if (0==0) {
						var img = document.createElement('img');
						img.src = "img/nyanpikatxu.gif?p" + new Date().getTime();			
						$div.css({backgroundImage: "url("+img.src+")"});				
					} else {
						$div.css({backgroundImage: "none"}); 
					}
					var intervalcorti=setInterval(function(){
							$("#nyanpikatxu").hide();							
							$("#nyan").show();	
							
							var daniomalo=Math.floor(Math.random() * (100-30+1)) + 30;
							var resta=(daniomalo*anchobarrajugador)/vidaJugador;
							vidaJugador2=vidaJugador2-daniomalo;
							$( "#barravidajugador" ).animate({width: $( "#barravidajugador" ).width()-resta }, 1500 );	
							$("#textoAtaques").hide();
							$("#ataquesjugador").show();
							clearTimeout(intervalcorti);											
					},4000);
			
			}else if(tocamalo==4){
					$("#textoAtaques").html("PELUCHITO usó 'zANOria'");
					$("#peluchito").hide();
					$("#peluchitozanahoria").show();
					var $div = $("#peluchitozanahoria");
					if (0==0) {
						var img = document.createElement('img');
						img.src = "img/zanahoria.gif?p" + new Date().getTime();			
						$div.css({backgroundImage: "url("+img.src+")"});				
					} else {
						$div.css({backgroundImage: "none"}); 
					}
					var intervalcorti=setInterval(function(){
							$("#peluchitozanahoria").hide();							
							$("#peluchito").show();	
							
							var daniomalo=Math.floor(Math.random() * (100-30+1)) + 30;
							var resta=(daniomalo*anchobarrajugador)/vidaJugador;
							vidaJugador2=vidaJugador2-daniomalo;
							$( "#barravidajugador" ).animate({width: $( "#barravidajugador" ).width()-resta }, 1500 );	
							$("#textoAtaques").hide();
							$("#ataquesjugador").show();
							clearTimeout(intervalcorti);											
					},4000);
			
			}
		
		}

		function directobatalla(){
		
			$("#cortinilla").show();
				var intervalcorti=setInterval(function(){
					$("#start").hide();
					$("#intro01").hide();
					$("#intro02").hide();
					$("#entradabec").hide();
					$("#cortinilla").hide();
					$("#entradabec").hide();
					$("#batalla").show();
					$("#jugador").show();
					$("#malo").show();
					$("#jugador").animate({'left': '280'},500, 
					function(){
																
					});
					$("#malo").animate({'left': '655'},500, 
					function(){
					$("#texto1").show();
					$("#vidasenemigo").show();
					clearTimeout(intervalcorti);
					
					});
					
				},200);
		
		}
		function ParaArriba(){
					/*if (paso==1){
						//$("#personaje").css("background-image", "url(img/persAtras1.png)");
						$("#personaje").css("background-position", "-34px -43px");
						paso=2;
					
					}else{
						$("#personaje").css("background-position", "-34px 0");
						paso=1;
					
					}*/
					switch (momento)
					{
					case 3:
					
						/*$("#divtotal").css("background-image","url(img/scl1.png), url(img/scl4.png), url(img/scld.png), url(img/scli.png)");
						var p = $( "#personaje" );
						var position = p.position();
						if (position.top>169){
							$( "#personaje" ).css("top",position.top-velocidad);
						}else{
							alert("hoe");
						
						}
						momento=4;*/
						/* $('#personaje').animate({
							top: "-=10px"
						},"slow",function(){
								if (paso==1){
									//$("#personaje").css("background-image", "url(img/persAtras1.png)");
									$("#personaje").css("background-position", "-34px -43px");
											paso=2;
										
								}else{
									$("#personaje").css("background-position", "-34px 0");
									paso=1;
										
								}
						
						
						
						
						})*/
						$( "#personaje" ).css("top","-=10");
						break;
					case 4:
						var p = $( "#personaje" );
						var position = p.position();
						if (position.top>169){
							$( "#personaje" ).css("top",position.top-velocidad);
						}else{
							alert("hoe");
						
						}
						
						break;
					}
		
		}
		function ParaAbajo(){
			if (paso==1){
				//$("#personaje").css("background-image", "url(img/persAtras1.png)");
				$("#personaje").css("background-position", "0px -43px");
				paso=2;
			
			}else{
				$("#personaje").css("background-position", "0px 0");
				paso=1;
			
			}
			switch(momento)
			{
				case 3:
					$("#divtotal").css("background-image","url(img/scl1.png), url(img/scl4.png), url(img/scld.png), url(img/scli.png)");
					
					var p = $( "#personaje" );
					var position = p.position();
					$( "#personaje" ).css("top",position.top+velocidad);
					
					momento=4;
					break;
				case 4:
					
					var p = $( "#personaje" );
					var position = p.position();
					if ((position.top>435 && position.left>480 && position.left<625) || (position.top>265 && position.left>480 && position.left<625)) {
					
					}else{
					$( "#personaje" ).css("top",position.top+velocidad);
					}
					break;
			
			}
		
		
		}
		function ParaIzquierda(){
			if (paso==1){
				//$("#personaje").css("background-image", "url(img/persAtras1.png)");
				$("#personaje").css("background-position", "-68px -43px");
				paso=2;
			
			}else{
				$("#personaje").css("background-position", "-68px 0");
				paso=1;
			
			}
			switch(momento)
			{
				case 3:
					$("#divtotal").css("background-image","url(img/scl1.png), url(img/scl4.png), url(img/scld.png), url(img/scli.png)");
					var p = $( "#personaje" );
					var position = p.position();
					$( "#personaje" ).css("left",position.left-velocidad);
					momento=4;
					break;
				case 4:
					var p = $( "#personaje" );
					var position = p.position();
					if (position.left<480){
					
					
					}else{
					$( "#personaje" ).css("left",position.left-velocidad);
					}
					break;
			}
		
		
		}
		function ParaDerecha(){
			if (paso==1){
				//$("#personaje").css("background-image", "url(img/persAtras1.png)");
				$("#personaje").css("background-position", "-102px -43px");
				paso=2;
			
			}else{
				$("#personaje").css("background-position", "-102px 0");
				paso=1;
			
			}
			switch(momento)
			{
				case 3:
					$("#divtotal").css("background-image","url(img/scl1.png), url(img/scl4.png), url(img/scld.png), url(img/scli.png)");
					var p = $( "#personaje" );
					var position = p.position();
					$( "#personaje" ).css("left",position.left+velocidad);
					momento=4;
					break;
				case 4:
					var p = $( "#personaje" );
					var position = p.position();
					if (position.left>625 && position.top>265){
					
					}else{
					$( "#personaje" ).css("left",position.left+velocidad);
					}
					break;
			}
		
		
		}