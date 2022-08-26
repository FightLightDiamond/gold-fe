import { createContext } from 'react';
import { createContextualCan } from '@casl/react';

const AbilityContext = createContext<any>('');
const Can = createContextualCan(AbilityContext.Consumer);

export {AbilityContext, Can}
