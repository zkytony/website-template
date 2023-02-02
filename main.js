/*
 * Copyright (c) 2016-present Kaiyu Zheng
 * Author: Kaiyu Zheng <kaiyutony@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// author: Kaiyu Zheng

function copyright(startyr, elm, useDesign=true) {
    design = "";
    if (useDesign) {
	design = "Designed by <a href='https://github.com/zkytony' class='link-no'>Kaiyu Zheng</a>&nbsp"
    }
    elm.html("<small> "
           + "Last Updated: " + (new Date()).toDateString() + ";&nbsp&nbsp"
           + design
      	   + "&copy " + startyr + "-" + (new Date()).getFullYear()
      	   + " </small>");
}

function showContent(ctntelm, btnelm) {
    var textKept = btnelm.html().split(" ").slice(1).join(" "); // Must be "show"or"hide" + "{other text}"
    ctntelm.removeClass("hidden");
    btnelm.html("hide " + textKept);
}

function hideContent(ctntelm, btnelm) {
    var textKept = btnelm.html().split(" ").slice(1).join(" "); // Must be "show"or"hide" + "{other text}"
    ctntelm.addClass("hidden");
    btnelm.html("show " + textKept);
}

function handleContentExpansion(btnclicked, btncls, ctntcls) {
    var content = null;
    if ($(btnclicked)[0].hasAttribute('data-target')) {
	content = $("#" + $(btnclicked).attr('data-target'));
    } else {
	var content = $(btnclicked).parent().find(ctntcls);
    }
    if (content.length == 0) {
	return false;
    }

    if (content.hasClass("hidden")) {
	// First, check if any other video in the data-group is shown. If so,
	// hide it.
	if ($(btnclicked)[0].hasAttribute('data-group')) {
	    var group = $(btnclicked).attr('data-group');
	    $(btncls + "[data-group=" + group + "]").each(function(){
		var target = $(this).attr('data-target');
		console.log(target)
		if (!$("#"+target).hasClass("hidden")) {
		    // It is showing. Just hide it.
		    hideContent($("#"+target), $(this));
		}
	    });
	}
	showContent(content, $(btnclicked));
    } else {
	hideContent(content, $(btnclicked));
    }
    return true;
}



// Creates a menu under the div with given id.
// The paths on in the menu are with respect to
// the provided path to the home page.
function makeMenu(homepath, id) {
    var menuStr = `<ul>
                    <li><a href="${homepath}#about">About</a></li>
                  </ul>`
    $(id).html(menuStr);
}


// News items; show up to 'limit' items. The rest
// will be made available by directing to a separate page.
var recentNews = [
    {"date": "02/22/2222", "news": "A future news"},
    {"date": "02/02/2023", "news": "This template is now public! "},
    {"date": "02/14/2005", "news": "<a href='https://www.youtube.com' class='link-no'>Youtube</a> was launched."},
    {"date": "09/19/1999", "news": "A past date."},
];
const NEWS_LIMIT = 3;
function makeNews(id, showAll=false) {
    let newsList = $(id + " ul");
    newsList.html("");  // clear existing
    let amountToShow = Math.min(recentNews.length, NEWS_LIMIT);
    if (showAll) {
        amountToShow = recentNews.length
    }
    for (let i=0; i<amountToShow; i++) {
        let item = recentNews[i];
        let date = Date.parse(item['date']);
        let today = new Date();
        let newsContent = item['news'];
        if (date > today) {
            newsContent += " (upcoming)";
        }
        newsList.append(`<li><span class='news-date'>${item['date']}</span>${newsContent}</li>`);
    }
    if (!showAll) {
        let newsToggle = $(id + " #news-toggle");
        if (recentNews.length > NEWS_LIMIT) {
            newsToggle.removeClass("hidden");
            newsToggle.html(`see all ${recentNews.length} news`);
        }
    }
}

function toggleAllNews(id) {
    let displayedNewsCount = $(id + " ul li").length;
    let newsToggle = $(id + " #news-toggle");
    if (recentNews.length > NEWS_LIMIT) {
        newsToggle.removeClass("hidden");
        if (displayedNewsCount > NEWS_LIMIT) {
            // we have displayed all news; toggle = collapse them.
            makeNews(id, showAll=false);
            newsToggle.html(`see all ${recentNews.length} news`);
        } else {
            // we have not displayed all news; toggle = display them.
            makeNews(id, showAll=true);
            newsToggle.html("collapse");
        }
    } else {
        newsToggle.addClass("hidden");
    }
}

$(document).ready(function(){
    // If clicked show video, show the video in this section.
    $(document).on("click", ".show-content-btn", function(e) {
	if (!handleContentExpansion(this, ".show-content-btn", ".embed-video")) {
	    handleContentExpansion(this, ".show-content-btn", ".further-info");
	}
    });

    // If clicked on an in-link, highlight the part that is linked.
    // Also, scropp up slightly fore better viewing experience.

    copyright(2016, $("#copyright"));
})
