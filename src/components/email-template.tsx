import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div className='bg-grey flex justify-between items-center '>
    <h1 className='text-white font-bold text-xl'>Welcome, {firstName}!</h1>
    <img src="https://i.imgur.com/ry0TfC1.png"></img>
  </div>
);
