import { useEffect } from 'react';
import { localBusinessSchema } from '../utils/structuredData';

const SCRIPT_ID = 'site-local-business-jsonld';

const LocalBusinessSchema = () => {
  useEffect(() => {
    let script = document.getElementById(SCRIPT_ID);

    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = SCRIPT_ID;
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(localBusinessSchema);
  }, []);

  return null;
};

export default LocalBusinessSchema;
