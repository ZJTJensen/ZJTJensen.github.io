$(document).ready(function(){
        var num = 3;
        var start ="";
        var map =[];
        var red = 0;
        var blue = 0;
        var turn;
        var start = Math.floor(Math.random() * 2) + 1;
        var flip = new Audio('sounds/flip.mp3');
        
        

    $("#start-button").click(function(num){
        if(start == 1 || turn =="Blue"){
            turn = "Blue";
            document.getElementById('page').style ='background: linear-gradient(to bottom right, rgba(255, 0, 0, 0.405), blue); '
            document.getElementById('full').style ='background: linear-gradient(to bottom right, rgba(255, 0, 0, 0.405), blue); '
            document.getElementById("who-turn").innerHTML = "<h1 style= 'color:blue;'>Turn: "+ turn +"</h1>";
        }else if(start == 2 || turn =="Red"){
            turn ="Red";
            document.getElementById('page').style ='background: linear-gradient(to bottom right, red, rgba(0, 0, 255, 0.405)); '
            document.getElementById('full').style ='background: linear-gradient(to bottom right, red, rgba(0, 0, 255, 0.405)); '
            document.getElementById("who-turn").innerHTML = "<h1 style= 'color:red;'>Turn: "+ turn +"</h1>";
        }
        var val = document.getElementById('image-number');
        num = val.options[val.selectedIndex].value;
        document.getElementById("cards").id = "cards"+num;
        $("#start").hide();
        var temp = (Math.random() <= 0.5) ? 1 : 2;
        $("#game").slideToggle("slow", function(){});
        document.getElementById("red-score").style= "display:inline-block;"
        document.getElementById("blue-score").style= "display:inline-block;"
        document.getElementById("game").style= "display:inline-block;"
        function shuffleArray(arr){
            var currentIndex = arr.length, temporaryValue, randomIndex;
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
                // Pick a random remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                // And swap it with the current element.
                temporaryValue = arr[currentIndex];
                arr[currentIndex] = arr[randomIndex];
                arr[randomIndex] = temporaryValue;
            }
            return arr;
        }
        if(num == 3){
            map = ['gold','gold-el','silver','silver-el','nickel','nickel-el']
            map = shuffleArray(map);
        }else if(num == 6){
            map = ['gold','gold-el','silver','silver-el','nickel','nickel-el','copper','copper-el','iron','iron-el','zinc','zinc-el']
            map = shuffleArray(map);
        }else{
            map = ['gold','gold-el','silver','silver-el','nickel','nickel-el','copper','copper-el','iron','iron-el','zinc','zinc-el','mercury','mercury-el','oxygen','oxygen-el','plutonium','plutonium-el','potassium','potassium-el','radium','radium-el','tin','tin-el']
            map = shuffleArray(map);
        }
        for(var i=0; i < map.length; i++){
           
            document.getElementById("cards"+num).innerHTML += 
            "<div class='er"+ num+"'><div class='front'> <img style ='width: 70%; height: auto;' src ='imgs/play.jpg'></div> <div class='back'><div style='width: 70%; height: 100%;background-color:white;'><img style='width: 70%; height: auto;' class = 'img' alt='"+map[i]+"' src='imgs/gameCards/"+ map[i]+".jpg'><p>"+ map[i]+"</p></div></div></div>"
            if(num == 3 && i+1 == map.length/2){
                document.getElementById("cards"+num).innerHTML += "</br>"
            }
            if(num == 6 && (i == 3 || i == 7)){
                document.getElementById("cards"+num).innerHTML += "</br>"
            }
            if(num == 12 && (i == 5 || i == 11 || i == 17)){
                
                document.getElementById("cards"+num).innerHTML += "</br>"
            }
           
        }


        var flipped = 0;
        var choices =[];
        var remove = [];
        var toFlip = true;
        if(toFlip == true){
        $(".er"+num).flip();
        $(".er"+num).click(function(){
            flip.play();
            $(this).flip(true)
            var collection = this
            var img = this.getElementsByClassName('img')
            for (var i = 0; i < img.length; i+= 1) {
                choices[flipped] = img[i].alt;
                remove[flipped] = collection;
            }
            flipped++;
            if(flipped >= 2){
                toFlip=false;
                // var img1 =choices[0].getElementsByClassName('img').alt
                // var img2 =choices[0].getElementsByClassName('img').alt
                if((choices[0].includes(choices[1]) && choices[0]!= choices[1])|| (choices[1].includes(choices[0]) && choices[1]!= choices[0])){
                    if(turn =="Red"){
                        red++;
                        document.getElementById('red-board').innerHTML = red;
                    }else{
                        blue++;
                        document.getElementById('blue-board').innerHTML = blue;
                    }
                    console.log("Here it is")
                    
                   
                    // console.log(test1)
                    // test1.style ="display:none;"
                    //document.remove[1].getElementsByClassName("er"+num).style= "display:none;";
                    var divs = document.getElementsByClassName("er"+num);
                    setTimeout(hello,1000)
                    function hello(){
                    for (var j=0; j < divs.length; j++){
                        if (divs[j] == remove[0]||divs[j] == remove[1]){
                            divs[j].style = "display:none;"
                         }
                     }
                    }

                    if(red + blue == num){
                        function end(){

                            document.getElementById("red-score").style= "display:none;"
                            document.getElementById("blue-score").style= "display:none;"
                            document.getElementById("game").style = "display:none;"
                            document.getElementById("winner").style = "display:inline-block;"
                            if (red > blue){
                                document.getElementById('page').style ='background: linear-gradient(to bottom right, red, rgba(0, 0, 255, 0.405)); '
                                document.getElementById('full').style ='background: linear-gradient(to bottom right, red, rgba(0, 0, 255, 0.405)); '                
                                document.getElementById('winner').innerHTML = "<h1 id = 'winning-color' style ='color:red'>Winner</br> Red</h1><button onClick='location.reload()' id ='buttonRefresh'>Re-Start</button>"
                                
                            }else if (red< blue){
                                document.getElementById('page').style ='background: linear-gradient(to bottom right, rgba(255, 0, 0, 0.405), blue); '
                                document.getElementById('full').style ='background: linear-gradient(to bottom right, rgba(255, 0, 0, 0.405), blue); '
                                document.getElementById('winner').innerHTML = "<h1 id = 'winning-color' style ='color:blue'>Winner</br> BLUE</h1><button onClick='location.reload()' id ='buttonRefresh'>Re-Start</button>"
                                
                            }else{
                                document.getElementById('page').style ='background: linear-gradient(to bottom right, red, blue); '
                                document.getElementById('full').style ='background: linear-gradient(to bottom right, red, blue); '
                                document.getElementById('winner').innerHTML = "<h1 id = 'winning-color' style ='color:linear-gradient(to bottom right,red, blue)'>Winner</br>TIE</h1><button onClick='location.reload()' id ='buttonRefresh'>Re-Start</button>"
                                
                            }
                        }
                        setTimeout(end, 1200)
                    }
                }
                    setTimeout(time, 1200)
            }
        });
    }
        function time(){
            flipped = 0;
            remove =[];
           
            $(".er"+num).flip(false)
            flip.play();
            if(turn =="Red"){
                turn = "Blue";
                document.getElementById('page').style ='background: linear-gradient(to bottom right, rgba(255, 0, 0, 0.405), blue); '
                document.getElementById('full').style ='background: linear-gradient(to bottom right, rgba(255, 0, 0, 0.405), blue); '
                document.getElementById("who-turn").innerHTML = "<h1 style= 'color:blue;'>Turn: "+ turn +"</h1>";
            }else{
                turn = "Red";
                document.getElementById('page').style ='background: linear-gradient(to bottom right, red, rgba(0, 0, 255, 0.405)); '
                document.getElementById('full').style ='background: linear-gradient(to bottom right, red, rgba(0, 0, 255, 0.405)); '
                document.getElementById("who-turn").innerHTML = "<h1 style= 'color:red;'>Turn: "+ turn +"</h1>";
            }
            

            toFlip=true;
        }
     
      
         
    });

    // // $('#cards:has(div.er6)').css('margin','20px 0 0 13.5%')
    // if(("#cards").hasClass("er6")){
    //     document.getElementById("cards").style = 'margin','20px 0 0 13.5%';
    // }


})

