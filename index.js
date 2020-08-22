//joke section
//fetches random joke from can haz dad joke. needs event listener for button
function getJoke() {
  $(".joke-btn").click((event) => {
    fetch(`https://icanhazdadjoke.com/`, {
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((responseJson) => displayJoke(responseJson));
  });
}
//displays jokes one at a time
function displayJoke(responseJson) {
  $(".joke-results").empty();
  $(".joke-results").append(`
    <h3>${responseJson.joke}</h3>
    `);
}

//drink section
//get drink recipe from cocktail api
function getDrink() {
  const drinkBase = $(".drink-base").val();
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drinkBase}`)
    .then((response) => response.json())
    .then((responseJson) => displayDrink(responseJson));
}
function displayDrink(responseJson) {
  $("drink-results").empty();
  let randomDrink = Math.floor(Math.random() * responseJson.drinks.length);
  let drink = responseJson.drinks[randomDrink];
  $(".drink-results").html(`
  <h3><img width="50" src="${drink.strDrinkThumb}" alt="${drink.strDrink}" hspace="20" /><a href="https://thecocktaildb.com/drink/${drink.idDrink}" target="_blank">${drink.strDrink}</a></h3>
  `);
}
function watchDrink() {
  $(".drink-input").click((event) => getDrink());
}

//activity section
//displays activity one at a time - needs update on val
function displayActivity(responseJson) {
  $(".activity-results").empty();
  $(".activity-results").append(`
    <h3>${responseJson.activity}</h3>
    `);
}
//gets activity from bored api - having issues with value
function getActivity() {
  const activityNumber = $(".activity-input").val();
  fetch(`http://www.boredapi.com/api/activity/?participants=${activityNumber}`)
    .then((response) => response.json())
    .then((responseJson) => displayActivity(responseJson));
}
//watches for activity button to be pressed
function watchActivity() {
  $(".activity-btn").click((event) => getActivity());
}

//trivia section
//displays trivia retrieved from api
function displayTrivia(responseJson) {
  console.log("display trivia", responseJson);
  $(".trivia-results").empty();
  let randomTrivia = Math.floor(Math.random() * responseJson.results.length);
  let trivia = responseJson.results[randomTrivia];
  let correctAnswer = trivia.correct_answer;
  let incorrectAnswers = trivia.incorrect_answers;
  let answerSet = incorrectAnswers.concat(correctAnswer);
  console.log(answerSet);
  $(".trivia-results").html(`<h3>${trivia.question}</h3>`);
  for (let i = 0; i < answerSet.length; i++) {
    $(".trivia-results").append(`<li>
    <input type="radio" name="choice" id="${i}" value="${answerSet[i]}" required/>
    <label>${answerSet[i]}</label></li>`);
  }
  $(".trivia-results").append(
    `<button type="submit" class="trivia-submit">Check Answer</button>`
  );

  $(document)
    .off("click")
    .on("click", ".trivia-submit", function (e) {
      let guess = $("input:checked").val();
      console.log(correctAnswer);
      console.log(guess);
      $(".trivia-results").empty();
      if (guess == correctAnswer) {
        $(".trivia-results").html(`<p>You are correct</p>`);
      } else {
        $(".trivia-results").html(
          `<p>Sorry you are wrong, the correct answer is ${correctAnswer}`
        );
      }
    });
}
//grabs set of 4 random questions after button is pressed
function getTrivia() {
  fetch(`https://opentdb.com/api.php?amount=4`)
    .then((response) => response.json())
    .then((responseJson) => displayTrivia(responseJson));
}
//watches for trivia button to be pressed
function watchTrivia() {
  $(".trivia-btn").click((event) => getTrivia());
}

function runApp() {
  getJoke();
  watchTrivia();
  watchActivity();
  watchDrink();
}

$(runApp);
