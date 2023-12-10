import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

                    // initialize kaboom context
                    kaboom();
                    loadSprite("ben", "sprites/ben.svg")
                     
                    scene('game on',()=>{

                                                const ben = add([
                                                    sprite("ben"),
                                                    pos(120, 80),
                                                    scale(0.21),
                                                    body(), // physical body for gravity
                                                    area(), // for collison
                                                    ])


                                                // platform                
                                                add([
                                                    rect(width(),50),
                                                    pos(0,height()-48),
                                                    outline(4),
                                                    area(),
                                                    body({ isStatic : true}),
                                                    color (0,0,255),
                                                ])

                                                /*
                                                // looping obasticle for every 2 sec
                                                loop(2,() => {
                                                    //obasctle 
                                                        add([
                                                            rect(50,rand(25,115)),
                                                            area(),
                                                            outline(5),
                                                            pos(width(),height() -50),
                                                            anchor("botleft"),
                                                            color(255, 180, 255),
                                                            move(LEFT, 200), // 1st parmeter is direction and 2nd is speed
                                                            "pin"
                                                ])}) */


                                                //for random loops of obasctle 
                                                function spawnObsatcle(){
                                                    add([
                                                        rect(50,rand(25,115)),
                                                        area(),
                                                        outline(5),
                                                        pos(width(),height() -50),
                                                        anchor("botleft"),
                                                        color(255, 180, 255),
                                                        move(LEFT, 200), // 1st parmeter is direction and 2nd is speed
                                                        "pin"]);
                                                    
                                                    wait(rand(1.5, 2), () => {
                                                        spawnObsatcle();
                                                    });
                                                }

                                                spawnObsatcle();

                                                ben.onCollide("pin", () => {
                                                    addKaboom(ben.pos);
                                                    shake();
                                                    go("lose",score);
                                                });

                                                onKeyPress("up", ()=> {
                                                    if(ben.isGrounded()){
                                                        ben.jump()
                                                    }
                                                    
                                                })

                                                setGravity(1000)

                                                let score = 0;
                                                const scoreLabel = add([
                                                    text("score"),
                                                    pos(24,25),
                                                ])

                                                // increment score every frame
                                                onUpdate(() => {
                                                    score++;
                                                    scoreLabel.text = score;
                                                });
                                             });

                    go("game on")

                    scene("lose", (score) => {
                        add([
                            text("Game Over your score is "+ score),
                            color(0,0,0),
                            pos(center()),
                            anchor("center"),
                        ])
                    })
                   
