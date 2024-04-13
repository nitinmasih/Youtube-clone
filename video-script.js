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

const embedHtml = sessionStorage.getItem('videoEmbedHtml')

if(embedHtml){
      const player = document.createElement('div')
      player.innerHTML = embedHtml
      document.getElementById('video-container').appendChild(player)
}