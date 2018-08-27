module.exports = function AutoVanguard(mod) {
	mod.command.add(['vanguard', 'vg'], () => {
		mod.settings.enabled = !mod.settings.enabled
		mod.command.message((mod.settings.enabled ? 'en' : 'dis') + 'abled')
	})

	mod.hook('S_COMPLETE_EVENT_MATCHING_QUEST', 1, (event) => {
		if (!mod.settings.enabled)
			return
		
		setTimeout(() => {
			mod.send('C_COMPLETE_DAILY_EVENT', 1, {
				id: event.id
			})
		}, mod.settings.complete_delay)

		return false
	})
}