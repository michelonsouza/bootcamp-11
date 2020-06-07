import React from 'react';
import { useTransition } from 'react-spring';

import { ToastMessage } from '../../hooks/toast';

import Toast from './Toast';
import { Container } from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
  timer?: number;
  progressBar?: boolean;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  messages,
  timer,
  progressBar,
}) => {
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    },
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ item: message, key, props }) => (
        <Toast
          key={key}
          style={props}
          message={message}
          timer={timer || 3000}
          progressBar={progressBar}
        />
      ))}
    </Container>
  );
};

export default ToastContainer;
