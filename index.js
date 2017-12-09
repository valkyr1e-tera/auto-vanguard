// OPCODE REQUIRED :
// - C_COMPLETE_DAILY_EVENT
// - C_COMPLETE_EXTRA_EVENT
// - S_COMPLETE_EVENT_MATCHING_QUEST

// Version 1.31 r:00

module.exports = function AutoVanguard(d) {

	let enable = true

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
		function send(msg) { command.message(`[auto-vanguard] : ` + msg) }
	} catch (e) { console.log(`[ERROR] -- auto-vanguard module --`) }

}
