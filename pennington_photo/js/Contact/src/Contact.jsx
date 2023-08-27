import React from 'react'
import NavBar from './NavBar';

class Contact extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: {
        name: "",
        email: "",
        message: "Hello D. Pennington,\n\nI would like to purchase prints of the following photos. Thank you!"
      },
      photos: [""],
      sent: false
    }
    this.handleChage = this.handleChage.bind(this);
  }

  handleChage(key, val) {
    const {
      content
    } = this.state;
    content[key] = val;
    this.setState({ content });
  }

  render() {
    const {
      content,
      photos,
      sent,
    } = this.state;
    const {
      name,
      email,
      message
    } = content;
    return (
      <>
        <NavBar />
        <div className='site-contents'>
          <div className='dialogue altbody'>
            <h1>
              Contact Donald N. Pennington
            </h1>
            <h4>
              You can email me either via the form below or with your favorite email application at <a href="mailto: donpennington@comcast.net" className='underline'>donpennington@comcast.net</a>
            </h4>
            <form action="/api/v1/contact/" method="post">
              <input type='hidden' value={photos} />
              <label htmlFor="name">Name</label><br />
              <input type="text" name="name" id="name" value={name} onChange={(e) => { this.handleChage("name", e.target.value) }} required /><br />
              <br />
              <label htmlFor="email">email</label><br />
              <input type="text" name="email" id="email" value={email} onChange={(e) => { this.handleChage("email", e.target.value) }} required /><br />
              <br />
              <label htmlFor="message">Message</label><br />
              <textarea name="message"
                onChange={(e) => { this.handleChage("message", e.target.value) }}
                value={message} />
              <br />
              <br />
              {
                sent ? <h1 className='successpass'>Sent</h1> : (
                  <div class="menu-buttons">
                    <button onClick={() => { this.handleChage("name", ""); this.handleChage("email", ""); this.handleChage("message", ""); }}>Cancel</button>
                    <input type="submit" value="Send" />
                  </div>
                )
              }
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Contact
