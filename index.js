// Version 1.36 r:00

const Command = require('command')
const battleground = require('./battleground.js')
const config = require('./config.json')

// credit : https://github.com/Some-AV-Popo
String.prototype.clr = function (hexColor) { return `<font color="#${hexColor}">${this}</font>` }

module.exports = function AutoVanguard(d) {
	const command = Command(d)

	let enable = config.enable

	let hold = false,
		questId = 0

	// for self -- comment out for regular usage
	// 0 = Warrior, 1 = Lancer, 2 = Slayer, 3 = Berserker, 4 = Sorcerer, 5 = Archer,
	// 6 = Priest, 7 = Mystic, 8 = Reaper, 9 = Gunner, 10 = Brawler, 11 = Ninja,
	//12 = Valkyrie
	/* d.hook('S_LOGIN', (e) => {
		(((e.templateId - 10101) % 100) !== 5) ? enable = true : enable = false
	}) */

	// code
	// if in battleground, hold completion until openworld
	// else check if there is a quest to complete
	d.hook('S_LOAD_TOPO', (e) => {
		if (battleground.includes(e.zone)) { hold = true }
		else if (hold && questId !== 0) { completeQuest(); hold = false }
	})

	// if not in battleground, complete vangaurd quest
	// otherwise, hold questId for later completion
	d.hook('S_COMPLETE_EVENT_MATCHING_QUEST', (e) => {
		if (!enable) return
		questId = e.id
		if (!hold) completeQuest()
		return false
	})

	//helper
	// rudimentary attempt to complete both extra events
	function completeQuest() {
		d.toServer('C_COMPLETE_DAILY_EVENT', { id: questId })
		try {
			setTimeout(() => { d.toServer('C_COMPLETE_EXTRA_EVENT', { type: 0 }) }, 500)
			setTimeout(() => { d.toServer('C_COMPLETE_EXTRA_EVENT', { type: 1 }) }, 500)
		} catch (e) {
			// do nothing
		}
		questId = 0
	}

	// command
	// toggle
	command.add(['vanguard', 'vg', 'ㅍㅎ'], () => {
		enable = !enable
		send(`${enable ? 'Enabled'.clr('56B4E9') : 'Disabled'.clr('E69F00')}`)
	})
	function send(msg) { command.message(`[auto-vanguard] : ` + msg) }

}
