import { useState } from 'react'
import './App.css'
import { Root } from './backend/channelModel'

function App() {

  const [channel,setChannel] = useState<Root | null>(null);
  const [handle,setHandle] = useState("")

  const fetchChannel = async (handle : string) => {
    try{
      const response = await fetch(`http://localhost:3000/channel?forHandle=${handle}&part=snippet,statistics,brandingSettings`)

      const data = (await response.json()) as Root

      setChannel(data)
      console.log(channel)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
      <div>
        <h1>Youtube Stats</h1>
        { channel ? (
          <div>
            <img src={channel.items.find(item => item.brandingSettings.image === item.brandingSettings.image)?.brandingSettings.image.bannerExternalUrl+`=w1060-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`}alt='channel banner'/>
            <img src={channel.items.find(item => item.snippet.thumbnails.medium.width === 240)?.snippet.thumbnails.medium.url} alt='channel thumbnail'/>
            <h2>Channel name: {channel.items.find(data => data.snippet.title)?.snippet.title}</h2>
            <h2>Subscribers: {channel.items.find(data => data.statistics.subscriberCount)?.statistics.subscriberCount}</h2>
            <h2>Channel Views: {channel.items.find(data => data.statistics.viewCount)?.statistics.viewCount}</h2>
            <h2>Videos: {channel.items.find(data => data.statistics.videoCount)?.statistics.videoCount}</h2>
          </div>
        ) : (
          <p>No data</p>
        )}
        <input value={handle} onChange={(e) => setHandle(e.target.value)}/>
        <button onClick={() => {fetchChannel(handle)}}>Click me</button>
      </div>
    </>
  )
}

export default App
