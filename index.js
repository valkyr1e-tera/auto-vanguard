// OPCODE REQUIRED :
// - C_COMPLETE_DAILY_EVENT
// - C_COMPLETE_EXTRA_EVENT
// - S_COMPLETE_EVENT_MATCHING_QUEST
// - S_LOGIN

// Version 1.34 r:01

module.exports = function AutoVanguard(d) {

	let enable = true

	// for self -- comment out for regular usage
	/*
		0 = Warrior, 1 = Lancer, 2 = Slayer, 3 = Berserker, 4 = Sorcerer, 5 = Archer,
		6 = Priest, 7 = Mystic, 8 = Reaper, 9 = Gunner, 10 = Brawler, 11 = Ninja,
		12 = Valkyrie
	*/
	//d.hook('S_LOGIN', (e) => {
	//	(((e.templateId - 10101) % 100) !== 5) ? enable = true : enable = false
	//})

	// code
	d.hook('S_COMPLETE_EVENT_MATCHING_QUEST', (e) => {
		if (!enable) return

		d.toServer('C_COMPLETE_DAILY_EVENT', { id: e.id })
		try {
			setTimeout(() => { d.toServer('C_COMPLETE_EXTRA_EVENT', { type: 0 }) }, 500)
			setTimeout(() => { d.toServer('C_COMPLETE_EXTRA_EVENT', { type: 1 }) }, 500)
		} catch (e) {
			// do nothing
		}

		return false
	})

	// command
	try {
		const Command = require('command')
		const command = Command(d)
		// toggle
		command.add(['vanguard', 'vg', 'ㅍㅎ'], () => {
			enable = !enable
			send(`${enable ? 'enabled'.clr('56B4E9') : 'disabled'.clr('E69F00')}` + `.`.clr('FFFFFF'))
		})
		function send(msg) { command.message(`[auto-vanguard] : ` + [...arguments].join('\n\t - ')) }
	} catch (e) { console.log(`[ERROR] -- auto-vanguard module --`) }

}

// credit : https://github.com/Some-AV-Popo
String.prototype.clr = function (hexColor) { return `<font color="#${hexColor}">${this}</font>` }
