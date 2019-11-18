 module.exports = function AutoHeal(mod) {
//     let hooks = [],
//         autoHeal = true,
//         hpCutoff = 90,
//         autoCleanse = true,
//         autoCast = false,
//         debug = false,
//         playerLocation = {},
//         partyMembers = [],
//         job = -1,
//         glyphs = null;
    
//     mod.command.add('autoheal', (p1)=> {
//         if (p1) p1 = p1.toLowerCase();
//         if (p1 == null) {
//             autoHeal = !autoHeal;
//         } else if (p1 === 'off') {
//             autoHeal = false;
//         } else if (p1 === 'on') {
//             autoHeal = true;
//         } else if (p1 === 'debug') {
//             debug = !debug;
//             mod.command.message('Debug ' + (debug ? 'enabled' : 'disabled'));
//             return;
//         } else if (!isNaN(p1)) {
//             autoHeal = true;
//             hpCutoff = (p1 < 0 ? 0 : p1 > 100 ? 100 : p1);
//         } else {
//             mod.command.message(p1 +' is an invalid argument');
//             return;
//         }        
//         mod.command.message('Healing ' + (autoHeal ? 'enabled (' + hpCutoff + '%)' : 'disabled'));
//     });
    
//     mod.command.add('autocleanse', (p1) => {
//         if (p1) p1 = p1.toLowerCase();
//         if (p1 == null) {
//             autoCleanse = !autoCleanse;
//         } else if (p1 === 'off') {
//             autoCleanse = false;
//         } else if (p1 === 'on') {
//             autoCleanse = true;
//         } else {
//             mod.command.message(p1 +' is an invalid argument for cleanse command');
//             return;
//         }
//         mod.command.message('Cleansing ' + (autoCleanse ? 'enabled' : 'disabled'));
//     });
    
//     mod.command.add('autocast', (p1)=> {
//         if (p1) p1 = p1.toLowerCase();
//         if (p1 == null) {
//             autoCast = !autoCast;
//         } else if (p1 === 'off') {
//             autoCast = false;
//         } else if (p1 === 'on') {
//             autoCast = true;
//         } else {
//             mod.command.message(p1 +' is an invalid argument for cast command');
//             return;
//         }        
//         mod.command.message('Casting ' + (autoCast ? 'enabled' : 'disabled'));
//     });
    
//     mod.game.on('enter_game', () => { 
//         job = (mod.game.me.templateId - 10101) % 100;
//         (skills[job]) ? load() : unload();
//     })
       
// 	function hook() {
// 		hooks.push(mod.hook(...arguments));
// 	}
	
// 	function unload() {
// 		if (hooks.length) {
// 			for (let h of hooks)
// 				mod.unhook(h);
// 			hooks = [];
// 		}
// 	}    
    
// 	function load() {
// 		if (!hooks.length) {
//             hook('S_PARTY_MEMBER_LIST', 7, (event) => {
//                 // refresh locations of existing party members.
//                 for (let i = 0; i < event.members.length; i++) {
//                     for (let j = 0; j < partyMembers.length; j++) {
//                         if (partyMembers[j]) {
//                             if (event.members[i].gameId === (partyMembers[j].gameId)) {
//                                 event.members[i].loc = partyMembers[j].loc;
//                                 event.members[i].hpP = partyMembers[j].hpP;
//                                 event.members[i].alive = partyMembers[j].alive;
//                             }
//                         }
//                     }
//                 }
//                 partyMembers = event.members.filter(m => !mod.game.me.is(m.gameId)); // remove self from targets     
//             })
            
//             hook('S_LEAVE_PARTY', 1, (event) => {
//                 partyMembers = [];
//             })
            
//             hook('C_PLAYER_LOCATION', 5, (event) => {
//                 playerLocation = event;
//             })
            
//             hook('S_SPAWN_ME', 3, (event) => {
//                 playerLocation.loc = event.loc;
//                 playerLocation.w = event.w;
//             })
            
//             hook('S_SPAWN_USER', 13, (event) => {
//                 if (partyMembers.length != 0) {
//                     let member = partyMembers.find(m => m.gameId == event.gameId);
//                     if (member) {
//                         member.loc = event.loc;
//                         member.alive = event.alive;
//                         member.hpP = (event.alive ? 100 : 0);
//                     }
//                 }
//             })
            
//             hook('S_USER_LOCATION', 5, (event) => {
//                 let member = partyMembers.find(m => m.gameId === event.gameId);
//                 if (member) member.loc = event.loc;
//             })
            
//             hook('S_USER_LOCATION_IN_ACTION', 2, (event) => {
//                 let member = partyMembers.find(m => m.gameId === event.gameId);
//                 if (member) member.loc = event.loc;
//             })

//             hook('C_CAN_LOCKON_TARGET', 1, function (event) {
//                 mod.toClient('S_CAN_LOCKON_TARGET', 1, Object.assign({ ok: true }, event));
//             });
            
//             hook('S_INSTANT_DASH', 3, (event) => {
//                 let member = partyMembers.find(m => m.gameId === event.gameId);
//                 if (member) member.loc = event.loc;
//             })
            
//             hook('S_PARTY_MEMBER_CHANGE_HP', 4, (event) => {
//                 if (mod.game.me.playerId == event.playerId) return;
//                 let member = partyMembers.find(m => m.playerId === event.playerId);
//                 if (member) {
//                     member.hpP = (Number(event.currentHp) / Number(event.maxHp)) * 100;
//                 }
//             })
            
//             hook('S_PARTY_MEMBER_STAT_UPDATE', 3, (event) => {
//                 if (mod.game.me.playerId == event.playerId) return;
//                 let member = partyMembers.find(m => m.playerId === event.playerId);
//                 if (member) {
//                     member.hpP = (Number(event.curHp) / Number(event.maxHp)) * 100;    
//                     member.alive = event.alive;
//                 }                    
//             })
            
//             hook('S_DEAD_LOCATION', 2, (event) => {
//                 let member = partyMembers.find(m => m.playerId === event.playerId);
//                 if (member) {
//                     member.loc = event.loc;
//                     member.hpP = 0;
//                     member.alive = false;
//                 }                
//             })
            
//             hook('S_LEAVE_PARTY_MEMBER', 2, (event) => {
//                 partyMembers = partyMembers.filter(m => m.playerId != event.playerId);                
//             });
             
//             hook('S_LOGOUT_PARTY_MEMBER', 1, (event) => {
//                 let member = partyMembers.find(m => m.playerId === event.playerId);
//                 if (member) member.online = false;                
//             });
            
//             hook('S_BAN_PARTY_MEMBER', 1, (event) => {
//                 partyMembers = partyMembers.filter(m => m.playerId != event.playerId);
//             });    
            
//             hook('C_START_SKILL', 7, (event) => {
//                 if (partyMembers.length == 0) return; // be in a party
//                 if (event.skill.id / 10 & 1 != 0) { // is casting (opposed to locking on)
//                     playerLocation.w = event.w;
//                     return; 
//                 }
//                 let skill = Math.floor(event.skill.id / 10000);
                
//                 if(skills[job] && skills[job].includes(skill)) {
//                     if (skill != 9 && !autoHeal) return; // skip heal if disabled
//                     if (skill == 9 && !autoCleanse) return; // skip cleanse if disabled
//                     if (skill == 9 && partyMembers.length > 4) return; // skip cleanse if in a raid
                    
//                     let targetMembers = [];
//                     let maxTargetCount = getMaxTargets(skill);
//                     if (skill != 9) sortHp();
//                     for (let i = 0, n = partyMembers.length; i < n; i++) {
//                         if (partyMembers[i].online &&
//                             partyMembers[i].alive &&
//                             partyMembers[i].hpP != undefined &&
//                             partyMembers[i].hpP != 0 &&
//                             ((skill == 9) ? true : partyMembers[i].hpP <= hpCutoff) && // (cleanse) ignore max hp
//                             partyMembers[i].loc != undefined &&
//                             (partyMembers[i].loc.dist3D(playerLocation.loc) / 25) <= maxDistance)
//                             {
//                                 targetMembers.push(partyMembers[i]);
//                                 if (targetMembers.length == maxTargetCount) break;
//                             }
//                     }
                    
//                     if (targetMembers.length > 0) {
//                         if (debug) outputDebug(event.skill);
//                         for (let i = 0, n = targetMembers.length; i < n; i++) {
//                             setTimeout(() => {
//                                 mod.toServer('C_CAN_LOCKON_TARGET', 3, {target: targetMembers[i].gameId, skill: event.skill.id});
//                             }, lockSpeed);
//                         }
                        
//                         if (autoCast) {
//                             setTimeout(() => {
//                                 mod.toServer('C_START_SKILL', 7, Object.assign({}, event, {w: playerLocation.w, skill: (event.skill.id + 10)}));
//                             }, castSpeed);
//                         }
//                     }
//                 }
                
//             })

//             hook('S_CREST_INFO', 2, (event) => {
//                 glyphs = event.crests;
//             })
            
//             hook('S_CREST_APPLY', 2, (event) => {
//                 let glyph = glyphs.find(g => g.id == event.id);
//                 if (glyph) glyph.enable = event.enable;                
//             })
            
//         }
//     }
    
//     function getMaxTargets (skill) {
//         switch(skill) {
//             case 19: return isGlyphEnabled(28003) ? 4 : 2;
//             case 37: return 1;
//             case 5: return isGlyphEnabled(27000) ? 4 : 2;
//             case 9: return (isGlyphEnabled(27063) || isGlyphEnabled(27003)) ? 5 : 3;
//         }
//         return 1;
//     }
    
//     function isGlyphEnabled(glyphId) {
//         let glyph = glyphs.find(g => g.id == glyphId && g.enable);
//         if (glyph) return true;
//         else return false;        
//     }
    
//     function sortHp() {
//         partyMembers.sort(function (a, b) {
//             return parseFloat(a.hpP) - parseFloat(b.hpP);
//         });
//     }
        
//     function outputDebug(skill) {
//         let out = '\nAutoheal Debug... Skill: ' + skill.id + '\tpartyMemebers.length: ' + partyMembers.length;
//         for (let i = 0; i < partyMembers.length; i++) {
//             out += '\n' + i + '\t';
//             let name = partyMembers[i].name;
//             name += ' '.repeat(21-name.length);
//             let hp = '\tHP: ' + parseFloat(partyMembers[i].hpP).toFixed(2);
//             let dist = '\tDist: ' + (partyMembers[i].loc.dist3D(playerLocation.loc) / 25).toFixed(2);
//             let vert = '\tVert: ' + (Math.abs(partyMembers[i].loc.z - playerLocation.loc.z) / 25).toFixed(2);
//             let online = '\tOnline: ' + partyMembers[i].online;
//             out += name + hp + dist + vert + online;
//         }
//         console.log(out)
//     }
    
}