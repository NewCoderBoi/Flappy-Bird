document.addEventListener("DOMContentLoaded" , ()=>{
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    const bird1 = document.querySelector('.bird1')
    const bird2 = document.querySelector('.bird2')

    //const obstacle = document.createElement('div');

    let birdLeft = 170
    let birdBottom = 80
    let gravity = 5    
    let isGameOver = false;
    let gap = 450;

    function startGame() {
        birdBottom -=gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
        console.log(birdBottom)
    }

    let gameTimerId = setInterval(startGame,50);

    function control(e){
        if(e.keyCode === 32) {
            jump();
        }
    }

    function jump() {
        if(birdBottom < 500){
            birdBottom +=50
        }
        bird.style.bottom = birdBottom + 'px'
        bird1.classList.add('passive')
        bird2.classList.add('active')
        setTimeout(()=>{
            bird1.classList.remove('passive')
            bird2.classList.remove('active')
        },100)
        
        console.log(isGameOver)
    }

    document.addEventListener('keyup' , control)

    function generateObstacle(){
        let obstacleLeft = 500;
        let randomHeight = Math.random() * 60;
        let obstacleBottom = randomHeight;
        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');
        if(!isGameOver) {
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('top-obstacle');
        }
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        topObstacle.style.bottom = obstacleBottom + gap + 'px';
        // setInterval(()=>{
        //     for(let i=0;i<5;i++){
        //         obstacleBottom += 40;
        //         setTimeout(()=>{
        //             obstacle.style.bottom = obstacleBottom + 'px';
        //         },1000)
        //     }

        //     for(let i=0;i<5;i++){
        //         obstacleBottom -= 40;
        //         setTimeout(()=>{
        //             obstacle.style.bottom = obstacleBottom + 'px';
        //         },1000)
        //     }
        // },1000)
        
        function moveObstacle(){
            obstacleLeft -=3;
            obstacle.style.left = obstacleLeft + 'px';
            topObstacle.style.left = obstacleLeft + 'px';
            if(obstacleLeft === -60){
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
            }
            if(birdBottom <= -1){
                gameOver();
                clearInterval(timerId)
            }
            
            if(obstacleLeft > 170 && obstacleLeft < 230 && birdLeft === 170 && (birdBottom < obstacleBottom + 145 || birdBottom > obstacleBottom + gap - 200)){
                gameOver();
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveObstacle,20);
        if(!isGameOver) setTimeout(generateObstacle , 2500); 
        
        
    }

    // function heightChange(height){
    //     setInterval(()=>{
    //         for( let i= 0; i<5;i++){
    //             height += 10;
    //             setTimeout(()=>{
    //                 obstacle.style.bottom = height + 'px';
    //             },100)
    //         }
    //         for( let i=0;i<5;i++){
    //             height -= 10;
    //             setTimeout(()=>{
    //                 obstacle.style.bottom = height + 'px';
    //             },100)
    //         }
    //     },500)
    // }
    generateObstacle()

    function gameOver(){
        clearInterval(gameTimerId);
        isGameOver = true;
        document.removeEventListener('keyup', control);
        console.log(isGameOver)
    }
})