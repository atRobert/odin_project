
const apiKey = ''
const vidKey = 'NIGv5FFl4PQ'
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

console.log(apiKey)
const makeVideoCard = (videoObj) =>{
    let vidCard = document.createElement('div')
    vidCard.classList.add('video-card')
    let img = document.createElement('img')
    let src = videoObj.snippet.thumbnails.default.url
    img.src = src
    let vidCardText = document.createElement('div')
    vidCardText.classList.add('video-card-text')
    let vidCardPublisher = document.createElement('div')
    vidCardPublisher.classList.add('video-card-publisher')
    let vidTitle = videoObj.snippet.title
    vidCardText.textContent = vidTitle.substring(0, 60) + '...'
    let vidOwner = videoObj.snippet.channelTitle
    vidCardPublisher.textContent = vidOwner
    console.log(videoObj)

    vidCard.appendChild(img)
    vidCard.appendChild(vidCardText)
    vidCard.appendChild(vidCardPublisher)
    document.getElementById('other-vids').appendChild(vidCard) 
}

const makeCommentCard = (name, text, likes) =>{
    let commentCard = document.createElement('div')
    commentCard.classList.add('comment-card')

    let userPic = document.createElement('div')
    userPic.innerHTML = '<i class="fas fa-user"></i>'
    commentCard.appendChild(userPic)

    let commentInfo = document.createElement('div')
    commentInfo.classList.add('comment-info')
    let commentUser = document.createElement('div')
    commentUser.classList.add('comment-user')
    commentUser.textContent = name

    let commentText = document.createElement('div')
    commentText.classList.add('comment-text')
    commentText.textContent = text

    let commentStats = document.createElement('div')
    commentStats.classList.add('comment-stats')
    commentStats.innerHTML = `
                            <i class="fas fa-thumbs-up"> </i> 
                            <div class='comment-like-count'>${likes}</div>
                            <i class="fas fa-thumbs-down"></i>
                            <div>REPLY</div>`

    commentInfo.appendChild(commentUser)
    commentInfo.appendChild(commentText)
    commentInfo.appendChild(commentStats)
    commentCard.appendChild(commentInfo)
    document.getElementById('vid-comments').appendChild(commentCard)
}


    fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${vidKey}&key=${apiKey}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {

        let dateObj = new Date(data.items[0].snippet.publishedAt);
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                            ];



        let newdate = monthNames[month -1] + " " + day +  ", " + year
        document.getElementById('vid-title').innerText = (data.items[0].snippet.title);
        document.getElementById('publish-date').innerText = (newdate);
    });

    fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${vidKey}&key=${apiKey}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            
            document.getElementById('view-count').innerText = data.items[0].statistics.viewCount
            document.getElementById('likes').innerText = data.items[0].statistics.likeCount      
            document.getElementById('dislikes').innerText = data.items[0].statistics.dislikeCount
        });

const getData = () =>{
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${vidKey}&type=video&maxResults=20&key=${apiKey}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            for (let i = 0; i<data.items.length; i++){
                makeVideoCard(data.items[i])
            }
        });

    fetch(`https://www.googleapis.com/youtube/v3/commentThreads?textFormat=plainText&part=snippet&videoId=${vidKey}&maxResults=10&key=${apiKey}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data)
            for (let i = 0; i<data.items.length; i++){
                let name = data.items[i].snippet.topLevelComment.snippet.authorDisplayName
                let text = data.items[i].snippet.topLevelComment.snippet.textOriginal
                let likes = data.items[i].snippet.topLevelComment.snippet.likeCount
                makeCommentCard(name, text, likes)
            }
            
        });
}


getData()
//Infinite Scroll
setInterval(() => {
    if(isInViewport(document.getElementById('bottom-of-page'))){
        getData()    
    }
}, 1500);

