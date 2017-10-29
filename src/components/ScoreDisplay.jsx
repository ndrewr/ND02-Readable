// @flow

import React from 'react';
import { Button, Icon, Statistic } from 'semantic-ui-react';

type scoreDisplayProps = {
  score?: number,
  size?: 'tiny' | 'small' | 'large' | 'big',
  customStyles?: any,
  updateScore: any => void
};

const ScoreDisplay = ({
  score = 0,
  size = 'large',
  customStyles = {},
  updateScore
}: scoreDisplayProps) => {
  const styles = {
    voteButtonStyles: {
      backgroundColor: 'transparent',
      display: 'block',
      width: '100%',
      padding: 0,
      paddingLeft: '1.5em',
      textAlign: 'center'
    },
    scoreStyles: {
      width: '100%',
      margin: 0
    },
    container: {
      display: 'inline-block',
      width: '80px',
      ...customStyles
    }
  };

  return (
    <div style={styles.container}>
      <Button
        animated
        style={styles.voteButtonStyles}
        value="upVote"
        onClick={updateScore}
      >
        <Button.Content visible>
          <Icon name="triangle up" size="big" />
        </Button.Content>
        <Button.Content hidden>vote up</Button.Content>
      </Button>
      <Statistic size={size} style={styles.scoreStyles}>
        <Statistic.Value>{score}</Statistic.Value>
      </Statistic>
      <Button
        animated
        style={styles.voteButtonStyles}
        value="downVote"
        onClick={updateScore}
      >
        <Button.Content visible>
          <Icon name="triangle down" size="big" />
        </Button.Content>
        <Button.Content hidden>vote down</Button.Content>
      </Button>
    </div>
  );
};

export default ScoreDisplay;
