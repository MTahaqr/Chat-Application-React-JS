{
    //     <div className="chat">
    //     <div className="section">
    //         <h3 className="heading-section">{this.state.name}</h3>
    //         <div className="row">
    //             <div className="chat-section col-md-8">
    //                 <ul className="messages list-group" ref={node => this.messageList = node}>
    //                     {
    //                         this.props.conversation.map((item, index) => {

    //                             return (
    //                                 <li key={item.key} className={(item.message.me) ? 'list-group-item ' : 'list-group-item  sender'}>
    //                                     <div>
    //                                         <Link to="/home" className="link name"><h4>{(item.message.me) ? 'Me' : this.state.name}</h4></Link>
    //                                         <p className="message">{
    //                                             (item.message.me) ?
    //                                                 item.message.me
    //                                                 : item.message.sender
    //                                         }</p>
    //                                     </div>
    //                                 </li>
    //                             );
    //                         })
    //                     }
    //                     <li className="scroll-to-me"></li>
    //                     <li className="scroll-to-me"></li>
    //                     <li className="scroll-to-me"></li>
    //                     <li className="scroll-to-me" ref={node => this.node = node}></li>

    //                 </ul>

    //                 <div className="send-message-wrapper" >
    //                     <input type="text" name="message" value={this.state.message} onKeyPress={this.handleEnter} onChange={this.handleChange} ref={el => this.textBox = el} className="form-control" />
    //                     <button onClick={this.onSubmit} className="btn btn-primary">Send</button>
    //                 </div>
    //             </div>
    //             <div className="col-md-3">
    //                 <h2>Conversations</h2>
    //                 <ul className="list-group">

    //                     {
    //                         this.props.allConversation.map((convo, index) => {
    //                             return <li className="list-group-item" key={index} id={convo.key}>{convo.key}</li>
    //                         })
    //                     }
    //                 </ul>

    //             </div>
    //         </div>




    //     </div>
    // </div >
}
