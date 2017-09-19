//ADD IN OUTCOMES FOR BETRAYED + DEAD/ALIVE
	game.outcomes = {};

	// outcome order: attack(success/fail), damageTaken, traitor, alive/dead,
	game.outcomes.mage = {};
		game.outcomes.mage.alive = ["survived the fight. ", "is alive, but the staff was lost.", "somehow managed to live despite being out of mana."];
		game.outcomes.mage.dead = ["didn't survive the encounter.", "didn't live to tell the tale.", "is no longer amongst the living."];
		game.outcomes.mage.attackPrep = ["began waving a staff wildly in the air and ", "pointed at the dragon and", "started chanting and"];
		game.outcomes.mage.attack = {};
			game.outcomes.mage.attack.success = [
				["cast a bolt of lightning that hit the dragon, barely leaving a mark.", "threw a fireball, which didn't do much against the dragon.", "levitated some rocks and launched them at the dragon, damaging its hide."],
				["completely froze the dragon's wings, which shattered into pieces.", "opened a pitfall underneath the dragon. The fall broke the dragon's legs.", "hurled a large icicle at the dragon, which left a gaping hole in one of its wings."]
			];
			game.outcomes.mage.attack.fail = ["cast a fireball, but missed.", "conjured an icicle to hurl at the dragon, but the dragon deftly dodged it.", "tried to cast a spell, but the dragon caught on and interrupted it by throwing a boulder."];
		//betrayal outcomes assume traitor is alive, which is checked with an if statement before displaying
		game.outcomes.mage.betrayPrep = ["was hit with a strong feeling of greed so", "was just faking being a hero and actually had something else planned.", "decided that just the feeling of adventure wasn't enough."]
		game.outcomes.mage.betrayal = ["stole the party's gold. The traitor!", "poisoned the surviving heroes in their sleep, not wanting to share the fame and fortune.", "wiped the rest of the party out by burying them alive in a hole conjured by earth magic. Now the fame, fortune, and glory can be claimed by only one person."];
		game.outcomes.mage.damage = [
			["dodged the dragon's tail swipe by floating over it.", "put up a strong defensive barrier, taking no damage.", "made a large wall out of the earth and stopped the dragon's attack from landing."],
			["got swatted by the dragon, taking a small amount of damage.", "didn't completely dodge the dragon's fire breath and got burned in the arm.", "got hit by a few rocks that were kicked up by the dragon's tail."],
			["got smacked hard by the dragon's tail, cracking a few ribs.", "got slashed by the dragon's claws and lost an arm.", "took a head on charge by the dragon and broke a few bones."],
			["conjured a large boulder to hurl at the dragon, but the dragon interrupted with the tail swipe. The boulder came crashing down.", "couldn't run away in time when the dragon attacked with a hard tail swipe, but ruptured internal organs.", "tripped when the dragon stomped the ground, which it took advantage of by breathing fire and turning the poor mage into ash."]
		];
	

	game.outcomes.warrior = {};
		game.outcomes.warrior.alive = ["survived the battle and managed to gain extra gold.", "survived the battle and managed to take a brand new sword from the dragon's treasure stash.", "lived through the encounter and will be able to tell stories of the fight to future generations."];
		game.outcomes.warrior.dead = ["fought valiantly and died honourably, trying to protect the party.", "tried to run from the dragon's attack, but didn't make it and was killed.", "was completely outmatched by the dragon and couldn't live to tell the tale."];
		game.outcomes.warrior.attackPrep = ["bravely charged at the dragon and", "took position on the front lines and", "squatted down slightly in a fighting stance and"];
		game.outcomes.warrior.attack = {};
			game.outcomes.warrior.attack.success = [
				["slashed at the dragon, wounding it slightly.", "stunned the dragon with a shield attack to its head.", "managed to take a few scales off the dragon and got a couple clean cuts in."],
				["stunned the dragon with a shield attack to its head and then stabbed one of its eyes out.", "deftly slashed at the dragon, slicing of its front claws.", "found a weak spot in the dragon's armor and managed to hit flesh."]
			];
			game.outcomes.warrior.attack.fail = ["slashed at the dragon's tail but missed repeatedly.", "tried to slash at one of the dragon's legs but stumbled and missed.", "connected a stab at the dragon, but its scales proved too hard to penetrate."];
		game.outcomes.warrior.betrayPrep = ["had been plotting to betray the party from the get go so", "got to taste victory, but wanted more so", "fell victim to the dragon's dark magic and"];
		game.outcomes.warrior.betrayal = ["turned around and made sure there were no survivors to share the glory with.", "knocked out the surviving members of the party and stole their equipment.", "tied up and locked the other members in a room after robbing them."];
		game.outcomes.warrior.damage = [
			["deftly dodged every attack the dragon made.", "managed to block every one of the dragon's attacks and emerge without a scratch.", "never stayed still enough for the dragon to land an attack."],
			["got hit by a lightning bolt cast by the mage that reflected off the dragon's magic scales.", "tried to dodge the fire breath of the dragon, but still got singed.", "slashed at the dragon but the sword broke on its scales and the ricochet flew just wide, but close enough to leave a mark."],
			["got smacked hard by the dragon's tail, cracking a few ribs.", "got slashed by the dragon's claws and lost an arm.", "tried to dodge when the dragon hurled a boulder, but the impact sent debris flying and the sharper pieces were drawing blood."],
			["couldn't dodge the dragon's flames and was turned to ash.", "got crushed underneath the dragon's foot.", "took a tail swipe from the dragon with its full weight behind the attack, which broke a lot of bones and ruptured a few organs."]
		];

	game.outcomes.bard = {};
		game.outcomes.bard.alive = ["survived the battle but the lyre was damaged.", "will live to sing the ballad of the heroes' fight.", "lived and will have a few scars to show for it."];
		game.outcomes.bard.dead = ["died clutching the lyre while taking lethal damage from the dragon.", "caught the dragon's attention while playing a song and the it turned the poor bard into a pile of ash.", "saw the dragon's attack coming, but couldn't get away in time and died because of it."];
		game.outcomes.bard.attackPrep = ["stayed back and provided support with the lyre by playing songs that affected the dragon's mind", "started playing a song on the lyre", "got into position, ready to play the lyre"],
		game.outcomes.bard.attack = {};
			game.outcomes.bard.attack.success = [
				["and the noise stunned the dragon briefly.", "and played a discordant noise that damaged the dragon's ears.", ",but decided to throw the lyre at the dragon and managed to hit its eye."],
				["and played a mysterious melody that threw the dragon into a state of confusion and hurt itself greatly.", "and played a sad melody that slowed the dragon down, allowing the other party members to freely attack it.", "played a lullaby and put the dragon to sleep briefly, but just long enough for the party to do some significant damage."]
			];
			game.outcomes.bard.attack.fail = ["and tried to play a melody but the strings broke.", ", but was frozen with fear and couldn't move.", "started to play the lyre but the dragon quickly swiped its tail at the lyre and broke it."];
		game.outcomes.bard.betrayPrep = ["may have survived the battle but also had an ulterior motive so", "was very greedy and wanted more than just to be known to have faced off against a dragon.", "was always a very greedy person, so"]
		game.outcomes.bard.betrayal = ["put everybody to sleep with a lullaby and stole all their money.", "waited until night time and made sure nobody else survived.", "paralyzed the others with a strange tune and ran off to claim all the glory."];
		game.outcomes.bard.damage = [
			["kept good distance from the dragon and never gave it the opportunity to land an attack.", "was able to dodge every one of the dragon's attacks.", "was playing a strange tune that made the dragon feel dizzy so any attacks that it made had missed."],
			["got hurt when the dragon hurled a rock at the party.", "was hit by the dragon's tail and got hurt.", "got knocked back into a tree when the dragon flapped its wings."],
			["was thrown far by a gust of wind from the dragon's wings and broke a few bones on the landing.", "couldn't react to the dragon snapping its jaw and lost a leg.", "didn't get away in time when the dragon swiped its tail around and took the full brunt of the hit."],
			["was completely engulfed the the dragon's flames, which left nothing behind.", "took a deadly swipe from the dragon's claws and was mortally wounded.", "couldn't dodge when the dragon charged and was impaled on the its horn."]
		];
	game.outcomes.dragon = {};
		game.outcomes.dragon.alive = ["The Dragon Wins. You Lose. You're all dead"];
		game.outcomes.dragon.dead = ["You have defeated the dragon. Woot!"];
		game.outcomes.dragon.attackPrep = ["The dragon, not happy with what transpired, retaliated.", "The dragon, now clearly annoyed, fought back."];