
function xpNeeded(level) {
	return Math.ceil(Math.pow(level,1.1)*25)
}

var data = {
	player: {
		health: 50,
		health_max: 100,
		level: 1,
		xp: 0,
		xp_needed: xpNeeded(2),
	},
	upgrades: {

	}
};

var upgrades_ref = [
	{
		ref: "damage",
		name:"Damage",
		description: "Increases base damage"
	},
	{
		ref: "increasedHp",
		name: "Health",
		description: "Increases base health"
	},
	{
		ref: "increasedMp",
		name: "Mana Battery",
		description: "Increases max mana",
	},
];

var master_upgrade_obj = document.getElementById("upgrade_ref").cloneNode(true);
document.getElementById("upgrade_ref").remove()

for (i = 0; i<upgrades_ref.length; i++) {
	var ur = upgrades_ref[i];
	ur.max_level = ur.max_level || 20;

	data.upgrades[ur.ref] = {
		name: ur.name,
		max_level: ur.max_level,
		current_level: ur.current_level || 0,
		unlocked: !('prereqs' in ur)
	};

	var new_u = master_upgrade_obj.cloneNode(true);
	new_u.setAttribute("id","upgrade_"+ur.ref);
	new_u.setAttribute("sub-title",ur.name);
	new_u.setAttribute("v-if","upgrades."+ur.ref+".unlocked")

	var text = new_u.children[0]
	text.innerHTML = ur.description || "No description";
	text.setAttribute("id", "upgrade_"+ur.ref+"_text");

	var level = new_u.children[1];
	level.setAttribute("id", "upgrade_"+ur.ref+"_level");
	level.setAttribute(":max", "upgrades."+ur.ref+".max_level");

	var level_bar = level.children[0];
	level_bar.setAttribute("id","upgrade_"+ur.ref+"_level_bar");
	level_bar.setAttribute(":value","upgrades."+ur.ref+".current_level");
	level_bar.setAttribute(":max", "upgrades."+ur.ref+".max_level");

	var level_text = level.children[1]
	level_text.setAttribute("id","upgrade_"+ur.ref+"_level_text");
	level_text.innerHTML = "{{ upgrades."+ur.ref+".current_level }} / {{ upgrades."+ur.ref+".max_level }}"

	document.getElementById("upgrade_holder").append(new_u);
}

Vue.use(BootstrapVue);
var game = new Vue({
	el:"#game",
	data:data
});
