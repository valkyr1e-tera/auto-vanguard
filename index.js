// Version 1.39 r:00

const Command = require('command')
const GameState = require('tera-game-state')

const config = require('./config.json')

module.exports = function AutoVanguard(d) {
	const command = Command(d)
	const game = GameState(d)

	// config
	let	enable = config.enable,
		job = config.job,
		jobDisable = config.jobDisable

	let hold = false,
		questId = 0

	// command
	// toggle
	command.add(['vanguard', 'vg', 'ㅍㅎ'], () => {
		enable = !enable
		send(`${enable ? 'Enabled' : 'Disabled'}`)
	})

	// code
	// disable module for specified job/class in config
	// useful for when accumulating item xp on alternative gear
	// if jobDisable is on, toggle according to configured class
	d.hook('S_LOGIN', 'raw', () => {
		let prevState = enable
		if (!jobDisable) return
		(((game.me.templateId - 10101) % 100) !== job) ? enable = prevState : enable = false
	})

	// if in battleground, hold completion until open world
	// else check if there is a quest to complete
	d.hook('S_LOAD_TOPO', 'raw', () => {
		if (game.me.inBattleground) { hold = true }
		else if (hold && questId !== 0) { completeQuest(); hold = false }
	})

	// if not in battleground, complete vanguard quest
	// otherwise, hold questId for later completion
	d.hook('S_COMPLETE_EVENT_MATCHING_QUEST', 1, (e) => {
		if (!enable) return
		questId = e.id
		if (!hold) completeQuest()
		return false
	})

	//helper
	// rudimentary attempt to complete both extra events
	// technically, sends unnecessary packets every vanguard completion
	function completeQuest() {
		d.send('C_COMPLETE_DAILY_EVENT', 1, { id: questId })
		try {
			setTimeout(() => { d.send('C_COMPLETE_EXTRA_EVENT', 1, { type: 0 }) }, 500)
			setTimeout(() => { d.send('C_COMPLETE_EXTRA_EVENT', 1, { type: 1 }) }, 500)
		} catch (e) {
			// do nothing
		}
		questId = 0
	}

	function send(msg) { command.message(`[auto-vanguard] : ` + msg) }

}