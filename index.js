// OPCODE REQUIRED :
// - C_COMPLETE_DAILY_EVENT
// - C_COMPLETE_EXTRA_EVENT
// - S_COMPLETE_EVENT_MATCHING_QUEST
// - Optional : S_AVAILABLE_EVENT_MATCHING_LIST

// Version 1.3 r:01

module.exports = function AutoVanguard(d) {

	let enable = true

	// code
	d.hook('S_COMPLETE_EVENT_MATCHING_QUEST', (e) => {
		if (!enable) return

		d.toServer('C_COMPLETE_DAILY_EVENT', { id: e.id })

		// method 1 : rudimentary method
		// tries to complete weekly and daily bonuses without check
		try {
			setTimeout(() => { d.toServer('C_COMPLETE_EXTRA_EVENT', { type: 0 }) }, 500)
			setTimeout(() => { d.toServer('C_COMPLETE_EXTRA_EVENT', { type: 1 }) }, 500)
		} catch (e) {
			// do nothing
		}
		return false
	})

	// method 2 : use of S_AVAILABLE_EVENT_MATCHING_LIST
	// requires user to open Vanguard UI will
	// will not automatically collect weekly and daily bonuses without doing so
	/* 
	d.hook('S_AVAILABLE_EVENT_MATCHING_LIST', (e) => {
		if (e.unk5 == 3 || e.unk5 == 8) {
			setTimeout(() => {d.toServer('C_COMPLETE_EXTRA_EVENT', 1, { type: 0 })}, 500)
		} else if (e.unk6 == 16) {
			setTimeout(() => {d.toServer('C_COMPLETE_EXTRA_EVENT', 1, { type: 1 })}, 500)
		}
	})
	*/

	// command
	try {
		const Command = require('command')
		const command = Command(d)
		// KR
		command.add('지령', () => {
			enable = !enable
			send(`${enable ? '<font color="#56B4E9">실행</font>' : '<font color="#E69F00">중지</font>'}<font>되었습니다.</font>`)
		})
		// NA
		command.add(['vg', 'vanguard', 'ㅍㅎ'], () => {
			enable = !enable
			send(`${enable ? '<font color="#56B4E9">enabled</font>' : '<font color="#E69F00">disabled</font>'}<font>.</font>`)
		})
		function send(msg) {
			command.message(`[auto-vanguard] : ` + msg)
		}
	} catch (e) {
		console.log(`[ERROR] -- auto-vanguard module --`)
	}

}
