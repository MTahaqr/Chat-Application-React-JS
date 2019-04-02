import React, { Component } from 'react';
import './contact.css';


class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = { to: 'tahaqr28@gmail.com', subject: '', body: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUpdate() {

    }

    handleChange(event) {
        const element = event.target;
        switch (element.name) {
            case 'subject':
                this.setState({ subject: element.value });
                break;
            case 'message':
                this.setState({ body: element.value });
                break;
            default:
                break;
        }
    }

    handleSubmit() {
        console.log(this.state);
        this.setState({ subject: '', body: '' });
    }

    render() {
        return (
            <div className="section contact">
                <h3 className="heading-section">Contact - My React Application</h3>
                <div className="h-line"></div>
                <div className="row">

                    <div className="col-md-1"></div>

                    <div className="col-md-6">

                        <div className="form-group">
                            <label htmlFor="to" className="my-label-wrapper">
                                <h4 className="my-label">To: </h4>
                            </label>
                            <input type="text" name="username" value={this.state.to} disabled id="to" className="form-control disabled" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject" className="my-label-wrapper">
                                <h4 className="my-label">Subject: </h4>
                            </label>
                            <input type="text" name="subject" value={this.state.subject} onChange={this.handleChange} id="subject" placeholder="Subject" className="form-control" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message" className="my-label-wrapper">
                                <h4 className="my-label">Message: </h4>
                            </label>
                            <textarea type="text" name="message" style={{ height: "170px" }} value={this.state.body} onChange={this.handleChange} id="message" row="5" placeholder="Write your message here" className="form-control"></textarea>
                        </div>


                        <div className="form-group">
                            <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default Contact;