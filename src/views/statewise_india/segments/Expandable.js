import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DistrictWiseData from './DistrictWiseData';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(19),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledExpansionPanels(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  let currentTheme = () => {
        const body = document.body.classList;
        let white = false;
        Object.keys(body).map((e) => {if(body[e] === 'white-content') white = true;})
        return white;
    };

  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded === 'panel1'} style={{backgroundColor : !currentTheme() ? "#27293d" : "#ffffff"}} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>District Wise Data</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
           <DistrictWiseData data={props} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
