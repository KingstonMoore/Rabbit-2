const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

function preload(){
  fruitImg = loadImage("images/melon.png")
  bgImg = loadImage("images/background.png")
  bunnyImg = loadImage("images/Rabbit-01.png")
  blink = loadAnimation("images/blink_1.png","images/blink_2.png","images/blink_3.png") 
  eat = loadAnimation("images/eat_0.png", "images/eat_1.png", "images/eat_2.png", "images/eat_3.png", "images/eat_4.png")
  sad = loadAnimation("images/sad_1.png", "images/sad_2.png", "images/sad_3.png")
}

function setup() {
  createCanvas(500,650);
  engine = Engine.create();
  world = engine.world;
  ground = Bodies.rectangle(250, 650, 500, 20, { isStatic: true });
  World.add(world, ground);

  rope = new Rope(6,{x:250,y:30})
  fruit = Bodies.circle(250,200,20,{restitution: 0.5})
  World.add(world, fruit);
  link = new Link(rope,fruit)

  btn = createImg("images/cut_btn.png")
  btn.position(230, 30)
  btn.size(50, 50)
  btn.mouseClicked(function(){
    rope.break()
    link.break()
  })

  blink.frameDelay = 15
  eat.frameDelay = 15
  sad.frameDelay = 15
  sad.looping = false
  eat.looping = false
  bunny = createSprite(250, 550)
  bunny.addAnimation("blinking", blink)
  bunny.addAnimation("eating", eat)
  bunny.addAnimation("sad", sad)
  bunny.scale = 0.2
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}

function draw() {
  background(bgImg);
  Engine.update(engine);
  rect(ground.position.x, ground.position.y, 500, 20)
  if (fruit!= null){
  push()
  imageMode(CENTER)
  image(fruitImg, fruit.position.x, fruit.position.y, 70, 70)
  pop()
  d = dist(fruit.position.x, fruit.position.y, bunny.position.x, bunny.position.y)
  if (d<80){
    bunny.changeAnimation("eating", eat)
    World.remove(world, fruit)
      fruit = null;
  }
}
  rope.display()

  if (fruit!= null && fruit.position.y>600){
    bunny.changeAnimation("sad", sad)
  }
  drawSprites()
}




