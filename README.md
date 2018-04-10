# auto-vanguard
tera-proxy module to automatically turn in Vanguard Initiative quests upon completion

## Dependency
- `Command` module

## Usage
### `vanguard` · `vg` · `ㅍㅎ`
- Toggle on/off

## Config
### `enable`
- Initialize module on/off
- Default is on
### `job`
- Specify class to automatically turn module off
- classes are numerically specified by :
```0 : Warrior
1 : Lancer
2 : Slayer
3 : Berserker
4 : Sorcerer
5 : Archer
6 : Priest
7 : Mystic
8 : Reaper
9 : Gunner
10 : Brawler
11 : Ninja
12 : Valkyrie
```
- Default is archer
### `jobDisable`
- Automatically turn module on/off for specified class denoted at `job`
- Default is off

## Info
- Original author : [baldera-mods](https://github.com/baldera-mods)

## Changelog
<details>

    1.37
    - Added job disable option
    -- Added options to config.json accordingly
    1.36
    - Added auto-update support
    1.35
    - Added Battlegrounds support
    1.34
    - Updated font color
    1.33
    - Updated code aesthetics
    - Added personal class-specific auto enable/disable (commented out)
    1.32
    - Updated code
    - Added string function
    1.31
    - Updated code aesthetics
    1.30
    - Updated code aesthetics
    1.20
    - Removed protocol version restriction
    1.10
    - Personalized code aesthetics
    1.00
    - Initial fork

</details>
