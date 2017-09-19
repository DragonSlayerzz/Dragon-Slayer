console.log("I work!")
"use strict";

// Twitter share button
window.twttr = function (d, s, id) {
	var js,
	    fjs = d.getElementsByTagName(s)[0],
	    t = window.twttr || {};
	if (d.getElementById(id)) return t;
	js = d.createElement(s);
	js.id = id;
	js.src = "https://platform.twitter.com/widgets.js";
	fjs.parentNode.insertBefore(js, fjs);

	t._e = [];
	t.ready = function (f) {
		t._e.push(f);
	};

	return t;
}(document, "script", "twitter-wjs");

//global container
var game = {};
game.traitor = false;
// Dragon properties:
game.dragon = {};
game.dragon.hp = 5;
game.dragon.tamePoints = 5;
game.dragon.alive = true;
game.dragon.isAlive = function () {
	if (this.hp <= 0) {
		this.alive = false;
	}
};

// Hero properties:
game.hero = {};
game.hero.name = "";
game.hero.class = "";
game.hero.damageTaken = 0;
game.hero.hp = 3;
game.hero.alive = true;
game.hero.traitor = false;
game.hero.outcome = [];

game.hero.damageToHero = function () {
	this.hp -= this.damageTaken;
};

game.hero.isAlive = function () {
	if (this.hp <= 0) {
		// change hero's alive property to false
		this.alive = false;
	}
};

game.hero.attack = function () {
	game.dragon.hp -= this.damageDealt;
};

//think about classes (array in object/other way)
//clone hero object into each of the 3
game.classProperties = {
	mage: {},
	warrior: {},
	bard: {}
};

//ADD IN OUTCOMES FOR BETRAYED + DEAD/ALIVE
game.outcomes = {};

// outcome order: attack(success/fail), damageTaken, traitor, alive/dead,
game.outcomes.mage = {};
game.outcomes.mage.alive = ["survived the fight. ", "is alive, but the staff was lost.", "somehow managed to live despite being out of mana."];
game.outcomes.mage.dead = ["didn't survive the encounter.", "didn't live to tell the tale.", "is no longer amongst the living."];
game.outcomes.mage.attackPrep = ["began waving a staff wildly in the air and ", "pointed at the dragon and", "started chanting and"];
game.outcomes.mage.attack = {};
game.outcomes.mage.attack.success = [["cast a bolt of lightning that hit the dragon, barely leaving a mark.", "threw a fireball, which didn't do much against the dragon.", "levitated some rocks and launched them at the dragon, damaging its hide."], ["completely froze the dragon's wings, which shattered into pieces.", "opened a pitfall underneath the dragon. The fall broke the dragon's legs.", "hurled a large icicle at the dragon, which left a gaping hole in one of its wings."]];
game.outcomes.mage.attack.fail = ["cast a fireball, but missed.", "conjured an icicle to hurl at the dragon, but the dragon deftly dodged it.", "tried to cast a spell, but the dragon caught on and interrupted it by throwing a boulder."];
//betrayal outcomes assume traitor is alive, which is checked with an if statement before displaying
game.outcomes.mage.betrayPrep = ["was hit with a strong feeling of greed so", "was just faking being a hero and actually had something else planned.", "decided that just the feeling of adventure wasn't enough."];
game.outcomes.mage.betrayal = ["stole the party's gold. The traitor!", "poisoned the surviving heroes in their sleep, not wanting to share the fame and fortune.", "wiped the rest of the party out by burying them alive in a hole conjured by earth magic. Now the fame, fortune, and glory can be claimed by only one person."];
game.outcomes.mage.damage = [["dodged the dragon's tail swipe by floating over it.", "put up a strong defensive barrier, taking no damage.", "made a large wall out of the earth and stopped the dragon's attack from landing."], ["got swatted by the dragon, taking a small amount of damage.", "didn't completely dodge the dragon's fire breath and got burned in the arm.", "got hit by a few rocks that were kicked up by the dragon's tail."], ["got smacked hard by the dragon's tail, cracking a few ribs.", "got slashed by the dragon's claws and lost an arm.", "took a head on charge by the dragon and broke a few bones."], ["conjured a large boulder to hurl at the dragon, but the dragon interrupted with the tail swipe. The boulder came crashing down.", "couldn't run away in time when the dragon attacked with a hard tail swipe, but ruptured internal organs.", "tripped when the dragon stomped the ground, which it took advantage of by breathing fire and turning the poor mage into ash."]];

game.outcomes.warrior = {};
game.outcomes.warrior.alive = ["survived the battle and managed to gain extra gold.", "survived the battle and managed to take a brand new sword from the dragon's treasure stash.", "lived through the encounter and will be able to tell stories of the fight to future generations."];
game.outcomes.warrior.dead = ["fought valiantly and died honourably, trying to protect the party.", "tried to run from the dragon's attack, but didn't make it and was killed.", "was completely outmatched by the dragon and couldn't live to tell the tale."];
game.outcomes.warrior.attackPrep = ["bravely charged at the dragon and", "took position on the front lines and", "squatted down slightly in a fighting stance and"];
game.outcomes.warrior.attack = {};
game.outcomes.warrior.attack.success = [["slashed at the dragon, wounding it slightly.", "stunned the dragon with a shield attack to its head.", "managed to take a few scales off the dragon and got a couple clean cuts in."], ["stunned the dragon with a shield attack to its head and then stabbed one of its eyes out.", "deftly slashed at the dragon, slicing of its front claws.", "found a weak spot in the dragon's armor and managed to hit flesh."]];
game.outcomes.warrior.attack.fail = ["slashed at the dragon's tail but missed repeatedly.", "tried to slash at one of the dragon's legs but stumbled and missed.", "connected a stab at the dragon, but its scales proved too hard to penetrate."];
game.outcomes.warrior.betrayPrep = ["had been plotting to betray the party from the get go so", "got to taste victory, but wanted more so", "fell victim to the dragon's dark magic and"];
game.outcomes.warrior.betrayal = ["turned around and made sure there were no survivors to share the glory with.", "knocked out the surviving members of the party and stole their equipment.", "tied up and locked the other members in a room after robbing them."];
game.outcomes.warrior.damage = [["deftly dodged every attack the dragon made.", "managed to block every one of the dragon's attacks and emerge without a scratch.", "never stayed still enough for the dragon to land an attack."], ["got hit by a lightning bolt cast by the mage that reflected off the dragon's magic scales.", "tried to dodge the fire breath of the dragon, but still got singed.", "slashed at the dragon but the sword broke on its scales and the ricochet flew just wide, but close enough to leave a mark."], ["got smacked hard by the dragon's tail, cracking a few ribs.", "got slashed by the dragon's claws and lost an arm.", "tried to dodge when the dragon hurled a boulder, but the impact sent debris flying and the sharper pieces were drawing blood."], ["couldn't dodge the dragon's flames and was turned to ash.", "got crushed underneath the dragon's foot.", "took a tail swipe from the dragon with its full weight behind the attack, which broke a lot of bones and ruptured a few organs."]];

game.outcomes.bard = {};
game.outcomes.bard.alive = ["survived the battle but the lyre was damaged.", "will live to sing the ballad of the heroes' fight.", "lived and will have a few scars to show for it."];
game.outcomes.bard.dead = ["died clutching the lyre while taking lethal damage from the dragon.", "caught the dragon's attention while playing a song and the it turned the poor bard into a pile of ash.", "saw the dragon's attack coming, but couldn't get away in time and died because of it."];
game.outcomes.bard.attackPrep = ["stayed back and provided support with the lyre by playing songs that affected the dragon's mind", "started playing a song on the lyre", "got into position, ready to play the lyre"], game.outcomes.bard.attack = {};
game.outcomes.bard.attack.success = [["and the noise stunned the dragon briefly.", "and played a discordant noise that damaged the dragon's ears.", ",but decided to throw the lyre at the dragon and managed to hit its eye."], ["and played a mysterious melody that threw the dragon into a state of confusion and hurt itself greatly.", "and played a sad melody that slowed the dragon down, allowing the other party members to freely attack it.", "played a lullaby and put the dragon to sleep briefly, but just long enough for the party to do some significant damage."]];
game.outcomes.bard.attack.fail = ["and tried to play a melody but the strings broke.", ", but was frozen with fear and couldn't move.", "started to play the lyre but the dragon quickly swiped its tail at the lyre and broke it."];
game.outcomes.bard.betrayPrep = ["may have survived the battle but also had an ulterior motive so", "was very greedy and wanted more than just to be known to have faced off against a dragon.", "was always a very greedy person, so"];
game.outcomes.bard.betrayal = ["put everybody to sleep with a lullaby and stole all their money.", "waited until night time and made sure nobody else survived.", "paralyzed the others with a strange tune and ran off to claim all the glory."];
game.outcomes.bard.damage = [["kept good distance from the dragon and never gave it the opportunity to land an attack.", "was able to dodge every one of the dragon's attacks.", "was playing a strange tune that made the dragon feel dizzy so any attacks that it made had missed."], ["got hurt when the dragon hurled a rock at the party.", "was hit by the dragon's tail and got hurt.", "got knocked back into a tree when the dragon flapped its wings."], ["was thrown far by a gust of wind from the dragon's wings and broke a few bones on the landing.", "couldn't react to the dragon snapping its jaw and lost a leg.", "didn't get away in time when the dragon swiped its tail around and took the full brunt of the hit."], ["was completely engulfed the the dragon's flames, which left nothing behind.", "took a deadly swipe from the dragon's claws and was mortally wounded.", "couldn't dodge when the dragon charged and was impaled on the its horn."]];
game.outcomes.dragon = {};
game.outcomes.dragon.alive = ["The Dragon Wins. You Lose. You're all dead"];
game.outcomes.dragon.dead = ["You have defeated the dragon. Woot!"];
game.outcomes.dragon.attackPrep = ["The dragon, not happy with what transpired, retaliated.", "The dragon, now clearly annoyed, fought back."];

//roll random properties
game.propToOutcome = function (job) {
	var theJob = game.classProperties[job];
	var theOutcomes = game.outcomes[job];

	//random attack outcome
	theJob.outcome.push(game.randOutcome(theOutcomes.attackPrep));

	if (theJob.damageDealt === 0) {
		theJob.outcome.push(game.randOutcome(theOutcomes.attack.fail));
	} else {
		theJob.outcome.push(game.randOutcome(theOutcomes.attack.success[theJob.damageDealt - 1]));
	}

	//random damage taken outcome
	theJob.outcome.push(game.randOutcome(game.outcomes.dragon.attackPrep));
	theJob.outcome.push(game.randOutcome(theOutcomes.damage[theJob.damageTaken]));

	//dragon outcome
	if (game.dragon.alive) {
		game.dragon.outcome = game.outcomes.dragon.alive;
	} else {
		game.dragon.outcome = game.outcomes.dragon.dead;
	}

	//alive/dead random outcome
	if (theJob.alive) {
		theJob.outcome.push(game.randOutcome(theOutcomes.alive));
	} else {
		theJob.outcome.push(game.randOutcome(theOutcomes.dead));
	}
};

//function to output a random result when given an array
game.randOutcome = function (array) {
	var randNum = Math.floor(Math.random() * array.length);
	return array[randNum];
};

//reset function
game.reset = function (job) {
	game.traitor = false;
	$(".story_text").empty();
	$('.image_container').remove();
	$('.reset').remove();
	for (var heroClass in job) {
		job[heroClass].name = "";
		job[heroClass].class = "";
		job[heroClass].damageTaken = 0;
		job[heroClass].hp = 3;
		job[heroClass].alive = true;
		job[heroClass].traitor = false;
		job[heroClass] = $.extend({}, game.hero);
		job[heroClass].outcome = [];
	}
};

//roll and set the outcomes randomly
game.setOutcomes = function (job) {
	for (var heroClass in job) {
		job[heroClass].damageTaken = Math.floor(Math.random() * 4);
		job[heroClass].damageToHero();
		// classProperties[heroClass]["hp"] -= damageTaken;
		job[heroClass].isAlive();
		job[heroClass].damageDealt = Math.floor(Math.random() * 3);
		// reminder: will need to set probabilities for ^
		job[heroClass].attack();
		// ^ updates dragon HP based on combined damageDealt property value of each hero
		game.dragon.isAlive();
		// check for traitor
		var randomTraitor = false;
		if (game.traitor === false) {
			randomTraitor = Boolean(Math.round(Math.random()));
			if (randomTraitor) {
				job[heroClass].traitor = true;
				game.traitor = true;
			}
		}
		game.propToOutcome(heroClass);
	};
};

//save usernames into class objects
game.getNames = function (job) {
	for (var heroClass in job) {
		job[heroClass].class = heroClass;
		var htmlId = "#" + heroClass;
		job[heroClass].name = $(htmlId).val();
	}
};

//write the story to the DOM
game.writeStory = function (job) {
	game.reset(game.classProperties);
	game.getNames(game.classProperties);
	game.setOutcomes(game.classProperties);

	$(".story_container").append("<div class=\"image_container\"><img src=\"images/story_bg.png\" alt=\"scroll background\"></div>");

	$(".story_text").append("<h1>The Epic of " + job.warrior.name + ", " + job.mage.name + ", and " + job.bard.name + "</h1>");

	//checking for party vs dragon alive status
	var partyAlive = false;
	for (var heroClass in job) {
		if (job[heroClass].alive === true) {
			partyAlive = true;
		}
	};

	//opening text depending on the outcome of the fight
	if (game.dragon.alive) {
		if (partyAlive) {
			$(".story_text").append("<h2>Our heroes fought the dragon valiantly, but with injuries on both sides everybody retreated and called it a DRAW.<h2>");
		} else {
			$(".story_text").append("<h2>The dragon was too strong for our heroes. Nobody survived.<h2>");
		}
	} else {
		if (partyAlive) {
			$(".story_text").append("<h2>After a long, grueling battle the heroes finally felled the dragon.<h2>");
		} else {
			$(".story_text").append("<h2>The heroes put up a great fight and defeated the dragon, but at a great cost. There were no survivors.<h2>");
		}
	}

	//making a story string prior to appending
	for (var heroClass in job) {
		storyString = "";
		for (var i = 0; i < job[heroClass].outcome.length; i++) {
			storyString += " " + job[heroClass].name + " " + job[heroClass].outcome[i];
		}

		//replace names with blanks to make the paragraph flow and to get rid of sentence fragments
		storyString = game.replaceInstance(storyString, job[heroClass].name, 3, "");
		storyString = game.replaceInstance(storyString, job[heroClass].name, 2, "");

		$(".story_text").append("<h2>" + job[heroClass].name + " the <span class=\"" + job[heroClass].class + "\">" + job[heroClass].class + "</span>...");
		$(".story_text").append("<p>" + storyString + "</p>");
	}

	//betrayal scenario
	game.checkForTraitor(game.classProperties);

	//reset button
	$(".story_container").append("<a href=\"#top\" class=\"reset\"><button>Reset</button></a>");
};

//replaces the nth instance of "lookFor" in string" with "replaceWith"
game.replaceInstance = function (string, lookFor, index, replaceWith) {
	var stringArray = string.split(" ");
	var match = 0;

	for (var i = 0; i <= stringArray.length; i++) {
		if (stringArray[i] === lookFor) {
			match++;

			if (match === index) {
				stringArray[i] = replaceWith;
			}
		}
	}
	return stringArray.join(" ");
};

//checks for existences of traitors
game.checkForTraitor = function (job) {
	var heroesAlive = [];

	for (var heroClass in job) {
		if (job[heroClass].alive) {
			heroesAlive.push(job[heroClass].name + " the " + job[heroClass].class);
		}
	}

	for (var heroClass in job) {
		if (job[heroClass].traitor && heroesAlive.length > 1) {
			if (job[heroClass].alive) {
				$(".story_text").append("<h2>After the battle...<h2>");
				$(".story_text").append("<p>" + job[heroClass].name + " " + game.randOutcome(game.outcomes[heroClass].betrayPrep) + " " + job[heroClass].name + " " + game.randOutcome(game.outcomes[heroClass].betrayal) + "</p>");
			}
		}
	}
};

game.init = function () {
	game.reset(game.classProperties);
	$("form").on("submit", function (e) {
		e.preventDefault();
		game.writeStory(game.classProperties);
		$(".story_container").css("display", "block");

		//scroll down after submit
		$('html, body').animate({
			scrollTop: $(".story_container").offset().top
		}, 1500);

		$(".reset").on("click", function () {
			$(".story_text").empty();
			$(".story_container").css("display", "none");
			game.init(); //recursion so the game runs indefinitely
		});
	});
};

$(function () {
	game.init();
});

// PSEUDO CODE:

// 1. Form with an input field associated with one of 3 checkboxes (radio buttons - can only choose one option). Input takes exactly 3 names (strings). For each input field you must also select an input field "class: Bard, Mage, Warrior".
// JS: Add attribute of "disabled" to a class option when it's been selected for one of the other input fields. There can only be one warrior, one mage, and one bard per party.
// e.g. if warrior selected by 1st player, cannot be selected by 2nd or 3rd

// Submit button that says "Fight!"
// Once hit submit button:
// 2. Die roll for each hero object property value:
// 3 values:
// Damage taken (number), damage dealt (number), betrayal (boolean)

// number range for the number values: depends on how many outcomes you want? Will never be displayed to the player. So maybe 1-3. if you take 0 damage, you're invincible! 1 damage, you're fine. If you take 2 you're nearly dead, 3 is dead.

// damage dealt: 0, 1, 2 (not equal chance of getting results. 2 is rarest. Dragon has a total of 4HP **CAN TEST OUT)

// betrayal: roll either 0, 1, 2, 3. Number corresponds to traitor (if 0, no traitor) - 1 = 1st player traitor, 2 = 2nd player etc.
// using Math.floor(Math.random() * 1 higher than the number we need)

// 3. For each outcome, call appropriate method to update the connected hero object and the dragon object.
// CHECK and then SAVE appropriate outcome in our hero object's outcome array (currently blank)


// 4. New hero properties are connected with outcome arrays? 


// 5. Populate story array with outcomes in appropriate order.


// Hero objects with different key values. The outcome depends on what the key values are. 
// Key values are determined by random "die roll"

// FINAL FINAL OUTCOME: Series of sentences put together that consist of smaller outcomes that are determined by property values of each hero object.
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJ0d3R0ciIsImQiLCJzIiwiaWQiLCJqcyIsImZqcyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwidCIsImdldEVsZW1lbnRCeUlkIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsInBhcmVudE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJfZSIsInJlYWR5IiwiZiIsInB1c2giLCJkb2N1bWVudCIsImdhbWUiLCJ0cmFpdG9yIiwiZHJhZ29uIiwiaHAiLCJ0YW1lUG9pbnRzIiwiYWxpdmUiLCJpc0FsaXZlIiwiaGVybyIsIm5hbWUiLCJjbGFzcyIsImRhbWFnZVRha2VuIiwib3V0Y29tZSIsImRhbWFnZVRvSGVybyIsImF0dGFjayIsImRhbWFnZURlYWx0IiwiY2xhc3NQcm9wZXJ0aWVzIiwibWFnZSIsIndhcnJpb3IiLCJiYXJkIiwib3V0Y29tZXMiLCJkZWFkIiwiYXR0YWNrUHJlcCIsInN1Y2Nlc3MiLCJmYWlsIiwiYmV0cmF5UHJlcCIsImJldHJheWFsIiwiZGFtYWdlIiwicHJvcFRvT3V0Y29tZSIsImpvYiIsInRoZUpvYiIsInRoZU91dGNvbWVzIiwicmFuZE91dGNvbWUiLCJhcnJheSIsInJhbmROdW0iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJsZW5ndGgiLCJyZXNldCIsIiQiLCJlbXB0eSIsInJlbW92ZSIsImhlcm9DbGFzcyIsImV4dGVuZCIsInNldE91dGNvbWVzIiwicmFuZG9tVHJhaXRvciIsIkJvb2xlYW4iLCJyb3VuZCIsImdldE5hbWVzIiwiaHRtbElkIiwidmFsIiwid3JpdGVTdG9yeSIsImFwcGVuZCIsInBhcnR5QWxpdmUiLCJzdG9yeVN0cmluZyIsImkiLCJyZXBsYWNlSW5zdGFuY2UiLCJjaGVja0ZvclRyYWl0b3IiLCJzdHJpbmciLCJsb29rRm9yIiwiaW5kZXgiLCJyZXBsYWNlV2l0aCIsInN0cmluZ0FycmF5Iiwic3BsaXQiLCJtYXRjaCIsImpvaW4iLCJoZXJvZXNBbGl2ZSIsImluaXQiLCJvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImNzcyIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJvZmZzZXQiLCJ0b3AiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQUEsT0FBT0MsS0FBUCxHQUFnQixVQUFTQyxDQUFULEVBQVlDLENBQVosRUFBZUMsRUFBZixFQUFtQjtBQUNqQyxLQUFJQyxFQUFKO0FBQUEsS0FBUUMsTUFBTUosRUFBRUssb0JBQUYsQ0FBdUJKLENBQXZCLEVBQTBCLENBQTFCLENBQWQ7QUFBQSxLQUNFSyxJQUFJUixPQUFPQyxLQUFQLElBQWdCLEVBRHRCO0FBRUEsS0FBSUMsRUFBRU8sY0FBRixDQUFpQkwsRUFBakIsQ0FBSixFQUEwQixPQUFPSSxDQUFQO0FBQzFCSCxNQUFLSCxFQUFFUSxhQUFGLENBQWdCUCxDQUFoQixDQUFMO0FBQ0FFLElBQUdELEVBQUgsR0FBUUEsRUFBUjtBQUNBQyxJQUFHTSxHQUFILEdBQVMseUNBQVQ7QUFDQUwsS0FBSU0sVUFBSixDQUFlQyxZQUFmLENBQTRCUixFQUE1QixFQUFnQ0MsR0FBaEM7O0FBRUFFLEdBQUVNLEVBQUYsR0FBTyxFQUFQO0FBQ0FOLEdBQUVPLEtBQUYsR0FBVSxVQUFTQyxDQUFULEVBQVk7QUFDcEJSLElBQUVNLEVBQUYsQ0FBS0csSUFBTCxDQUFVRCxDQUFWO0FBQ0QsRUFGRDs7QUFJQSxRQUFPUixDQUFQO0FBQ0QsQ0FmZSxDQWVkVSxRQWZjLEVBZUosUUFmSSxFQWVNLGFBZk4sQ0FBaEI7O0FBaUJBO0FBQ0EsSUFBSUMsT0FBTyxFQUFYO0FBQ0NBLEtBQUtDLE9BQUwsR0FBZSxLQUFmO0FBQ0Q7QUFDQ0QsS0FBS0UsTUFBTCxHQUFjLEVBQWQ7QUFDQ0YsS0FBS0UsTUFBTCxDQUFZQyxFQUFaLEdBQWlCLENBQWpCO0FBQ0FILEtBQUtFLE1BQUwsQ0FBWUUsVUFBWixHQUF3QixDQUF4QjtBQUNBSixLQUFLRSxNQUFMLENBQVlHLEtBQVosR0FBb0IsSUFBcEI7QUFDQUwsS0FBS0UsTUFBTCxDQUFZSSxPQUFaLEdB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QixDQUEwQixTQUExQixFQUFvQyxPQUFwQzs7QUFFQTtBQUNHaEMsSUFBRSxZQUFGLEVBQWdCaUMsT0FBaEIsQ0FBd0I7QUFDcEJDLGNBQVdsQyxFQUFFLGtCQUFGLEVBQXNCbUMsTUFBdEIsR0FBK0JDO0FBRHRCLEdBQXhCLEVBRUcsSUFGSDs7QUFJSHBDLElBQUUsUUFBRixFQUFZNkIsRUFBWixDQUFlLE9BQWYsRUFBd0IsWUFBVztBQUNsQzdCLEtBQUUsYUFBRixFQUFpQkMsS0FBakI7QUFDQUQsS0FBRSxrQkFBRixFQUFzQmdDLEdBQXRCLENBQTBCLFNBQTFCLEVBQW9DLE1BQXBDO0FBQ0F2RSxRQUFLbUUsSUFBTCxHQUhrQyxDQUdyQjtBQUNiLEdBSkQ7QUFLQSxFQWZEO0FBZ0JBLENBbEJEOztBQW9CQTVCLEVBQUUsWUFBVztBQUNadkMsTUFBS21FLElBQUw7QUFDQSxDQUZEOztBQUtBOztBQUVBO0FBQ0E7QUFDQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQztBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUQ7QUFDQTs7O0FBR0E7OztBQUdBOzs7QUFLQTtBQUNDOztBQUVEIiwiZmlsZSI6InNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFR3aXR0ZXIgc2hhcmUgYnV0dG9uXG53aW5kb3cudHd0dHIgPSAoZnVuY3Rpb24oZCwgcywgaWQpIHtcbiAgdmFyIGpzLCBmanMgPSBkLmdldEVsZW1lbnRzQnlUYWdOYW1lKHMpWzBdLFxuICAgIHQgPSB3aW5kb3cudHd0dHIgfHwge307XG4gIGlmIChkLmdldEVsZW1lbnRCeUlkKGlkKSkgcmV0dXJuIHQ7XG4gIGpzID0gZC5jcmVhdGVFbGVtZW50KHMpO1xuICBqcy5pZCA9IGlkO1xuICBqcy5zcmMgPSBcImh0dHBzOi8vcGxhdGZvcm0udHdpdHRlci5jb20vd2lkZ2V0cy5qc1wiO1xuICBmanMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoanMsIGZqcyk7XG5cbiAgdC5fZSA9IFtdO1xuICB0LnJlYWR5ID0gZnVuY3Rpb24oZikge1xuICAgIHQuX2UucHVzaChmKTtcbiAgfTtcblxuICByZXR1cm4gdDtcbn0oZG9jdW1lbnQsIFwic2NyaXB0XCIsIFwidHdpdHRlci13anNcIikpOyBcblxuLy9nbG9iYWwgY29udGFpbmVyXG52YXIgZ2FtZSA9IHt9O1xuXHRnYW1lLnRyYWl0b3IgPSBmYWxzZTtcbi8vIERyYWdvbiBwcm9wZXJ0aWVzOlxuXHRnYW1lLmRyYWdvbiA9IHt9O1xuXHRcdGdhbWUuZHJhZ29uLmhwID0gNTtcblx0XHRnYW1lLmRyYWdvbi50YW1lUG9pbnRzPSA1O1xuXHRcdGdhbWUuZHJhZ29uLmFsaXZlID0gdHJ1ZTtcblx0XHRnYW1lLmRyYWdvbi5pc0FsaXZlID0gZnVuY3Rpb24oKXtcblx0XHRcdFx0aWYgKHRoaXMuaHAgPD0gMCkge1xuXHRcdFx0XHRcdHRoaXMuYWxpdmUgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXG4vLyBIZXJvIHByb3BlcnRpZXM6XG5cdGdhbWUuaGVybyA9IHt9O1xuXHRcdGdhbWUuaGVyby5uYW1lID0gXCJcIjtcblx0XHRnYW1lLmhlcm8uY2xhc3MgPSBcIlwiO1xuXHRcdGdhbWUuaGVyby5kYW1hZ2VUYWtlbiA9IDA7XG5cdFx0Z2FtZS5oZXJvLmhwID0gMztcblx0XHRnYW1lLmhlcm8uYWxpdmUgPSB0cnVlO1xuXHRcdGdhbWUuaGVyby50cmFpdG9yID0gZmFsc2U7XG5cdFx0Z2FtZS5oZXJvLm91dGNvbWUgPSBbXTtcblxuXHRcdGdhbWUuaGVyby5kYW1hZ2VUb0hlcm8gPSBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuaHAgLT0gdGhpcy5kYW1hZ2VUYWtlbjtcblx0XHR9O1xuXG5cdFx0Z2FtZS5oZXJvLmlzQWxpdmUgPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmICh0aGlzLmhwIDw9IDApIHtcblx0XHRcdFx0Ly8gY2hhbmdlIGhlcm8ncyBhbGl2ZSBwcm9wZXJ0eSB0byBmYWxzZVxuXHRcdFx0XHR0aGlzLmFsaXZlID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGdhbWUuaGVyby5hdHRhY2sgPSBmdW5jdGlvbigpIHtcblx0XHRcdGdhbWUuZHJhZ29uLmhwIC09IHRoaXMuZGFtYWdlRGVhbHQ7XG5cdFx0fVxuXG5cbi8vdGhpbmsgYWJvdXQgY2xhc3NlcyAoYXJyYXkgaW4gb2JqZWN0L290aGVyIHdheSlcbi8vY2xvbmUgaGVybyBvYmplY3QgaW50byBlYWNoIG9mIHRoZSAzXG5cdGdhbWUuY2xhc3NQcm9wZXJ0aWVzID0ge1xuXHRcdG1hZ2U6IHt9LFxuXHRcdHdhcnJpb3I6IHt9LFxuXHRcdGJhcmQ6IHt9XG5cdH07XG5cblx0Ly9BREQgSU4gT1VUQ09NRVMgRk9SIEJFVFJBWUVEICsgREVBRC9BTElWRVxuXHRnYW1lLm91dGNvbWVzID0ge307XG5cblx0Ly8gb3V0Y29tZSBvcmRlcjogYXR0YWNrKHN1Y2Nlc3MvZmFpbCksIGRhbWFnZVRha2VuLCB0cmFpdG9yLCBhbGl2ZS9kZWFkLFxuXHRnYW1lLm91dGNvbWVzLm1hZ2UgPSB7fTtcblx0XHRnYW1lLm91dGNvbWVzLm1hZ2UuYWxpdmUgPSBbXCJzdXJ2aXZlZCB0aGUgZmlnaHQuIFwiLCBcImlzIGFsaXZlLCBidXQgdGhlIHN0YWZmIHdhcyBsb3N0LlwiLCBcInNvbWVob3cgbWFuYWdlZCB0byBsaXZlIGRlc3BpdGUgYmVpbmcgb3V0IG9mIG1hbmEuXCJdO1xuXHRcdGdhbWUub3V0Y29tZXMubWFnZS5kZWFkID0gW1wiZGlkbid0IHN1cnZpdmUgdGhlIGVuY291bnRlci5cIiwgXCJkaWRuJ3QgbGl2ZSB0byB0ZWxsIHRoZSB0YWxlLlwiLCBcImlzIG5vIGxvbmdlciBhbW9uZ3N0IHRoZSBsaXZpbmcuXCJdO1xuXHRcdGdhbWUub3V0Y29tZXMubWFnZS5hdHRhY2tQcmVwID0gW1wiYmVnYW4gd2F2aW5nIGEgc3RhZmYgd2lsZGx5IGluIHRoZSBhaXIgYW5kIFwiLCBcInBvaW50ZWQgYXQgdGhlIGRyYWdvbiBhbmRcIiwgXCJzdGFydGVkIGNoYW50aW5nIGFuZFwiXTtcblx0XHRnYW1lLm91dGNvbWVzLm1hZ2UuYXR0YWNrID0ge307XG5cdFx0XHRnYW1lLm91dGNvbWVzLm1hZ2UuYXR0YWNrLnN1Y2Nlc3MgPSBbXG5cdFx0XHRcdFtcImNhc3QgYSBib2x0IG9mIGxpZ2h0bmluZyB0aGF0IGhpdCB0aGUgZHJhZ29uLCBiYXJlbHkgbGVhdmluZyBhIG1hcmsuXCIsIFwidGhyZXcgYSBmaXJlYmFsbCwgd2hpY2ggZGlkbid0IGRvIG11Y2ggYWdhaW5zdCB0aGUgZHJhZ29uLlwiLCBcImxldml0YXRlZCBzb21lIHJvY2tzIGFuZCBsYXVuY2hlZCB0aGVtIGF0IHRoZSBkcmFnb24sIGRhbWFnaW5nIGl0cyBoaWRlLlwiXSxcblx0XHRcdFx0W1wiY29tcGxldGVseSBmcm96ZSB0aGUgZHJhZ29uJ3Mgd2luZ3MsIHdoaWNoIHNoYXR0ZXJlZCBpbnRvIHBpZWNlcy5cIiwgXCJvcGVuZWQgYSBwaXRmYWxsIHVuZGVybmVhdGggdGhlIGRyYWdvbi4gVGhlIGZhbGwgYnJva2UgdGhlIGRyYWdvbidzIGxlZ3MuXCIsIFwiaHVybGVkIGEgbGFyZ2UgaWNpY2xlIGF0IHRoZSBkcmFnb24sIHdoaWNoIGxlZnQgYSBnYXBpbmcgaG9sZSBpbiBvbmUgb2YgaXRzIHdpbmdzLlwiXVxuXHRcdFx0XTtcblx0XHRcdGdhbWUub3V0Y29tZXMubWFnZS5hdHRhY2suZmFpbCA9IFtcImNhc3QgYSBmaXJlYmFsbCwgYnV0IG1pc3NlZC5cIiwgXCJjb25qdXJlZCBhbiBpY2ljbGUgdG8gaHVybCBhdCB0aGUgZHJhZ29uLCBidXQgdGhlIGRyYWdvbiBkZWZ0bHkgZG9kZ2VkIGl0LlwiLCBcInRyaWVkIHRvIGNhc3QgYSBzcGVsbCwgYnV0IHRoZSBkcmFnb24gY2F1Z2h0IG9uIGFuZCBpbnRlcnJ1cHRlZCBpdCBieSB0aHJvd2luZyBhIGJvdWxkZXIuXCJdO1xuXHRcdC8vYmV0cmF5YWwgb3V0Y29tZXMgYXNzdW1lIHRyYWl0b3IgaXMgYWxpdmUsIHdoaWNoIGlzIGNoZWNrZWQgd2l0aCBhbiBpZiBzdGF0ZW1lbnQgYmVmb3JlIGRpc3BsYXlpbmdcblx0XHRnYW1lLm91dGNvbWVzLm1hZ2UuYmV0cmF5UHJlcCA9IFtcIndhcyBoaXQgd2l0aCBhIHN0cm9uZyBmZWVsaW5nIG9mIGdyZWVkIHNvXCIsIFwid2FzIGp1c3QgZmFraW5nIGJlaW5nIGEgaGVybyBhbmQgYWN0dWFsbHkgaGFkIHNvbWV0aGluZyBlbHNlIHBsYW5uZWQuXCIsIFwiZGVjaWRlZCB0aGF0IGp1c3QgdGhlIGZlZWxpbmcgb2YgYWR2ZW50dXJlIHdhc24ndCBlbm91Z2guXCJdXG5cdFx0Z2FtZS5vdXRjb21lcy5tYWdlLmJldHJheWFsID0gW1wic3RvbGUgdGhlIHBhcnR5J3MgZ29sZC4gVGhlIHRyYWl0b3IhXCIsIFwicG9pc29uZWQgdGhlIHN1cnZpdmluZyBoZXJvZXMgaW4gdGhlaXIgc2xlZXAsIG5vdCB3YW50aW5nIHRvIHNoYXJlIHRoZSBmYW1lIGFuZCBmb3J0dW5lLlwiLCBcIndpcGVkIHRoZSByZXN0IG9mIHRoZSBwYXJ0eSBvdXQgYnkgYnVyeWluZyB0aGVtIGFsaXZlIGluIGEgaG9sZSBjb25qdXJlZCBieSBlYXJ0aCBtYWdpYy4gTm93IHRoZSBmYW1lLCBmb3J0dW5lLCBhbmQgZ2xvcnkgY2FuIGJlIGNsYWltZWQgYnkgb25seSBvbmUgcGVyc29uLlwiXTtcblx0XHRnYW1lLm91dGNvbWVzLm1hZ2UuZGFtYWdlID0gW1xuXHRcdFx0W1wiZG9kZ2VkIHRoZSBkcmFnb24ncyB0YWlsIHN3aXBlIGJ5IGZsb2F0aW5nIG92ZXIgaXQuXCIsIFwicHV0IHVwIGEgc3Ryb25nIGRlZmVuc2l2ZSBiYXJyaWVyLCB0YWtpbmcgbm8gZGFtYWdlLlwiLCBcIm1hZGUgYSBsYXJnZSB3YWxsIG91dCBvZiB0aGUgZWFydGggYW5kIHN0b3BwZWQgdGhlIGRyYWdvbidzIGF0dGFjayBmcm9tIGxhbmRpbmcuXCJdLFxuXHRcdFx0W1wiZ290IHN3YXR0ZWQgYnkgdGhlIGRyYWdvbiwgdGFraW5nIGEgc21hbGwgYW1vdW50IG9mIGRhbWFnZS5cIiwgXCJkaWRuJ3QgY29tcGxldGVseSBkb2RnZSB0aGUgZHJhZ29uJ3MgZmlyZSBicmVhdGggYW5kIGdvdCBidXJuZWQgaW4gdGhlIGFybS5cIiwgXCJnb3QgaGl0IGJ5IGEgZmV3IHJvY2tzIHRoYXQgd2VyZSBraWNrZWQgdXAgYnkgdGhlIGRyYWdvbidzIHRhaWwuXCJdLFxuXHRcdFx0W1wiZ290IHNtYWNrZWQgaGFyZCBieSB0aGUgZHJhZ29uJ3MgdGFpbCwgY3JhY2tpbmcgYSBmZXcgcmlicy5cIiwgXCJnb3Qgc2xhc2hlZCBieSB0aGUgZHJhZ29uJ3MgY2xhd3MgYW5kIGxvc3QgYW4gYXJtLlwiLCBcInRvb2sgYSBoZWFkIG9uIGNoYXJnZSBieSB0aGUgZHJhZ29uIGFuZCBicm9rZSBhIGZldyBib25lcy5cIl0sXG5cdFx0XHRbXCJjb25qdXJlZCBhIGxhcmdlIGJvdWxkZXIgdG8gaHVybCBhdCB0aGUgZHJhZ29uLCBidXQgdGhlIGRyYWdvbiBpbnRlcnJ1cHRlZCB3aXRoIHRoZSB0YWlsIHN3aXBlLiBUaGUgYm91bGRlciBjYW1lIGNyYXNoaW5nIGRvd24uXCIsIFwiY291bGRuJ3QgcnVuIGF3YXkgaW4gdGltZSB3aGVuIHRoZSBkcmFnb24gYXR0YWNrZWQgd2l0aCBhIGhhcmQgdGFpbCBzd2lwZSwgYnV0IHJ1cHR1cmVkIGludGVybmFsIG9yZ2Fucy5cIiwgXCJ0cmlwcGVkIHdoZW4gdGhlIGRyYWdvbiBzdG9tcGVkIHRoZSBncm91bmQsIHdoaWNoIGl0IHRvb2sgYWR2YW50YWdlIG9mIGJ5IGJyZWF0aGluZyBmaXJlIGFuZCB0dXJuaW5nIHRoZSBwb29yIG1hZ2UgaW50byBhc2guXCJdXG5cdFx0XTtcblx0XG5cblx0Z2FtZS5vdXRjb21lcy53YXJyaW9yID0ge307XG5cdFx0Z2FtZS5vdXRjb21lcy53YXJyaW9yLmFsaXZlID0gW1wic3Vydml2ZWQgdGhlIGJhdHRsZSBhbmQgbWFuYWdlZCB0byBnYWluIGV4dHJhIGdvbGQuXCIsIFwic3Vydml2ZWQgdGhlIGJhdHRsZSBhbmQgbWFuYWdlZCB0byB0YWtlIGEgYnJhbmQgbmV3IHN3b3JkIGZyb20gdGhlIGRyYWdvbidzIHRyZWFzdXJlIHN0YXNoLlwiLCBcImxpdmVkIHRocm91Z2ggdGhlIGVuY291bnRlciBhbmQgd2lsbCBiZSBhYmxlIHRvIHRlbGwgc3RvcmllcyBvZiB0aGUgZmlnaHQgdG8gZnV0dXJlIGdlbmVyYXRpb25zLlwiXTtcblx0XHRnYW1lLm91dGNvbWVzLndhcnJpb3IuZGVhZCA9IFtcImZvdWdodCB2YWxpYW50bHkgYW5kIGRpZWQgaG9ub3VyYWJseSwgdHJ5aW5nIHRvIHByb3RlY3QgdGhlIHBhcnR5LlwiLCBcInRyaWVkIHRvIHJ1biBmcm9tIHRoZSBkcmFnb24ncyBhdHRhY2ssIGJ1dCBkaWRuJ3QgbWFrZSBpdCBhbmQgd2FzIGtpbGxlZC5cIiwgXCJ3YXMgY29tcGxldGVseSBvdXRtYXRjaGVkIGJ5IHRoZSBkcmFnb24gYW5kIGNvdWxkbid0IGxpdmUgdG8gdGVsbCB0aGUgdGFsZS5cIl07XG5cdFx0Z2FtZS5vdXRjb21lcy53YXJyaW9yLmF0dGFja1ByZXAgPSBbXCJicmF2ZWx5IGNoYXJnZWQgYXQgdGhlIGRyYWdvbiBhbmRcIiwgXCJ0b29rIHBvc2l0aW9uIG9uIHRoZSBmcm9udCBsaW5lcyBhbmRcIiwgXCJzcXVhdHRlZCBkb3duIHNsaWdodGx5IGluIGEgZmlnaHRpbmcgc3RhbmNlIGFuZFwiXTtcblx0XHRnYW1lLm91dGNvbWVzLndhcnJpb3IuYXR0YWNrID0ge307XG5cdFx0XHRnYW1lLm91dGNvbWVzLndhcnJpb3IuYXR0YWNrLnN1Y2Nlc3MgPSBbXG5cdFx0XHRcdFtcInNsYXNoZWQgYXQgdGhlIGRyYWdvbiwgd291bmRpbmcgaXQgc2xpZ2h0bHkuXCIsIFwic3R1bm5lZCB0aGUgZHJhZ29uIHdpdGggYSBzaGllbGQgYXR0YWNrIHRvIGl0cyBoZWFkLlwiLCBcIm1hbmFnZWQgdG8gdGFrZSBhIGZldyBzY2FsZXMgb2ZmIHRoZSBkcmFnb24gYW5kIGdvdCBhIGNvdXBsZSBjbGVhbiBjdXRzIGluLlwiXSxcblx0XHRcdFx0W1wic3R1bm5lZCB0aGUgZHJhZ29uIHdpdGggYSBzaGllbGQgYXR0YWNrIHRvIGl0cyBoZWFkIGFuZCB0aGVuIHN0YWJiZWQgb25lIG9mIGl0cyBleWVzIG91dC5cIiwgXCJkZWZ0bHkgc2xhc2hlZCBhdCB0aGUgZHJhZ29uLCBzbGljaW5nIG9mIGl0cyBmcm9udCBjbGF3cy5cIiwgXCJmb3VuZCBhIHdlYWsgc3BvdCBpbiB0aGUgZHJhZ29uJ3MgYXJtb3IgYW5kIG1hbmFnZWQgdG8gaGl0IGZsZXNoLlwiXVxuXHRcdFx0XTtcblx0XHRcdGdhbWUub3V0Y29tZXMud2Fycmlvci5hdHRhY2suZmFpbCA9IFtcInNsYXNoZWQgYXQgdGhlIGRyYWdvbidzIHRhaWwgYnV0IG1pc3NlZCByZXBlYXRlZGx5LlwiLCBcInRyaWVkIHRvIHNsYXNoIGF0IG9uZSBvZiB0aGUgZHJhZ29uJ3MgbGVncyBidXQgc3R1bWJsZWQgYW5kIG1pc3NlZC5cIiwgXCJjb25uZWN0ZWQgYSBzdGFiIGF0IHRoZSBkcmFnb24sIGJ1dCBpdHMgc2NhbGVzIHByb3ZlZCB0b28gaGFyZCB0byBwZW5ldHJhdGUuXCJdO1xuXHRcdGdhbWUub3V0Y29tZXMud2Fycmlvci5iZXRyYXlQcmVwID0gW1wiaGFkIGJlZW4gcGxvdHRpbmcgdG8gYmV0cmF5IHRoZSBwYXJ0eSBmcm9tIHRoZSBnZXQgZ28gc29cIiwgXCJnb3QgdG8gdGFzdGUgdmljdG9yeSwgYnV0IHdhbnRlZCBtb3JlIHNvXCIsIFwiZmVsbCB2aWN0aW0gdG8gdGhlIGRyYWdvbidzIGRhcmsgbWFnaWMgYW5kXCJdO1xuXHRcdGdhbWUub3V0Y29tZXMud2Fycmlvci5iZXRyYXlhbCA9IFtcInR1cm5lZCBhcm91bmQgYW5kIG1hZGUgc3VyZSB0aGVyZSB3ZXJlIG5vIHN1cnZpdm9ycyB0byBzaGFyZSB0aGUgZ2xvcnkgd2l0aC5cIiwgXCJrbm9ja2VkIG91dCB0aGUgc3Vydml2aW5nIG1lbWJlcnMgb2YgdGhlIHBhcnR5IGFuZCBzdG9sZSB0aGVpciBlcXVpcG1lbnQuXCIsIFwidGllZCB1cCBhbmQgbG9ja2VkIHRoZSBvdGhlciBtZW1iZXJzIGluIGEgcm9vbSBhZnRlciByb2JiaW5nIHRoZW0uXCJdO1xuXHRcdGdhbWUub3V0Y29tZXMud2Fycmlvci5kYW1hZ2UgPSBbXG5cdFx0XHRbXCJkZWZ0bHkgZG9kZ2VkIGV2ZXJ5IGF0dGFjayB0aGUgZHJhZ29uIG1hZGUuXCIsIFwibWFuYWdlZCB0byBibG9jayBldmVyeSBvbmUgb2YgdGhlIGRyYWdvbidzIGF0dGFja3MgYW5kIGVtZXJnZSB3aXRob3V0IGEgc2NyYXRjaC5cIiwgXCJuZXZlciBzdGF5ZWQgc3RpbGwgZW5vdWdoIGZvciB0aGUgZHJhZ29uIHRvIGxhbmQgYW4gYXR0YWNrLlwiXSxcblx0XHRcdFtcImdvdCBoaXQgYnkgYSBsaWdodG5pbmcgYm9sdCBjYXN0IGJ5IHRoZSBtYWdlIHRoYXQgcmVmbGVjdGVkIG9mZiB0aGUgZHJhZ29uJ3MgbWFnaWMgc2NhbGVzLlwiLCBcInRyaWVkIHRvIGRvZGdlIHRoZSBmaXJlIGJyZWF0aCBvZiB0aGUgZHJhZ29uLCBidXQgc3RpbGwgZ290IHNpbmdlZC5cIiwgXCJzbGFzaGVkIGF0IHRoZSBkcmFnb24gYnV0IHRoZSBzd29yZCBicm9rZSBvbiBpdHMgc2NhbGVzIGFuZCB0aGUgcmljb2NoZXQgZmxldyBqdXN0IHdpZGUsIGJ1dCBjbG9zZSBlbm91Z2ggdG8gbGVhdmUgYSBtYXJrLlwiXSxcblx0XHRcdFtcImdvdCBzbWFja2VkIGhhcmQgYnkgdGhlIGRyYWdvbidzIHRhaWwsIGNyYWNraW5nIGEgZmV3IHJpYnMuXCIsIFwiZ290IHNsYXNoZWQgYnkgdGhlIGRyYWdvbidzIGNsYXdzIGFuZCBsb3N0IGFuIGFybS5cIiwgXCJ0cmllZCB0byBkb2RnZSB3aGVuIHRoZSBkcmFnb24gaHVybGVkIGEgYm91bGRlciwgYnV0IHRoZSBpbXBhY3Qgc2VudCBkZWJyaXMgZmx5aW5nIGFuZCB0aGUgc2hhcnBlciBwaWVjZXMgd2VyZSBkcmF3aW5nIGJsb29kLlwiXSxcblx0XHRcdFtcImNvdWxkbid0IGRvZGdlIHRoZSBkcmFnb24ncyBmbGFtZXMgYW5kIHdhcyB0dXJuZWQgdG8gYXNoLlwiLCBcImdvdCBjcnVzaGVkIHVuZGVybmVhdGggdGhlIGRyYWdvbidzIGZvb3QuXCIsIFwidG9vayBhIHRhaWwgc3dpcGUgZnJvbSB0aGUgZHJhZ29uIHdpdGggaXRzIGZ1bGwgd2VpZ2h0IGJlaGluZCB0aGUgYXR0YWNrLCB3aGljaCBicm9rZSBhIGxvdCBvZiBib25lcyBhbmQgcnVwdHVyZWQgYSBmZXcgb3JnYW5zLlwiXVxuXHRcdF07XG5cblx0Z2FtZS5vdXRjb21lcy5iYXJkID0ge307XG5cdFx0Z2FtZS5vdXRjb21lcy5iYXJkLmFsaXZlID0gW1wic3Vydml2ZWQgdGhlIGJhdHRsZSBidXQgdGhlIGx5cmUgd2FzIGRhbWFnZWQuXCIsIFwid2lsbCBsaXZlIHRvIHNpbmcgdGhlIGJhbGxhZCBvZiB0aGUgaGVyb2VzJyBmaWdodC5cIiwgXCJsaXZlZCBhbmQgd2lsbCBoYXZlIGEgZmV3IHNjYXJzIHRvIHNob3cgZm9yIGl0LlwiXTtcblx0XHRnYW1lLm91dGNvbWVzLmJhcmQuZGVhZCA9IFtcImRpZWQgY2x1dGNoaW5nIHRoZSBseXJlIHdoaWxlIHRha2luZyBsZXRoYWwgZGFtYWdlIGZyb20gdGhlIGRyYWdvbi5cIiwgXCJjYXVnaHQgdGhlIGRyYWdvbidzIGF0dGVudGlvbiB3aGlsZSBwbGF5aW5nIGEgc29uZyBhbmQgdGhlIGl0IHR1cm5lZCB0aGUgcG9vciBiYXJkIGludG8gYSBwaWxlIG9mIGFzaC5cIiwgXCJzYXcgdGhlIGRyYWdvbidzIGF0dGFjayBjb21pbmcsIGJ1dCBjb3VsZG4ndCBnZXQgYXdheSBpbiB0aW1lIGFuZCBkaWVkIGJlY2F1c2Ugb2YgaXQuXCJdO1xuXHRcdGdhbWUub3V0Y29tZXMuYmFyZC5hdHRhY2tQcmVwID0gW1wic3RheWVkIGJhY2sgYW5kIHByb3ZpZGVkIHN1cHBvcnQgd2l0aCB0aGUgbHlyZSBieSBwbGF5aW5nIHNvbmdzIHRoYXQgYWZmZWN0ZWQgdGhlIGRyYWdvbidzIG1pbmRcIiwgXCJzdGFydGVkIHBsYXlpbmcgYSBzb25nIG9uIHRoZSBseXJlXCIsIFwiZ290IGludG8gcG9zaXRpb24sIHJlYWR5IHRvIHBsYXkgdGhlIGx5cmVcIl0sXG5cdFx0Z2FtZS5vdXRjb21lcy5iYXJkLmF0dGFjayA9IHt9O1xuXHRcdFx0Z2FtZS5vdXRjb21lcy5iYXJkLmF0dGFjay5zdWNjZXNzID0gW1xuXHRcdFx0XHRbXCJhbmQgdGhlIG5vaXNlIHN0dW5uZWQgdGhlIGRyYWdvbiBicmllZmx5LlwiLCBcImFuZCBwbGF5ZWQgYSBkaXNjb3JkYW50IG5vaXNlIHRoYXQgZGFtYWdlZCB0aGUgZHJhZ29uJ3MgZWFycy5cIiwgXCIsYnV0IGRlY2lkZWQgdG8gdGhyb3cgdGhlIGx5cmUgYXQgdGhlIGRyYWdvbiBhbmQgbWFuYWdlZCB0byBoaXQgaXRzIGV5ZS5cIl0sXG5cdFx0XHRcdFtcImFuZCBwbGF5ZWQgYSBteXN0ZXJpb3VzIG1lbG9keSB0aGF0IHRocmV3IHRoZSBkcmFnb24gaW50byBhIHN0YXRlIG9mIGNvbmZ1c2lvbiBhbmQgaHVydCBpdHNlbGYgZ3JlYXRseS5cIiwgXCJhbmQgcGxheWVkIGEgc2FkIG1lbG9keSB0aGF0IHNsb3dlZCB0aGUgZHJhZ29uIGRvd24sIGFsbG93aW5nIHRoZSBvdGhlciBwYXJ0eSBtZW1iZXJzIHRvIGZyZWVseSBhdHRhY2sgaXQuXCIsIFwicGxheWVkIGEgbHVsbGFieSBhbmQgcHV0IHRoZSBkcmFnb24gdG8gc2xlZXAgYnJpZWZseSwgYnV0IGp1c3QgbG9uZyBlbm91Z2ggZm9yIHRoZSBwYXJ0eSB0byBkbyBzb21lIHNpZ25pZmljYW50IGRhbWFnZS5cIl1cblx0XHRcdF07XG5cdFx0XHRnYW1lLm91dGNvbWVzLmJhcmQuYXR0YWNrLmZhaWwgPSBbXCJhbmQgdHJpZWQgdG8gcGxheSBhIG1lbG9keSBidXQgdGhlIHN0cmluZ3MgYnJva2UuXCIsIFwiLCBidXQgd2FzIGZyb3plbiB3aXRoIGZlYXIgYW5kIGNvdWxkbid0IG1vdmUuXCIsIFwic3RhcnRlZCB0byBwbGF5IHRoZSBseXJlIGJ1dCB0aGUgZHJhZ29uIHF1aWNrbHkgc3dpcGVkIGl0cyB0YWlsIGF0IHRoZSBseXJlIGFuZCBicm9rZSBpdC5cIl07XG5cdFx0Z2FtZS5vdXRjb21lcy5iYXJkLmJldHJheVByZXAgPSBbXCJtYXkgaGF2ZSBzdXJ2aXZlZCB0aGUgYmF0dGxlIGJ1dCBhbHNvIGhhZCBhbiB1bHRlcmlvciBtb3RpdmUgc29cIiwgXCJ3YXMgdmVyeSBncmVlZHkgYW5kIHdhbnRlZCBtb3JlIHRoYW4ganVzdCB0byBiZSBrbm93biB0byBoYXZlIGZhY2VkIG9mZiBhZ2FpbnN0IGEgZHJhZ29uLlwiLCBcIndhcyBhbHdheXMgYSB2ZXJ5IGdyZWVkeSBwZXJzb24sIHNvXCJdXG5cdFx0Z2FtZS5vdXRjb21lcy5iYXJkLmJldHJheWFsID0gW1wicHV0IGV2ZXJ5Ym9keSB0byBzbGVlcCB3aXRoIGEgbHVsbGFieSBhbmQgc3RvbGUgYWxsIHRoZWlyIG1vbmV5LlwiLCBcIndhaXRlZCB1bnRpbCBuaWdodCB0aW1lIGFuZCBtYWRlIHN1cmUgbm9ib2R5IGVsc2Ugc3Vydml2ZWQuXCIsIFwicGFyYWx5emVkIHRoZSBvdGhlcnMgd2l0aCBhIHN0cmFuZ2UgdHVuZSBhbmQgcmFuIG9mZiB0byBjbGFpbSBhbGwgdGhlIGdsb3J5LlwiXTtcblx0XHRnYW1lLm91dGNvbWVzLmJhcmQuZGFtYWdlID0gW1xuXHRcdFx0W1wia2VwdCBnb29kIGRpc3RhbmNlIGZyb20gdGhlIGRyYWdvbiBhbmQgbmV2ZXIgZ2F2ZSBpdCB0aGUgb3Bwb3J0dW5pdHkgdG8gbGFuZCBhbiBhdHRhY2suXCIsIFwid2FzIGFibGUgdG8gZG9kZ2UgZXZlcnkgb25lIG9mIHRoZSBkcmFnb24ncyBhdHRhY2tzLlwiLCBcIndhcyBwbGF5aW5nIGEgc3RyYW5nZSB0dW5lIHRoYXQgbWFkZSB0aGUgZHJhZ29uIGZlZWwgZGl6enkgc28gYW55IGF0dGFja3MgdGhhdCBpdCBtYWRlIGhhZCBtaXNzZWQuXCJdLFxuXHRcdFx0W1wiZ290IGh1cnQgd2hlbiB0aGUgZHJhZ29uIGh1cmxlZCBhIHJvY2sgYXQgdGhlIHBhcnR5LlwiLCBcIndhcyBoaXQgYnkgdGhlIGRyYWdvbidzIHRhaWwgYW5kIGdvdCBodXJ0LlwiLCBcImdvdCBrbm9ja2VkIGJhY2sgaW50byBhIHRyZWUgd2hlbiB0aGUgZHJhZ29uIGZsYXBwZWQgaXRzIHdpbmdzLlwiXSxcblx0XHRcdFtcIndhcyB0aHJvd24gZmFyIGJ5IGEgZ3VzdCBvZiB3aW5kIGZyb20gdGhlIGRyYWdvbidzIHdpbmdzIGFuZCBicm9rZSBhIGZldyBib25lcyBvbiB0aGUgbGFuZGluZy5cIiwgXCJjb3VsZG4ndCByZWFjdCB0byB0aGUgZHJhZ29uIHNuYXBwaW5nIGl0cyBqYXcgYW5kIGxvc3QgYSBsZWcuXCIsIFwiZGlkbid0IGdldCBhd2F5IGluIHRpbWUgd2hlbiB0aGUgZHJhZ29uIHN3aXBlZCBpdHMgdGFpbCBhcm91bmQgYW5kIHRvb2sgdGhlIGZ1bGwgYnJ1bnQgb2YgdGhlIGhpdC5cIl0sXG5cdFx0XHRbXCJ3YXMgY29tcGxldGVseSBlbmd1bGZlZCB0aGUgdGhlIGRyYWdvbidzIGZsYW1lcywgd2hpY2ggbGVmdCBub3RoaW5nIGJlaGluZC5cIiwgXCJ0b29rIGEgZGVhZGx5IHN3aXBlIGZyb20gdGhlIGRyYWdvbidzIGNsYXdzIGFuZCB3YXMgbW9ydGFsbHkgd291bmRlZC5cIiwgXCJjb3VsZG4ndCBkb2RnZSB3aGVuIHRoZSBkcmFnb24gY2hhcmdlZCBhbmQgd2FzIGltcGFsZWQgb24gdGhlIGl0cyBob3JuLlwiXVxuXHRcdF07XG5cdGdhbWUub3V0Y29tZXMuZHJhZ29uID0ge307XG5cdFx0Z2FtZS5vdXRjb21lcy5kcmFnb24uYWxpdmUgPSBbXCJUaGUgRHJhZ29uIFdpbnMuIFlvdSBMb3NlLiBZb3UncmUgYWxsIGRlYWRcIl07XG5cdFx0Z2FtZS5vdXRjb21lcy5kcmFnb24uZGVhZCA9IFtcIllvdSBoYXZlIGRlZmVhdGVkIHRoZSBkcmFnb24uIFdvb3QhXCJdO1xuXHRcdGdhbWUub3V0Y29tZXMuZHJhZ29uLmF0dGFja1ByZXAgPSBbXCJUaGUgZHJhZ29uLCBub3QgaGFwcHkgd2l0aCB3aGF0IHRyYW5zcGlyZWQsIHJldGFsaWF0ZWQuXCIsIFwiVGhlIGRyYWdvbiwgbm93IGNsZWFybHkgYW5ub3llZCwgZm91Z2h0IGJhY2suXCJdO1xuXG4vL3JvbGwgcmFuZG9tIHByb3BlcnRpZXNcbmdhbWUucHJvcFRvT3V0Y29tZSA9IGZ1bmN0aW9uKGpvYikge1xuXHR2YXIgdGhlSm9iID0gZ2FtZS5jbGFzc1Byb3BlcnRpZXNbam9iXTtcblx0dmFyIHRoZU91dGNvbWVzID0gZ2FtZS5vdXRjb21lc1tqb2JdO1xuXG5cdC8vcmFuZG9tIGF0dGFjayBvdXRjb21lXG5cdHRoZUpvYi5vdXRjb21lLnB1c2goZ2FtZS5yYW5kT3V0Y29tZSh0aGVPdXRjb21lcy5hdHRhY2tQcmVwKSk7XG5cblx0aWYgKHRoZUpvYi5kYW1hZ2VEZWFsdCA9PT0gMCkge1xuXHRcdHRoZUpvYi5vdXRjb21lLnB1c2goZ2FtZS5yYW5kT3V0Y29tZSh0aGVPdXRjb21lcy5hdHRhY2suZmFpbCkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdHRoZUpvYi5vdXRjb21lLnB1c2goZ2FtZS5yYW5kT3V0Y29tZSh0aGVPdXRjb21lcy5hdHRhY2suc3VjY2Vzc1t0aGVKb2IuZGFtYWdlRGVhbHQtMV0pKTtcblx0fVxuXHRcblx0Ly9yYW5kb20gZGFtYWdlIHRha2VuIG91dGNvbWVcblx0dGhlSm9iLm91dGNvbWUucHVzaChnYW1lLnJhbmRPdXRjb21lKGdhbWUub3V0Y29tZXMuZHJhZ29uLmF0dGFja1ByZXApKTtcblx0dGhlSm9iLm91dGNvbWUucHVzaChnYW1lLnJhbmRPdXRjb21lKHRoZU91dGNvbWVzLmRhbWFnZVt0aGVKb2IuZGFtYWdlVGFrZW5dKSk7XG5cblx0Ly9kcmFnb24gb3V0Y29tZVxuXHRpZiAoZ2FtZS5kcmFnb24uYWxpdmUpIHtcblx0XHRnYW1lLmRyYWdvbi5vdXRjb21lID0gZ2FtZS5vdXRjb21lcy5kcmFnb24uYWxpdmU7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Z2FtZS5kcmFnb24ub3V0Y29tZSA9IGdhbWUub3V0Y29tZXMuZHJhZ29uLmRlYWQ7XG5cdH1cblxuXHQvL2FsaXZlL2RlYWQgcmFuZG9tIG91dGNvbWVcblx0aWYgKHRoZUpvYi5hbGl2ZSkge1xuXHRcdHRoZUpvYi5vdXRjb21lLnB1c2goZ2FtZS5yYW5kT3V0Y29tZSh0aGVPdXRjb21lcy5hbGl2ZSkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdHRoZUpvYi5vdXRjb21lLnB1c2goZ2FtZS5yYW5kT3V0Y29tZSh0aGVPdXRjb21lcy5kZWFkKSk7XG5cdH1cbn07XG5cbi8vZnVuY3Rpb24gdG8gb3V0cHV0IGEgcmFuZG9tIHJlc3VsdCB3aGVuIGdpdmVuIGFuIGFycmF5XG5nYW1lLnJhbmRPdXRjb21lID0gZnVuY3Rpb24oYXJyYXkpe1xuXHR2YXIgcmFuZE51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSphcnJheS5sZW5ndGgpO1xuXHRyZXR1cm4gYXJyYXlbcmFuZE51bV07XG59O1xuXG4vL3Jlc2V0IGZ1bmN0aW9uXG5nYW1lLnJlc2V0ID0gZnVuY3Rpb24oam9iKSB7XG5cdGdhbWUudHJhaXRvciA9IGZhbHNlO1xuXHQkKFwiLnN0b3J5X3RleHRcIikuZW1wdHkoKTtcblx0JCgnLmltYWdlX2NvbnRhaW5lcicpLnJlbW92ZSgpO1xuXHQkKCcucmVzZXQnKS5yZW1vdmUoKTtcblx0Zm9yICh2YXIgaGVyb0NsYXNzIGluIGpvYikge1xuXHRcdGpvYltoZXJvQ2xhc3NdLm5hbWUgPSBcIlwiO1xuXHRcdGpvYltoZXJvQ2xhc3NdLmNsYXNzID0gXCJcIjtcblx0XHRqb2JbaGVyb0NsYXNzXS5kYW1hZ2VUYWtlbiA9IDA7XG5cdFx0am9iW2hlcm9DbGFzc10uaHAgPSAzO1xuXHRcdGpvYltoZXJvQ2xhc3NdLmFsaXZlID0gdHJ1ZTtcblx0XHRqb2JbaGVyb0NsYXNzXS50cmFpdG9yID0gZmFsc2U7XG5cdFx0am9iW2hlcm9DbGFzc10gPSAkLmV4dGVuZCh7fSwgZ2FtZS5oZXJvKTtcblx0XHRqb2JbaGVyb0NsYXNzXS5vdXRjb21lID0gW107XG5cdH1cbn1cblxuLy9yb2xsIGFuZCBzZXQgdGhlIG91dGNvbWVzIHJhbmRvbWx5XG5nYW1lLnNldE91dGNvbWVzID0gZnVuY3Rpb24oam9iKSB7XG5cdGZvciAodmFyIGhlcm9DbGFzcyBpbiBqb2IpIHtcblx0XHRqb2JbaGVyb0NsYXNzXS5kYW1hZ2VUYWtlbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDQpO1xuXHRcdGpvYltoZXJvQ2xhc3NdLmRhbWFnZVRvSGVybygpO1xuXHRcdC8vIGNsYXNzUHJvcGVydGllc1toZXJvQ2xhc3NdW1wiaHBcIl0gLT0gZGFtYWdlVGFrZW47XG5cdFx0am9iW2hlcm9DbGFzc10uaXNBbGl2ZSgpO1xuXHRcdGpvYltoZXJvQ2xhc3NdLmRhbWFnZURlYWx0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMyk7XG5cdFx0Ly8gcmVtaW5kZXI6IHdpbGwgbmVlZCB0byBzZXQgcHJvYmFiaWxpdGllcyBmb3IgXlxuXHRcdGpvYltoZXJvQ2xhc3NdLmF0dGFjaygpO1xuXHRcdC8vIF4gdXBkYXRlcyBkcmFnb24gSFAgYmFzZWQgb24gY29tYmluZWQgZGFtYWdlRGVhbHQgcHJvcGVydHkgdmFsdWUgb2YgZWFjaCBoZXJvXG5cdFx0Z2FtZS5kcmFnb24uaXNBbGl2ZSgpO1xuXHRcdC8vIGNoZWNrIGZvciB0cmFpdG9yXG5cdFx0dmFyIHJhbmRvbVRyYWl0b3IgPSBmYWxzZTtcblx0XHRpZiAoZ2FtZS50cmFpdG9yID09PSBmYWxzZSkge1xuXHRcdFx0cmFuZG9tVHJhaXRvciA9IEJvb2xlYW4oTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKSk7XG5cdFx0XHRpZiAocmFuZG9tVHJhaXRvcikge1xuXHRcdFx0XHRqb2JbaGVyb0NsYXNzXS50cmFpdG9yID0gdHJ1ZTtcblx0XHRcdFx0Z2FtZS50cmFpdG9yID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Z2FtZS5wcm9wVG9PdXRjb21lKGhlcm9DbGFzcyk7XG5cdH07XG59O1xuXG4vL3NhdmUgdXNlcm5hbWVzIGludG8gY2xhc3Mgb2JqZWN0c1xuZ2FtZS5nZXROYW1lcyA9IGZ1bmN0aW9uKGpvYikge1xuXHRmb3IgKHZhciBoZXJvQ2xhc3MgaW4gam9iKSB7XG5cdFx0am9iW2hlcm9DbGFzc10uY2xhc3MgPSBoZXJvQ2xhc3M7XG5cdFx0dmFyIGh0bWxJZCA9IFwiI1wiK2hlcm9DbGFzcztcblx0XHRqb2JbaGVyb0NsYXNzXS5uYW1lID0gJChodG1sSWQpLnZhbCgpO1xuXHR9XHRcbn1cblxuLy93cml0ZSB0aGUgc3RvcnkgdG8gdGhlIERPTVxuZ2FtZS53cml0ZVN0b3J5ID0gZnVuY3Rpb24oam9iKSB7XG5cdGdhbWUucmVzZXQoZ2FtZS5jbGFzc1Byb3BlcnRpZXMpO1xuXHRnYW1lLmdldE5hbWVzKGdhbWUuY2xhc3NQcm9wZXJ0aWVzKTtcblx0Z2FtZS5zZXRPdXRjb21lcyhnYW1lLmNsYXNzUHJvcGVydGllcyk7XG5cdFxuXHQkKFwiLnN0b3J5X2NvbnRhaW5lclwiKS5hcHBlbmQoYDxkaXYgY2xhc3M9XCJpbWFnZV9jb250YWluZXJcIj48aW1nIHNyYz1cImltYWdlcy9zdG9yeV9iZy5wbmdcIiBhbHQ9XCJzY3JvbGwgYmFja2dyb3VuZFwiPjwvZGl2PmApO1xuXHRcblx0JChcIi5zdG9yeV90ZXh0XCIpLmFwcGVuZChgPGgxPlRoZSBFcGljIG9mICR7am9iLndhcnJpb3IubmFtZX0sICR7am9iLm1hZ2UubmFtZX0sIGFuZCAke2pvYi5iYXJkLm5hbWV9PC9oMT5gKTtcblxuXHQvL2NoZWNraW5nIGZvciBwYXJ0eSB2cyBkcmFnb24gYWxpdmUgc3RhdHVzXG5cdHZhciBwYXJ0eUFsaXZlID0gZmFsc2U7XG5cdGZvciAodmFyIGhlcm9DbGFzcyBpbiBqb2IpIHtcblx0XHRpZiAoam9iW2hlcm9DbGFzc10uYWxpdmUgPT09IHRydWUpIHtcblx0XHRcdHBhcnR5QWxpdmUgPSB0cnVlO1xuXHRcdH1cdFxuXHR9O1xuXG5cdC8vb3BlbmluZyB0ZXh0IGRlcGVuZGluZyBvbiB0aGUgb3V0Y29tZSBvZiB0aGUgZmlnaHRcblx0aWYgKGdhbWUuZHJhZ29uLmFsaXZlKSB7XG5cdFx0aWYgKHBhcnR5QWxpdmUpIHtcblx0XHRcdCQoXCIuc3RvcnlfdGV4dFwiKS5hcHBlbmQoYDxoMj5PdXIgaGVyb2VzIGZvdWdodCB0aGUgZHJhZ29uIHZhbGlhbnRseSwgYnV0IHdpdGggaW5qdXJpZXMgb24gYm90aCBzaWRlcyBldmVyeWJvZHkgcmV0cmVhdGVkIGFuZCBjYWxsZWQgaXQgYSBEUkFXLjxoMj5gKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHQkKFwiLnN0b3J5X3RleHRcIikuYXBwZW5kKGA8aDI+VGhlIGRyYWdvbiB3YXMgdG9vIHN0cm9uZyBmb3Igb3VyIGhlcm9lcy4gTm9ib2R5IHN1cnZpdmVkLjxoMj5gKTtcblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0aWYgKHBhcnR5QWxpdmUpIHtcblx0XHRcdCQoXCIuc3RvcnlfdGV4dFwiKS5hcHBlbmQoYDxoMj5BZnRlciBhIGxvbmcsIGdydWVsaW5nIGJhdHRsZSB0aGUgaGVyb2VzIGZpbmFsbHkgZmVsbGVkIHRoZSBkcmFnb24uPGgyPmApO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdCQoXCIuc3RvcnlfdGV4dFwiKS5hcHBlbmQoYDxoMj5UaGUgaGVyb2VzIHB1dCB1cCBhIGdyZWF0IGZpZ2h0IGFuZCBkZWZlYXRlZCB0aGUgZHJhZ29uLCBidXQgYXQgYSBncmVhdCBjb3N0LiBUaGVyZSB3ZXJlIG5vIHN1cnZpdm9ycy48aDI+YCk7XG5cdFx0fVxuXHR9XG5cblx0Ly9tYWtpbmcgYSBzdG9yeSBzdHJpbmcgcHJpb3IgdG8gYXBwZW5kaW5nXG5cdGZvciAodmFyIGhlcm9DbGFzcyBpbiBqb2IpIHtcblx0XHRzdG9yeVN0cmluZyA9IFwiXCI7XG5cdFx0Zm9yICh2YXIgaT0wOyBpPGpvYltoZXJvQ2xhc3NdLm91dGNvbWUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHN0b3J5U3RyaW5nICs9IGAgJHtqb2JbaGVyb0NsYXNzXS5uYW1lfSAke2pvYltoZXJvQ2xhc3NdLm91dGNvbWVbaV19YDtcblx0XHR9XG5cblx0XHQvL3JlcGxhY2UgbmFtZXMgd2l0aCBibGFua3MgdG8gbWFrZSB0aGUgcGFyYWdyYXBoIGZsb3cgYW5kIHRvIGdldCByaWQgb2Ygc2VudGVuY2UgZnJhZ21lbnRzXG5cdFx0c3RvcnlTdHJpbmcgPSBnYW1lLnJlcGxhY2VJbnN0YW5jZShzdG9yeVN0cmluZywgam9iW2hlcm9DbGFzc10ubmFtZSwgMywgXCJcIik7XG5cdFx0c3RvcnlTdHJpbmcgPSBnYW1lLnJlcGxhY2VJbnN0YW5jZShzdG9yeVN0cmluZywgam9iW2hlcm9DbGFzc10ubmFtZSwgMiwgXCJcIik7XG5cblx0XHQkKFwiLnN0b3J5X3RleHRcIikuYXBwZW5kKGA8aDI+JHtqb2JbaGVyb0NsYXNzXS5uYW1lfSB0aGUgPHNwYW4gY2xhc3M9XCIke2pvYltoZXJvQ2xhc3NdLmNsYXNzfVwiPiR7am9iW2hlcm9DbGFzc10uY2xhc3N9PC9zcGFuPi4uLmApO1xuXHRcdCQoXCIuc3RvcnlfdGV4dFwiKS5hcHBlbmQoYDxwPiR7c3RvcnlTdHJpbmd9PC9wPmApO1xuXHR9XG5cblx0Ly9iZXRyYXlhbCBzY2VuYXJpb1xuXHRnYW1lLmNoZWNrRm9yVHJhaXRvcihnYW1lLmNsYXNzUHJvcGVydGllcyk7XG5cblx0Ly9yZXNldCBidXR0b25cblx0JChcIi5zdG9yeV9jb250YWluZXJcIikuYXBwZW5kKGA8YSBocmVmPVwiI3RvcFwiIGNsYXNzPVwicmVzZXRcIj48YnV0dG9uPlJlc2V0PC9idXR0b24+PC9hPmApO1xufVxuXG4vL3JlcGxhY2VzIHRoZSBudGggaW5zdGFuY2Ugb2YgXCJsb29rRm9yXCIgaW4gc3RyaW5nXCIgd2l0aCBcInJlcGxhY2VXaXRoXCJcbmdhbWUucmVwbGFjZUluc3RhbmNlID0gZnVuY3Rpb24oc3RyaW5nLCBsb29rRm9yLCBpbmRleCwgcmVwbGFjZVdpdGgpIHtcblx0dmFyIHN0cmluZ0FycmF5ID0gc3RyaW5nLnNwbGl0KFwiIFwiKTtcblx0dmFyIG1hdGNoID0gMDtcblxuXHRmb3IgKHZhciBpPTA7IGk8PXN0cmluZ0FycmF5Lmxlbmd0aDsgaSsrKXtcblx0XHRpZiAoc3RyaW5nQXJyYXlbaV0gPT09IGxvb2tGb3IpIHtcblx0XHRcdG1hdGNoKys7XG5cdFx0XHRcblx0XHRcdGlmIChtYXRjaCA9PT0gaW5kZXgpIHtcdFx0XHRcdFxuXHRcdFx0XHRzdHJpbmdBcnJheVtpXSA9IHJlcGxhY2VXaXRoO1x0XHRcdFx0XG5cdFx0XHR9XG5cdFx0fVx0XHRcblx0fVx0XG5cdHJldHVybiBzdHJpbmdBcnJheS5qb2luKFwiIFwiKTtcbn07XG5cbi8vY2hlY2tzIGZvciBleGlzdGVuY2VzIG9mIHRyYWl0b3JzXG5nYW1lLmNoZWNrRm9yVHJhaXRvciA9IGZ1bmN0aW9uKGpvYikge1xuXHR2YXIgaGVyb2VzQWxpdmUgPSBbXTtcblxuXHRmb3IgKHZhciBoZXJvQ2xhc3MgaW4gam9iKXtcdFx0XHRcdFxuXHRcdGlmIChqb2JbaGVyb0NsYXNzXS5hbGl2ZSkge1xuXHRcdFx0aGVyb2VzQWxpdmUucHVzaChgJHtqb2JbaGVyb0NsYXNzXS5uYW1lfSB0aGUgJHtqb2JbaGVyb0NsYXNzXS5jbGFzc31gKTtcblx0XHR9XG5cdH1cblxuXHRmb3IgKHZhciBoZXJvQ2xhc3MgaW4gam9iKXtcblx0XHRpZiAoam9iW2hlcm9DbGFzc10udHJhaXRvciAmJiBoZXJvZXNBbGl2ZS5sZW5ndGggPiAxKSB7XG5cdFx0XHRpZiAoam9iW2hlcm9DbGFzc10uYWxpdmUpIHtcblx0XHRcdFx0JChcIi5zdG9yeV90ZXh0XCIpLmFwcGVuZChgPGgyPkFmdGVyIHRoZSBiYXR0bGUuLi48aDI+YCk7XHRcdFx0XHRcblx0XHRcdFx0JChcIi5zdG9yeV90ZXh0XCIpLmFwcGVuZChgPHA+JHtqb2JbaGVyb0NsYXNzXS5uYW1lfSAke2dhbWUucmFuZE91dGNvbWUoZ2FtZS5vdXRjb21lc1toZXJvQ2xhc3NdLmJldHJheVByZXApfSAke2pvYltoZXJvQ2xhc3NdLm5hbWV9ICR7Z2FtZS5yYW5kT3V0Y29tZShnYW1lLm91dGNvbWVzW2hlcm9DbGFzc10uYmV0cmF5YWwpfTwvcD5gKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn07XG5cbmdhbWUuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXHRnYW1lLnJlc2V0KGdhbWUuY2xhc3NQcm9wZXJ0aWVzKTtcblx0JChcImZvcm1cIikub24oXCJzdWJtaXRcIiwgZnVuY3Rpb24oZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRnYW1lLndyaXRlU3RvcnkoZ2FtZS5jbGFzc1Byb3BlcnRpZXMpO1xuXHRcdCQoXCIuc3RvcnlfY29udGFpbmVyXCIpLmNzcyhcImRpc3BsYXlcIixcImJsb2NrXCIpO1x0XHRcblx0XHRcblx0XHQvL3Njcm9sbCBkb3duIGFmdGVyIHN1Ym1pdFxuXHQgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuXHQgICAgICAgIHNjcm9sbFRvcDogJChcIi5zdG9yeV9jb250YWluZXJcIikub2Zmc2V0KCkudG9wXG5cdCAgICB9LCAxNTAwKTtcblxuXHRcdCQoXCIucmVzZXRcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdCQoXCIuc3RvcnlfdGV4dFwiKS5lbXB0eSgpO1xuXHRcdFx0JChcIi5zdG9yeV9jb250YWluZXJcIikuY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcblx0XHRcdGdhbWUuaW5pdCgpOyAvL3JlY3Vyc2lvbiBzbyB0aGUgZ2FtZSBydW5zIGluZGVmaW5pdGVseVxuXHRcdH0pO1x0XHRcblx0fSk7XG59O1xuXG4kKGZ1bmN0aW9uKCkge1xuXHRnYW1lLmluaXQoKTtcbn0pO1xuXG5cbi8vIFBTRVVETyBDT0RFOlxuXG4vLyAxLiBGb3JtIHdpdGggYW4gaW5wdXQgZmllbGQgYXNzb2NpYXRlZCB3aXRoIG9uZSBvZiAzIGNoZWNrYm94ZXMgKHJhZGlvIGJ1dHRvbnMgLSBjYW4gb25seSBjaG9vc2Ugb25lIG9wdGlvbikuIElucHV0IHRha2VzIGV4YWN0bHkgMyBuYW1lcyAoc3RyaW5ncykuIEZvciBlYWNoIGlucHV0IGZpZWxkIHlvdSBtdXN0IGFsc28gc2VsZWN0IGFuIGlucHV0IGZpZWxkIFwiY2xhc3M6IEJhcmQsIE1hZ2UsIFdhcnJpb3JcIi5cbi8vIEpTOiBBZGQgYXR0cmlidXRlIG9mIFwiZGlzYWJsZWRcIiB0byBhIGNsYXNzIG9wdGlvbiB3aGVuIGl0J3MgYmVlbiBzZWxlY3RlZCBmb3Igb25lIG9mIHRoZSBvdGhlciBpbnB1dCBmaWVsZHMuIFRoZXJlIGNhbiBvbmx5IGJlIG9uZSB3YXJyaW9yLCBvbmUgbWFnZSwgYW5kIG9uZSBiYXJkIHBlciBwYXJ0eS5cblx0Ly8gZS5nLiBpZiB3YXJyaW9yIHNlbGVjdGVkIGJ5IDFzdCBwbGF5ZXIsIGNhbm5vdCBiZSBzZWxlY3RlZCBieSAybmQgb3IgM3JkXG5cbi8vIFN1Ym1pdCBidXR0b24gdGhhdCBzYXlzIFwiRmlnaHQhXCJcbi8vIE9uY2UgaGl0IHN1Ym1pdCBidXR0b246XG4vLyAyLiBEaWUgcm9sbCBmb3IgZWFjaCBoZXJvIG9iamVjdCBwcm9wZXJ0eSB2YWx1ZTpcblx0Ly8gMyB2YWx1ZXM6XG5cdC8vIERhbWFnZSB0YWtlbiAobnVtYmVyKSwgZGFtYWdlIGRlYWx0IChudW1iZXIpLCBiZXRyYXlhbCAoYm9vbGVhbilcblxuXHQvLyBudW1iZXIgcmFuZ2UgZm9yIHRoZSBudW1iZXIgdmFsdWVzOiBkZXBlbmRzIG9uIGhvdyBtYW55IG91dGNvbWVzIHlvdSB3YW50PyBXaWxsIG5ldmVyIGJlIGRpc3BsYXllZCB0byB0aGUgcGxheWVyLiBTbyBtYXliZSAxLTMuIGlmIHlvdSB0YWtlIDAgZGFtYWdlLCB5b3UncmUgaW52aW5jaWJsZSEgMSBkYW1hZ2UsIHlvdSdyZSBmaW5lLiBJZiB5b3UgdGFrZSAyIHlvdSdyZSBuZWFybHkgZGVhZCwgMyBpcyBkZWFkLlxuXG5cdC8vIGRhbWFnZSBkZWFsdDogMCwgMSwgMiAobm90IGVxdWFsIGNoYW5jZSBvZiBnZXR0aW5nIHJlc3VsdHMuIDIgaXMgcmFyZXN0LiBEcmFnb24gaGFzIGEgdG90YWwgb2YgNEhQICoqQ0FOIFRFU1QgT1VUKVxuXG5cdC8vIGJldHJheWFsOiByb2xsIGVpdGhlciAwLCAxLCAyLCAzLiBOdW1iZXIgY29ycmVzcG9uZHMgdG8gdHJhaXRvciAoaWYgMCwgbm8gdHJhaXRvcikgLSAxID0gMXN0IHBsYXllciB0cmFpdG9yLCAyID0gMm5kIHBsYXllciBldGMuXG5cdC8vIHVzaW5nIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEgaGlnaGVyIHRoYW4gdGhlIG51bWJlciB3ZSBuZWVkKVxuXG4vLyAzLiBGb3IgZWFjaCBvdXRjb21lLCBjYWxsIGFwcHJvcHJpYXRlIG1ldGhvZCB0byB1cGRhdGUgdGhlIGNvbm5lY3RlZCBoZXJvIG9iamVjdCBhbmQgdGhlIGRyYWdvbiBvYmplY3QuXG4vLyBDSEVDSyBhbmQgdGhlbiBTQVZFIGFwcHJvcHJpYXRlIG91dGNvbWUgaW4gb3VyIGhlcm8gb2JqZWN0J3Mgb3V0Y29tZSBhcnJheSAoY3VycmVudGx5IGJsYW5rKVxuXG5cbi8vIDQuIE5ldyBoZXJvIHByb3BlcnRpZXMgYXJlIGNvbm5lY3RlZCB3aXRoIG91dGNvbWUgYXJyYXlzPyBcblxuXG4vLyA1LiBQb3B1bGF0ZSBzdG9yeSBhcnJheSB3aXRoIG91dGNvbWVzIGluIGFwcHJvcHJpYXRlIG9yZGVyLlxuXG5cblxuXG4vLyBIZXJvIG9iamVjdHMgd2l0aCBkaWZmZXJlbnQga2V5IHZhbHVlcy4gVGhlIG91dGNvbWUgZGVwZW5kcyBvbiB3aGF0IHRoZSBrZXkgdmFsdWVzIGFyZS4gXG5cdC8vIEtleSB2YWx1ZXMgYXJlIGRldGVybWluZWQgYnkgcmFuZG9tIFwiZGllIHJvbGxcIlxuXG4vLyBGSU5BTCBGSU5BTCBPVVRDT01FOiBTZXJpZXMgb2Ygc2VudGVuY2VzIHB1dCB0b2dldGhlciB0aGF0IGNvbnNpc3Qgb2Ygc21hbGxlciBvdXRjb21lcyB0aGF0IGFyZSBkZXRlcm1pbmVkIGJ5IHByb3BlcnR5IHZhbHVlcyBvZiBlYWNoIGhlcm8gb2JqZWN0LlxuIl19
