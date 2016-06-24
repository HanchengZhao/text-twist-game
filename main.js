window.addEventListener('load',function(){
		var start = document.getElementById('start');
		start.addEventListener('click',function(){
			document.getElementById('menu').style.display = "none";
			document.getElementById('game').style.display = "block";
			Game();
		});
	});
	
var words;
var Word = "";
var letters;
var answers = [];
var _time;
function loadDoc() {
		  var xhttp = new XMLHttpRequest();
		  xhttp.onreadystatechange = function() {
		    if (xhttp.readyState == 4 && xhttp.status == 200) {
		      //document.getElementById("json").innerHTML = xhttp.responseText;
		      //get the rack from server
		      var a = xhttp.responseText;
		      var rack = JSON.parse(a);
		      //Word = rack[0].rack;
		      Word = rack.rack;
		      letters = Word.split("");
		      words = rack.words;
		      //words = rack[0].words;
		      
		      //words = words.split("@@");
		     
		      document.getElementById('ansleft').innerHTML = words.length;
		      document.getElementById('answer').innerHTML = "";
		      console.log(words);
		       //clear current input
		      document.getElementById("avletters").innerHTML = Word;
		      answers = [];
		      document.getElementById("words").innerHTML = answers;
		    }
		  };
		  clearInterval(_time);
		  startTimer(120,document.getElementById('time'));
		  xhttp.open("GET", "sub-rack.php", true);
		  xhttp.send();
		  
		  
		  
		}

function Game() {
	// initianlize variables
	
	var game = this;
	this.body = document.getElementById('body');
	this.twist = document.getElementById('twist');
	this.enter = document.getElementById('enter');
	this.clear = document.getElementById('clear');
	this.wordscontainer = document.getElementById('words');
	this.ansleft = document.getElementById('ansleft');
	this.avail = document.getElementById('avletters');
	this.time = document.getElementById('time');
	this.answer = document.getElementById('answer');
	this.currentAnswer = [];
	this.answers = answers;
	this.availLetter = [];
	this.words = words;
	this.timer = 120;
	this.time.innerHTML = this.timer;
	
	startTimer(this.timer,this.time);
	
	
	
	this.keydown = document.addEventListener('keydown', function(event)
			{
				var k = event.keyCode;
				if(k === 13)
				{
					submitAnswer();	
				}
				else if (k === 8)//delete a letter
				{	var len = game.currentAnswer.length;
					var char = game.currentAnswer[len-1];
					// console.log(char);
					this.availLetter.push(char);
					game.avail.innerHTML = this.availLetter.join("");
					game.currentAnswer.pop();
					game.answer.innerHTML = game.currentAnswer.join('');
				}
				else if (letters.indexOf(keys[k]) !== -1)//can only input the Characters available
				{	game.currentAnswer.push(keys[k]);
					game.answer.innerHTML = game.currentAnswer.join('');
					var index = letters.indexOf(keys[k]);
					letters.splice(index,1);
					this.availLetter = letters;
					// console.log(this.availLetter);
					game.avail.innerHTML = this.availLetter.join("");
					 //var index = game.letters.indexOf(keys[k]);
					 //addToAnswer.call(game, keys[k], index);
		
				}
			});
			

			// clear Button
	this.clear.addEventListener('click', function(event) {
	    game.currentAnswer = [];
	    game.answer.innerHTML = game.currentAnswer.join('');
	    letters = Word.split("");
	    game.avail.innerHTML = letters.join("");
	});
			// twist Button
	this.twist.addEventListener('click', function(event) {
		
	    var res = letters;
	    
	    shuffle(res);
	    
	    document.getElementById("avletters").innerHTML = res.join("");
	});
			//enter Button
	this.enter.addEventListener('click', function(event) {
	    submitAnswer();
	});
	
	
	function submitAnswer(){
	
		if (this.currentAnswer.length !== 0){
			
			this.answer.innerHTML = "";
			var index = this.words.indexOf(this.currentAnswer.join(""));
			if(index !== -1){
				
				this.answers.push(this.words[index]);
				this.wordscontainer.innerHTML = this.answers.join(' ');
				this.words.splice(index, 1);
				if(this.words.length === 0){
					clearInterval(_time);
					this.answers = [];
					this.wordscontainer.innerHTML = '';
					alert('You won!');	
				}
						
			}
			
			this.currentAnswer = [];
			this.ansleft.innerHTML = this.words.length;
			letters = Word.split("");
		    this.avail.innerHTML = letters.join("");
			
		}
	}
}


//shuffle array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function startTimer(time, el)
	{
		_time = setInterval(function()
		{
			if(time !== 0)
			{
				time--;
				el.innerHTML = time;
			}
			else
			{
					clearInterval(_time);
					this.answers = [];
					this.letters = [];
					this.currentAnswer = [];
					this.ansleft.innerHTML = '';
					this.avail.innerHTML = '';
					this.answer.innerHTML = '';
					this.wordscontainer.innerHTML = '';
					alert('You lost!');	
			}
		}, 1000);
	}

var keys = {
			65:'A',
			66:'B',
			67:'C',
			68:'D',
			69:'E',
			70:'F',
			71:'G',
			72:'H',
			73:'I',
			74:'J',
			75:'K',
			76:'L',
			77:'M',
			78:'N',
			79:'O',
			80:'P',
			81:'Q',
			82:'R',
			83:'S',
			84:'T',
			85:'U',
			86:'V',
			87:'W',
			88:'X',
			89:'Y',
			90:'Z'
		};
		
