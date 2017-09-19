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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJ0d3R0ciIsImQiLCJzIiwiaWQiLCJqcyIsImZqcyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwidCIsImdldEVsZW1lbnRCeUlkIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsInBhcmVudE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJfZSIsInJlYWR5IiwiZiIsInB1c2giLCJkb2N1bWVudCIsImdhbWUiLCJ0cmFpdG9yIiwiZHJhZ29uIiwiaHAiLCJ0YW1lUG9pbnRzIiwiYWxpdmUiLCJpc0FsaXZlIiwiaGVybyIsIm5hbWUiLCJjbGFzcyIsImRhbWFnZVRha2VuIiwib3V0Y29tZSIsImRhbWFnZVRvSGVybyIsImF0dGFjayIsImRhbWFnZURlYWx0IiwiY2xhc3NQcm9wZXJ0aWVzIiwibWFnZSIsIndhcnJpb3IiLCJiYXJkIiwib3V0Y29tZXMiLCJkZWFkIiwiYXR0YWNrUHJlcCIsInN1Y2Nlc3MiLCJmYWlsIiwiYmV0cmF5UHJlcCIsImJldHJheWFsIiwiZGFtYWdlIiwicHJvcFRvT3V0Y29tZSIsImpvYiIsInRoZUpvYiIsInRoZU91dGNvbWVzIiwicmFuZE91dGNvbWUiLCJhcnJheSIsInJhbmROdW0iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJsZW5ndGgiLCJyZXNldCIsIiQiLCJlbXB0eSIsInJlbW92ZSIsImhlcm9DbGFzcyIsImV4dGVuZCIsInNldE91dGNvbWVzIiwicmFuZG9tVHJhaXRvciIsIkJvb2xlYW4iLCJyb3VuZCIsImdldE5hbWVzIiwiaHRtbElkIiwidmFsIiwid3JpdGVTdG9yeSIsImFwcGVuZCIsInBhcnR5QWxpdmUiLCJzdG9yeVN0cmluZyIsImkiLCJyZXBsYWNlSW5zdGFuY2UiLCJjaGVja0ZvclRyYWl0b3IiLCJzdHJpbmciLCJsb29rRm9yIiwiaW5kZXgiLCJyZXBsYWNlV2l0aCIsInN0cmluZ0FycmF5Iiwic3BsaXQiLCJtYXRjaCIsImpvaW4iLCJoZXJvZXNBbGl2ZSIsImluaXQiLCJvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImNzcyIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJvZmZzZXQiLCJ0b3AiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQUEsT0FBT0MsS0FBUCxHQUFnQixVQUFTQyxDQUFULEVBQVlDLENBQVosRUFBZUMsRUFBZixFQUFtQjtBQUNqQyxLQUFJQyxFQUFKO0FBQUEsS0FBUUMsTUFBTUosRUFBRUssb0JBQUYsQ0FBdUJKLENBQXZCLEVBQTBCLENBQTFCLENBQWQ7QUFBQSxLQUNFSyxJQUFJUixPQUFPQyxLQUFQLElBQWdCLEVBRHRCO0FBRUEsS0FBSUMsRUFBRU8sY0FBRixDQUFpQkwsRUFBakIsQ0FBSixFQUEwQixPQUFPSSxDQUFQO0FBQzFCSCxNQUFLSCxFQUFFUSxhQUFGLENBQWdCUCxDQUFoQixDQUFMO0FBQ0FFLElBQUdELEVBQUgsR0FBUUEsRUFBUjtBQUNBQyxJQUFHTSxHQUFILEdBQVMseUNBQVQ7QUFDQUwsS0FBSU0sVUFBSixDQUFlQyxZQUFmLENBQTRCUixFQUE1QixFQUFnQ0MsR0FBaEM7O0FBRUFFLEdBQUVNLEVBQUYsR0FBTyxFQUFQO0FBQ0FOLEdBQUVPLEtBQUYsR0FBVSxVQUFTQyxDQUFULEVBQVk7QUFDcEJSLElBQUVNLEVBQUYsQ0FBS0csSUFBTCxDQUFVRCxDQUFWO0FBQ0QsRUFGRDs7QUFJQSxRQUFPUixDQUFQO0FBQ0QsQ0FmZSxDQWVkVSxRQWZjLEVBZUosUUFmSSxFQWVNLGFBZk4sQ0FBaEI7O0FBaUJBO0FBQ0EsSUFBSUMsT0FBTyxFQUFYO0FBQ0NBLEtBQUtDLE9BQUwsR0FBZSxLQUFmO0FBQ0Q7QUFDQ0QsS0FBS0UsTUFBTCxHQUFjLEVBQWQ7QUFDQ0YsS0FBS0UsTUFBTCxDQUFZQyxFQUFaLEdBQWlCLENBQWpCO0FBQ0FILEtBQUtFLE1BQUwsQ0FBWUUsVUFBWixHQUF3QixDQUF4QjtBQUNBSixLQUFLRSxNQUFMLENBQVlHLEtBQVosR0FBb0IsSUFBcEI7QUFDQUwsS0FBS0UsTUFBTCxDQUFZSSxPQUFaLEdB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QixDQUEwQixTQUExQixFQUFvQyxPQUFwQzs7QUFFQTtBQUNHaEMsSUFBRSxZQUFGLEVBQWdCaUMsT0FBaEIsQ0FBd0I7QUFDcEJDLGNBQVdsQyxFQUFFLGtCQUFGLEVBQXNCbUMsTUFBdEIsR0FBK0JDO0FBRHRCLEdBQXhCLEVBRUcsSUFGSDs7QUFJSHBDLElBQUUsUUFBRixFQUFZNkIsRUFBWixDQUFlLE9BQWYsRUFBd0IsWUFBVztBQUNsQzdCLEtBQUUsYUFBRixFQUFpQkMsS0FBakI7QUFDQUQsS0FBRSxrQkFBRixFQUFzQmdDLEdBQXRCLENBQTBCLFNBQTFCLEVBQW9DLE1BQXBDO0FBQ0F2RSxRQUFLbUUsSUFBTCxHQUhrQyxDQUdyQjtBQUNiLEdBSkQ7QUFLQSxFQWZEO0FBZ0JBLENBbEJEOztBQW9CQTVCLEVBQUUsWUFBVztBQUNadkMsTUFBS21FLElBQUw7QUFDQSxDQUZEOztBQUtBOztBQUVBO0FBQ0E7QUFDQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQztBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUQ7QUFDQTs7O0FBR0E7OztBQUdBOzs7QUFLQTtBQUNDOztBQUVEIiwiZmlsZSI6InNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFR3aXR0ZXIgc2hhcmUgYnV0dG9uXHJcbndpbmRvdy50d3R0ciA9IChmdW5jdGlvbihkLCBzLCBpZCkge1xyXG4gIHZhciBqcywgZmpzID0gZC5nZXRFbGVtZW50c0J5VGFnTmFtZShzKVswXSxcclxuICAgIHQgPSB3aW5kb3cudHd0dHIgfHwge307XHJcbiAgaWYgKGQuZ2V0RWxlbWVudEJ5SWQoaWQpKSByZXR1cm4gdDtcclxuICBqcyA9IGQuY3JlYXRlRWxlbWVudChzKTtcclxuICBqcy5pZCA9IGlkO1xyXG4gIGpzLnNyYyA9IFwiaHR0cHM6Ly9wbGF0Zm9ybS50d2l0dGVyLmNvbS93aWRnZXRzLmpzXCI7XHJcbiAgZmpzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGpzLCBmanMpO1xyXG5cclxuICB0Ll9lID0gW107XHJcbiAgdC5yZWFkeSA9IGZ1bmN0aW9uKGYpIHtcclxuICAgIHQuX2UucHVzaChmKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gdDtcclxufShkb2N1bWVudCwgXCJzY3JpcHRcIiwgXCJ0d2l0dGVyLXdqc1wiKSk7IFxyXG5cclxuLy9nbG9iYWwgY29udGFpbmVyXHJcbnZhciBnYW1lID0ge307XHJcblx0Z2FtZS50cmFpdG9yID0gZmFsc2U7XHJcbi8vIERyYWdvbiBwcm9wZXJ0aWVzOlxyXG5cdGdhbWUuZHJhZ29uID0ge307XHJcblx0XHRnYW1lLmRyYWdvbi5ocCA9IDU7XHJcblx0XHRnYW1lLmRyYWdvbi50YW1lUG9pbnRzPSA1O1xyXG5cdFx0Z2FtZS5kcmFnb24uYWxpdmUgPSB0cnVlO1xyXG5cdFx0Z2FtZS5kcmFnb24uaXNBbGl2ZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYgKHRoaXMuaHAgPD0gMCkge1xyXG5cdFx0XHRcdFx0dGhpcy5hbGl2ZSA9IGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblxyXG4vLyBIZXJvIHByb3BlcnRpZXM6XHJcblx0Z2FtZS5oZXJvID0ge307XHJcblx0XHRnYW1lLmhlcm8ubmFtZSA9IFwiXCI7XHJcblx0XHRnYW1lLmhlcm8uY2xhc3MgPSBcIlwiO1xyXG5cdFx0Z2FtZS5oZXJvLmRhbWFnZVRha2VuID0gMDtcclxuXHRcdGdhbWUuaGVyby5ocCA9IDM7XHJcblx0XHRnYW1lLmhlcm8uYWxpdmUgPSB0cnVlO1xyXG5cdFx0Z2FtZS5oZXJvLnRyYWl0b3IgPSBmYWxzZTtcclxuXHRcdGdhbWUuaGVyby5vdXRjb21lID0gW107XHJcblxyXG5cdFx0Z2FtZS5oZXJvLmRhbWFnZVRvSGVybyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLmhwIC09IHRoaXMuZGFtYWdlVGFrZW47XHJcblx0XHR9O1xyXG5cclxuXHRcdGdhbWUuaGVyby5pc0FsaXZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmICh0aGlzLmhwIDw9IDApIHtcclxuXHRcdFx0XHQvLyBjaGFuZ2UgaGVybydzIGFsaXZlIHByb3BlcnR5IHRvIGZhbHNlXHJcblx0XHRcdFx0dGhpcy5hbGl2ZSA9IGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdGdhbWUuaGVyby5hdHRhY2sgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0Z2FtZS5kcmFnb24uaHAgLT0gdGhpcy5kYW1hZ2VEZWFsdDtcclxuXHRcdH1cclxuXHJcblxyXG4vL3RoaW5rIGFib3V0IGNsYXNzZXMgKGFycmF5IGluIG9iamVjdC9vdGhlciB3YXkpXHJcbi8vY2xvbmUgaGVybyBvYmplY3QgaW50byBlYWNoIG9mIHRoZSAzXHJcblx0Z2FtZS5jbGFzc1Byb3BlcnRpZXMgPSB7XHJcblx0XHRtYWdlOiB7fSxcclxuXHRcdHdhcnJpb3I6IHt9LFxyXG5cdFx0YmFyZDoge31cclxuXHR9O1xyXG5cclxuXHQvL0FERCBJTiBPVVRDT01FUyBGT1IgQkVUUkFZRUQgKyBERUFEL0FMSVZFXHJcblx0Z2FtZS5vdXRjb21lcyA9IHt9O1xyXG5cclxuXHQvLyBvdXRjb21lIG9yZGVyOiBhdHRhY2soc3VjY2Vzcy9mYWlsKSwgZGFtYWdlVGFrZW4sIHRyYWl0b3IsIGFsaXZlL2RlYWQsXHJcblx0Z2FtZS5vdXRjb21lcy5tYWdlID0ge307XHJcblx0XHRnYW1lLm91dGNvbWVzLm1hZ2UuYWxpdmUgPSBbXCJzdXJ2aXZlZCB0aGUgZmlnaHQuIFwiLCBcImlzIGFsaXZlLCBidXQgdGhlIHN0YWZmIHdhcyBsb3N0LlwiLCBcInNvbWVob3cgbWFuYWdlZCB0byBsaXZlIGRlc3BpdGUgYmVpbmcgb3V0IG9mIG1hbmEuXCJdO1xyXG5cdFx0Z2FtZS5vdXRjb21lcy5tYWdlLmRlYWQgPSBbXCJkaWRuJ3Qgc3Vydml2ZSB0aGUgZW5jb3VudGVyLlwiLCBcImRpZG4ndCBsaXZlIHRvIHRlbGwgdGhlIHRhbGUuXCIsIFwiaXMgbm8gbG9uZ2VyIGFtb25nc3QgdGhlIGxpdmluZy5cIl07XHJcblx0XHRnYW1lLm91dGNvbWVzLm1hZ2UuYXR0YWNrUHJlcCA9IFtcImJlZ2FuIHdhdmluZyBhIHN0YWZmIHdpbGRseSBpbiB0aGUgYWlyIGFuZCBcIiwgXCJwb2ludGVkIGF0IHRoZSBkcmFnb24gYW5kXCIsIFwic3RhcnRlZCBjaGFudGluZyBhbmRcIl07XHJcblx0XHRnYW1lLm91dGNvbWVzLm1hZ2UuYXR0YWNrID0ge307XHJcblx0XHRcdGdhbWUub3V0Y29tZXMubWFnZS5hdHRhY2suc3VjY2VzcyA9IFtcclxuXHRcdFx0XHRbXCJjYXN0IGEgYm9sdCBvZiBsaWdodG5pbmcgdGhhdCBoaXQgdGhlIGRyYWdvbiwgYmFyZWx5IGxlYXZpbmcgYSBtYXJrLlwiLCBcInRocmV3IGEgZmlyZWJhbGwsIHdoaWNoIGRpZG4ndCBkbyBtdWNoIGFnYWluc3QgdGhlIGRyYWdvbi5cIiwgXCJsZXZpdGF0ZWQgc29tZSByb2NrcyBhbmQgbGF1bmNoZWQgdGhlbSBhdCB0aGUgZHJhZ29uLCBkYW1hZ2luZyBpdHMgaGlkZS5cIl0sXHJcblx0XHRcdFx0W1wiY29tcGxldGVseSBmcm96ZSB0aGUgZHJhZ29uJ3Mgd2luZ3MsIHdoaWNoIHNoYXR0ZXJlZCBpbnRvIHBpZWNlcy5cIiwgXCJvcGVuZWQgYSBwaXRmYWxsIHVuZGVybmVhdGggdGhlIGRyYWdvbi4gVGhlIGZhbGwgYnJva2UgdGhlIGRyYWdvbidzIGxlZ3MuXCIsIFwiaHVybGVkIGEgbGFyZ2UgaWNpY2xlIGF0IHRoZSBkcmFnb24sIHdoaWNoIGxlZnQgYSBnYXBpbmcgaG9sZSBpbiBvbmUgb2YgaXRzIHdpbmdzLlwiXVxyXG5cdFx0XHRdO1xyXG5cdFx0XHRnYW1lLm91dGNvbWVzLm1hZ2UuYXR0YWNrLmZhaWwgPSBbXCJjYXN0IGEgZmlyZWJhbGwsIGJ1dCBtaXNzZWQuXCIsIFwiY29uanVyZWQgYW4gaWNpY2xlIHRvIGh1cmwgYXQgdGhlIGRyYWdvbiwgYnV0IHRoZSBkcmFnb24gZGVmdGx5IGRvZGdlZCBpdC5cIiwgXCJ0cmllZCB0byBjYXN0IGEgc3BlbGwsIGJ1dCB0aGUgZHJhZ29uIGNhdWdodCBvbiBhbmQgaW50ZXJydXB0ZWQgaXQgYnkgdGhyb3dpbmcgYSBib3VsZGVyLlwiXTtcclxuXHRcdC8vYmV0cmF5YWwgb3V0Y29tZXMgYXNzdW1lIHRyYWl0b3IgaXMgYWxpdmUsIHdoaWNoIGlzIGNoZWNrZWQgd2l0aCBhbiBpZiBzdGF0ZW1lbnQgYmVmb3JlIGRpc3BsYXlpbmdcclxuXHRcdGdhbWUub3V0Y29tZXMubWFnZS5iZXRyYXlQcmVwID0gW1wid2FzIGhpdCB3aXRoIGEgc3Ryb25nIGZlZWxpbmcgb2YgZ3JlZWQgc29cIiwgXCJ3YXMganVzdCBmYWtpbmcgYmVpbmcgYSBoZXJvIGFuZCBhY3R1YWxseSBoYWQgc29tZXRoaW5nIGVsc2UgcGxhbm5lZC5cIiwgXCJkZWNpZGVkIHRoYXQganVzdCB0aGUgZmVlbGluZyBvZiBhZHZlbnR1cmUgd2Fzbid0IGVub3VnaC5cIl1cclxuXHRcdGdhbWUub3V0Y29tZXMubWFnZS5iZXRyYXlhbCA9IFtcInN0b2xlIHRoZSBwYXJ0eSdzIGdvbGQuIFRoZSB0cmFpdG9yIVwiLCBcInBvaXNvbmVkIHRoZSBzdXJ2aXZpbmcgaGVyb2VzIGluIHRoZWlyIHNsZWVwLCBub3Qgd2FudGluZyB0byBzaGFyZSB0aGUgZmFtZSBhbmQgZm9ydHVuZS5cIiwgXCJ3aXBlZCB0aGUgcmVzdCBvZiB0aGUgcGFydHkgb3V0IGJ5IGJ1cnlpbmcgdGhlbSBhbGl2ZSBpbiBhIGhvbGUgY29uanVyZWQgYnkgZWFydGggbWFnaWMuIE5vdyB0aGUgZmFtZSwgZm9ydHVuZSwgYW5kIGdsb3J5IGNhbiBiZSBjbGFpbWVkIGJ5IG9ubHkgb25lIHBlcnNvbi5cIl07XHJcblx0XHRnYW1lLm91dGNvbWVzLm1hZ2UuZGFtYWdlID0gW1xyXG5cdFx0XHRbXCJkb2RnZWQgdGhlIGRyYWdvbidzIHRhaWwgc3dpcGUgYnkgZmxvYXRpbmcgb3ZlciBpdC5cIiwgXCJwdXQgdXAgYSBzdHJvbmcgZGVmZW5zaXZlIGJhcnJpZXIsIHRha2luZyBubyBkYW1hZ2UuXCIsIFwibWFkZSBhIGxhcmdlIHdhbGwgb3V0IG9mIHRoZSBlYXJ0aCBhbmQgc3RvcHBlZCB0aGUgZHJhZ29uJ3MgYXR0YWNrIGZyb20gbGFuZGluZy5cIl0sXHJcblx0XHRcdFtcImdvdCBzd2F0dGVkIGJ5IHRoZSBkcmFnb24sIHRha2luZyBhIHNtYWxsIGFtb3VudCBvZiBkYW1hZ2UuXCIsIFwiZGlkbid0IGNvbXBsZXRlbHkgZG9kZ2UgdGhlIGRyYWdvbidzIGZpcmUgYnJlYXRoIGFuZCBnb3QgYnVybmVkIGluIHRoZSBhcm0uXCIsIFwiZ290IGhpdCBieSBhIGZldyByb2NrcyB0aGF0IHdlcmUga2lja2VkIHVwIGJ5IHRoZSBkcmFnb24ncyB0YWlsLlwiXSxcclxuXHRcdFx0W1wiZ290IHNtYWNrZWQgaGFyZCBieSB0aGUgZHJhZ29uJ3MgdGFpbCwgY3JhY2tpbmcgYSBmZXcgcmlicy5cIiwgXCJnb3Qgc2xhc2hlZCBieSB0aGUgZHJhZ29uJ3MgY2xhd3MgYW5kIGxvc3QgYW4gYXJtLlwiLCBcInRvb2sgYSBoZWFkIG9uIGNoYXJnZSBieSB0aGUgZHJhZ29uIGFuZCBicm9rZSBhIGZldyBib25lcy5cIl0sXHJcblx0XHRcdFtcImNvbmp1cmVkIGEgbGFyZ2UgYm91bGRlciB0byBodXJsIGF0IHRoZSBkcmFnb24sIGJ1dCB0aGUgZHJhZ29uIGludGVycnVwdGVkIHdpdGggdGhlIHRhaWwgc3dpcGUuIFRoZSBib3VsZGVyIGNhbWUgY3Jhc2hpbmcgZG93bi5cIiwgXCJjb3VsZG4ndCBydW4gYXdheSBpbiB0aW1lIHdoZW4gdGhlIGRyYWdvbiBhdHRhY2tlZCB3aXRoIGEgaGFyZCB0YWlsIHN3aXBlLCBidXQgcnVwdHVyZWQgaW50ZXJuYWwgb3JnYW5zLlwiLCBcInRyaXBwZWQgd2hlbiB0aGUgZHJhZ29uIHN0b21wZWQgdGhlIGdyb3VuZCwgd2hpY2ggaXQgdG9vayBhZHZhbnRhZ2Ugb2YgYnkgYnJlYXRoaW5nIGZpcmUgYW5kIHR1cm5pbmcgdGhlIHBvb3IgbWFnZSBpbnRvIGFzaC5cIl1cclxuXHRcdF07XHJcblx0XHJcblxyXG5cdGdhbWUub3V0Y29tZXMud2FycmlvciA9IHt9O1xyXG5cdFx0Z2FtZS5vdXRjb21lcy53YXJyaW9yLmFsaXZlID0gW1wic3Vydml2ZWQgdGhlIGJhdHRsZSBhbmQgbWFuYWdlZCB0byBnYWluIGV4dHJhIGdvbGQuXCIsIFwic3Vydml2ZWQgdGhlIGJhdHRsZSBhbmQgbWFuYWdlZCB0byB0YWtlIGEgYnJhbmQgbmV3IHN3b3JkIGZyb20gdGhlIGRyYWdvbidzIHRyZWFzdXJlIHN0YXNoLlwiLCBcImxpdmVkIHRocm91Z2ggdGhlIGVuY291bnRlciBhbmQgd2lsbCBiZSBhYmxlIHRvIHRlbGwgc3RvcmllcyBvZiB0aGUgZmlnaHQgdG8gZnV0dXJlIGdlbmVyYXRpb25zLlwiXTtcclxuXHRcdGdhbWUub3V0Y29tZXMud2Fycmlvci5kZWFkID0gW1wiZm91Z2h0IHZhbGlhbnRseSBhbmQgZGllZCBob25vdXJhYmx5LCB0cnlpbmcgdG8gcHJvdGVjdCB0aGUgcGFydHkuXCIsIFwidHJpZWQgdG8gcnVuIGZyb20gdGhlIGRyYWdvbidzIGF0dGFjaywgYnV0IGRpZG4ndCBtYWtlIGl0IGFuZCB3YXMga2lsbGVkLlwiLCBcIndhcyBjb21wbGV0ZWx5IG91dG1hdGNoZWQgYnkgdGhlIGRyYWdvbiBhbmQgY291bGRuJ3QgbGl2ZSB0byB0ZWxsIHRoZSB0YWxlLlwiXTtcclxuXHRcdGdhbWUub3V0Y29tZXMud2Fycmlvci5hdHRhY2tQcmVwID0gW1wiYnJhdmVseSBjaGFyZ2VkIGF0IHRoZSBkcmFnb24gYW5kXCIsIFwidG9vayBwb3NpdGlvbiBvbiB0aGUgZnJvbnQgbGluZXMgYW5kXCIsIFwic3F1YXR0ZWQgZG93biBzbGlnaHRseSBpbiBhIGZpZ2h0aW5nIHN0YW5jZSBhbmRcIl07XHJcblx0XHRnYW1lLm91dGNvbWVzLndhcnJpb3IuYXR0YWNrID0ge307XHJcblx0XHRcdGdhbWUub3V0Y29tZXMud2Fycmlvci5hdHRhY2suc3VjY2VzcyA9IFtcclxuXHRcdFx0XHRbXCJzbGFzaGVkIGF0IHRoZSBkcmFnb24sIHdvdW5kaW5nIGl0IHNsaWdodGx5LlwiLCBcInN0dW5uZWQgdGhlIGRyYWdvbiB3aXRoIGEgc2hpZWxkIGF0dGFjayB0byBpdHMgaGVhZC5cIiwgXCJtYW5hZ2VkIHRvIHRha2UgYSBmZXcgc2NhbGVzIG9mZiB0aGUgZHJhZ29uIGFuZCBnb3QgYSBjb3VwbGUgY2xlYW4gY3V0cyBpbi5cIl0sXHJcblx0XHRcdFx0W1wic3R1bm5lZCB0aGUgZHJhZ29uIHdpdGggYSBzaGllbGQgYXR0YWNrIHRvIGl0cyBoZWFkIGFuZCB0aGVuIHN0YWJiZWQgb25lIG9mIGl0cyBleWVzIG91dC5cIiwgXCJkZWZ0bHkgc2xhc2hlZCBhdCB0aGUgZHJhZ29uLCBzbGljaW5nIG9mIGl0cyBmcm9udCBjbGF3cy5cIiwgXCJmb3VuZCBhIHdlYWsgc3BvdCBpbiB0aGUgZHJhZ29uJ3MgYXJtb3IgYW5kIG1hbmFnZWQgdG8gaGl0IGZsZXNoLlwiXVxyXG5cdFx0XHRdO1xyXG5cdFx0XHRnYW1lLm91dGNvbWVzLndhcnJpb3IuYXR0YWNrLmZhaWwgPSBbXCJzbGFzaGVkIGF0IHRoZSBkcmFnb24ncyB0YWlsIGJ1dCBtaXNzZWQgcmVwZWF0ZWRseS5cIiwgXCJ0cmllZCB0byBzbGFzaCBhdCBvbmUgb2YgdGhlIGRyYWdvbidzIGxlZ3MgYnV0IHN0dW1ibGVkIGFuZCBtaXNzZWQuXCIsIFwiY29ubmVjdGVkIGEgc3RhYiBhdCB0aGUgZHJhZ29uLCBidXQgaXRzIHNjYWxlcyBwcm92ZWQgdG9vIGhhcmQgdG8gcGVuZXRyYXRlLlwiXTtcclxuXHRcdGdhbWUub3V0Y29tZXMud2Fycmlvci5iZXRyYXlQcmVwID0gW1wiaGFkIGJlZW4gcGxvdHRpbmcgdG8gYmV0cmF5IHRoZSBwYXJ0eSBmcm9tIHRoZSBnZXQgZ28gc29cIiwgXCJnb3QgdG8gdGFzdGUgdmljdG9yeSwgYnV0IHdhbnRlZCBtb3JlIHNvXCIsIFwiZmVsbCB2aWN0aW0gdG8gdGhlIGRyYWdvbidzIGRhcmsgbWFnaWMgYW5kXCJdO1xyXG5cdFx0Z2FtZS5vdXRjb21lcy53YXJyaW9yLmJldHJheWFsID0gW1widHVybmVkIGFyb3VuZCBhbmQgbWFkZSBzdXJlIHRoZXJlIHdlcmUgbm8gc3Vydml2b3JzIHRvIHNoYXJlIHRoZSBnbG9yeSB3aXRoLlwiLCBcImtub2NrZWQgb3V0IHRoZSBzdXJ2aXZpbmcgbWVtYmVycyBvZiB0aGUgcGFydHkgYW5kIHN0b2xlIHRoZWlyIGVxdWlwbWVudC5cIiwgXCJ0aWVkIHVwIGFuZCBsb2NrZWQgdGhlIG90aGVyIG1lbWJlcnMgaW4gYSByb29tIGFmdGVyIHJvYmJpbmcgdGhlbS5cIl07XHJcblx0XHRnYW1lLm91dGNvbWVzLndhcnJpb3IuZGFtYWdlID0gW1xyXG5cdFx0XHRbXCJkZWZ0bHkgZG9kZ2VkIGV2ZXJ5IGF0dGFjayB0aGUgZHJhZ29uIG1hZGUuXCIsIFwibWFuYWdlZCB0byBibG9jayBldmVyeSBvbmUgb2YgdGhlIGRyYWdvbidzIGF0dGFja3MgYW5kIGVtZXJnZSB3aXRob3V0IGEgc2NyYXRjaC5cIiwgXCJuZXZlciBzdGF5ZWQgc3RpbGwgZW5vdWdoIGZvciB0aGUgZHJhZ29uIHRvIGxhbmQgYW4gYXR0YWNrLlwiXSxcclxuXHRcdFx0W1wiZ290IGhpdCBieSBhIGxpZ2h0bmluZyBib2x0IGNhc3QgYnkgdGhlIG1hZ2UgdGhhdCByZWZsZWN0ZWQgb2ZmIHRoZSBkcmFnb24ncyBtYWdpYyBzY2FsZXMuXCIsIFwidHJpZWQgdG8gZG9kZ2UgdGhlIGZpcmUgYnJlYXRoIG9mIHRoZSBkcmFnb24sIGJ1dCBzdGlsbCBnb3Qgc2luZ2VkLlwiLCBcInNsYXNoZWQgYXQgdGhlIGRyYWdvbiBidXQgdGhlIHN3b3JkIGJyb2tlIG9uIGl0cyBzY2FsZXMgYW5kIHRoZSByaWNvY2hldCBmbGV3IGp1c3Qgd2lkZSwgYnV0IGNsb3NlIGVub3VnaCB0byBsZWF2ZSBhIG1hcmsuXCJdLFxyXG5cdFx0XHRbXCJnb3Qgc21hY2tlZCBoYXJkIGJ5IHRoZSBkcmFnb24ncyB0YWlsLCBjcmFja2luZyBhIGZldyByaWJzLlwiLCBcImdvdCBzbGFzaGVkIGJ5IHRoZSBkcmFnb24ncyBjbGF3cyBhbmQgbG9zdCBhbiBhcm0uXCIsIFwidHJpZWQgdG8gZG9kZ2Ugd2hlbiB0aGUgZHJhZ29uIGh1cmxlZCBhIGJvdWxkZXIsIGJ1dCB0aGUgaW1wYWN0IHNlbnQgZGVicmlzIGZseWluZyBhbmQgdGhlIHNoYXJwZXIgcGllY2VzIHdlcmUgZHJhd2luZyBibG9vZC5cIl0sXHJcblx0XHRcdFtcImNvdWxkbid0IGRvZGdlIHRoZSBkcmFnb24ncyBmbGFtZXMgYW5kIHdhcyB0dXJuZWQgdG8gYXNoLlwiLCBcImdvdCBjcnVzaGVkIHVuZGVybmVhdGggdGhlIGRyYWdvbidzIGZvb3QuXCIsIFwidG9vayBhIHRhaWwgc3dpcGUgZnJvbSB0aGUgZHJhZ29uIHdpdGggaXRzIGZ1bGwgd2VpZ2h0IGJlaGluZCB0aGUgYXR0YWNrLCB3aGljaCBicm9rZSBhIGxvdCBvZiBib25lcyBhbmQgcnVwdHVyZWQgYSBmZXcgb3JnYW5zLlwiXVxyXG5cdFx0XTtcclxuXHJcblx0Z2FtZS5vdXRjb21lcy5iYXJkID0ge307XHJcblx0XHRnYW1lLm91dGNvbWVzLmJhcmQuYWxpdmUgPSBbXCJzdXJ2aXZlZCB0aGUgYmF0dGxlIGJ1dCB0aGUgbHlyZSB3YXMgZGFtYWdlZC5cIiwgXCJ3aWxsIGxpdmUgdG8gc2luZyB0aGUgYmFsbGFkIG9mIHRoZSBoZXJvZXMnIGZpZ2h0LlwiLCBcImxpdmVkIGFuZCB3aWxsIGhhdmUgYSBmZXcgc2NhcnMgdG8gc2hvdyBmb3IgaXQuXCJdO1xyXG5cdFx0Z2FtZS5vdXRjb21lcy5iYXJkLmRlYWQgPSBbXCJkaWVkIGNsdXRjaGluZyB0aGUgbHlyZSB3aGlsZSB0YWtpbmcgbGV0aGFsIGRhbWFnZSBmcm9tIHRoZSBkcmFnb24uXCIsIFwiY2F1Z2h0IHRoZSBkcmFnb24ncyBhdHRlbnRpb24gd2hpbGUgcGxheWluZyBhIHNvbmcgYW5kIHRoZSBpdCB0dXJuZWQgdGhlIHBvb3IgYmFyZCBpbnRvIGEgcGlsZSBvZiBhc2guXCIsIFwic2F3IHRoZSBkcmFnb24ncyBhdHRhY2sgY29taW5nLCBidXQgY291bGRuJ3QgZ2V0IGF3YXkgaW4gdGltZSBhbmQgZGllZCBiZWNhdXNlIG9mIGl0LlwiXTtcclxuXHRcdGdhbWUub3V0Y29tZXMuYmFyZC5hdHRhY2tQcmVwID0gW1wic3RheWVkIGJhY2sgYW5kIHByb3ZpZGVkIHN1cHBvcnQgd2l0aCB0aGUgbHlyZSBieSBwbGF5aW5nIHNvbmdzIHRoYXQgYWZmZWN0ZWQgdGhlIGRyYWdvbidzIG1pbmRcIiwgXCJzdGFydGVkIHBsYXlpbmcgYSBzb25nIG9uIHRoZSBseXJlXCIsIFwiZ290IGludG8gcG9zaXRpb24sIHJlYWR5IHRvIHBsYXkgdGhlIGx5cmVcIl0sXHJcblx0XHRnYW1lLm91dGNvbWVzLmJhcmQuYXR0YWNrID0ge307XHJcblx0XHRcdGdhbWUub3V0Y29tZXMuYmFyZC5hdHRhY2suc3VjY2VzcyA9IFtcclxuXHRcdFx0XHRbXCJhbmQgdGhlIG5vaXNlIHN0dW5uZWQgdGhlIGRyYWdvbiBicmllZmx5LlwiLCBcImFuZCBwbGF5ZWQgYSBkaXNjb3JkYW50IG5vaXNlIHRoYXQgZGFtYWdlZCB0aGUgZHJhZ29uJ3MgZWFycy5cIiwgXCIsYnV0IGRlY2lkZWQgdG8gdGhyb3cgdGhlIGx5cmUgYXQgdGhlIGRyYWdvbiBhbmQgbWFuYWdlZCB0byBoaXQgaXRzIGV5ZS5cIl0sXHJcblx0XHRcdFx0W1wiYW5kIHBsYXllZCBhIG15c3RlcmlvdXMgbWVsb2R5IHRoYXQgdGhyZXcgdGhlIGRyYWdvbiBpbnRvIGEgc3RhdGUgb2YgY29uZnVzaW9uIGFuZCBodXJ0IGl0c2VsZiBncmVhdGx5LlwiLCBcImFuZCBwbGF5ZWQgYSBzYWQgbWVsb2R5IHRoYXQgc2xvd2VkIHRoZSBkcmFnb24gZG93biwgYWxsb3dpbmcgdGhlIG90aGVyIHBhcnR5IG1lbWJlcnMgdG8gZnJlZWx5IGF0dGFjayBpdC5cIiwgXCJwbGF5ZWQgYSBsdWxsYWJ5IGFuZCBwdXQgdGhlIGRyYWdvbiB0byBzbGVlcCBicmllZmx5LCBidXQganVzdCBsb25nIGVub3VnaCBmb3IgdGhlIHBhcnR5IHRvIGRvIHNvbWUgc2lnbmlmaWNhbnQgZGFtYWdlLlwiXVxyXG5cdFx0XHRdO1xyXG5cdFx0XHRnYW1lLm91dGNvbWVzLmJhcmQuYXR0YWNrLmZhaWwgPSBbXCJhbmQgdHJpZWQgdG8gcGxheSBhIG1lbG9keSBidXQgdGhlIHN0cmluZ3MgYnJva2UuXCIsIFwiLCBidXQgd2FzIGZyb3plbiB3aXRoIGZlYXIgYW5kIGNvdWxkbid0IG1vdmUuXCIsIFwic3RhcnRlZCB0byBwbGF5IHRoZSBseXJlIGJ1dCB0aGUgZHJhZ29uIHF1aWNrbHkgc3dpcGVkIGl0cyB0YWlsIGF0IHRoZSBseXJlIGFuZCBicm9rZSBpdC5cIl07XHJcblx0XHRnYW1lLm91dGNvbWVzLmJhcmQuYmV0cmF5UHJlcCA9IFtcIm1heSBoYXZlIHN1cnZpdmVkIHRoZSBiYXR0bGUgYnV0IGFsc28gaGFkIGFuIHVsdGVyaW9yIG1vdGl2ZSBzb1wiLCBcIndhcyB2ZXJ5IGdyZWVkeSBhbmQgd2FudGVkIG1vcmUgdGhhbiBqdXN0IHRvIGJlIGtub3duIHRvIGhhdmUgZmFjZWQgb2ZmIGFnYWluc3QgYSBkcmFnb24uXCIsIFwid2FzIGFsd2F5cyBhIHZlcnkgZ3JlZWR5IHBlcnNvbiwgc29cIl1cclxuXHRcdGdhbWUub3V0Y29tZXMuYmFyZC5iZXRyYXlhbCA9IFtcInB1dCBldmVyeWJvZHkgdG8gc2xlZXAgd2l0aCBhIGx1bGxhYnkgYW5kIHN0b2xlIGFsbCB0aGVpciBtb25leS5cIiwgXCJ3YWl0ZWQgdW50aWwgbmlnaHQgdGltZSBhbmQgbWFkZSBzdXJlIG5vYm9keSBlbHNlIHN1cnZpdmVkLlwiLCBcInBhcmFseXplZCB0aGUgb3RoZXJzIHdpdGggYSBzdHJhbmdlIHR1bmUgYW5kIHJhbiBvZmYgdG8gY2xhaW0gYWxsIHRoZSBnbG9yeS5cIl07XHJcblx0XHRnYW1lLm91dGNvbWVzLmJhcmQuZGFtYWdlID0gW1xyXG5cdFx0XHRbXCJrZXB0IGdvb2QgZGlzdGFuY2UgZnJvbSB0aGUgZHJhZ29uIGFuZCBuZXZlciBnYXZlIGl0IHRoZSBvcHBvcnR1bml0eSB0byBsYW5kIGFuIGF0dGFjay5cIiwgXCJ3YXMgYWJsZSB0byBkb2RnZSBldmVyeSBvbmUgb2YgdGhlIGRyYWdvbidzIGF0dGFja3MuXCIsIFwid2FzIHBsYXlpbmcgYSBzdHJhbmdlIHR1bmUgdGhhdCBtYWRlIHRoZSBkcmFnb24gZmVlbCBkaXp6eSBzbyBhbnkgYXR0YWNrcyB0aGF0IGl0IG1hZGUgaGFkIG1pc3NlZC5cIl0sXHJcblx0XHRcdFtcImdvdCBodXJ0IHdoZW4gdGhlIGRyYWdvbiBodXJsZWQgYSByb2NrIGF0IHRoZSBwYXJ0eS5cIiwgXCJ3YXMgaGl0IGJ5IHRoZSBkcmFnb24ncyB0YWlsIGFuZCBnb3QgaHVydC5cIiwgXCJnb3Qga25vY2tlZCBiYWNrIGludG8gYSB0cmVlIHdoZW4gdGhlIGRyYWdvbiBmbGFwcGVkIGl0cyB3aW5ncy5cIl0sXHJcblx0XHRcdFtcIndhcyB0aHJvd24gZmFyIGJ5IGEgZ3VzdCBvZiB3aW5kIGZyb20gdGhlIGRyYWdvbidzIHdpbmdzIGFuZCBicm9rZSBhIGZldyBib25lcyBvbiB0aGUgbGFuZGluZy5cIiwgXCJjb3VsZG4ndCByZWFjdCB0byB0aGUgZHJhZ29uIHNuYXBwaW5nIGl0cyBqYXcgYW5kIGxvc3QgYSBsZWcuXCIsIFwiZGlkbid0IGdldCBhd2F5IGluIHRpbWUgd2hlbiB0aGUgZHJhZ29uIHN3aXBlZCBpdHMgdGFpbCBhcm91bmQgYW5kIHRvb2sgdGhlIGZ1bGwgYnJ1bnQgb2YgdGhlIGhpdC5cIl0sXHJcblx0XHRcdFtcIndhcyBjb21wbGV0ZWx5IGVuZ3VsZmVkIHRoZSB0aGUgZHJhZ29uJ3MgZmxhbWVzLCB3aGljaCBsZWZ0IG5vdGhpbmcgYmVoaW5kLlwiLCBcInRvb2sgYSBkZWFkbHkgc3dpcGUgZnJvbSB0aGUgZHJhZ29uJ3MgY2xhd3MgYW5kIHdhcyBtb3J0YWxseSB3b3VuZGVkLlwiLCBcImNvdWxkbid0IGRvZGdlIHdoZW4gdGhlIGRyYWdvbiBjaGFyZ2VkIGFuZCB3YXMgaW1wYWxlZCBvbiB0aGUgaXRzIGhvcm4uXCJdXHJcblx0XHRdO1xyXG5cdGdhbWUub3V0Y29tZXMuZHJhZ29uID0ge307XHJcblx0XHRnYW1lLm91dGNvbWVzLmRyYWdvbi5hbGl2ZSA9IFtcIlRoZSBEcmFnb24gV2lucy4gWW91IExvc2UuIFlvdSdyZSBhbGwgZGVhZFwiXTtcclxuXHRcdGdhbWUub3V0Y29tZXMuZHJhZ29uLmRlYWQgPSBbXCJZb3UgaGF2ZSBkZWZlYXRlZCB0aGUgZHJhZ29uLiBXb290IVwiXTtcclxuXHRcdGdhbWUub3V0Y29tZXMuZHJhZ29uLmF0dGFja1ByZXAgPSBbXCJUaGUgZHJhZ29uLCBub3QgaGFwcHkgd2l0aCB3aGF0IHRyYW5zcGlyZWQsIHJldGFsaWF0ZWQuXCIsIFwiVGhlIGRyYWdvbiwgbm93IGNsZWFybHkgYW5ub3llZCwgZm91Z2h0IGJhY2suXCJdO1xyXG5cclxuLy9yb2xsIHJhbmRvbSBwcm9wZXJ0aWVzXHJcbmdhbWUucHJvcFRvT3V0Y29tZSA9IGZ1bmN0aW9uKGpvYikge1xyXG5cdHZhciB0aGVKb2IgPSBnYW1lLmNsYXNzUHJvcGVydGllc1tqb2JdO1xyXG5cdHZhciB0aGVPdXRjb21lcyA9IGdhbWUub3V0Y29tZXNbam9iXTtcclxuXHJcblx0Ly9yYW5kb20gYXR0YWNrIG91dGNvbWVcclxuXHR0aGVKb2Iub3V0Y29tZS5wdXNoKGdhbWUucmFuZE91dGNvbWUodGhlT3V0Y29tZXMuYXR0YWNrUHJlcCkpO1xyXG5cclxuXHRpZiAodGhlSm9iLmRhbWFnZURlYWx0ID09PSAwKSB7XHJcblx0XHR0aGVKb2Iub3V0Y29tZS5wdXNoKGdhbWUucmFuZE91dGNvbWUodGhlT3V0Y29tZXMuYXR0YWNrLmZhaWwpKTtcclxuXHR9XHJcblx0ZWxzZSB7XHJcblx0XHR0aGVKb2Iub3V0Y29tZS5wdXNoKGdhbWUucmFuZE91dGNvbWUodGhlT3V0Y29tZXMuYXR0YWNrLnN1Y2Nlc3NbdGhlSm9iLmRhbWFnZURlYWx0LTFdKSk7XHJcblx0fVxyXG5cdFxyXG5cdC8vcmFuZG9tIGRhbWFnZSB0YWtlbiBvdXRjb21lXHJcblx0dGhlSm9iLm91dGNvbWUucHVzaChnYW1lLnJhbmRPdXRjb21lKGdhbWUub3V0Y29tZXMuZHJhZ29uLmF0dGFja1ByZXApKTtcclxuXHR0aGVKb2Iub3V0Y29tZS5wdXNoKGdhbWUucmFuZE91dGNvbWUodGhlT3V0Y29tZXMuZGFtYWdlW3RoZUpvYi5kYW1hZ2VUYWtlbl0pKTtcclxuXHJcblx0Ly9kcmFnb24gb3V0Y29tZVxyXG5cdGlmIChnYW1lLmRyYWdvbi5hbGl2ZSkge1xyXG5cdFx0Z2FtZS5kcmFnb24ub3V0Y29tZSA9IGdhbWUub3V0Y29tZXMuZHJhZ29uLmFsaXZlO1xyXG5cdH1cclxuXHRlbHNlIHtcclxuXHRcdGdhbWUuZHJhZ29uLm91dGNvbWUgPSBnYW1lLm91dGNvbWVzLmRyYWdvbi5kZWFkO1xyXG5cdH1cclxuXHJcblx0Ly9hbGl2ZS9kZWFkIHJhbmRvbSBvdXRjb21lXHJcblx0aWYgKHRoZUpvYi5hbGl2ZSkge1xyXG5cdFx0dGhlSm9iLm91dGNvbWUucHVzaChnYW1lLnJhbmRPdXRjb21lKHRoZU91dGNvbWVzLmFsaXZlKSk7XHJcblx0fVxyXG5cdGVsc2Uge1xyXG5cdFx0dGhlSm9iLm91dGNvbWUucHVzaChnYW1lLnJhbmRPdXRjb21lKHRoZU91dGNvbWVzLmRlYWQpKTtcclxuXHR9XHJcbn07XHJcblxyXG4vL2Z1bmN0aW9uIHRvIG91dHB1dCBhIHJhbmRvbSByZXN1bHQgd2hlbiBnaXZlbiBhbiBhcnJheVxyXG5nYW1lLnJhbmRPdXRjb21lID0gZnVuY3Rpb24oYXJyYXkpe1xyXG5cdHZhciByYW5kTnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKmFycmF5Lmxlbmd0aCk7XHJcblx0cmV0dXJuIGFycmF5W3JhbmROdW1dO1xyXG59O1xyXG5cclxuLy9yZXNldCBmdW5jdGlvblxyXG5nYW1lLnJlc2V0ID0gZnVuY3Rpb24oam9iKSB7XHJcblx0Z2FtZS50cmFpdG9yID0gZmFsc2U7XHJcblx0JChcIi5zdG9yeV90ZXh0XCIpLmVtcHR5KCk7XHJcblx0JCgnLmltYWdlX2NvbnRhaW5lcicpLnJlbW92ZSgpO1xyXG5cdCQoJy5yZXNldCcpLnJlbW92ZSgpO1xyXG5cdGZvciAodmFyIGhlcm9DbGFzcyBpbiBqb2IpIHtcclxuXHRcdGpvYltoZXJvQ2xhc3NdLm5hbWUgPSBcIlwiO1xyXG5cdFx0am9iW2hlcm9DbGFzc10uY2xhc3MgPSBcIlwiO1xyXG5cdFx0am9iW2hlcm9DbGFzc10uZGFtYWdlVGFrZW4gPSAwO1xyXG5cdFx0am9iW2hlcm9DbGFzc10uaHAgPSAzO1xyXG5cdFx0am9iW2hlcm9DbGFzc10uYWxpdmUgPSB0cnVlO1xyXG5cdFx0am9iW2hlcm9DbGFzc10udHJhaXRvciA9IGZhbHNlO1xyXG5cdFx0am9iW2hlcm9DbGFzc10gPSAkLmV4dGVuZCh7fSwgZ2FtZS5oZXJvKTtcclxuXHRcdGpvYltoZXJvQ2xhc3NdLm91dGNvbWUgPSBbXTtcclxuXHR9XHJcbn1cclxuXHJcbi8vcm9sbCBhbmQgc2V0IHRoZSBvdXRjb21lcyByYW5kb21seVxyXG5nYW1lLnNldE91dGNvbWVzID0gZnVuY3Rpb24oam9iKSB7XHJcblx0Zm9yICh2YXIgaGVyb0NsYXNzIGluIGpvYikge1xyXG5cdFx0am9iW2hlcm9DbGFzc10uZGFtYWdlVGFrZW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA0KTtcclxuXHRcdGpvYltoZXJvQ2xhc3NdLmRhbWFnZVRvSGVybygpO1xyXG5cdFx0Ly8gY2xhc3NQcm9wZXJ0aWVzW2hlcm9DbGFzc11bXCJocFwiXSAtPSBkYW1hZ2VUYWtlbjtcclxuXHRcdGpvYltoZXJvQ2xhc3NdLmlzQWxpdmUoKTtcclxuXHRcdGpvYltoZXJvQ2xhc3NdLmRhbWFnZURlYWx0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMyk7XHJcblx0XHQvLyByZW1pbmRlcjogd2lsbCBuZWVkIHRvIHNldCBwcm9iYWJpbGl0aWVzIGZvciBeXHJcblx0XHRqb2JbaGVyb0NsYXNzXS5hdHRhY2soKTtcclxuXHRcdC8vIF4gdXBkYXRlcyBkcmFnb24gSFAgYmFzZWQgb24gY29tYmluZWQgZGFtYWdlRGVhbHQgcHJvcGVydHkgdmFsdWUgb2YgZWFjaCBoZXJvXHJcblx0XHRnYW1lLmRyYWdvbi5pc0FsaXZlKCk7XHJcblx0XHQvLyBjaGVjayBmb3IgdHJhaXRvclxyXG5cdFx0dmFyIHJhbmRvbVRyYWl0b3IgPSBmYWxzZTtcclxuXHRcdGlmIChnYW1lLnRyYWl0b3IgPT09IGZhbHNlKSB7XHJcblx0XHRcdHJhbmRvbVRyYWl0b3IgPSBCb29sZWFuKE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSkpO1xyXG5cdFx0XHRpZiAocmFuZG9tVHJhaXRvcikge1xyXG5cdFx0XHRcdGpvYltoZXJvQ2xhc3NdLnRyYWl0b3IgPSB0cnVlO1xyXG5cdFx0XHRcdGdhbWUudHJhaXRvciA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGdhbWUucHJvcFRvT3V0Y29tZShoZXJvQ2xhc3MpO1xyXG5cdH07XHJcbn07XHJcblxyXG4vL3NhdmUgdXNlcm5hbWVzIGludG8gY2xhc3Mgb2JqZWN0c1xyXG5nYW1lLmdldE5hbWVzID0gZnVuY3Rpb24oam9iKSB7XHJcblx0Zm9yICh2YXIgaGVyb0NsYXNzIGluIGpvYikge1xyXG5cdFx0am9iW2hlcm9DbGFzc10uY2xhc3MgPSBoZXJvQ2xhc3M7XHJcblx0XHR2YXIgaHRtbElkID0gXCIjXCIraGVyb0NsYXNzO1xyXG5cdFx0am9iW2hlcm9DbGFzc10ubmFtZSA9ICQoaHRtbElkKS52YWwoKTtcclxuXHR9XHRcclxufVxyXG5cclxuLy93cml0ZSB0aGUgc3RvcnkgdG8gdGhlIERPTVxyXG5nYW1lLndyaXRlU3RvcnkgPSBmdW5jdGlvbihqb2IpIHtcclxuXHRnYW1lLnJlc2V0KGdhbWUuY2xhc3NQcm9wZXJ0aWVzKTtcclxuXHRnYW1lLmdldE5hbWVzKGdhbWUuY2xhc3NQcm9wZXJ0aWVzKTtcclxuXHRnYW1lLnNldE91dGNvbWVzKGdhbWUuY2xhc3NQcm9wZXJ0aWVzKTtcclxuXHRcclxuXHQkKFwiLnN0b3J5X2NvbnRhaW5lclwiKS5hcHBlbmQoYDxkaXYgY2xhc3M9XCJpbWFnZV9jb250YWluZXJcIj48aW1nIHNyYz1cImltYWdlcy9zdG9yeV9iZy5wbmdcIiBhbHQ9XCJzY3JvbGwgYmFja2dyb3VuZFwiPjwvZGl2PmApO1xyXG5cdFxyXG5cdCQoXCIuc3RvcnlfdGV4dFwiKS5hcHBlbmQoYDxoMT5UaGUgRXBpYyBvZiAke2pvYi53YXJyaW9yLm5hbWV9LCAke2pvYi5tYWdlLm5hbWV9LCBhbmQgJHtqb2IuYmFyZC5uYW1lfTwvaDE+YCk7XHJcblxyXG5cdC8vY2hlY2tpbmcgZm9yIHBhcnR5IHZzIGRyYWdvbiBhbGl2ZSBzdGF0dXNcclxuXHR2YXIgcGFydHlBbGl2ZSA9IGZhbHNlO1xyXG5cdGZvciAodmFyIGhlcm9DbGFzcyBpbiBqb2IpIHtcclxuXHRcdGlmIChqb2JbaGVyb0NsYXNzXS5hbGl2ZSA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRwYXJ0eUFsaXZlID0gdHJ1ZTtcclxuXHRcdH1cdFxyXG5cdH07XHJcblxyXG5cdC8vb3BlbmluZyB0ZXh0IGRlcGVuZGluZyBvbiB0aGUgb3V0Y29tZSBvZiB0aGUgZmlnaHRcclxuXHRpZiAoZ2FtZS5kcmFnb24uYWxpdmUpIHtcclxuXHRcdGlmIChwYXJ0eUFsaXZlKSB7XHJcblx0XHRcdCQoXCIuc3RvcnlfdGV4dFwiKS5hcHBlbmQoYDxoMj5PdXIgaGVyb2VzIGZvdWdodCB0aGUgZHJhZ29uIHZhbGlhbnRseSwgYnV0IHdpdGggaW5qdXJpZXMgb24gYm90aCBzaWRlcyBldmVyeWJvZHkgcmV0cmVhdGVkIGFuZCBjYWxsZWQgaXQgYSBEUkFXLjxoMj5gKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHQkKFwiLnN0b3J5X3RleHRcIikuYXBwZW5kKGA8aDI+VGhlIGRyYWdvbiB3YXMgdG9vIHN0cm9uZyBmb3Igb3VyIGhlcm9lcy4gTm9ib2R5IHN1cnZpdmVkLjxoMj5gKTtcclxuXHRcdH1cclxuXHR9XHJcblx0ZWxzZSB7XHJcblx0XHRpZiAocGFydHlBbGl2ZSkge1xyXG5cdFx0XHQkKFwiLnN0b3J5X3RleHRcIikuYXBwZW5kKGA8aDI+QWZ0ZXIgYSBsb25nLCBncnVlbGluZyBiYXR0bGUgdGhlIGhlcm9lcyBmaW5hbGx5IGZlbGxlZCB0aGUgZHJhZ29uLjxoMj5gKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHQkKFwiLnN0b3J5X3RleHRcIikuYXBwZW5kKGA8aDI+VGhlIGhlcm9lcyBwdXQgdXAgYSBncmVhdCBmaWdodCBhbmQgZGVmZWF0ZWQgdGhlIGRyYWdvbiwgYnV0IGF0IGEgZ3JlYXQgY29zdC4gVGhlcmUgd2VyZSBubyBzdXJ2aXZvcnMuPGgyPmApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly9tYWtpbmcgYSBzdG9yeSBzdHJpbmcgcHJpb3IgdG8gYXBwZW5kaW5nXHJcblx0Zm9yICh2YXIgaGVyb0NsYXNzIGluIGpvYikge1xyXG5cdFx0c3RvcnlTdHJpbmcgPSBcIlwiO1xyXG5cdFx0Zm9yICh2YXIgaT0wOyBpPGpvYltoZXJvQ2xhc3NdLm91dGNvbWUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0c3RvcnlTdHJpbmcgKz0gYCAke2pvYltoZXJvQ2xhc3NdLm5hbWV9ICR7am9iW2hlcm9DbGFzc10ub3V0Y29tZVtpXX1gO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vcmVwbGFjZSBuYW1lcyB3aXRoIGJsYW5rcyB0byBtYWtlIHRoZSBwYXJhZ3JhcGggZmxvdyBhbmQgdG8gZ2V0IHJpZCBvZiBzZW50ZW5jZSBmcmFnbWVudHNcclxuXHRcdHN0b3J5U3RyaW5nID0gZ2FtZS5yZXBsYWNlSW5zdGFuY2Uoc3RvcnlTdHJpbmcsIGpvYltoZXJvQ2xhc3NdLm5hbWUsIDMsIFwiXCIpO1xyXG5cdFx0c3RvcnlTdHJpbmcgPSBnYW1lLnJlcGxhY2VJbnN0YW5jZShzdG9yeVN0cmluZywgam9iW2hlcm9DbGFzc10ubmFtZSwgMiwgXCJcIik7XHJcblxyXG5cdFx0JChcIi5zdG9yeV90ZXh0XCIpLmFwcGVuZChgPGgyPiR7am9iW2hlcm9DbGFzc10ubmFtZX0gdGhlIDxzcGFuIGNsYXNzPVwiJHtqb2JbaGVyb0NsYXNzXS5jbGFzc31cIj4ke2pvYltoZXJvQ2xhc3NdLmNsYXNzfTwvc3Bhbj4uLi5gKTtcclxuXHRcdCQoXCIuc3RvcnlfdGV4dFwiKS5hcHBlbmQoYDxwPiR7c3RvcnlTdHJpbmd9PC9wPmApO1xyXG5cdH1cclxuXHJcblx0Ly9iZXRyYXlhbCBzY2VuYXJpb1xyXG5cdGdhbWUuY2hlY2tGb3JUcmFpdG9yKGdhbWUuY2xhc3NQcm9wZXJ0aWVzKTtcclxuXHJcblx0Ly9yZXNldCBidXR0b25cclxuXHQkKFwiLnN0b3J5X2NvbnRhaW5lclwiKS5hcHBlbmQoYDxhIGhyZWY9XCIjdG9wXCIgY2xhc3M9XCJyZXNldFwiPjxidXR0b24+UmVzZXQ8L2J1dHRvbj48L2E+YCk7XHJcbn1cclxuXHJcbi8vcmVwbGFjZXMgdGhlIG50aCBpbnN0YW5jZSBvZiBcImxvb2tGb3JcIiBpbiBzdHJpbmdcIiB3aXRoIFwicmVwbGFjZVdpdGhcIlxyXG5nYW1lLnJlcGxhY2VJbnN0YW5jZSA9IGZ1bmN0aW9uKHN0cmluZywgbG9va0ZvciwgaW5kZXgsIHJlcGxhY2VXaXRoKSB7XHJcblx0dmFyIHN0cmluZ0FycmF5ID0gc3RyaW5nLnNwbGl0KFwiIFwiKTtcclxuXHR2YXIgbWF0Y2ggPSAwO1xyXG5cclxuXHRmb3IgKHZhciBpPTA7IGk8PXN0cmluZ0FycmF5Lmxlbmd0aDsgaSsrKXtcclxuXHRcdGlmIChzdHJpbmdBcnJheVtpXSA9PT0gbG9va0Zvcikge1xyXG5cdFx0XHRtYXRjaCsrO1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKG1hdGNoID09PSBpbmRleCkge1x0XHRcdFx0XHJcblx0XHRcdFx0c3RyaW5nQXJyYXlbaV0gPSByZXBsYWNlV2l0aDtcdFx0XHRcdFxyXG5cdFx0XHR9XHJcblx0XHR9XHRcdFxyXG5cdH1cdFxyXG5cdHJldHVybiBzdHJpbmdBcnJheS5qb2luKFwiIFwiKTtcclxufTtcclxuXHJcbi8vY2hlY2tzIGZvciBleGlzdGVuY2VzIG9mIHRyYWl0b3JzXHJcbmdhbWUuY2hlY2tGb3JUcmFpdG9yID0gZnVuY3Rpb24oam9iKSB7XHJcblx0dmFyIGhlcm9lc0FsaXZlID0gW107XHJcblxyXG5cdGZvciAodmFyIGhlcm9DbGFzcyBpbiBqb2Ipe1x0XHRcdFx0XHJcblx0XHRpZiAoam9iW2hlcm9DbGFzc10uYWxpdmUpIHtcclxuXHRcdFx0aGVyb2VzQWxpdmUucHVzaChgJHtqb2JbaGVyb0NsYXNzXS5uYW1lfSB0aGUgJHtqb2JbaGVyb0NsYXNzXS5jbGFzc31gKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZvciAodmFyIGhlcm9DbGFzcyBpbiBqb2Ipe1xyXG5cdFx0aWYgKGpvYltoZXJvQ2xhc3NdLnRyYWl0b3IgJiYgaGVyb2VzQWxpdmUubGVuZ3RoID4gMSkge1xyXG5cdFx0XHRpZiAoam9iW2hlcm9DbGFzc10uYWxpdmUpIHtcclxuXHRcdFx0XHQkKFwiLnN0b3J5X3RleHRcIikuYXBwZW5kKGA8aDI+QWZ0ZXIgdGhlIGJhdHRsZS4uLjxoMj5gKTtcdFx0XHRcdFxyXG5cdFx0XHRcdCQoXCIuc3RvcnlfdGV4dFwiKS5hcHBlbmQoYDxwPiR7am9iW2hlcm9DbGFzc10ubmFtZX0gJHtnYW1lLnJhbmRPdXRjb21lKGdhbWUub3V0Y29tZXNbaGVyb0NsYXNzXS5iZXRyYXlQcmVwKX0gJHtqb2JbaGVyb0NsYXNzXS5uYW1lfSAke2dhbWUucmFuZE91dGNvbWUoZ2FtZS5vdXRjb21lc1toZXJvQ2xhc3NdLmJldHJheWFsKX08L3A+YCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5nYW1lLmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHRnYW1lLnJlc2V0KGdhbWUuY2xhc3NQcm9wZXJ0aWVzKTtcclxuXHQkKFwiZm9ybVwiKS5vbihcInN1Ym1pdFwiLCBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRnYW1lLndyaXRlU3RvcnkoZ2FtZS5jbGFzc1Byb3BlcnRpZXMpO1xyXG5cdFx0JChcIi5zdG9yeV9jb250YWluZXJcIikuY3NzKFwiZGlzcGxheVwiLFwiYmxvY2tcIik7XHRcdFxyXG5cdFx0XHJcblx0XHQvL3Njcm9sbCBkb3duIGFmdGVyIHN1Ym1pdFxyXG5cdCAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcblx0ICAgICAgICBzY3JvbGxUb3A6ICQoXCIuc3RvcnlfY29udGFpbmVyXCIpLm9mZnNldCgpLnRvcFxyXG5cdCAgICB9LCAxNTAwKTtcclxuXHJcblx0XHQkKFwiLnJlc2V0XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoXCIuc3RvcnlfdGV4dFwiKS5lbXB0eSgpO1xyXG5cdFx0XHQkKFwiLnN0b3J5X2NvbnRhaW5lclwiKS5jc3MoXCJkaXNwbGF5XCIsXCJub25lXCIpO1xyXG5cdFx0XHRnYW1lLmluaXQoKTsgLy9yZWN1cnNpb24gc28gdGhlIGdhbWUgcnVucyBpbmRlZmluaXRlbHlcclxuXHRcdH0pO1x0XHRcclxuXHR9KTtcclxufTtcclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcblx0Z2FtZS5pbml0KCk7XHJcbn0pO1xyXG5cclxuXHJcbi8vIFBTRVVETyBDT0RFOlxyXG5cclxuLy8gMS4gRm9ybSB3aXRoIGFuIGlucHV0IGZpZWxkIGFzc29jaWF0ZWQgd2l0aCBvbmUgb2YgMyBjaGVja2JveGVzIChyYWRpbyBidXR0b25zIC0gY2FuIG9ubHkgY2hvb3NlIG9uZSBvcHRpb24pLiBJbnB1dCB0YWtlcyBleGFjdGx5IDMgbmFtZXMgKHN0cmluZ3MpLiBGb3IgZWFjaCBpbnB1dCBmaWVsZCB5b3UgbXVzdCBhbHNvIHNlbGVjdCBhbiBpbnB1dCBmaWVsZCBcImNsYXNzOiBCYXJkLCBNYWdlLCBXYXJyaW9yXCIuXHJcbi8vIEpTOiBBZGQgYXR0cmlidXRlIG9mIFwiZGlzYWJsZWRcIiB0byBhIGNsYXNzIG9wdGlvbiB3aGVuIGl0J3MgYmVlbiBzZWxlY3RlZCBmb3Igb25lIG9mIHRoZSBvdGhlciBpbnB1dCBmaWVsZHMuIFRoZXJlIGNhbiBvbmx5IGJlIG9uZSB3YXJyaW9yLCBvbmUgbWFnZSwgYW5kIG9uZSBiYXJkIHBlciBwYXJ0eS5cclxuXHQvLyBlLmcuIGlmIHdhcnJpb3Igc2VsZWN0ZWQgYnkgMXN0IHBsYXllciwgY2Fubm90IGJlIHNlbGVjdGVkIGJ5IDJuZCBvciAzcmRcclxuXHJcbi8vIFN1Ym1pdCBidXR0b24gdGhhdCBzYXlzIFwiRmlnaHQhXCJcclxuLy8gT25jZSBoaXQgc3VibWl0IGJ1dHRvbjpcclxuLy8gMi4gRGllIHJvbGwgZm9yIGVhY2ggaGVybyBvYmplY3QgcHJvcGVydHkgdmFsdWU6XHJcblx0Ly8gMyB2YWx1ZXM6XHJcblx0Ly8gRGFtYWdlIHRha2VuIChudW1iZXIpLCBkYW1hZ2UgZGVhbHQgKG51bWJlciksIGJldHJheWFsIChib29sZWFuKVxyXG5cclxuXHQvLyBudW1iZXIgcmFuZ2UgZm9yIHRoZSBudW1iZXIgdmFsdWVzOiBkZXBlbmRzIG9uIGhvdyBtYW55IG91dGNvbWVzIHlvdSB3YW50PyBXaWxsIG5ldmVyIGJlIGRpc3BsYXllZCB0byB0aGUgcGxheWVyLiBTbyBtYXliZSAxLTMuIGlmIHlvdSB0YWtlIDAgZGFtYWdlLCB5b3UncmUgaW52aW5jaWJsZSEgMSBkYW1hZ2UsIHlvdSdyZSBmaW5lLiBJZiB5b3UgdGFrZSAyIHlvdSdyZSBuZWFybHkgZGVhZCwgMyBpcyBkZWFkLlxyXG5cclxuXHQvLyBkYW1hZ2UgZGVhbHQ6IDAsIDEsIDIgKG5vdCBlcXVhbCBjaGFuY2Ugb2YgZ2V0dGluZyByZXN1bHRzLiAyIGlzIHJhcmVzdC4gRHJhZ29uIGhhcyBhIHRvdGFsIG9mIDRIUCAqKkNBTiBURVNUIE9VVClcclxuXHJcblx0Ly8gYmV0cmF5YWw6IHJvbGwgZWl0aGVyIDAsIDEsIDIsIDMuIE51bWJlciBjb3JyZXNwb25kcyB0byB0cmFpdG9yIChpZiAwLCBubyB0cmFpdG9yKSAtIDEgPSAxc3QgcGxheWVyIHRyYWl0b3IsIDIgPSAybmQgcGxheWVyIGV0Yy5cclxuXHQvLyB1c2luZyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxIGhpZ2hlciB0aGFuIHRoZSBudW1iZXIgd2UgbmVlZClcclxuXHJcbi8vIDMuIEZvciBlYWNoIG91dGNvbWUsIGNhbGwgYXBwcm9wcmlhdGUgbWV0aG9kIHRvIHVwZGF0ZSB0aGUgY29ubmVjdGVkIGhlcm8gb2JqZWN0IGFuZCB0aGUgZHJhZ29uIG9iamVjdC5cclxuLy8gQ0hFQ0sgYW5kIHRoZW4gU0FWRSBhcHByb3ByaWF0ZSBvdXRjb21lIGluIG91ciBoZXJvIG9iamVjdCdzIG91dGNvbWUgYXJyYXkgKGN1cnJlbnRseSBibGFuaylcclxuXHJcblxyXG4vLyA0LiBOZXcgaGVybyBwcm9wZXJ0aWVzIGFyZSBjb25uZWN0ZWQgd2l0aCBvdXRjb21lIGFycmF5cz8gXHJcblxyXG5cclxuLy8gNS4gUG9wdWxhdGUgc3RvcnkgYXJyYXkgd2l0aCBvdXRjb21lcyBpbiBhcHByb3ByaWF0ZSBvcmRlci5cclxuXHJcblxyXG5cclxuXHJcbi8vIEhlcm8gb2JqZWN0cyB3aXRoIGRpZmZlcmVudCBrZXkgdmFsdWVzLiBUaGUgb3V0Y29tZSBkZXBlbmRzIG9uIHdoYXQgdGhlIGtleSB2YWx1ZXMgYXJlLiBcclxuXHQvLyBLZXkgdmFsdWVzIGFyZSBkZXRlcm1pbmVkIGJ5IHJhbmRvbSBcImRpZSByb2xsXCJcclxuXHJcbi8vIEZJTkFMIEZJTkFMIE9VVENPTUU6IFNlcmllcyBvZiBzZW50ZW5jZXMgcHV0IHRvZ2V0aGVyIHRoYXQgY29uc2lzdCBvZiBzbWFsbGVyIG91dGNvbWVzIHRoYXQgYXJlIGRldGVybWluZWQgYnkgcHJvcGVydHkgdmFsdWVzIG9mIGVhY2ggaGVybyBvYmplY3QuXHJcbiJdfQ==
