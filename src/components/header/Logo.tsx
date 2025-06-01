
import React from 'react';
import { Link } from 'react-router-dom';

export const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
      <div className="bg-gradient-to-br from-primary to-blue-600 text-primary-foreground rounded-xl p-2">
        <span className="text-lg font-bold">EC</span>
      </div>
      <div>
        <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          EdCrash
        </span>
        <div className="text-xs text-muted-foreground -mt-1">Learn Fast. Succeed Faster.</div>
      </div>
    </Link>
  );
};
