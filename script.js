const video = document.querySelector('.video')
const channelPic = document.querySelector('.channel-pic')
const videoTitle = document.querySelector('.video-title')
const channelName = document.querySelector('.channel-name')
const views = document.querySelector('.views')
const icon = document.querySelector('.icon')
const uplodedTime = document.querySelector('.time')
const videoContainer = document.querySelector('.videos-container')



// scrolling effect on videos link 

const videoLinkBox = document.querySelector('.videos-links')
const arrowIcons = document.querySelectorAll('.icon span')

const handleIcons = () => {
      let scrollValue = videoLinkBox.scrollLeft
      let maxScrollableWidth = videoLinkBox.scrollWidth - videoLinkBox.clientWidth
      arrowIcons[0].parentElement.style.display = scrollValue > 200 ? "flex" : "none"
      arrowIcons[1].parentElement.style.display = maxScrollableWidth > scrollValue + Number(215) ? "flex" : "none"
}

videoLinkBox.addEventListener('scroll', () => {
      const scrollLeft = (videoLinkBox.scrollLeft)
      if (scrollLeft > 0) {

            arrowIcons[0].parentElement.style.display = "flex"
      } else {

            arrowIcons[0].parentElement.style.display = "none"
      }
      if (scrollLeft > 650) {

            arrowIcons[1].parentElement.style.display = "none"
      }
      else {

            arrowIcons[1].parentElement.style.display = "flex"
      }
})

arrowIcons.forEach(icon => {
      icon.addEventListener('click', (e) => {
            videoLinkBox.scrollLeft += icon.id === "left-icon" ? -200 : 200
            handleIcons()
      })
})
 const playVideo =(embedHtml)=>{
  sessionStorage.setItem("videoEmbedHtml",embedHtml)
  window.location.href = "video-page.html"
 }
const renderData = (element) => {
      console.log(element)
      videoContainer.innerHTML += `<div class="video-box">
       <div class="video"><img src=${element.snippet.thumbnails.medium.url} alt=""></div>
        <div class="channel-details">
         <div class="channel-pic">
         <img src=${element.channelThumbnail} alt=""></div>
          <div class="video-details">
           <div class="video-title">${element.snippet.title}</div>
           <div class="channel-name">${element.snippet.channelTitle}</div>
           <div class="video-views-time">
           <div class="video-views-time">
           <div class="views">5 M views</div>
           <div class="video-icon">
          </div>
           <div class="time">2 days</div>
        </div>
           </div>
          </div>
        </div>
       </div>`
 videoContainer.addEventListener('click',()=>{
      playVideo(element.player.embedHtml)
 })
}


let api_key = "your-api-key";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
      key: api_key,
      part: ['snippet','player'],
      chart: 'mostPopular',
      maxResults: 24,
      regionCode: 'IN'
}))
      .then(res => res.json())
      .then(data => {
            data.items.forEach(item => {
                  getChannelIcon(item);
            
            })

      })
      .catch(err => console.log(err));

const getChannelIcon = (video_data) => {
      fetch(channel_http + new URLSearchParams({
            key: api_key,
            part: 'snippet',
            id: video_data.snippet.channelId
      }))
            .then(res => res.json())
            .then(data => {
                  video_data.channelThumbnail = data.items[0].snippet.thumbnails.medium.url;
                  
                  renderData(video_data)
                
            }).catch(err => console.log(err));
}











