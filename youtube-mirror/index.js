
const apiKey = ''
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

fetch('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=VRwPYlNAGzg&key=' + apiKey)
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

fetch('https://www.googleapis.com/youtube/v3/videos?part=statistics&id=VRwPYlNAGzg&key=' + apiKey)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        
        document.getElementById('view-count').innerText = data.items[0].statistics.viewCount
        document.getElementById('likes').innerText = data.items[0].statistics.likeCount      
        document.getElementById('dislikes').innerText = data.items[0].statistics.dislikeCount
    });

fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=VRwPYlNAGzg&type=video&key=' + apiKey)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        for (let i = 0; i<data.items.length; i++){
            makeVideoCard(data.items[i])
        }
    });