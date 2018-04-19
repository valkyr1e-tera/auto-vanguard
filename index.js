// Version 1.37 r:04

const Command = require('command')
const battleground = require('./battleground.js')
const config = require('./config.json')

// credit : https://github.com/Some-AV-Popo
String.prototype.clr = function (hexColor) { return `<font color="#${hexColor}">${this}</font>` }

module.exports = function AutoVanguard(d) {
	const command = Command(d)

	let	enable = config.enable,
		job = config.job,
		jobDisable = config.jobDisable

	let hold = false,
		questId = 0

	// code
	// disable module for specified job/class in config
	// useful for when accumulating item xp on alternative gear
	// if jobDisable is on, toggle according to configured class
	d.hook('S_LOGIN', (e) => {
		if (!jobDisable) return
		(((e.templateId - 10101) % 100) !== job) ? enable = true : enable = false
	})

	// if in battleground, hold completion until open world
	// else check if there is a quest to complete
	d.hook('S_LOAD_TOPO', (e) => {
		if (battleground.includes(e.zone)) { hold = true }
		else if (hold && questId !== 0) { completeQuest(); hold = false }
	})

	// if not in battleground, complete vanguard quest
	// otherwise, hold questId for later completion
	d.hook('S_COMPLETE_EVENT_MATCHING_QUEST', (e) => {
		if (!enable) return
		questId = e.id
		if (!hold) completeQuest()
		return false
	})

	//helper
	// rudimentary attempt to complete both extra events
	// technically, sends unnecessary packets every vanguard completion
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