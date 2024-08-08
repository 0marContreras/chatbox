import * as React from 'react';
interface EmailTemplateProps {
  token: string;
}

export const PasswordTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  token,
}) => (
  <div style={{backgroundColor: '#142233'}}>
    <center>
    <img src='https://i.imgur.com/1alqVrq.png' width={100} height={100}></img>
    <h1 style={{color: '#6D72F2', fontSize: '60px'}} >Welcome!</h1>
    <h1 style={{color: 'aliceblue'}} >Click <a style={{color: '#6D72F2'}} href="https://chatbox.website/passwordreset">here</a> to reset your password</h1>
    </center>
  </div>
);
