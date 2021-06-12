class Game {
  constructor(){
    this.rank1=loadImage("images/1st.png");
    this.rank2=loadImage("images/2nd prize.png");
    this.rank3=loadImage("images/3rd prize.png");
    this.rank4=loadImage("images/Consolation Prize.jpg");
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(c1);
    car2 = createSprite(300,200);
    car2.addImage(c2);
    car3 = createSprite(500,200);
    car3.addImage(c3);
    car4 = createSprite(700,200);
    car4.addImage(c4);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background("white");
      image(track,0,-displayHeight*4, displayWidth, displayHeight*5)

      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 180;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 220;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          //cars[index - 1].shapeColor = "red";
          fill("red")
          ellipse (x,y,60,60)
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distance -=10
      player.update();
    }

      if(player.distance>4350){
        gameState=2
        player.rank+=1;
        Player.updateCarsAtEnd(player.rank)
        if(player.rank==1){
          image(this.rank1,displayWidth/2-200,-displayHeight*4-100,400,400)
        }
        if(player.rank==2){
          image(this.rank2,displayWidth/2-200,-displayHeight*4-100,400,400)
        }
        if(player.rank==3){
          image(this.rank3,displayWidth/2-200,-displayHeight*4-100,400,400)
        }
        if(player.rank==4){
          image(this.rank4,displayWidth/2-200,-displayHeight*4-100,400,400)
        }
      }
    drawSprites();
  }
  end(){
    console.log("game ended")
  }
}
