var correctCount = 0;
var inCorrectCount = 0;
var unAnsweredCount = 0;
var sec = 30;
var timer;

//Question array
var quizList = [
	{	
		name: "question1",
		question: "1. How many countries are inside the United Kingdom?",
		answer: "Four",
		choices: ["Two","Four","Three","One"]
	},
	{
		name: "question2",
		question: "2. What is the capital of Australia?",
		answer: "Canberra",
		choices: ["Sydney","Melbourne","Canberra","Brisbane"]
	},
	{
		name: "question3",
		question: "3. Which of these countries is NOT located in Africa?",
		answer: "Suriname",
		choices: ["Burkina-Faso","Mozambique","Algeria","Suriname"]
	},
	{
		name: "question4",
		question: "4. Which German city is located on the River Isar?",
		answer: "Munich",
		choices: ["Berlin","Hamburg","Dortmund","Munich"]
	},
	{
		name: "question5",
		question: "5. How many timezones does Russia have?",
		answer: "11",
		choices: ["6","24","16","11"]
	},
	{
		name: "question6",
		question: "6. What is the smallest country in South America by area?",
		answer: "Suriname",
		choices: ["Suriname","Chile","Uruguay","Brazil"]
	},
	{
		name: "question7",
		question: "7. How many sovereign states are members of the United Nations?",
		answer: "195",
		choices: ["201","195","153","178"]
	},
	{
		name: "question8",
		question: "8. Which city is located both in Asia and Europe continent?",
		answer: "Istanbul",
		choices: ["Bursa","Ankara","Izmir","Istanbul"]
	},
	{
		name: "question9",
		question: "9. Which is the largest desert in the world?",
		answer: "Sahara",
		choices: ["Thar","Gobi","Sahara","Namib"]
	},
	{
		name: "question10",
		question: "10. What is the capital of British Columbia, Canada?",
		answer: "Victoria",
		choices: ["Vancouver","Kelowna","Victoria","Hope"]
	}
];

//Display the timer
function displayTime(){
	$(".time-left").html("Time left<br>" + --sec + "<br>seconds");
}

//If Time is up check the result
function timeOut(){
	alert("Time's up");
	checkResult();
}

//Display all questions and set timer
function displayQuestions(){

	//Start timer.
	setInterval(displayTime, 1000);

	//If the time is over
	timer = setTimeout(timeOut, 1000 * parseInt(sec));

	var quiz = "";
	for(var i=0; i<quizList.length; i++){

		var multipleChoice = "";

		//Get mutiple choice for each question, set it's values according to the choices and set same name for each question to group them together.
		for(var j=0; j<quizList[i].choices.length; j++){
			multipleChoice += "<br><input name=" + quizList[i].name + " type='radio' value=" + quizList[i].choices[j] + ">&emsp;" + quizList[i].choices[j];  
		}

		//Append all questions along with its choices
		quiz += "<span class='question'>" + quizList[i].question + "</span>" + multipleChoice + "<hr>";
	}

	//Append all question and its choices in the form and display it on screen
	$(".quiz-form").append(quiz);
	$('.form').show();
	$('.map-image').hide();	
	$('#start').hide();
}

//Check the result and update couters
function checkResult(){
	var val = "";
	var ans = "";

	for(var i = 0; i < quizList.length; i++){

		//Get the value of checked button and compare it with answer of the question. Update the counters accordingly.
		val = $("input[name='" + quizList[i].name + "']:checked").attr("value");
		ans = quizList[i].answer;

		if(val === ans)
			correctCount++;
		else if (val === undefined)
			unAnsweredCount++;
		else
			inCorrectCount++;
	}

	displayResult(correctCount,inCorrectCount,unAnsweredCount);
}

//Display result
function displayResult(correct, incorrect, unanswered){
	var totalQuiz = quizList.length;
	var displayMessage = "Your score out of " + totalQuiz + "<hr>Correct answers : " + correct + "<br> Incorrect answers : " + incorrect + "<br> Unanswered : " + unanswered;
	$(".score").html(displayMessage);
	$('.results').show();
	$('.map-image').show();	
	$('.form').hide();
	timer=0;
	$('#restart').show();
}

//On submit Clear timer and check result
function onSubmit(){
	clearTimeout(timer);
	checkResult();
}

function onRestart(){
	clearTimeout(timer);
	$('#restart').hide();
	
	correctCount = 0;
	inCorrectCount = 0;
	unAnsweredCount = 0;
	clearInterval(timer);
	sec = 30;
	timer =0;
	$(".quiz-form").empty();
	displayQuestions();
}

$(document).ready(function() {

	//When click on start button
	$("#start").click(displayQuestions);

	//When click on submit button
	$("#submit").click(onSubmit);

	$("#restart").click(onRestart);

});