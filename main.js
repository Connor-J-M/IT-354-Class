//Global Variables
imageSrcArray = []
randNumArray = []
pairCheck = 0;

//Stat counters
highScore = 0
correctSelections = 0
totalSelections = 0


//cardNum = number of cards selected for game


$(document).ready( () => {

    $( "#tabs" ).tabs();

    //Getting settings into session storage
    $("#save_settings").on('click', () => {
        //Stores number of cards selected
        selectedCardNum = $('#num_cards').val();
        sessionStorage.setItem("cardNum", selectedCardNum)
        //Stores name of player
        playerName = $('#player_name').val();
        sessionStorage.setItem("playerName", playerName)
        //highScore set
        sessionStorage.setItem("highScore", highScore);

        //Reloads page to reset name and cards
        location.reload()

        //Cannot do any console.log or page updates after page reload!!!!

    })
    //Loads array of random numbers to be used in loading images
    loadRandomNumArray()
   //Loads images into array to be displayed
    loadImgArray(randNumArray)

    //Getting and setting card
    if(isNaN(sessionStorage.getItem("cardNum")))
    {
        totalCards = 48
    }
    else
    {
        totalCards = sessionStorage.getItem("cardNum")
    }
    
    //Prints backs of cards with number in alt tag
    i = 0;
    while(i < totalCards)
    {
        //Backs
        $("#cards").append("<img src='images/back.png' alt='" + i + "' class = 'cards'>")
        //Fronts(testing)
        // $("#cards").append("<img src='" + imageSrcArray[i] + "' alt='" + i + "' class = 'cards'>")
        i++
    }

    //Create click listeners for each card
    cardList = document.getElementsByClassName("cards")
    winCheckTotalCards = cardList.length
    for(i = 0; i < cardList.length; i++){

        cardList[i].addEventListener("click", function() {
            //Sets current elements SRC to one in imageArray
            $(this).fadeOut(500, function(){
                this.setAttribute("src",imageSrcArray[this.getAttribute("alt")])
            })
            //PUT FUNCTION HERE TO MAKE IT LOOK GOOD
            $(this).fadeIn(500, function(){
                this.setAttribute("src",imageSrcArray[this.getAttribute("alt")])
            });

            //Define current card for use in timeout function
            currentCard = this
            pairCheck++
            totalSelections++

                //two flipped logic
                if(pairCheck >= 2){
                    //Checks if both flipped cards have the same source img
                    myTimeout = setTimeout(function(){

                        if(firstFlipSrc.getAttribute("src") == currentCard.getAttribute("src")){
                            //Logic for complete pair
                            $(currentCard).fadeOut(500, function(){
                                currentCard.setAttribute("src", "images/blank.png")
                            })
                            $(firstFlipSrc).fadeOut(500, function(){
                                firstFlipSrc.setAttribute("src", "images/blank.png")
                            })
                            currentCard.setAttribute("class", "blank")
                            firstFlipSrc.setAttribute("class", "blank")
                            console.log("Complete pair!")
                            pairCheck = 0
                            correctSelections+=2
                        }
                        else{
                            //Logic for bad pair
                            $(currentCard).fadeOut(500, function(){
                                currentCard.setAttribute("src", "images/back.png")
                            })
                            $(firstFlipSrc).fadeOut(500, function(){
                                firstFlipSrc.setAttribute("src", "images/back.png")
                            })
                            $(currentCard).fadeIn(500)
                            $(firstFlipSrc).fadeIn(500)
                            console.log("Not a pair!")
                            pairCheck = 0;
                        }
                        //Win condition
                        if(correctSelections >= winCheckTotalCards){
                            alert("You won!")
                            //Updates high score and current score
                            tempHighScore = correctSelections/totalSelections * 100
                             if(tempHighScore > sessionStorage.getItem("highScore"))
                                {
                                highScore = tempHighScore;
                                $("#high_score").text("High Score: %" + highScore);
                                $("#correct").text("Correct: %" + correctSelections/totalSelections * 100)
            
                                sessionStorage.setItem("highScore", highScore);
            
                                } else {
                                    $("#correct").text("Correct: %" + correctSelections/totalSelections * 100)
                                }
                         }
                    }, 2000)

                }else{
                    firstFlipSrc = this
                }
            
         })
     }

    //Displays player name if there is one
    if(sessionStorage.getItem("playerName"))
    {
        $("#player").text("Player: " + sessionStorage.getItem("playerName"))
    }
    else
    {
        $("#player").text("")
    }

    //Displays high score
    $("#high_score").text("High Score: %" + sessionStorage.getItem("highScore"));

})

function loadImgArray(randomArray){

    for(i = 0; i < randomArray.length; i++)
    {
        imageSrcArray.push("images/card_" + randomArray[i] + ".png")
    }

}

//Loads an array of random numbers as long as the amount of cards chosen for the game
function loadRandomNumArray(){
    //!!! Create better system for checking cardNum !!!
    if(sessionStorage.getItem("cardNum"))
    {
        totalCards = sessionStorage.getItem("cardNum")
    }
    else
    {
        totalCards = 48
    }

    i = 0
    while (i < totalCards){
        //Creates random number to be added to array
        var randNum = Math.floor((Math.random() * totalCards / 2)) + 1;
        //Checker to see if number has already been added
        addNum = true;
        //Counter to check how many times number appears in array
        counter = 0;
        //Checks to see if number already exists in random array
        for (let i = 0; i < randNumArray.length; i++)
        {
            if(randNum == randNumArray[i]){
                counter ++
            }
        }

        if(counter >= 2){
            addNum = false
        }

        if(addNum == true){
            randNumArray.push(randNum);
            i++
        }
    }
    //End randnumarray creation
}
