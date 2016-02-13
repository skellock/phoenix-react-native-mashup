import React, { Component, View, Dimensions } from 'react-native'
import GiftedMessenger from 'react-native-gifted-messenger'
import moment from 'moment'
import Chat from './Chat'

// layout numbers
const SCREEN_HEIGHT = Dimensions.get('window').height
const STATUS_BAR_HEIGHT = 40  // i know, but let's pretend its cool
const CHAT_MAX_HEIGHT = SCREEN_HEIGHT - STATUS_BAR_HEIGHT

// yes, i'm 41 years old.
const NAMES = ['Girl', 'Boy', 'Horse', 'Poo', 'Face', 'Giant', 'Super', 'Butt', 'Captain', 'Lazer']
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min
const getRandomName = () => NAMES[getRandomInt(0, NAMES.length)]
const getRandomUser = () => `${ getRandomName() }${ getRandomName() }${ getRandomName() }`
const user = getRandomUser()
const isMe = (someUser) => user === someUser
const avatar = { uri: 'https://facebook.github.io/react/img/logo_og.png' }

class Root extends Component {

  constructor (props) {
    super(props)
    // bind our functions to the right scope
    this.handleSend = this.handleSend.bind(this)
    this.receiveChatMessage = this.receiveChatMessage.bind(this)
    // let's chat!
    this.chat = Chat(user, this.receiveChatMessage)
  }

  // fires when we receive a message
  receiveChatMessage (message) {
    const { user } = message
    if (isMe(user)) return // prevent echoing yourself (TODO: server could handle this i guess?)
    this.refs.giftedMessenger.appendMessage({
      text: message.body,
      name: message.user,
      image: avatar,
      position: 'left',
      date: moment()
    })
  }

  // fires when we need to send a message
  handleSend (message) {
    this.chat.send(message.text)
  }

  // draw our ui
  render () {
    return (
      <View style={{ flex: 1, paddingTop: STATUS_BAR_HEIGHT }}>
        <GiftedMessenger
          ref='giftedMessenger'
          handleSend={ this.handleSend }
          maxHeight={ CHAT_MAX_HEIGHT }
          senderImage={ avatar }
          />
      </View>
    )
  }

}

export default Root
