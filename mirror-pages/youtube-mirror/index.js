const apiKey = prompt('Please enter api key');
let vidKey = "1V5WpeuxdSg";
let nextPageTokenComment;
let nextPageTokenVideo;
let videoDescription;
let showMoreDescription = false;

document.getElementById(
  "current-video"
).src = `https://www.youtube.com/embed/${vidKey}?autoplay=1&start=210`;

function isInViewport(element) {
  var rect = element.getBoundingClientRect();
  var html = document.documentElement;
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  );
}

document
  .getElementById("show-more-button")
  .addEventListener("click", function(e) {
    if (showMoreDescription) {
      document.getElementById("publisher-text").innerText =
        videoDescription.substring(0, 120) + "...";
      document.getElementById("show-more-button").innerText = "SHOW MORE";
      showMoreDescription = false;
    } else {
      document.getElementById("publisher-text").innerText = videoDescription;
      document.getElementById("show-more-button").innerText = "SHOW LESS";
      showMoreDescription = true;
    }
  });

const makeVideoCard = videoObj => {
  let vidCard = document.createElement("div");
  vidCard.classList.add("video-card");
  vidCard.addEventListener("click", function(e) {
    document.getElementById("vid-comments").innerHTML = "";
    document.getElementById("other-vids").innerHTML = "";
    vidKey = videoObj.id.videoId;
    document.getElementById(
      "iframe-container"
    ).innerHTML = `<iframe id='current-video' 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/${vidKey}?autoplay=1"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
                </iframe>`;
    getVidInfo();
    getData(20, 10);
  });
  let img = document.createElement("img");
  let src = videoObj.snippet.thumbnails.medium.url;
  img.src = src;
  let vidCardText = document.createElement("div");
  vidCardText.classList.add("video-card-text");
  let vidCardPublisher = document.createElement("div");
  vidCardPublisher.classList.add("video-card-publisher");
  let vidTitle = videoObj.snippet.title;
  vidCardText.textContent = vidTitle.substring(0, 60) + "...";
  let vidOwner = videoObj.snippet.channelTitle;
  vidCardPublisher.textContent = vidOwner;

  vidCard.appendChild(img);
  vidCard.appendChild(vidCardText);
  vidCard.appendChild(vidCardPublisher);
  document.getElementById("other-vids").appendChild(vidCard);
};

const makeCommentCard = (name, text, likes, picture) => {
  let commentCard = document.createElement("div");
  commentCard.classList.add("comment-card");

  let userPic = document.createElement("div");
  let userImg = document.createElement("img");
  userImg.classList.add("user-profile-image");
  userImg.src = picture;
  userPic.appendChild(userImg);
  commentCard.appendChild(userPic);

  let commentInfo = document.createElement("div");
  commentInfo.classList.add("comment-info");
  let commentUser = document.createElement("div");
  commentUser.classList.add("comment-user");
  commentUser.textContent = name;

  let commentText = document.createElement("div");
  commentText.classList.add("comment-text");
  commentText.textContent = text;

  let commentStats = document.createElement("div");
  commentStats.classList.add("comment-stats");
  commentStats.innerHTML = `
                            <div class='like-button'><i class="fas fa-thumbs-up"></i></div>
                            <div class='comment-like-count'>${likes}</div>
                            <div class='dislike-button comment-dislike'><i class="fas fa-thumbs-down"></i></div>
                            <div class='reply-button'>REPLY</div>`;

  commentInfo.appendChild(commentUser);
  commentInfo.appendChild(commentText);
  commentInfo.appendChild(commentStats);
  commentCard.appendChild(commentInfo);
  document.getElementById("vid-comments").appendChild(commentCard);
};

const getVidInfo = () => {
  fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${vidKey}&key=${apiKey}`
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      let dateObj = new Date(data.items[0].snippet.publishedAt);
      let month = dateObj.getUTCMonth() + 1; //months from 1-12
      let day = dateObj.getUTCDate();
      let year = dateObj.getUTCFullYear();

      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];

      let newdate = monthNames[month - 1] + " " + day + ", " + year;
      document.getElementById("vid-title").innerText =
        data.items[0].snippet.title;
      document.getElementById("publish-date").innerText = newdate;
      let channelID = data.items[0].snippet.channelId;

      document.getElementById("publisher-name").textContent =
        data.items[0].snippet.channelTitle;
      videoDescription = data.items[0].snippet.description;
      document.getElementById("publisher-text").textContent =
        videoDescription.substring(0, 120) + "...";
      fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelID}&key=${apiKey}`
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          let publisherImg = document.createElement("img");
          publisherImg.src = data.items[0].snippet.thumbnails.default.url;
          document.getElementById("publisher-image").innerHTML = "";
          document.getElementById("publisher-image").appendChild(publisherImg);

          fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelID}&key=${apiKey}`
          )
            .then(response => {
              return response.json();
            })
            .then(data => {
              let formatSubCount;
              let subCount = data.items[0].statistics.subscriberCount;
              subCount > 9999
                ? (formatSubCount =
                    (subCount / 1000).toPrecision(2) + "K Subscribers")
                : {};
              subCount > 999999
                ? (formatSubCount =
                    (subCount / 1000000).toPrecision(3) + "M subscribers")
                : {};
              document.getElementById("sub-count").textContent = formatSubCount;
            });
        });
    });

  fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${vidKey}&key=${apiKey}`
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      document.getElementById("view-count").innerText =
        new Intl.NumberFormat().format(data.items[0].statistics.viewCount) +
        " Views ";
      document.getElementById("likes").innerText =
        data.items[0].statistics.likeCount;
      document.getElementById("dislikes").innerText =
        data.items[0].statistics.dislikeCount;
      document.getElementById("comment-count").innerText =
        new Intl.NumberFormat().format(data.items[0].statistics.commentCount) +
        " Comments";
    });
};

const getVideo = (vidCount, nextPageToken) => {
  fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${vidKey}&pageToken=${nextPageToken ||
      ""}&type=video&maxResults=${vidCount}&key=${apiKey}`
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      nextPageTokenVideo = data.nextPageToken;
      for (let i = 0; i < data.items.length; i++) {
        makeVideoCard(data.items[i]);
      }
    });
};

const getComment = (commentCount, nextPageToken) => {
  fetch(
    `https://www.googleapis.com/youtube/v3/commentThreads?textFormat=plainText&part=snippet&videoId=${vidKey}&pageToken=${nextPageToken ||
      ""}&order=relevance&maxResults=${commentCount}&key=${apiKey}`
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      nextPageTokenComment = data.nextPageToken;
      for (let i = 0; i < data.items.length; i++) {
        let name =
          data.items[i].snippet.topLevelComment.snippet.authorDisplayName;
        let text = data.items[i].snippet.topLevelComment.snippet.textOriginal;
        let likes = data.items[i].snippet.topLevelComment.snippet.likeCount;
        let picture =
          data.items[i].snippet.topLevelComment.snippet.authorProfileImageUrl;
        makeCommentCard(name, text, likes, picture);
      }
    });
};

const getData = (vidCount, commentCount) => {
  getVideo(vidCount);
  getComment(commentCount);
};

const getMoreComments = nextPageToken => {
  getComment(10, nextPageToken);
};

const getMoreVideos = nextPageToken => {
  getVideo(10, nextPageToken);
};

getVidInfo();
getData(20, 10);
// Infinite Scroll
setInterval(() => {
  if (isInViewport(document.getElementById("infinite-page-trigger"))) {
    getMoreComments(nextPageTokenComment);
    getMoreVideos(nextPageTokenVideo);
  } else {
  }
}, 1500);