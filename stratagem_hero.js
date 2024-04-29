// set up canvas
let cvs = document.getElementById("canvas");
let HEIGHT = window.innerHeight;
let WIDTH = window.innerWidth;

cvs.width = WIDTH;
cvs.height = HEIGHT;

let ctx = cvs.getContext("2d");
let start = 0;
let score = 0;

class Menu_box {
    constructor(xpos, ypos, width, height, color) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.width = width
        this.height = height;
        this.color = color;
    }


    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.xpos, this.ypos, this.width, this.height)
    }
}

class Text_box {
    constructor(text, xpos, ypos, width, height, color) {
        this.text = text;
        this.xpos = xpos;
        this.ypos = ypos;
        this.width = width
        this.height = height;
        this.color = color;
        this.font = "30px 'Press Start 2P', Arial";
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.xpos, this.ypos, this.width, this.height)

        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.font = this.font;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillStyle = "white";

        ctx.fillText(this.text, this.xpos + this.width / 2, this.ypos + this.height / 2);
    }
}

class example {
    constructor(src, x, y, width, height) {
        this.img = new Image();
        this.img.src = src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.loaded = false;
        // Load event listener
        this.img.onload = () => {
            this.loaded = true;
        };
    }

    draw(ctx) {
        if (this.loaded) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
}


let menu = new Menu_box(WIDTH * .05, HEIGHT * .05, WIDTH * .90, HEIGHT * .90, "grey");
menu.draw(ctx);

let direction1 = new Text_box("Welcome to Stratagem Hero!", WIDTH * .10, HEIGHT * .02, WIDTH * .80, HEIGHT * .50, "rgba(128, 128, 128, 0)");
direction1.draw(ctx);

let direction2 = new Text_box("Press the correct key for each arrow", WIDTH * .10, HEIGHT * .10, WIDTH * .80, HEIGHT * .60, "rgba(128, 128, 128, 0)");
direction2.draw(ctx);

let direction3 = new Text_box("You are timed", WIDTH * .10, HEIGHT * .45, WIDTH * .80, HEIGHT * .2, "rgba(128, 128, 128, 0)");
direction3.draw(ctx);

let direction4 = new Text_box("You can use WASD or the arrow keys", WIDTH * .10, HEIGHT * .40, WIDTH * .80, HEIGHT * .60, "rgba(128, 128, 128, 0)");
direction4.draw(ctx);

let direction5 = new Text_box("Press Space to start", WIDTH * .10, HEIGHT * .45, WIDTH * .80, HEIGHT * .80, "rgba(128, 128, 128, 0)");
direction5.draw(ctx);

document.addEventListener("keydown", handle_keydown);

function handle_keydown(event) {
    if (event.key === ' ') {
        startGame();
        document.removeEventListener("keydown", handle_keydown);
    }
}



function startGame() {
    let startTime;
    let timerInterval;
    const timer_duration = 5;
    let textbox;
    let timefailed = 0;
    let player_guess = [];
    let combo = [];
    let timerRunOutCount = 0;
    let rng;



    function startTimer() {
        // get the time started
        startTime = Date.now();

        // Update the timer every second
        timerInterval = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        // Calculate the elapsed time
        let elapsedTime = Date.now() - startTime;

        // Calculate remaining time
        let remainingTime = timer_duration - Math.floor(elapsedTime / 1000);

        // Reduce the width of the time_bar
        let timePercentage = remainingTime / timer_duration;
        let newWidth = timePercentage * (WIDTH * 0.39);

        // Clear the canvasS
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        // Draw the rectangles/bars & arrows
        textbox.draw(ctx);
        img_slot.draw(ctx);
        time_back1.draw(ctx);
        time_back2.draw(ctx);
        arrow_bar.draw(ctx);
        icon.draw(ctx);


        for (let a = 0; a < white_arrow_img.length; a++) {
            white_arrow_img[a].draw(ctx);
        }
        for (let a = 0; a < green_arrow_img.length; a++) {
            green_arrow_img[a].draw(ctx);
        }


        time_bar.width = newWidth;
        if (remainingTime > 0) {
            time_bar.draw(ctx);
        } else {
            // Timer has run out
            timerRunOutCount++;
            rng;
            if (timerRunOutCount >= 1) {
                // Show game over menu
                showGameOverMenu();
                return;
            }
        }
    }


    class Rectangle {
        constructor(x1, y1, x2, y2, x3, y3, x4, y4, color) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
            this.x3 = x3;
            this.y3 = y3;
            this.x4 = x4;
            this.y4 = y4;
            this.color = color;
        }


        draw(ctx) {
            ctx.beginPath();
            ctx.moveTo(this.x1, this.y1);
            ctx.lineTo(this.x2, this.y2);
            ctx.lineTo(this.x3, this.y3);
            ctx.lineTo(this.x4, this.y4);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }
    }


    class Time {
        constructor(xpos, ypos, width, height, color) {
            this.xpos = xpos;
            this.ypos = ypos;
            this.width = width
            this.height = height;
            this.color = color;
        }


        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.xpos, this.ypos, this.width, this.height)
        }
    }




    class Text_box {
        constructor(xpos, ypos, width, height, color, text) {
            this.xpos = xpos;
            this.ypos = ypos;
            this.width = width;
            this.height = height;
            this.color = color;
            this.text = text;
            this.font = "30px 'Press Start 2P', Arial";
        }


        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.xpos, this.ypos, this.width, this.height);


            ctx.fillStyle = "white";
            ctx.font = this.font;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(this.text, this.xpos + this.width / 2, this.ypos + this.height / 2);
        }
    }


    class Images {
        constructor(src, x, y, width, height) {
            this.img = new Image();
            this.img.src = src;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.loaded = false;
            // Load event listener
            this.img.onload = () => {
                this.loaded = true;
            };
        }

        draw(ctx) {
            if (this.loaded) {
                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            }
        }
    }

    //Draw shapes
    let img_slot = new Rectangle(WIDTH * .35, HEIGHT * .14, WIDTH * .65, HEIGHT * .14, WIDTH * .65, HEIGHT * .54, WIDTH * .35, HEIGHT * .54, "grey");
    img_slot.draw(ctx);

    let time_back1 = new Rectangle(WIDTH * .30, HEIGHT * .85, WIDTH * .70, HEIGHT * .85, WIDTH * .70, HEIGHT * .905, WIDTH * .30, HEIGHT * .905, "grey");
    time_back1.draw(ctx);

    let time_back2 = new Time(WIDTH * .305, HEIGHT * .86, WIDTH * .39, 35, "black");
    time_back2.draw(ctx);

    let time_bar = new Time(WIDTH * .305, HEIGHT * .86, WIDTH * .39, 35, "green");
    time_bar.draw(ctx);

    let arrow_bar = new Time(WIDTH * .305, HEIGHT * .60, WIDTH * .39, 200, "grey");
    arrow_bar.draw(ctx);

    let scoreboard = new Text_box(score, 0, 0, WIDTH * .1, HEIGHT * 1, "grey")
    scoreboard.draw(ctx);

    let previous_rng = -1;

    //print The name of Stratagems
    function print_name(stratagem_name) {
        textbox = new Text_box(WIDTH * .305, HEIGHT * .05, WIDTH * .39, 35, "black", stratagem_name);
        textbox.draw(ctx);
    }

    white_arrow_img = [];
    green_arrow_img = [];

    //print/draw
    function print_white_arrows(combo) {
        let numArrows = combo.length;
        let arrowSpacing = (WIDTH * 0.39) / numArrows;

        white_arrow_img = [];

        for (let c = 0; c < combo.length; c++) {
            let arrowXPos = WIDTH * 0.305 + arrowSpacing * c + 40;
            let arrowYPos = HEIGHT * 0.65;
            let arrowicon;

            if (combo[c] == 1) {
                arrowicon = new Images("./upwhite.png", arrowXPos, arrowYPos, 60, 60);
            }
            if (combo[c] == 2) {
                arrowicon = new Images("./rightwhite.png", arrowXPos, arrowYPos, 60, 60);
            }
            if (combo[c] == 3) {
                arrowicon = new Images("./downwhite.png", arrowXPos, arrowYPos, 60, 60);
            }
            if (combo[c] == 4) {
                arrowicon = new Images("./leftwhite.png", arrowXPos, arrowYPos, 60, 60);
            }
            white_arrow_img.push(arrowicon);
        }
    }





    let icon = new Images("./coconut.webp", WIDTH * .35, HEIGHT * .14, WIDTH * .30, HEIGHT * .40);
    icon.draw(ctx);


    function icons(source) {
        icon = new Images(source, WIDTH * .35, HEIGHT * .14, WIDTH * .30, HEIGHT * .40);
    }



    //arrow combination array
    function generateRandomCombo() {
        let combo = [];

        do {
            rng = Math.floor(Math.random() * 54) + 1;
        } while (rng === previous_rng);
        if (timefailed == 1) {
            do {
                rng = Math.floor(Math.random() * 54) + 1;
            } while (rng === previous_rng);
        }
        previous_rng = rng;
        startTimer();
        console.log(rng);


        if (rng == 1) {
            console.log("Machine gun");
            combo = [3, 4, 3, 1, 2];
            print_name("Machine gun");
            print_white_arrows(combo);
            icons("./Machine_Gun.webp");
        }


        if (rng == 2) {
            console.log("Anti-Material Rifle");
            combo = [3, 4, 2, 1, 3];
            print_name("Anti-Material Rifle");
            print_white_arrows(combo);
            icons("./Anti-Material_Rifle.webp");
        }


        if (rng == 3) {
            console.log("Stalwart");
            combo = [3, 4, 3, 1, 1, 3];
            print_name("Stalwart");
            print_white_arrows(combo);
            icons("./Stalwart.webp");
        }


        if (rng == 4) {
            console.log("Expandable Anti-Tank");
            combo = [3, 3, 4, 1, 2];
            print_name("Expandable Anti-Tank");
            print_white_arrows(combo);
            icons("./Expendable_Anti-tank.webp");
        }


        if (rng == 5) {
            console.log("Recoilless Rifle");
            combo = [3, 4, 2, 2, 4];
            print_name("Recoilless Rifle");
            print_white_arrows(combo);
            icons("./Recoilless_Rifle.webp");
        }


        if (rng == 6) {
            console.log("Flamethrower");
            combo = [3, 4, 1, 3, 1];
            print_name("Flamethrower");
            print_white_arrows(combo);
            icons("./Flamethrower.webp");
        }


        if (rng == 7) {
            console.log("Autocannon");
            combo = [3, 2, 4, 3, 3, 1, 1, 2];
            print_name("Autocannon");
            print_white_arrows(combo);
            icons("./Autocannon.webp");
        }


        if (rng == 8) {
            console.log("Railgun");
            combo = [3, 2, 4, 3, 3, 1, 4, 3, 2];
            print_name("Railgun");
            print_white_arrows(combo);
            icons("./Railgun.webp");
        }


        if (rng == 9) {
            console.log("Spear");
            combo = [3, 3, 1, 3, 3];
            print_name("Spear");
            print_white_arrows(combo);
            icons("./SPEAR_Launcher.webp");
        }


        if (rng == 10) {
            console.log("Gatling Barrage");
            combo = [2, 3, 4, 1, 1];
            print_name("Gatling Barrage");
            print_white_arrows(combo);
            icons("./Orbital_Gatling_Barrage.webp");
        }


        if (rng == 11) {
            console.log("Airbust Strike");
            combo = [2, 2, 2];
            print_name("Airbust Strike");
            print_white_arrows(combo);
            icons("./Orbital_Airbust_Strike.webp");
        }


        if (rng == 12) {
            console.log("120MM HE Barrage");
            combo = [2, 3, 3, 4, 3, 2, 3, 3];
            print_name("120MM HE Barrage");
            print_white_arrows(combo);
            icons("./Orbital_120MM_HE_Barrage.webp");
        }


        if (rng == 13) {
            console.log("380MM HE Barrage");
            combo = [2, 3, 3, 1, 1, 4, 3, 3, 3];
            print_name("380MM HE Barrage");
            print_white_arrows(combo);
            icons("./Orbital_380MM_HE_Barrage.webp");
        }


        if (rng == 14) {
            console.log("Walking Barrage");
            combo = [2, 3, 2, 3, 2, 3];
            print_name("Walking Barrage");
            print_white_arrows(combo);
            icons("./Orbital_Walking_Barrage.webp");
        }


        if (rng == 15) {
            console.log("Laser Strike");
            combo = [2, 1, 4, 1, 2, 4];
            print_name("Laser Strike");
            print_white_arrows(combo);
            icons("./Orbital_Laser.webp");
        }


        if (rng == 16) {
            console.log("Railcannon Strike");
            combo = [2, 3, 1, 3, 4];
            print_name("Railcannon Strike");
            print_white_arrows(combo);
            icons("./Orbital_Railcannon_Strike.webp");
        }


        if (rng == 17) {
            console.log("Eagle Strafing Run");
            combo = [1, 2, 2];
            print_name("Eagle Strafing Run");
            print_white_arrows(combo);
            icons("./Eagle_Strafing_Run.webp");
        }


        if (rng == 18) {
            console.log("Eagle Airstrike");
            combo = [1, 2, 3, 2];
            print_name("Eagle Airstrike");
            print_white_arrows(combo);
            icons("./Eagle_Airstrike.webp");
        }


        if (rng == 19) {
            console.log("Eagle Cluster Bomb");
            combo = [1, 2, 3, 3, 2, 3];
            print_name("Eagle Cluster Bomb");
            print_white_arrows(combo);
            icons("./Eagle_Cluster_Bomb.webp");
        }


        if (rng == 20) {
            console.log("Eagle Napalm Airstrike");
            combo = [1, 2, 3, 1];
            print_name("Eagle Napalm Airstrike");
            print_white_arrows(combo);
            icons("./Eagle_Napalm.webp");
        }


        if (rng == 21) {
            console.log("Jump Pack");
            combo = [3, 1, 1, 3, 1];
            print_name("Jump Pack");
            print_white_arrows(combo);
            icons("./Jump_Pack.webp");
        }


        if (rng == 22) {
            console.log("Eagle Smoke Strike");
            combo = [1, 2, 1, 3];
            print_name("Eagle Smoke Strike");
            print_white_arrows(combo);
            icons("./Eagle_Smoke.webp");
        }


        if (rng == 23) {
            console.log("Eagle 110MM Rocket Pods");
            combo = [1, 3, 1, 4];
            print_name("Eagle 110MM Rocket Pods");
            print_white_arrows(combo);
            icons("./Eagle_110MM_Rocket_Pods.webp");
        }


        if (rng == 24) {
            console.log("Eagle 500KG Bomb");
            combo = [1, 4, 3, 3, 3];
            print_name("Eagle 500KG Bomb");
            print_white_arrows(combo);
            icons("./Eagle_500kg_Bomb.webp");
        }


        if (rng == 25) {
            console.log("Orbital Precision Strike");
            combo = [2, 2, 1];
            print_name("Orbital Precision Strike");
            print_white_arrows(combo);
            icons("./Orbital_Precision_Strike.webp");
        }


        if (rng == 26) {
            console.log("Orbital Gas Strike");
            combo = [2, 2, 3, 2];
            print_name("Orbital Gas Strike");
            print_white_arrows(combo);
            icons("./Orbital_Gas_Strike.webp");
        }


        if (rng == 27) {
            console.log("Orbital EMS Strike");
            combo = [2, 2, 4, 3];
            print_name("Orbital EMS Strike");
            print_white_arrows(combo);
            icons("./Orbital_EMS_Strike.webp");
        }


        if (rng == 28) {
            console.log("Orbital Smoke Strike");
            combo = [2, 2, 3, 1];
            print_name("Orbital Smoke Strike");
            print_white_arrows(combo);
            icons("./Orbital_Smoke_Strike.webp");
        }


        if (rng == 29) {
            console.log("HMG Emplacement");
            combo = [1, 3, 4, 2, 2, 4];
            print_name("HMG Emplacement");
            print_white_arrows(combo);
            icons("./HMG_Emplacement.webp");
        }


        if (rng == 30) {
            console.log("Shield Generator Relay");
            combo = [3, 1, 4, 2, 4, 3];
            print_name("Shield Generator Relay");
            print_white_arrows(combo);
            icons("./Shield_Generator_Relay.webp");
        }


        if (rng == 31) {
            console.log("Tesla Tower");
            combo = [3, 1, 2, 1, 4, 2];
            print_name("Tesla Tower");
            print_white_arrows(combo);
            icons("./Tesla_Tower.webp");
        }


        if (rng == 32) {
            console.log("Anti-Personnel Minefield");
            combo = [3, 4, 3, 1, 2];
            print_name("Anti-Personnel Minefield");
            print_white_arrows(combo);
            icons("./Anti-Personnel_Minefield.webp");
        }


        if (rng == 33) {
            console.log("Supply Pack");
            combo = [3, 4, 3, 1, 1, 3];
            print_name("Supply Pack");
            print_white_arrows(combo);
            icons("./Supply_Pack.webp");
        }


        if (rng == 34) {
            console.log("Grenade Launcher");
            combo = [3, 4, 3, 1, 4, 3, 3];
            print_name("Grenade Launcher");
            print_white_arrows(combo);
            icons("./Grenade_Launcher.webp");
        }


        if (rng == 35) {
            console.log("Laser Cannon");
            combo = [3, 4, 3, 1, 4];
            print_name("Laser Cannon");
            print_white_arrows(combo);
            icons("./Laser_Cannon.webp");
        }


        if (rng == 36) {
            console.log("Incendiary Mines");
            combo = [3, 4, 4, 3];
            print_name("Incendiary Mines");
            print_white_arrows(combo);
            icons("./Incendiary_Mines.webp");
        }


        if (rng == 37) {
            console.log("Guard Dog Rover");
            combo = [3, 4, 3, 1, 4, 3, 3];
            print_name("Guard Dog Rover");
            print_white_arrows(combo);
            icons("./Guard_Dog_Rover.webp");
        }


        if (rng == 38) {
            console.log("Ballistic Shield Backpack");
            combo = [3, 4, 1, 1, 2];
            print_name("Ballistic Shield Backpack");
            print_white_arrows(combo);
            icons("./Ballistic_Shield_Backpack.webp");
        }


        if (rng == 39) {
            console.log("Arc Thrower");
            combo = [3, 2, 1, 4, 3];
            print_name("Arc Thrower");
            print_white_arrows(combo);
            icons("./Arc_Thrower.webp");
        }


        if (rng == 40) {
            console.log("Shield Generator Pack");
            combo = [3, 1, 4, 3, 2, 2];
            print_name("Shield Generator Pack");
            print_white_arrows(combo);
            icons("./Shield_Generator_Pack.webp");
        }


        if (rng == 41) {
            console.log("Machine Gun Sentry");
            combo = [3, 1, 2, 2, 1];
            print_name("Machine Gun Sentry");
            print_white_arrows(combo);
            icons("./Machine_Gun_Sentry.webp");
        }


        if (rng == 42) {
            console.log("Gatling Sentry");
            combo = [3, 1, 2, 4, 3];
            print_name("Gatling Sentry");
            print_white_arrows(combo);
            icons("./Gatling_Sentry.webp");
        }


        if (rng == 43) {
            console.log("Mortar Sentry");
            combo = [3, 1, 2, 2, 3];
            print_name("Mortar Sentry");
            print_white_arrows(combo);
            icons("./Mortar_Sentry.webp");
        }


        if (rng == 44) {
            console.log("Guard Dog");
            combo = [3, 1, 2, 2, 3];
            print_name("Guard Dog");
            print_white_arrows(combo);
            icons("./Guard_Dog.webp");
        }


        if (rng == 45) {
            console.log("Autocannon Sentry");
            combo = [3, 1, 2, 1, 4, 1];
            print_name("Autocannon Sentry");
            print_white_arrows(combo);
            icons("./Autocannon_Sentry.webp");
        }


        if (rng == 46) {
            console.log("Rocket Sentry");
            combo = [3, 1, 2, 2, 4];
            print_name("Rocket Sentry");
            print_white_arrows(combo);
            icons("./Rocket_Sentry.webp");
        }


        if (rng == 47) {
            console.log("EMS Mortar Sentry");
            combo = [3, 3, 1, 1, 4];
            print_name("EMS Mortar Sentry");
            print_white_arrows(combo);
            icons("./EMS_Mortar.webp");
        }


        if (rng == 48) {
            console.log("Reinforce");
            combo = [1, 3, 2, 4, 1];
            print_name("Reinforce");
            print_white_arrows(combo);
            icons("./Reinforce.webp");
        }


        if (rng == 49) {
            console.log("SOS Beacon");
            combo = [1, 3, 2, 1];
            print_name("SOS Beacon");
            print_white_arrows(combo);
            icons("./SOS_Beacon.webp");
        }


        if (rng == 50) {
            console.log("Super Earth Flag");
            combo = [3, 1, 3, 1];
            print_name("Super Earth Flag");
            print_white_arrows(combo);
            icons("./Super_Earth_Flag.jpg");
        }


        if (rng == 51) {
            console.log("Upload Data");
            combo = [4, 2, 1, 1, 1];
            print_name("Upload Data");
            print_white_arrows(combo);
            icons("./DeliverSSSD.webp");
        }


        if (rng == 52) {
            console.log("Hell Bomb");
            combo = [3, 1, 4, 3, 1, 2, 3, 1];
            print_name("Hell Bomb");
            print_white_arrows(combo);
            icons("./Hellbomb.webp");
        }


        if (rng == 53) {
            console.log("Eagle Rearm");
            combo = [1, 1, 4, 1, 2];
            print_name("Eagle Rearm");
            print_white_arrows(combo);
            icons("./Eagle_Rearm.webp");
        }


        if (rng == 54) {
            console.log("Patriot Exosuit");
            combo = [4, 3, 2, 1, 4, 3, 3];
            print_name("Patriot Exosuit");
            print_white_arrows(combo);
            icons("./Patriot_Exosuit.webp");
        }
        return combo;
    }


    combo = generateRandomCombo();


    function convert(array) {
        let arrows = [];
        for (let a = 0; a < array.length; a++) {
            if (array[a] == 1) {
                arrows.push("up" + " ");
            }


            else if (array[a] == 2) {
                arrows.push("right" + " ");
            }


            else if (array[a] == 3) {
                arrows.push("down" + " ");
            }


            else if (array[a] == 4) {
                arrows.push("left" + " ");
            }
        }
        console.log(arrows);
    }


    convert(combo);


    document.addEventListener("keydown", handle_keydown);


    // ensure the canvas can receive keyboard events
    cvs.setAttribute('tabindex', 0);
    cvs.focus();


    function compare() {
        let correct = true;
        for (let i = 0; i < player_guess.length; i++) {
            if (player_guess[i] != combo[i]) {
                correct = false;
                player_guess.splice(i, 1);
                console.log("Wrong arrow");
                break;
            }
        }


        // check if wrong or right
        if (correct) {
            console.log("Correct arrow");
            let numArrows = combo.length;
            let arrowSpacing = (WIDTH * 0.39) / numArrows;


            for (let c = 0; c < combo.length; c++) {
                let arrowXPos = WIDTH * 0.305 + arrowSpacing * c + 40;
                let arrowYPos = HEIGHT * 0.65;
                let arrowicon;

                if (player_guess[c] == combo[c]) {
                    if (combo[c] == 1) {
                        arrowicon = new Images("./upgreen.png", arrowXPos, arrowYPos, 60, 60);
                    }
                    if (combo[c] == 2) {
                        arrowicon = new Images("./rightgreen.png", arrowXPos, arrowYPos, 60, 60);
                    }
                    if (combo[c] == 3) {
                        arrowicon = new Images("./downgreen.png", arrowXPos, arrowYPos, 60, 60);
                    }
                    if (combo[c] == 4) {
                        arrowicon = new Images("./leftgreen.png", arrowXPos, arrowYPos, 60, 60);
                    }
                    green_arrow_img.push(arrowicon);
                }
            }

        }


        if (player_guess.length == combo.length) {
            console.log("correct combo");

            score = score + 10;

            //generate a new number
            combo = generateRandomCombo();
            convert(combo);


            // Clear player's guess array
            player_guess = [];
            green_arrow_img = [];
        }
    }


    function handle_keydown(event) {
        if (event.key == "ArrowUp" || event.key == "w") {
            player_guess.push(1);
        }


        if (event.key == "ArrowRight" || event.key == "d") {
            player_guess.push(2);
        }


        if (event.key == "ArrowDown" || event.key == "s") {
            player_guess.push(3);
        }


        if (event.key == "ArrowLeft" || event.key == "a") {
            player_guess.push(4);
        }
        compare();
        console.log(score);
    }
}

function showGameOverMenu() {
    start = 3;
    let game_over_menu = new Menu_box(WIDTH * .05, HEIGHT * .05, WIDTH * .90, HEIGHT * .90, "grey");
    game_over_menu.draw(ctx);

    let gmdirection1 = new Text_box("Game Over", WIDTH * .10, HEIGHT * .02, WIDTH * .80, HEIGHT * .50, "rgba(128, 128, 128, 0)");
    gmdirection1.draw(ctx);

    let gmdirection2 = new Text_box("your score is " + score, WIDTH * .10, HEIGHT * .10, WIDTH * .80, HEIGHT * .60, "rgba(128, 128, 128, 0)");
    gmdirection2.draw(ctx);

    let gmdirection3 = new Text_box("Refresh to restart", WIDTH * .10, HEIGHT * .25, WIDTH * .80, HEIGHT * .60, "rgba(128, 128, 128, 0)");
    gmdirection3.draw(ctx);
}
