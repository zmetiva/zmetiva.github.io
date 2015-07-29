var txt = "";
var currentArray = [];
var currentMediaItem = "";

/** Social Media Object */
function socialMediaEntry(title, link, metadata) {
	this.title = title;
	this.link = link;
	this.metadata = metadata;

	this.getMetadataLength = function () {
		return this.metadata.length;
	}
}

function FileHelper()
{}
{
	FileHelper.readStringFromFileAtPath = function(pathOfFileToReadFrom)
	{
		var request = new XMLHttpRequest();
		request.open("GET", pathOfFileToReadFrom, false);
		request.send();

        var returnValue = request.responseText;

		return returnValue;

	}

}

var categories = [];
var catMode = [];
var catChanges = [];
var currentCatNums = 0;

var twitterMedia = [];
var fbMedia = [];
var youtubeMedia = [];
var instagramMedia = [];

readFile('media.txt');

function readFile(file) {
	txt = FileHelper.readStringFromFileAtPath(file);

	var cool = txt.split("NEW");

	for (var i = 0; i < cool.length; i++) {

		var splitter = cool[i+1].split("METADATA");

		var titleLink = splitter[0].split("\n");

		var site = titleLink[1];
		var title = titleLink[2];
		var link = titleLink[3];

		var metadata = splitter[1].split("\n");

		metadata.pop();
		metadata.splice(0,1);
		medtadata = removeNewline(metadata);


		switch(site) {
			case 'FACEBOOK':
				fbMedia.push(new socialMediaEntry(title, link, metadata));
			break;

			case 'TWITTER':
				twitterMedia.push(new socialMediaEntry(title, link, metadata));
			break;

			case "YOUTUBE":
				youtubeMedia.push(new socialMediaEntry(title, link, metadata));
			break;

			case "INSTAGRAM":
				instagramMedia.push(new socialMediaEntry(title, link, metadata));
			break;

			case "CATEGORIES":
				metadata.pop();
				metadata.splice(0,1);
				categories = metadata.slice();
				for (var j = 0; j < medtadata.length; j++)
					catMode.push(0);

			break;

		}
	}
}

function removeNewline(array) {
	for (var j = 0; j < array.length; j++) {
		array[j] = array[j].replace(/(\r\n|\n|\r)/gm,"");
	}

	return array;
}
function populateFacebook() {
	var tableData = "";

	for (var i = 0; i < fbMedia.length; i++) {
		tableData += "<tr><td><p>" + fbMedia[i].title + "</p></td><td><p><a href='" + fbMedia[i].link + "' target='_blank'>" + fbMedia[i].link + "</a></p></td><td>";

		for (var j = 0; j < fbMedia[i].metadata.length; j++) {
			tableData += "<p>" + fbMedia[i].metadata[j] + "</p>";
		}
		tableData += "</td><td style='width: 90px;'><button class='btn btn-primary btn-block' onclick='editEntry(\"fb\"," + i + ");' data-toggle='modal' data-target='#myModal'>Edit</button> <button class='btn btn-danger btn-block' data-toggle='modal' data-target='#deleteModal' onclick='setDelete(" + i + ", \"fb\");'>Delete</button></td></tr>";
	}

	document.getElementById('fbTable').innerHTML += tableData;
}

function populateTwitter() {
	var tableData = "";

	for (var i = 0; i < twitterMedia.length; i++) {
		tableData += "<tr><td><p>" + twitterMedia[i].title + "</p></td><td><p><a href='" + twitterMedia[i].link + "' target='_blank'>" + twitterMedia[i].link + "</a></p></td><td>";

		for (var j = 0; j < twitterMedia[i].metadata.length; j++) {
			tableData += "<p>" + twitterMedia[i].metadata[j] + "</p>";
		}
		tableData += "</td><td style='width: 90px;'><button class='btn btn-primary btn-block' onclick='editEntry(\"twitter\"," + i + ");' data-toggle='modal' data-target='#myModal'>Edit</button> <button class='btn btn-danger btn-block' data-toggle='modal' data-target='#deleteModal' onclick='setDelete(" + i + ", \"twitter\");'>Delete</button></td></tr>";
	}

	document.getElementById('twitterTable').innerHTML += tableData;
}

function populateYouTube() {
	var tableData = "";

	for (var i = 0; i < youtubeMedia.length; i++) {
		tableData += "<tr><td><p>" + youtubeMedia[i].title + "</p></td><td><p><a href='" + youtubeMedia[i].link + "' target='_blank'>" + youtubeMedia[i].link + "</a></p></td><td>";

		for (var j = 0; j < youtubeMedia[i].metadata.length; j++) {
			tableData += "<p>" + youtubeMedia[i].metadata[j] + "</p>";
		}
		tableData += "</td><td style='width: 90px;'><button class='btn btn-primary btn-block' onclick='editEntry(\"youtube\"," + i + ");' data-toggle='modal' data-target='#myModal'>Edit</button> <button class='btn btn-danger btn-block' data-toggle='modal' data-target='#deleteModal' onclick='setDelete(" + i + ", \"youtube\");'>Delete</button></td></tr>";
	}

	document.getElementById('youtubeTable').innerHTML += tableData;
}

function populateInstagram() {
	var tableData = "";

	for (var i = 0; i < instagramMedia.length; i++) {
		tableData += "<tr><td><p>" + instagramMedia[i].title + "</p></td><td><p><a href='" + instagramMedia[i].link + "' target='_blank'>" + instagramMedia[i].link + "</a></p></td><td>";

		for (var j = 0; j < instagramMedia[i].metadata.length; j++) {
			tableData += "<p>" + instagramMedia[i].metadata[j] + "</p>";
		}
		tableData += "</td><td style='width: 90px;'><button class='btn btn-primary btn-block' onclick='editEntry(\"instagram\"," + i + ");' data-toggle='modal' data-target='#myModal'>Edit</button> <button class='btn btn-danger btn-block' data-toggle='modal' data-target='#deleteModal' onclick='setDelete(" + i + ", \"instagram\");'>Delete</button></td></tr>";
	}

	document.getElementById('instagramTable').innerHTML += tableData;
}

function populateCategories() {
	var tableData = "";

	for(var i = 0; i < categories.length; i++) {
		tableData += '<tr id="catRow' + i + '"><td id="catTable' + i + '" style="padding-top: 5px;"><input id="catTxt' + i + '" type="text" style="display: none; width: 85%;"><span id="catStatic' + i +'">' + categories[i] + '</span></td><td style="padding-top: 5px; width:15%"><button id="catEditBtn' + i + '" class="btn btn-primary btn-xs btn-block" onclick="editCategory(' + i + ');">Edit</button></td><td style="padding-top: 5px; width:15%"><button class="btn btn-danger btn-xs btn-block" onclick="removeCategory(' + i + ');">Delete</button></td></tr>';
		catMode[i] = 0;
	}
	currentCatNums = categories.length;
	document.getElementById('catTable').innerHTML = tableData;
}

function addEntry() {

	var mode = document.getElementById('modalMode').value;
	var addType = (document.getElementById('newType').value).toUpperCase();
	var addTitle = document.getElementById('newTitle').value;
	var addLink = document.getElementById('newLink').value;
	var addMeta = [];
	strMeta = document.getElementById('newMetaArray').innerHTML;
	addMeta = strMeta.split("<br>");

	addMeta.pop();
	removeNewline(addMeta);

	var arrayStr = "";

	for (var i = 0; i < addMeta.length; i++) {
		arrayStr += addMeta[i].trim() + "\n";
	}

	if (mode == 0) {

		switch(addType) {
			case 'FACEBOOK':
				fbMedia.push(new socialMediaEntry(addTitle, addLink, addMeta));
				break;
			case 'TWITTER':
				twitterMedia.push(new socialMediaEntry(addTitle, addLink, addMeta));
				break;
			case 'YOUTUBE':
				youtubeMedia.push( new socialMediaEntry(addTitle, addLink, addMeta));
				break;
			case 'INSTAGRAM':
				instagramMedia.push( new socialMediaEntry(addTitle, addLink, addMeta));
				break;
		}
	}

	else {
		var index = document.getElementById('storedIndex').value;
		var tpe = document.getElementById('storedType').value;
		switch(tpe) {
			case 'fb':
				fbMedia[index].title = addTitle;
				fbMedia[index].link = addLink;
				fbMedia[index].metadata = addMeta.slice();
				break;
			case 'twitter':
				twitterMedia[index].title = addTitle;
				twitterMedia[index].link = addLink;
				twitterMedia[index].metadata = addMeta.slice();
				break;
			case 'youtube':
				youtubeMedia[index].title = addTitle;
				youtubeMedia[index].link = addLink;
				youtubeMedia[index].metadata = addMeta.slice();
				break;
			case 'instagram':
				instagramMedia[index].title = addTitle;
				instagramMedia[index].link = addLink;
				instagramMedia[index].metadata = addMeta.slice();
				break;
		}

	}
	document.getElementById('modalMode').value = 0;
	resetTables();
	populateAll();

}

function editEntry(tpe, index) {
	var currMedia = null;
	var currType = "";
	switch(tpe) {
		case 'fb':
			currMedia = fbMedia;
			currType = "Facebook";
			break;
		case 'twitter':
			currMedia = twitterMedia;
			currType = "Twitter";
			break;
		case 'youtube':
			currMedia = youtubeMedia;
			currType = "YouTube";
			break;
		case 'instagram':
			currMedia = instagramMedia;
			currType = "Instagram";
			break;
	}
	document.getElementById('addButton').innerHTML = "Edit";
	document.getElementById('newType').value = currType;
	document.getElementById('newType').disabled = true;
	document.getElementById('newTitle').value = currMedia[index].title;
	document.getElementById('newLink').value = currMedia[index].link
	document.getElementById('newMetaArray').innerHTML = "";

	for (var i = 0; i < currMedia[index].metadata.length; i++) {
		document.getElementById('newMetaArray').innerHTML += currMedia[index].metadata[i] + "<br>";
	}

	document.getElementById('storedIndex').value = index;
	document.getElementById('storedType').value = tpe;
	document.getElementById('modalMode').value = 1;
}

function removeEntry() {
	var tpe = document.getElementById("storedType").value;
	var currMedia = null;
	var currType = "";
	switch(tpe) {
		case 'fb':
			fbMedia.splice(document.getElementById("storedIndex").value,1);
			break;
		case 'twitter':
			twitterMedia.splice(document.getElementById("storedIndex").value,1);
			break;
		case 'youtube':
			youtubeMedia.splice(document.getElementById("storedIndex").value,1);
			break;
		case 'instagram':
			instagramMedia.splice(document.getElementById("storedIndex").value,1);
			break;
	}

	resetTables();
	populateAll();

}

function setDelete(index, tpe) {
	var t = "";
	var ent = "";
	switch(tpe) {
		case 'fb':
			t = "Facebook";
			ent = fbMedia[index].title;
			break;
		case 'twitter':
			t = "Twitter";
			ent = twitterMedia[index].title;
			break;
		case 'youtube':
			t = "YouTube";
			ent = youtubeMedia[index].title;
			break;
		case 'instagram':
			t = "Instagram";
			ent = instagramMedia[index].title;
			break;
	}
	document.getElementById("storedIndex").value = index;
	document.getElementById("storedType").value = tpe;
	document.getElementById("deleteInfo").innerHTML = "<b>Type: </b>" + t + "<br/><b>Name: </b> " + ent;


}

function addCategory() {
	var i = currentCatNums;
	var title = document.getElementById('newCategoryTxt').value;
	document.getElementById('catTable').innerHTML += '<tr id="catRow' + i + '"><td id="catTable' + i + '" style="padding-top: 5px;"><input id="catTxt' + i + '" type="text" style="display: none; width: 85%;"><span id="catStatic' + i +'">' + title + '</span></td><td style="padding-top: 5px; width:15%"><button id="catEditBtn' + i + '" class="btn btn-primary btn-xs btn-block" onclick="editCategory(' + i + ');">Edit</button></td><td style="padding-top: 5px; width:15%"><button class="btn btn-danger btn-xs btn-block" onclick="removeCategory(' + i + ');">Delete</button></td></tr>';
	currentCatNums += 1;

}

function editCategory(index) {

	if(catMode[index] == 0) {
		document.getElementById('catStatic' + index).style.display = "none";

		document.getElementById('catTxt' + index).value = categories[index];
		document.getElementById('catTxt' + index).style.display = "inherit";

		document.getElementById('catEditBtn' + index).innerHTML = "Save";
		document.getElementById('catEditBtn' + index).className = "btn btn-success btn-xs btn-block";

		catMode[index] = 1;

	}

	else {
		categories[index] = document.getElementById('catTxt' + index).value;
		document.getElementById('catTxt' + index).style.display = "none";

		document.getElementById('catStatic' + index).style.display = "inherit";
		document.getElementById('catStatic' + index).innerHTML = categories[index];


		document.getElementById('catEditBtn' + index).innerHTML = "Edit";
		document.getElementById('catEditBtn' + index).className = "btn btn-primary btn-xs btn-block";

		catMode[index] = 0;

	}
}

function removeCategory(index) {

	document.getElementById('catRow' + index).style.display = "none";
	document.getElementById('catStatic' + index).innerHTML = "";

}

function saveCategories() {

	categories.length = 0;

	for (var i = 0; i < currentCatNums; i++) {
		if (document.getElementById('catStatic' + i).innerHTML != "") {
			categories.push(document.getElementById('catStatic' + i).innerHTML);
		}
	}
	clearAll();
	populateCategories();
	populateFilterMenu();
}

function clearMetaBox() {
	document.getElementById("newMetaArray").innerHTML = "";

}

function saveFile() {
	categories.sort();
	fbMedia.sort(compareSocialMediaObjects);
	twitterMedia.sort(compareSocialMediaObjects);
	youtubeMedia.sort(compareSocialMediaObjects);
	instagramMedia.sort(compareSocialMediaObjects);

	var write = "NEW\nCATEGORIES\n\n\nMETADATA\n-- Show All --\n";

	for (var i = 0; i < categories.length; i++) {
		write += categories[i] + "\n";
	}

	write += "-- More --\n";

	for (var i = 0; i < fbMedia.length; i++) {
		write += "NEW\nFACEBOOK\n" + fbMedia[i].title + "\n" + fbMedia[i].link + "\nMETADATA\n"
		for( var j = 0; j < fbMedia[i].metadata.length; j++) {
			write += fbMedia[i].metadata[j] + "\n";
		}
	}

	for (var i = 0; i < twitterMedia.length; i++) {
		write += "NEW\nTWITTER\n" + twitterMedia[i].title + "\n" + twitterMedia[i].link + "\nMETADATA\n"
		for( var j = 0; j < twitterMedia[i].metadata.length; j++) {
			write += twitterMedia[i].metadata[j] + "\n";
		}
	}

	for (var i = 0; i < youtubeMedia.length; i++) {
		write += "NEW\nYOUTUBE\n" + youtubeMedia[i].title + "\n" + youtubeMedia[i].link + "\nMETADATA\n"
		for( var j = 0; j < youtubeMedia[i].metadata.length; j++) {
			write += youtubeMedia[i].metadata[j] + "\n";
		}
	}

	for (var i = 0; i < instagramMedia.length; i++) {
		write += "NEW\nINSTAGRAM\n" + instagramMedia[i].title + "\n" + instagramMedia[i].link + "\nMETADATA\n"
		for( var j = 0; j < instagramMedia[i].metadata.length; j++) {
			write += instagramMedia[i].metadata[j] + "\n";
		}
	}

	var blob = new Blob([write], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "media.txt");
}

function populateAll() {
	populateFacebook();
	populateTwitter();
	populateYouTube();
	populateInstagram();
	populateCategories();
	populateFilterMenu();
	document.getElementById('filterTitle').innerHTML = "Showing: All";
}

function resetTables() {
	document.getElementById("fbTable").innerHTML = '<tr style="background-color: #F2F2F2;"><th>Title</th><th>Link URL</th><th>Metadata</th><th>Options</th></tr>';
	document.getElementById("twitterTable").innerHTML = '<tr style="background-color: #F2F2F2;"><th>Title</th><th>Link URL</th><th>Metadata</th><th>Options</th></tr>';
	document.getElementById("youtubeTable").innerHTML = '<tr style="background-color: #F2F2F2;"><th>Title</th><th>Link URL</th><th>Metadata</th><th>Options</th></tr>';
	document.getElementById("instagramTable").innerHTML = '<tr style="background-color: #F2F2F2;"><th>Title</th><th>Link URL</th><th>Metadata</th><th>Options</th></tr>';
}

function clearAll() {
	document.getElementById('newType').disabled = false;
	var catOps = "";
	var count = 0;
	for (var i = 0; i < categories.length; i++) {
		catOps += '<option id="cat' + count + '">' + categories[i] + '</option>';
		count++;
	}
	catOps += "<option id=\"cat" + count + "\">-- More --</option>";

	document.getElementById('newMeta').innerHTML = catOps;
	document.getElementById('modalMode').value = "";
	document.getElementById('newType').value = "";
	document.getElementById('newTitle').value = "";
	document.getElementById('newLink').value = "";
	document.getElementById('newMetaArray').innerHTML = "";
	document.getElementById('addButton').innerHTML = "Add";

}

function compareSocialMediaObjects(a,b) {
	if (a.title < b.title)
		return -1;
	if (a.title > b.title)
		return 1;
	return 0;
}

function populateFilterMenu() {
	var str = "<li><a href='javascript:void(0);' onclick='resetTables(); populateAll();'>Show All</a></li><li class='divider'></li>";

	for (var i = 0; i < categories.length; i++) {
		str += "<li><a href='javascript:void(0);' onclick='filterClick(\"" + categories[i] + "\");'>" + categories[i] + "</a></li>";
	}

	str += "<li><a href='javascript:void(0);' onclick='filterClick(\"-- More --\");'>-- More --</a></li>";

	document.getElementById('filterMenu').innerHTML = str;
}

function filterClick(option) {

	var str = "";

	for (var i = 0; i < fbMedia.length; i++) {
		for (var j = 0; j < fbMedia[i].metadata.length; j++) {
			if (fbMedia[i].metadata[j] == option) {
				str += "<tr><td><p>" + fbMedia[i].title + "</p></td><td><p><a href='" + fbMedia[i].link + "' target='_blank'>" + fbMedia[i].link + "</a></p></td><td>";

				for (var k = 0; k < fbMedia[i].metadata.length; k++) {
					str += "<p>" + fbMedia[i].metadata[k] + "</p>";
				}
				str += "</td><td style='width: 90px;'><button class='btn btn-primary btn-block' onclick='editEntry(\"fb\"," + i + ");' data-toggle='modal' data-target='#myModal'>Edit</button> <button class='btn btn-danger btn-block' data-toggle='modal' data-target='#deleteModal' onclick='setDelete(" + i + ", \"fb\");'>Delete</button></td></tr>";
			}
		}
	}

	document.getElementById('fbTable').innerHTML = str;

	str = "";

	for (var i = 0; i < twitterMedia.length; i++) {
		for (var j = 0; j < twitterMedia[i].metadata.length; j++) {
			if (twitterMedia[i].metadata[j] == option) {
				str += "<tr><td><p>" + twitterMedia[i].title + "</p></td><td><p><a href='" + twitterMedia[i].link + "' target='_blank'>" + twitterMedia[i].link + "</a></p></td><td>";

				for (var k = 0; k < twitterMedia[i].metadata.length; k++) {
					str += "<p>" + twitterMedia[i].metadata[k] + "</p>";
				}
				str += "</td><td style='width: 90px;'><button class='btn btn-primary btn-block' onclick='editEntry(\"twitter\"," + i + ");' data-toggle='modal' data-target='#myModal'>Edit</button> <button class='btn btn-danger btn-block' data-toggle='modal' data-target='#deleteModal' onclick='setDelete(" + i + ", \"twitter\");'>Delete</button></td></tr>";
			}
		}
	}
	document.getElementById('twitterTable').innerHTML = str;

	str = "";

	for (var i = 0; i < youtubeMedia.length; i++) {
		for (var j = 0; j < youtubeMedia[i].metadata.length; j++) {
			if (youtubeMedia[i].metadata[j] == option) {
				str += "<tr><td><p>" + youtubeMedia[i].title + "</p></td><td><p><a href='" + youtubeMedia[i].link + "' target='_blank'>" + youtubeMedia[i].link + "</a></p></td><td>";

				for (var k = 0; k < youtubeMedia[i].metadata.length; k++) {
					str += "<p>" + youtubeMedia[i].metadata[k] + "</p>";
				}
				str += "</td><td style='width: 90px;'><button class='btn btn-primary btn-block' onclick='editEntry(\"youtube\"," + i + ");' data-toggle='modal' data-target='#myModal'>Edit</button> <button class='btn btn-danger btn-block' data-toggle='modal' data-target='#deleteModal' onclick='setDelete(" + i + ", \"youtube\");'>Delete</button></td></tr>";
			}
		}
	}
	document.getElementById('youtubeTable').innerHTML = str;

	str = "";

	for (var i = 0; i < instagramMedia.length; i++) {
		for (var j = 0; j < instagramMedia[i].metadata.length; j++) {
			if (instagramMedia[i].metadata[j] == option) {
				str += "<tr><td><p>" + instagramMedia[i].title + "</p></td><td><p><a href='" + instagramMedia[i].link + "' target='_blank'>" + instagramMedia[i].link + "</a></p></td><td>";

				for (var k = 0; k < instagramMedia[i].metadata.length; k++) {
					str += "<p>" + instagramMedia[i].metadata[k] + "</p>";
				}
				str += "</td><td style='width: 90px;'><button class='btn btn-primary btn-block' onclick='editEntry(\"instagram\"," + i + ");' data-toggle='modal' data-target='#myModal'>Edit</button> <button class='btn btn-danger btn-block' data-toggle='modal' data-target='#deleteModal' onclick='setDelete(" + i + ", \"instagram\");'>Delete</button></td></tr>";
			}
		}
	}
	document.getElementById('instagramTable').innerHTML = str;

	document.getElementById('filterTitle').innerHTML = "Showing: " + option;
}

function searchPage() {

}
