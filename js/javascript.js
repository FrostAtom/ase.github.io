/* Matrix */
const c = document.getElementById("matrix");
const ctx = c.getContext("2d");
var charset = "ABCČĆDĐEFGHIJKLMNOPQRSŠTUVWXYZŽabcčćdđefghijklmnopqrsštuvwxyzžАБВГҐДЂЕЁЄЖЗЅИІЇЙЈКЛЉМНЊОПРСТЋУЎФХЦЧЏШЩЪЫЬЭЮЯабвгґдђеёєжзѕиіїйјклљмнњопрстћуўфхцчџшщъыьэюяΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω1234567890‘?’“!”(%)[#]{@}/&\<-+÷×=>®©$€£¥¢:;,.* ";
charset = charset.split("");
const columns = 120;
var drops = [];
var font_size;

setInterval(draw, 33);
recalculateVars()
window.addEventListener("resize", recalculateVars);

function recalculateVars() {
	c.height = window.innerHeight;
	c.width = window.innerWidth;
	font_size = window.innerWidth / columns;
	for (var x = 0; x < columns; x++) {
		drops[x] = (Math.random() * 45).toFixed(0);
	}
}

function draw() {
	ctx.fillStyle = "rgba(30, 30, 30, 0.1)";
	ctx.fillRect(0, 0, c.width, c.height);
	ctx.fillStyle = "#0BB";
	ctx.font = font_size + "px arial";
	for (var i = 0; i < drops.length; i++) {
		var text = charset[Math.floor(Math.random() * charset.length)];
		ctx.fillText(text, i * font_size, drops[i] * font_size);
		if (drops[i] * font_size > c.height && Math.random() > 0.975)
			drops[i] = 0;
		drops[i]++;
	}
}

/* Last Update */
const request = new XMLHttpRequest();
request.onload = function () {
	var json = JSON.parse(this.responseText);
	var lastCommit = json[0];
	var message = lastCommit.commit.message;
	var lastUpdate = document.getElementById("LastUpdate")
	var timePassed = getTimeElapsed(lastCommit.commit.author.date);
	lastUpdate.append("Site updated " + timePassed + " (" + message + ")");
}
request.open("GET", "https://api.github.com/repos/frostatom/atom_se.github.io/commits", true);
request.send();

function getTimeElapsed(from) {
	from = new Date(from);
	var to = new Date();
	var diff = new Date(to - from);
	if (diff.getUTCMonth() > 0) {
		return diff.getUTCMonth() + " months ago";
	} else if ((diff.getUTCDate() - 1) > 0) {
		return diff.getUTCDate() + " days ago";
	} else if (diff.getUTCHours() > 0) {
		return diff.getUTCHours() + " hours ago";
	} else if (diff.getUTCMinutes() > 5) {
		return diff.getUTCMinutes() + " minutes ago"
	} else {
		return "just now";
	}
}