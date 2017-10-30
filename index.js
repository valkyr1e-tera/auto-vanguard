// OPCODE REQUIRED :
// - C_COMPLETE_DAILY_EVENT
// - C_COMPLETE_EXTRA_EVENT
// - S_AVAILABLE_EVENT_MATCHING_LIST
// - S_COMPLETE_EVENT_MATCHING_QUEST

module.exports = function AutoVanguard(dispatch) {

	let enable = true

	try {
		const Command = require('command')
		const command = Command(dispatch)
		// KR
		command.add('지령', () => {
			enable = !enable
			send(`${enable ? '<font color="#56B4E9">실행</font>' : '<font color="#E69F00">중지</font>'}<font>되었습니다.</font>`)
		})
		// NA
		command.add('vanguard', () => {
			enable = !enable
			send(`${enable ? '<font color="#56B4E9">enabled</font>' : '<font color="#E69F00">disabled</font>'}<font>.</font>`)
		})
		function send(msg) {
			command.message(`[auto-vanguard] : ` + msg)
		}
	} catch (e) {
		console.log(`[ERROR] -- auto-vanguard module --`)
	}

	dispatch.hook('S_COMPLETE_EVENT_MATCHING_QUEST', 1, (event) => {

		if (!enable) return

		dispatch.toServer('C_COMPLETE_DAILY_EVENT', { id: event.id })

		// method 1 : rudimentary method
		// tries to complete weekly and daily bonuses without check
		try {
			setTimeout(() => { dispatch.toServer('C_COMPLETE_EXTRA_EVENT', 1, { type: 0 }) }, 500)
			setTimeout(() => { dispatch.toServer('C_COMPLETE_EXTRA_EVENT', 1, { type: 1 }) }, 500)
		} catch (e) {
			// do nothing
		}
		return false
	})

	// method 2 : use of S_AVAILABLE_EVENT_MATCHING_LIST
	// requires user to open Vanguard UI will
	// will not automatically collect weekly and daily bonuses without doing so
	/* 
	dispatch.hook('S_AVAILABLE_EVENT_MATCHING_LIST', 1, event => {
		if (event.unk5 == 3 || event.unk5 == 8) {
			setTimeout(() => {dispatch.toServer('C_COMPLETE_EXTRA_EVENT', 1, { type: 0 })}, 500)
		} else if (event.unk6 == 16) {
			setTimeout(() => {dispatch.toServer('C_COMPLETE_EXTRA_EVENT', 1, { type: 1 })}, 500)
		}
	})
	*/

}
