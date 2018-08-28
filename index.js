module.exports = function AutoVanguard(mod) {
	mod.command.add(['vanguard', 'vg'], {
		$default: () => {
			mod.settings.enabled = !mod.settings.enabled
			mod.command.message((mod.settings.enabled ? 'en' : 'dis') + 'abled')
		},
		'this': () => {
			const name = mod.game.me.name
			mod.settings.players[name] = !charConfig(name)
			mod.command.message((mod.settings.players[name] ? 'en' : 'dis') + 'abled for this character')
		}
	})

	mod.hook('S_COMPLETE_EVENT_MATCHING_QUEST', 1, (event) => {
		if (!mod.settings.enabled)
			return
			
		if (!charConfig(mod.game.me.name))
			return
			
		setTimeout(() => {
			mod.send('C_COMPLETE_DAILY_EVENT', 1, {
				id: event.id
			})
		}, mod.settings.complete_delay)

		return false
	})

	function charConfig(name) {
		const config = mod.settings.players[name]
		return typeof config === 'undefined' ? true : !!config
	}
}