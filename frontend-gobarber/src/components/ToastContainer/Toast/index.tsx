import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiXCircle,
  FiCheckCircle,
  FiInfo,
  FiAlertTriangle,
} from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/toast';

import { Container, ProgressBar, Progress } from './styles';

interface ToastProps {
  message: ToastMessage;
  timer: number;
  progressBar?: boolean;
  style?: any;
}

const icons = {
  info: <FiInfo size={24} />,
  warning: <FiAlertTriangle size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({
  message,
  timer,
  progressBar,
  style,
}) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const setTimer = setTimeout(() => {
      removeToast(message.id);
    }, timer);

    return () => {
      clearTimeout(setTimer);
    };
  }, [timer, message.id, removeToast]);

  return (
    <Container
      type={message.type}
      style={style}
      hasdescription={String(!!message.description)}
      id={message.id}
      title={message.title}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button
        type="button"
        title="Fechar"
        onClick={() => removeToast(message.id)}
      >
        <FiXCircle size={18} />
      </button>
      {progressBar && (
        <ProgressBar>
          <Progress id={`progress-${message.id}`} transition={timer} />
        </ProgressBar>
      )}
    </Container>
  );
};

export default Toast;
