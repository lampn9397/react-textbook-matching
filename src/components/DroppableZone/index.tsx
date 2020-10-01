import React from 'react';
import classNames from 'classnames';
import styles from './DroppableZone.module.scss';

interface DroppableZoneProps {
  className?: string;
  badgeNumber?: number;
  children?: React.ReactNode;
};

type Ref = string | ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined;

const DroppableZone = ({
  children,
  className,
  badgeNumber = 0,
}: DroppableZoneProps,
  ref: Ref) => {
  return (
    <div ref={ref} className={classNames([styles.container, className])}>
      {children}
      <div className={styles['badge-container']}>
        {badgeNumber}
      </div>
    </div>
  );
};

export default React.memo(React.forwardRef(DroppableZone));
