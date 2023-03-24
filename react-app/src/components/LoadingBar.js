import React from 'react'
import  { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
const LoadingBar = () => {
  return (
    <Segment>
    <Dimmer active>
      <Loader />
    </Dimmer>
      <h1></h1>
      <h1></h1>
      <h1></h1>
    </Segment> 
  )
}

export default LoadingBar