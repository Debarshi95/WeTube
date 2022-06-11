import Tooltip from 'react-tooltip';
import { kebabCase } from 'lodash';

const PlayerCardActions = ({ actions, ...props }) => {
  return actions.map((action, idx) => (
    <div
      className="p-icon"
      role="button"
      aria-hidden
      data-tip
      key={idx}
      data-for={kebabCase(action?.tooltipText || '')}
      {...props}
    >
      {action?.icon}
      <Tooltip place="bottom" id={kebabCase(action?.tooltipText || '')}>
        {action?.tooltipText || ''}
      </Tooltip>
    </div>
  ));
};

PlayerCardActions.defaultProps = {
  actions: [],
};
export default PlayerCardActions;
