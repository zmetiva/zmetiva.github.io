/** Social Media Object */

function socialMediaEntry(title, link, metadata) {
    this.title = title;
    this.link = link;
    this.metadata = metadata;

    this.getMetadataLength = function() {
        return this.metadata.length;
    }
}

function FileHelper() {} {
    FileHelper.readStringFromFileAtPath = function(pathOfFileToReadFrom) {
        var request = new XMLHttpRequest();
        request.open("GET", pathOfFileToReadFrom, false);
        request.send(null);
        var returnValue = request.responseText;

        return returnValue;
    }
}

var mediaAccounts = ["fb", "twitter", "youtube", "instagram"];
var currentArray = [];
var currentMediaItem = "";

var twitterMedia = [];
var fbMedia = [];
var youtubeMedia = [];
var instagramMedia = [];

var socialCats = [];

var fbOfficial = null;
var twitterOfficial = null;
var youtubeOfficial = null;
var instagramOfficial = null;

var fbCats = [];
var twitterCats = [];
var youtubeCats = [];
var instagramCats = [];

var currCat = null;

var mediaChange = false;

readFile('media.txt');

function readFile(file) {

    var txt = FileHelper.readStringFromFileAtPath(file);
    var cool = txt.split("NEW");

    for (var i = 0; i < cool.length; i++) {
        var splitter = cool[i + 1].split("METADATA");
        var titleLink = splitter[0].split("\n");
        var site = titleLink[1];
        var title = titleLink[2];
        var link = titleLink[3];

        var metadata = splitter[1].split("\n");

        if (site != "CATEGORIES") {
            metadata.pop();
            metadata.splice(0, 1);
        }
        metadata = removeNewline(metadata);

        switch (site) {

            case 'FACEBOOK':

                if (title.indexOf("Official") > -1) {
                    fbOfficial = new socialMediaEntry(title, link, metadata);
                } else {
                    fbMedia.push(new socialMediaEntry(title, link, metadata));

                    var socialMedia_index = -1;
                    for (var j = 0; j < socialCats.length; j++) {
                        socialMedia_index = socialCats.indexOf(metadata[j]);
                        if (socialMedia_index > -1) {
                            fbCats[socialMedia_index] = socialMedia_index;
                        }
                    }
                }

                break;

            case 'TWITTER':

                if (title.indexOf("Official") > -1) {
                    twitterOfficial = new socialMediaEntry(title, link, metadata);
                } else {
                    twitterMedia.push(new socialMediaEntry(title, link, metadata));
                    var socialMedia_index = -1;
                    for (var l = 0; l < socialCats.length; l++) {
                        socialMedia_index = socialCats.indexOf(metadata[l]);
                        if (socialMedia_index > -1) {
                            twitterCats[socialMedia_index] = socialMedia_index;
                        }
                    }
                }
                break;

            case 'YOUTUBE':
                if (title.indexOf("Official") > -1) {
                    youtubeOfficial = new socialMediaEntry(title, link, metadata);
                } else {
                    youtubeMedia.push(new socialMediaEntry(title, link, metadata));
                    var socialMedia_index = -1;
                    for (var m = 0; m < socialCats.length; m++) {
                        socialMedia_index = socialCats.indexOf(metadata[m]);
                        if (socialMedia_index > -1) {
                            youtubeCats[socialMedia_index] = socialMedia_index;
                        }
                    }
                }
                break;

            case 'INSTAGRAM':
                if (title.indexOf("Official") > -1) {
                    instagramOfficial = new socialMediaEntry(title, link, metadata);
                } else {
                    instagramMedia.push(new socialMediaEntry(title, link, metadata));
                    var socialMedia_index = -1;
                    for (var n = 0; n < socialCats.length; n++) {
                        socialMedia_index = socialCats.indexOf(metadata[n]);
                        if (socialMedia_index > -1) {
                            instagramCats[socialMedia_index] = socialMedia_index;
                        }
                    }
                }
                break;

            case 'CATEGORIES':
                socialCats = metadata.slice();
                for (var k = 0; k < socialCats.length; k++) {
                    fbCats.push(-1);
                    twitterCats.push(-1);
                    youtubeCats.push(-1);
                    instagramCats.push(-1);
                }
                break;
        }

    }
}



function removeNewline(array) {

    for (var j = 0; j < array.length; j++) {

        array[j] = array[j].replace(/(\r\n|\n|\r)/gm, "");

    }

    return array;
}

function compareSocialMediaObjects(a, b) {
    if (a.title < b.title)
        return -1;
    if (a.title > b.title)
        return 1;
    return 0;
}

function selectSocialMediaItem(mediaItem) {
    mediaChange = true;
    currentMediaItem = mediaItem;
    selectCategory();
}

function selectCategory() {
    currentArray.length = 0;
    var index = document.getElementById("socialCategory").selectedIndex;
    var category = document.getElementById("cat" + index);
    var media = [];
    var officialSocialMedia = null;

    switch (currentMediaItem) {
        case 'fb':
            currCat = fbCats;
            officialSocialMedia = fbOfficial;
            media = fbMedia.slice();
            break;
        case 'twitter':
            currCat = twitterCats;
            officialSocialMedia = twitterOfficial;
            media = twitterMedia.slice();

            break;
        case 'youtube':
            currCat = youtubeCats;
            officialSocialMedia = youtubeOfficial;
            media = youtubeMedia.slice();
            break;
        case 'instagram':
            currCat = instagramCats;
            officialSocialMedia = instagramOfficial;
            media = instagramMedia.slice();
            break;
    }

    if (mediaChange == true) {

        populateCategories(currCat, 0);

        index = document.getElementById("socialCategory").selectedIndex = 0;
        category = document.getElementById("cat" + index);
        mediaChange = false;

    } else {
        populateCategories(currCat, index);
    }

    if (media.length <= 0) {
        document.getElementById('mediaLinks').innerHTML = "";
        document.getElementById('mediaLinks').scrollTop = 0;
    }
    if (category.innerHTML != "-- Show All --") {
        for (var i = 0; i < media.length; i++) {
            for (var j = 0; j < media[i].metadata.length; j++) {
                if (media[i].metadata[j] == category.innerHTML) {
                    currentArray.push(media[i]);
                }
            }
        }
        currentArray.sort(compareSocialMediaObjects);
    } else {
        currentArray = media.slice();
        currentArray.sort(compareSocialMediaObjects);
        if (officialSocialMedia != null)
            currentArray.unshift(officialSocialMedia);
    }

    populateEntries();


}

function populateEntries() {
    var str = "";

    for (var i = 0; i < 4; i++) {
        document.getElementById(mediaAccounts[i]).style.backgroundColor = "#EEE";
        document.getElementById(mediaAccounts[i] + "Txt").style.color = "#0066BB";
    }

    document.getElementById(currentMediaItem).style.backgroundColor = "#001188"; /*fbLinks[0]*/
    document.getElementById(currentMediaItem + "Txt").style.color = "#EEE"; /*fbTitles[0]*/

    str += "<div style='padding: 15px;'><a style='text-decoration: none;' href='" + currentArray[0].link + "' target='_blank'>" + currentArray[0].title + "</a></div>";

    for (var i = 1; i < currentArray.length /*fbTitles.length*/ ; i++) {
        str += "<div style='padding: 15px; padding-top: 5px;'><a style='text-decoration: none;' href='" + currentArray[i].link /*fbLinks[i]*/ + "' target='_blank' >" + currentArray[i].title /*fbTitles[i]*/ + "</a></div>";
    }

    document.getElementById('mediaLinks').innerHTML = str;
    document.getElementById('mediaLinks').scrollTop = 0;

}

function populateCategories(socialSet, index) {
    var inner = "<option id='cat0'>-- Show All --</option>";
    var socialCount = 1;

    for (var i = 0; i < socialSet.length; i++) {
        if (socialSet[i] > -1) {
            inner += "<option id='cat" + socialCount + "'>" + socialCats[socialSet[i]] + "</option>";
            socialCount++;
        }
    }

    document.getElementById('socialCategory').innerHTML = inner;
    document.getElementById("socialCategory").selectedIndex = index;
}
