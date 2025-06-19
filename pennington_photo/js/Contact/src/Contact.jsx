/**
 * Pennington Photographics
 *
 * TJ Dokas <mailto:tjdokas@gmail.com>
 */

import React from "react";
import NavBar from "./NavBar";
import Loading from "./Loading";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: {
        name: "",
        email: "",
        message: "",
      },
      sent: false,
      checkout: false,
      loaded: false,
    };
    this.handleChage = this.handleChage.bind(this);
  }

  componentDidMount() {
    const checkout = document.getElementById("checkout").content === "True";
    const { content } = this.state;
    var message = "Hello D. Pennington,\n\n...";
    if (checkout) {
      message =
        "Hello D. Pennington,\n\nI would like to purchase prints of a few of your photos. Please see the invoice that is sent with this message.\n\nThank you!";
    }
    content.message = message;
    setTimeout(() => {
      this.setState({ loaded: true, checkout, content });
    }, 40);
  }

  handleChage(key, val) {
    const { content } = this.state;
    content[key] = val;
    this.setState({ content });
  }

  render() {
    const { content, sent, loaded, checkout } = this.state;
    const { name, email, message } = content;
    return (
      <>
        {loaded ? null : <Loading />}
        <div className={loaded ? "loaded" : "loading"}>
          <NavBar />
          <div className="site-contents">
            <div className="dialogue altbody">
              <h1>Contact Donald N. Pennington</h1>
              <h4>
                You can email me either via the form below or with your favorite
                email application at{" "}
                <a
                  href="mailto: donpennington@comcast.net"
                  className="underline"
                >
                  donpennington@comcast.net
                </a>
              </h4>
              <form action="/api/v1/contact/" method="post">
                <input type="hidden" name="checkout" value={checkout} />
                <label htmlFor="name">Name</label>
                <br />
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    this.handleChage("name", e.target.value);
                  }}
                  required
                />
                <br />
                <br />
                <label htmlFor="email">email</label>
                <br />
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    this.handleChage("email", e.target.value);
                  }}
                  required
                />
                <br />
                <br />
                <label htmlFor="message">Message</label>
                <br />
                <textarea
                  name="message"
                  onChange={(e) => {
                    this.handleChage("message", e.target.value);
                  }}
                  value={message}
                />
                <br />
                {checkout ? (
                  <>
                    <h3>
                      An invoice for your order will be sent with this message.
                    </h3>
                    <p>
                      6% sales tax will be added to orders. Shipping costs are
                      variable depending on delivery speed and carrier. Orders
                      are shipped within 3-4 weeks unless otherwise specified at
                      time of ordering.
                    </p>
                  </>
                ) : null}
                <br />
                {sent ? (
                  <h1 className="successpass">Sent</h1>
                ) : (
                  <div className="menu-buttons">
                    <input
                      type="button"
                      onClick={() => {
                        this.handleChage("name", "");
                        this.handleChage("email", "");
                        this.handleChage("message", "");
                      }}
                      value="Clear"
                    />
                    <input type="submit" value="Send" />
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Contact;
