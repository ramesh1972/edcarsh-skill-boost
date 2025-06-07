
import React from 'react';
import { Link } from 'react-router-dom';

export const HeaderLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
      <div className="bg-gradient-to-br from-primary-foreground to-primary-foreground/80 text-primary rounded-xl p-2 shadow-lg">
        <span className="text-lg font-bold">EC</span>
      </div>
      <div>
        <span className="text-xl font-bold text-primary-foreground">
          EdCrash
        </span>
        <div className="text-xs text-primary-foreground/70 -mt-1">Learn Fast. Succeed Faster.</div>
      </div>
    </Link>
  );
};
