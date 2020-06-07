import React, { useState, useCallback } from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ title, className, children }) => {
  const [hovered, setHovered] = useState(false);
  const [leave, setLeave] = useState(false);

  const handleHover = useCallback(() => {
    setHovered(true);
  }, []);

  const handleLeave = useCallback(() => {
    setLeave(true);

    setTimeout(() => {
      setLeave(false);
      setHovered(false);
    }, 300);
  }, []);

  return (
    <Container
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      hovered={hovered}
      leave={leave}
      className={className}
    >
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
